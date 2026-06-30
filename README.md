# Marvel AI — Frontend

Interface moderna, inspirada no ChatGPT/Claude, para conversar com uma IA
especializada no Universo Marvel Cinematográfico.

## Stack

- React + TypeScript + Vite
- Axios (comunicação HTTP)
- React Router DOM (navegação entre páginas)
- CSS Modules
- TMDB API (pôsteres e dados reais dos filmes)

## Arquitetura

```
Frontend (este repo)
   │  POST /chat  { pergunta }
   ▼
n8n — webhook "Agente Marvel"
   │
   ▼
Google Gemini 2.5 Flash + RAG (Postgres/PGVector)
   │
   ▼
Base de documentos Marvel (personagens, filmes, eventos, equipes)
```

O frontend **não precisa** de chave da Anthropic/Gemini — toda a IA e a base
de conhecimento ficam por trás do webhook do n8n. O único segredo que o
frontend usa é a chave do **TMDB**, só para buscar pôsteres.

## Estrutura de pastas

```
src/
├── components/   (Navbar, Hero, ChatMessage, ChatInput, MovieCard,
│                  HeroCard, Timeline, Footer, Loading)
├── pages/        (Home, Chat, Movies, Heroes, TimelinePage, About)
├── services/     (api.ts → n8n, tmdb.ts → TMDB)
├── data/         (movies.ts, heroes.ts)
├── types/        (interfaces TypeScript)
├── App.tsx
└── main.tsx
```

## Como rodar

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Configure o `.env`** na raiz do projeto (copie o `.env.example`):
   ```env
   VITE_API_BASE_URL=http://localhost:5678/webhook
   VITE_TMDB_API_KEY=sua_chave_do_tmdb
   ```

3. **Ative o workflow "Agente Marvel" no n8n** (toggle ligado no canto
   superior direito do editor) — isso expõe a URL de produção
   `http://localhost:5678/webhook/chat`. Sem isso, o chat não vai responder.

4. **Rode o projeto:**
   ```bash
   npm run dev
   ```

5. Abre `http://localhost:5173`.

## Páginas

| Rota         | Página     | Descrição                                          |
|--------------|------------|-----------------------------------------------------|
| `/`          | Home       | Landing page com hero, features e fases do MCU      |
| `/chat`      | Chat       | Conversa com o Agente Marvel via n8n                |
| `/movies`    | Filmes     | 36 filmes com pôsteres reais (TMDB) e filtro por fase|
| `/heroes`    | Heróis     | 12 personagens com poderes e descrição               |
| `/timeline`  | Linha do Tempo | Filmes organizados cronologicamente por fase     |
| `/about`     | Sobre      | Tecnologias e arquitetura do projeto                 |

## Memória de conversa (sessionId)

O frontend já gera e envia um **`sessionId`** único por conversa (persistido
em `sessionStorage`, e renovado quando o usuário clica em "+ Nova Conversa"
na página de Chat):

```json
{ "pergunta": "...", "sessionId": "a1b2c3d4-..." }
```

**Para o backend (n8n) usar isso e a IA "lembrar" da conversa**, basta:

1. No workflow **Agente Marvel**, adicionar um nó de memória conectado ao
   **AI Agent** (entrada `ai_memory`) — geralmente "Simple Memory" ou
   "Window Buffer Memory" no LangChain do n8n.
2. Configurar a **Session Key** desse nó de memória para ler:
   ```
   {{ $json.body.sessionId }}
   ```
3. Pronto — cada `sessionId` diferente vira uma conversa isolada com
   histórico próprio, sem precisar de banco extra (a memória default do n8n
   guarda em buffer; pra persistir entre execuções, dá pra trocar pra
   Postgres Chat Memory usando o mesmo banco do PGVector).

Sem esse nó conectado, o campo `sessionId` é simplesmente ignorado pelo
n8n e cada pergunta continua sendo respondida isoladamente (como já estava
funcionando).



O endpoint `/chat` é sempre **POST**, porque a pergunta do usuário precisa
ir no corpo da requisição para ser *processada* pela IA (gera uma resposta
nova) — isso não é uma busca idempotente de dados, então GET não se aplica.

```ts
// src/services/api.ts
await api.post("/chat", { pergunta: "Quem é o Thanos?" });
// Resposta esperada do n8n: { resposta: "..." }
```

## Próximos passos sugeridos

- Expor o n8n com um domínio público ou túnel (ngrok / Cloudflare Tunnel)
  quando for fazer deploy do frontend (Vercel), já que `localhost` só
  funciona enquanto tudo roda na mesma máquina.
- Usar `getMovieDetails()` do `tmdb.ts` para exibir sinopse e nota ao clicar
  em "DETALHES" de um filme.
- Adicionar testes com Vitest + React Testing Library.

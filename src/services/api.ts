import axios from "axios";

/**
 * Base URL do webhook do n8n.
 * Configure no .env: VITE_API_BASE_URL=http://localhost:5678/webhook
 *
 * O workflow "Agente Marvel" expõe o endpoint POST /chat e espera:
 *   Body:     { "pergunta": "...", "sessionId": "..." }
 *   Resposta: { "resposta": "..." }
 *
 * O `sessionId` identifica a conversa atual. Quando o backend conectar um
 * nó de memória (ex: "Simple Memory" / "Window Buffer Memory") no AI Agent
 * usando esse campo como chave, o agente passa a lembrar do histórico da
 * conversa entre uma pergunta e outra. Sem isso conectado no n8n, o campo
 * é simplesmente ignorado e cada pergunta continua sendo tratada isolada.
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5678/webhook",
  headers: { "Content-Type": "application/json" },
});

interface ChatApiResponse {
  resposta: string;
}

/**
 * Envia a pergunta do usuário (+ sessionId da conversa) para o Agente
 * Marvel (n8n) via POST e retorna o texto da resposta gerada pela IA.
 */
export async function sendMessage(pergunta: string, sessionId: string): Promise<string> {
  const { data } = await api.post<ChatApiResponse>("/chat", { pergunta, sessionId });
  return data.resposta ?? "Não recebi uma resposta válida do agente. Tente novamente!";
}

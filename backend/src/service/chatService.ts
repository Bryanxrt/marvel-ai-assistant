import { env } from "../config/env.js";

type RespostaN8n = {
  resposta: string;
};

function respostaN8nValida(dados: unknown): dados is RespostaN8n {
  return (
    typeof dados === "object" &&
    dados !== null &&
    "resposta" in dados &&
    typeof dados.resposta === "string" &&
    dados.resposta.trim() !== ""
  );
}

class ChatService {
  async respostaChat(pergunta: string): Promise<string> {
    const respostaN8n = await fetch(env.n8nWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pergunta }),
      signal: AbortSignal.timeout(120_000),
    });

    if (!respostaN8n.ok) {
      throw new Error(`Erro ao chamar o n8n: ${respostaN8n.status}`);
    }

    const dados: unknown = await respostaN8n.json();

    if (!respostaN8nValida(dados)) {
      throw new Error("O n8n devolveu uma resposta inválida");
    }

    return dados.resposta;
  }
}

export default ChatService;

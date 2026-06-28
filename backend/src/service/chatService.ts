import { env } from "../config/env.js";

class ChatService {
  async respostaChat(pergunta: string): Promise<string> {
    
    const respostaN8n = await fetch(env.n8nWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pergunta }),
    });

    if (!respostaN8n.ok) {
      throw new Error(`Erro ao chamar o n8n: ${respostaN8n.status}`);
    }

    const dados = (await respostaN8n.json()) as {
      resposta: string;
    };

    return dados.resposta;
  }
}

export default ChatService;

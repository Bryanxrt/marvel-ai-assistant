import { Router } from "express";
import type { Request, Response } from "express";
import ChatService from "../service/chatService.js";

const router = Router();
const chatService = new ChatService();

router.post("/chat", async (req: Request, res: Response) => {
  const { pergunta } = req.body;

  if (typeof pergunta !== "string" || pergunta.trim() === '') {
    return res.status(400).json({
      erro: "A pergunta é obrigatória",
    });
  }

  try {
    const resposta = await chatService.respostaChat(pergunta);

    return res.status(200).json({ resposta });
  } catch (erro) {
    console.error(erro);

    if (erro instanceof Error && erro.name === "TimeoutError") {
    return res.status(504).json({
      erro: "O serviço demorou demais para responder",
    });
  }

    return res.status(500).json({
      erro: "Não foi possível processar a pergunta",
    });
  }
});

export default router;

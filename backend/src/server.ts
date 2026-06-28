import express from "express";
import chatRouter from "./controller/chatController.js";
import { env } from "./config/env.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  return res.status(200).json({
    status: "online",
  });
});

app.use("/api", chatRouter);

app.listen(env.port, () => {
  console.log(`Servidor rodando na porta ${env.port}`);
});

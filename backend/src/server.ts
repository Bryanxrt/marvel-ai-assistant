import express from "express";
import chatRouter from "./controller/chatController.js";

const app = express();
const PORT = 3001;

app.use(express.json());

app.get("/health", (req, res) => {
  return res.status(200).json({
    status: "online",
  });
});

app.use("/api", chatRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

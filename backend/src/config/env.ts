function obterVariavelObrigatoria(nome: string): string {
  const valor = process.env[nome];

  if (!valor) {
    throw new Error(`A variável ${nome} não foi configurada`);
  }

  return valor;
}

export const env = {
  port: Number(process.env.PORT ?? 3001),
  n8nWebhookUrl: obterVariavelObrigatoria("N8N_WEBHOOK_URL"),
  frontendUrl: obterVariavelObrigatoria("FRONTEND_URL"),
};
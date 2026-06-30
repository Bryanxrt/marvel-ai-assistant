const STORAGE_KEY = "marvel-ai-session-id";

function generateId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  // Fallback simples caso randomUUID não esteja disponível
  return `sess-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Retorna o sessionId da conversa atual, persistido no sessionStorage
 * (sobrevive a reload da página, mas é único por aba/sessão do navegador).
 * Usado pelo n8n para identificar qual "memória" de conversa consultar.
 */
export function getSessionId(): string {
  let id = sessionStorage.getItem(STORAGE_KEY);
  if (!id) {
    id = generateId();
    sessionStorage.setItem(STORAGE_KEY, id);
  }
  return id;
}

/** Gera um novo sessionId — usado ao iniciar uma "Nova conversa". */
export function resetSessionId(): string {
  const id = generateId();
  sessionStorage.setItem(STORAGE_KEY, id);
  return id;
}

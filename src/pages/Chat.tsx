import { useEffect, useRef, useState } from "react";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";
import Loading from "../components/Loading";
import { sendMessage } from "../services/api";
import { getSessionId, resetSessionId } from "../services/session";
import type { ChatMessageType } from "../types";
import styles from "./Chat.module.css";

const INIT_MESSAGE: ChatMessageType = {
  role: "assistant",
  content:
    "Olá! Sou o assistente especializado no Universo Marvel Cinematográfico. 🦸\n\n" +
    "Posso te ajudar com:\n" +
    "• Informações sobre heróis e vilões\n" +
    "• Detalhes de filmes, eventos e equipes\n" +
    "• Teorias, conexões e curiosidades do MCU\n\n" +
    "O que você quer saber?",
};

const SUGGESTIONS = [
  "Quem é o herói mais poderoso do MCU?",
  "Como Thanos conseguiu as Pedras do Infinito?",
  "Quem são os Vingadores originais?",
  "O que aconteceu em Vingadores: Ultimato?",
];

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessageType[]>([INIT_MESSAGE]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string>("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Garante um sessionId estável assim que o componente monta
  useEffect(() => {
    setSessionId(getSessionId());
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (text: string) => {
    const next: ChatMessageType[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setLoading(true);
    setError(null);

    try {
      const resposta = await sendMessage(text, sessionId);
      setMessages((prev) => [...prev, { role: "assistant", content: resposta }]);
    } catch (err) {
      console.error(err);
      setError(
        "Não consegui falar com o Agente Marvel. Verifique se o n8n está rodando e se a VITE_API_BASE_URL está correta no .env."
      );
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Desculpe, erro de conexão com o agente. Tente novamente! 🔴" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([INIT_MESSAGE]);
    setError(null);
    setSessionId(resetSessionId());
  };

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <button className={`mBtn ${styles.newChatBtn}`} onClick={handleNewChat}>
            + NOVA CONVERSA
          </button>

          <h3 className={`bb ${styles.sidebarTitle}`}>SUGESTÕES</h3>
          {SUGGESTIONS.map((s) => (
            <button key={s} className={styles.suggestion} onClick={() => handleSend(s)} disabled={loading}>
              {s}
            </button>
          ))}

          <div className={styles.sessionInfo}>
            sessão: <span className={styles.sessionId}>{sessionId.slice(0, 8)}</span>
          </div>
        </aside>

        <div className={styles.chatArea}>
          {error && <div className={styles.errorBanner}>{error}</div>}

          <div className={styles.messages}>
            {messages.map((m, i) => (
              <ChatMessage key={i} message={m} />
            ))}
            {loading && <Loading />}
            <div ref={bottomRef} />
          </div>

          <ChatInput onSend={handleSend} loading={loading} />
        </div>
      </div>
    </div>
  );
}

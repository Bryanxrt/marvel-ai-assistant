import type { ChatMessageType } from "../types";
import styles from "./ChatMessage.module.css";

/** Renderiza markdown simples: **negrito** e bullets (• ou -) */
function renderContent(content: string) {
  return content.split("\n").map((line, i) => {
    const trimmed = line.trim();
    const isBullet = trimmed.startsWith("•") || trimmed.startsWith("- ");
    const text = isBullet ? trimmed.replace(/^[•-]\s*/, "") : line;
    const parts = text.split(/(\*\*.*?\*\*)/g);

    const rendered = parts.map((part, j) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={j}>{part.slice(2, -2)}</strong>
      ) : (
        <span key={j}>{part}</span>
      )
    );

    return isBullet ? (
      <li key={i} className={styles.bullet}>{rendered}</li>
    ) : (
      <p key={i} className={styles.line}>{rendered}</p>
    );
  });
}

interface Props {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: Props) {
  const isUser = message.role === "user";
  return (
    <div className={`${styles.row} ${isUser ? styles.rowUser : ""}`}>
      <div className={`${styles.avatar} ${isUser ? styles.avatarUser : styles.avatarAi}`}>
        {isUser ? "🙂" : "🤖"}
      </div>
      <div className={`${styles.bubble} ${isUser ? styles.bubbleUser : styles.bubbleAi}`}>
        {renderContent(message.content)}
      </div>
    </div>
  );
}

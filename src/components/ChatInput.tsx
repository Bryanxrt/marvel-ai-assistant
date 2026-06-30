import { useState, type KeyboardEvent } from "react";
import styles from "./ChatInput.module.css";

interface Props {
  onSend: (text: string) => void;
  loading: boolean;
}

export default function ChatInput({ onSend, loading }: Props) {
  const [value, setValue] = useState("");

  const submit = () => {
    const text = value.trim();
    if (!text || loading) return;
    onSend(text);
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className={styles.wrap}>
      <textarea
        className={styles.input}
        rows={1}
        placeholder="Pergunte qualquer coisa sobre a Marvel..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
      />
      <button className="mBtn" onClick={submit} disabled={loading || !value.trim()} style={{ padding: "0 24px" }}>
        ENVIAR
      </button>
    </div>
  );
}

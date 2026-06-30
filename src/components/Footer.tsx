import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={`bb ${styles.logo}`}>
          MARVEL <span style={{ color: "#ED1D24" }}>AI</span>
        </div>
        <p className={styles.tech}>
          Construído com React · TypeScript · Vite · Axios · React Router DOM
        </p>
        <p className={styles.note}>
          Projeto acadêmico — dados de filmes via TMDB API, chat via Agente Marvel (n8n + Gemini)
        </p>
      </div>
    </footer>
  );
}

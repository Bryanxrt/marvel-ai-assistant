import styles from "./About.module.css";

const TECHS = [
  { name: "React", desc: "Biblioteca para construção da interface" },
  { name: "TypeScript", desc: "Tipagem estática para maior segurança no código" },
  { name: "Vite", desc: "Build tool e dev server ultrarrápido" },
  { name: "Axios", desc: "Cliente HTTP para comunicação com a API" },
  { name: "React Router DOM", desc: "Navegação entre páginas (SPA)" },
  { name: "CSS Modules", desc: "Estilização isolada por componente" },
];

const ARCHITECTURE = [
  { label: "Frontend", value: "React + TypeScript + Vite (este projeto)" },
  { label: "Chat / IA", value: "n8n (webhook) → Agente com Google Gemini + RAG" },
  { label: "Base de conhecimento", value: "Postgres + PGVector (documentos Marvel)" },
  { label: "Pôsteres de filmes", value: "TMDB — The Movie Database API" },
];

export default function About() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.kicker}>SOBRE O PROJETO</div>
        <h1 className={`bb ${styles.title}`}>MARVEL AI</h1>
        <div className="rl" style={{ margin: "12px auto" }} />
        <p className={styles.subtitle}>
          Interface moderna inspirada no ChatGPT/Claude para conversar com uma IA especializada no Universo Marvel Cinematográfico.
        </p>
      </div>

      <div className="sec">
        <h2 className="bb" style={{ fontSize: 32, letterSpacing: 2, marginBottom: 24 }}>TECNOLOGIAS</h2>
        <div className="g3">
          {TECHS.map((t) => (
            <div key={t.name} className={`card ${styles.techCard}`}>
              <div className={styles.techName}>{t.name}</div>
              <div className={styles.techDesc}>{t.desc}</div>
            </div>
          ))}
        </div>

        <h2 className="bb" style={{ fontSize: 32, letterSpacing: 2, margin: "56px 0 24px" }}>ARQUITETURA</h2>
        <div className={styles.archList}>
          {ARCHITECTURE.map((a) => (
            <div key={a.label} className={styles.archRow}>
              <span className={styles.archLabel}>{a.label}</span>
              <span className={styles.archValue}>{a.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

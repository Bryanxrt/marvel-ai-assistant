import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import { PHASES } from "../data/movies";
import styles from "./Home.module.css";

const FEATURES = [
  { icon: "🤖", title: "Chat com o Agente", desc: "Responde perguntas sobre heróis, filmes, teorias, conexões e todo o universo Marvel com base em uma biblioteca de documentos canônicos.", to: "/chat", accent: "#ED1D24" },
  { icon: "🦸", title: "Heróis & Vilões", desc: "12 personagens icônicos do MCU com poderes, histórias, curiosidades e o papel de cada um na saga.", to: "/heroes", accent: "#3B82F6" },
  { icon: "📽️", title: "Linha do Tempo", desc: "Todos os 36 filmes organizados por fase, do Capitão América em 1943 até Thunderbolts* em 2025.", to: "/timeline", accent: "#10B981" },
];

export default function Home() {
  return (
    <div>
      <Hero />

      <div className="sec">
        <h2 className="bb" style={{ fontSize: 52, letterSpacing: 4, textAlign: "center" }}>EXPLORE O MCU</h2>
        <div className="rl" style={{ margin: "12px auto 48px" }} />
        <div className="g3">
          {FEATURES.map((f) => (
            <Link key={f.to} to={f.to} className={`card ${styles.feature}`} style={{ borderTop: `3px solid ${f.accent}` }}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <h3 className={`bb ${styles.featureTitle}`}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
              <div className={styles.featureCta} style={{ color: f.accent }}>EXPLORAR →</div>
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.phasesStrip}>
        <div className={styles.phasesInner}>
          <h2 className="bb" style={{ fontSize: 40, letterSpacing: 4, marginBottom: 32 }}>AS FASES DO MCU</h2>
          <div className={styles.phasesRow}>
            {PHASES.map((ph) => (
              <Link
                key={ph.id}
                to="/timeline"
                className={styles.phaseChip}
                style={{ background: ph.color + "18", borderColor: ph.color + "45" }}
              >
                <div className={styles.phaseDot} style={{ background: ph.color }} />
                <span className="bb" style={{ fontSize: 16, letterSpacing: 2 }}>{ph.name}</span>
                <span className={styles.phaseChipCount}>{ph.films.length} filmes</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import styles from "./Hero.module.css";

const STATS: [string, string][] = [["36", "Filmes"], ["5", "Fases"], ["∞", "Histórias"]];

export default function Hero() {
  return (
    <div className={styles.wrap}>
      <div className={styles.grid} />
      <div className={styles.scanline} />

      <div className={styles.content}>
        <div className={`fu ${styles.badge}`}>
          <span className={styles.dot} />
          <span className={styles.badgeText}>UNIVERSO MARVEL CINEMATOGRÁFICO</span>
        </div>

        <h1 className={`fu d1 bb ${styles.title}`}>
          MARVEL<br /><span style={{ color: "#ED1D24" }}>AI</span>
        </h1>

        <p className={`fu d2 ${styles.subtitle}`}>
          Converse com uma IA especializada no MCU. Explore heróis, filmes, teorias e toda a saga em um só lugar.
        </p>

        <div className={`fu d3 ${styles.actions}`}>
          <Link to="/chat" className={`mBtn glowBtn ${styles.primaryBtn}`}>
            ⚡ COMEÇAR AGORA
          </Link>
          <Link to="/timeline" className={`oBtn ${styles.secondaryBtn}`}>
            VER LINHA DO TEMPO
          </Link>
        </div>

        <div className={`fu d4 ${styles.stats}`}>
          {STATS.map(([n, l]) => (
            <div key={l}>
              <div className={`bb floatEl ${styles.statNum}`}>{n}</div>
              <div className={styles.statLabel}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.fade} />
    </div>
  );
}

import { PHASES } from "../data/movies";
import styles from "./Timeline.module.css";

export default function Timeline() {
  return (
    <div className={styles.wrap}>
      {PHASES.map((ph) => (
        <div key={ph.id} className={styles.phaseBlock}>
          <div
            className={styles.phaseHeader}
            style={{ background: ph.color + "14", borderColor: ph.color + "35", borderLeftColor: ph.color }}
          >
            <div className={styles.phaseCircle} style={{ background: ph.color }}>{ph.id}</div>
            <span className={`bb ${styles.phaseName}`}>{ph.name}</span>
            <span className={styles.phaseCount}>{ph.films.length} filmes</span>
          </div>

          <div className={styles.list}>
            <div className={styles.connector} style={{ background: ph.color + "22" }} />
            {ph.films.map((f) => (
              <div key={f.n} className={styles.row}>
                <div
                  className={styles.numCircle}
                  style={{ background: ph.color, boxShadow: `0 0 0 3px #0B0B0B,0 0 0 5px ${ph.color}45` }}
                >
                  {f.n}
                </div>
                <div className={styles.icon}>{f.icon}</div>
                <div className={styles.title}>{f.title}</div>
                <div className={styles.year}>{f.year}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

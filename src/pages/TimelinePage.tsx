import TimelineComponent from "../components/Timeline";
import styles from "./TimelinePage.module.css";

export default function TimelinePage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.kicker}>MCU</div>
        <h1 className={`bb ${styles.title}`}>LINHA DO TEMPO</h1>
        <div className="rl" style={{ margin: "12px auto" }} />
        <p className={styles.subtitle}>36 filmes organizados cronologicamente por fase</p>
      </div>

      <TimelineComponent />
    </div>
  );
}

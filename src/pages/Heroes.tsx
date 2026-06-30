import HeroCard from "../components/HeroCard";
import { HEROES } from "../data/heroes";
import styles from "./Heroes.module.css";

export default function Heroes() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.kicker}>MCU</div>
        <h1 className={`bb ${styles.title}`}>HERÓIS & VILÕES</h1>
        <div className="rl" style={{ margin: "12px auto" }} />
        <p className={styles.subtitle}>12 personagens icônicos do Universo Marvel Cinematográfico</p>
      </div>

      <div className="sec">
        <div className="g3">
          {HEROES.map((h) => (
            <HeroCard key={h.id} hero={h} />
          ))}
        </div>
      </div>
    </div>
  );
}

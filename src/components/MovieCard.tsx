import type { Film } from "../types";
import styles from "./MovieCard.module.css";

interface Props {
  film: Film;
  onDetails?: (film: Film) => void;
}

export default function MovieCard({ film, onDetails }: Props) {
  return (
    <div className={`card ${styles.card}`} style={{ borderTop: `3px solid ${film.phaseColor}` }}>
      <div
        className={styles.poster}
        style={{ 
          background: film.poster ? "#000" : `linear-gradient(140deg,#111 0%,${film.phaseColor}18 100%)`,
          overflow: "hidden",
          position: "relative"
        }}
      >
        {film.poster ? (
          <img 
            src={film.poster} 
            alt={film.title} 
            className={styles.posterImg} 
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "cover", 
              objectPosition: "top center",
              display: "block" 
            }} 
          />
        ) : (
          <span className={styles.icon}>{film.icon}</span>
        )}

        <div className={styles.phaseTag} style={{ background: film.phaseColor + "25", borderColor: film.phaseColor + "60", color: film.phaseColor }}>
          {film.phaseName}
        </div>
        <div className={styles.numberTag}>#{film.n}</div>
      </div>

      <div className={styles.body}>
        <div className={styles.title}>{film.title}</div>
        <div className={styles.footer}>
          <span className={styles.year}>📅 {film.year}</span>
          <button className="oBtn" style={{ fontSize: 10, padding: "4px 10px" }} onClick={() => onDetails?.(film)}>
            DETALHES
          </button>
        </div>
      </div>
    </div>
  );
}
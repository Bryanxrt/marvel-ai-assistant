import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { PHASES, allFilms } from "../data/movies";
import { getMoviePoster } from "../services/tmdb";
import type { Film } from "../types";
import styles from "./Movies.module.css";

export default function Movies() {
  const [selectedPhase, setSelectedPhase] = useState(0);
  const [posters, setPosters] = useState<Record<string, string | null>>({});
  const [loadingPosters, setLoadingPosters] = useState(true);

  const all: Film[] = allFilms();
  const shown = selectedPhase === 0 ? all : all.filter((m) => m.phase === selectedPhase);

  useEffect(() => {
    let active = true;
    (async () => {
      setLoadingPosters(true);
      const results = await Promise.all(
        all.map(async (m) => {
          // AQUI ESTÁ A CORREÇÃO: Buscando apenas pelo título para não dar conflito com o ano
          const url = await getMoviePoster(m.title); 
          return [`${m.title}|${m.year}`, url] as const;
        })
      );
      if (active) {
        setPosters(Object.fromEntries(results));
        setLoadingPosters(false);
      }
    })();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.kicker}>MCU</div>
        <h1 className={`bb ${styles.title}`}>TODOS OS FILMES</h1>
        <div className="rl" style={{ margin: "12px auto 24px" }} />
        {loadingPosters && <div className={styles.loadingText}>Carregando pôsteres do TMDB...</div>}

        <div className={styles.filters}>
          {[{ id: 0, name: "TODOS", color: "#666" }, ...PHASES.map((p) => ({ id: p.id, name: p.name, color: p.color }))].map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedPhase(f.id)}
              className={`bb ${styles.filterBtn}`}
              style={{
                background: selectedPhase === f.id ? f.color : "transparent",
                outline: `1px solid ${selectedPhase === f.id ? f.color : f.color + "60"}`,
                color: selectedPhase === f.id ? "#fff" : f.color,
              }}
            >
              {f.name}
            </button>
          ))}
        </div>
      </div>

      <div className="sec">
        <div className="g4">
          {shown.map((m) => (
            <MovieCard key={m.n} film={{ ...m, poster: posters[`${m.title}|${m.year}`] }} />
          ))}
        </div>
      </div>
    </div>
  );
}
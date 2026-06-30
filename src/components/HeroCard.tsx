import { useState } from "react";
import type { Hero } from "../types";
import styles from "./HeroCard.module.css";

interface Props {
  hero: Hero;
  imageUrl?: string;
}

export default function HeroCard({ hero, imageUrl }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const showImg = !!imageUrl && !imgError;

  return (
    <div className={`card ${styles.card}`} style={{
      borderTop: `3px solid ${hero.accent}`,
      background: hero.bg,
      position: "relative",
      overflow: "hidden",
      minHeight: "400px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end"
    }}>
      {/* Ícone decorativo — visível enquanto não há imagem ou como fallback */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "65%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "110px",
        opacity: imgLoaded ? 0 : 0.35,
        transition: "opacity 0.4s ease",
        userSelect: "none",
        zIndex: 0,
      }}>
        {hero.icon}
      </div>

      {/* Imagem opcional — renderizada somente quando uma URL válida é fornecida */}
      {showImg && (
        <img
          src={imageUrl}
          alt={hero.name}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
            opacity: imgLoaded ? 1 : 0,
            transition: "opacity 0.4s ease",
            zIndex: 1,
          }}
        />
      )}

      {/* Degradê para garantir leitura do texto */}
      <div style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "80%",
        background: "linear-gradient(to top, rgba(11,11,11, 0.95) 0%, rgba(11,11,11, 0.5) 60%, transparent 100%)",
        zIndex: 2
      }} />

      <div style={{ position: "relative", zIndex: 2, padding: "24px" }}>
        <h3 className={`bb ${styles.name}`} style={{ color: hero.accent, margin: 0, fontSize: "28px" }}>
          {hero.name}
        </h3>
        <div className={styles.alias} style={{ color: "#fff", fontWeight: "bold", marginBottom: "8px" }}>
          {hero.alias}
        </div>
        <p className={styles.desc} style={{ color: "#eee", lineHeight: "1.5", fontSize: "14px" }}>
          {hero.desc}
        </p>

        {expanded && (
          <ul className={styles.powers} style={{ paddingLeft: "20px", marginTop: "12px", marginBottom: "16px" }}>
            {hero.powers.map((p) => (
              <li key={p} style={{ color: hero.accent, marginBottom: "4px" }}>
                <span className={styles.powerText} style={{ color: "#fff" }}>{p}</span>
              </li>
            ))}
          </ul>
        )}

        <button
          className="oBtn"
          style={{
            fontSize: 11,
            padding: "8px 16px",
            borderColor: hero.accent,
            marginTop: "16px",
            background: expanded ? hero.accent : "transparent",
            color: expanded ? "#fff" : hero.accent,
            cursor: "pointer",
            transition: "all 0.3s"
          }}
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "OCULTAR" : "SAIBA MAIS"}
        </button>
      </div>
    </div>
  );
}
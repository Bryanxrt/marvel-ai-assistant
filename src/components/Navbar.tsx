import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/heroes", label: "Heróis" },
  { to: "/movies", label: "Filmes" },
  { to: "/timeline", label: "Linha do Tempo" },
  { to: "/about", label: "Sobre" },
];

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.logo}>
          <span className={styles.logoMark}>M</span>
          <span className={`bb ${styles.logoText}`}>
            MARVEL <span style={{ color: "#ED1D24" }}>AI</span>
          </span>
        </NavLink>

        <div className={styles.links}>
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => `${styles.link}${isActive ? ` ${styles.active}` : ""}`}
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <NavLink to="/chat" className={`mBtn glowBtn ${styles.cta}`}>
          ⚡ CHAT
        </NavLink>
      </div>
    </nav>
  );
}

import styles from "./Loading.module.css";

/** Indicador de "IA digitando" usado no chat. */
export default function Loading() {
  return (
    <div className={styles.wrap}>
      <span className={styles.dot} style={{ animationDelay: "0s" }} />
      <span className={styles.dot} style={{ animationDelay: ".2s" }} />
      <span className={styles.dot} style={{ animationDelay: ".4s" }} />
    </div>
  );
}

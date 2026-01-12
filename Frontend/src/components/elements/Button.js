import styles from "./Elements.module.css";

export default function Button({ children, ghost = false, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${ghost ? styles.ghost : ""}`}
    >
      {children}
    </button>
  );
}

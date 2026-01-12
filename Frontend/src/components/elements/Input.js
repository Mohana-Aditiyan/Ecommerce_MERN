import styles from "./Elements.module.css";

export default function Input({ type = "text", placeholder }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={styles.input}
    />
  );
}

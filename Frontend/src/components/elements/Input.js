import styles from "./Elements.module.css";

export default function Input({ type = "text", placeholder, value, onChange, name }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}       // important for handleChange
      value={value}     // bind React state
      onChange={onChange} // update state on typing
      className={styles.input}
    />
  );
}

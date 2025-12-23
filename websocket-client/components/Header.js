import styles from "./Header.module.css";

export default function Header({ title }) {
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <div className={styles.headerAvatar}></div>
        <div>
          <h2 className={styles.title}>{title}</h2>
        </div>
      </div>
    </header>
  );
}

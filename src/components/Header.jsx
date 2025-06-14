import styles from "./Header.module.css";
import img from "../assets/img/logojs.png";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.centralContainer}>
        <div className={styles.containerImg}>
          <img src={img}
          alt="logo"
          />
        </div>
        <h1 className={styles.text}>JS Criações</h1>
      </div>
    </header>
  );
}

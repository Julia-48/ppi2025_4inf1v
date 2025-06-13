import styles from "./Header.module.css";
import img from "../assets/img/logo.png";
export function Header() {
  return (
    <div className={styles.container}>
        <div className={styles.containerImg}>
            <img 
            src={img}
            alt="Logo do IFRN"
            />
        </div>
        <h1> JS Criações</h1>
    </div>
  );
}

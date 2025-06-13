import styles from './Footer.module.css';
export function Footer() {
    return (
        <footer className={styles.footer}>
            <p className={styles.text}>IFRN Campus Macau</p>
            <p className={styles.text}>Curso Técnico em Infromática</p>
            <p className={styles.text}>Desenvolvido por JS Criações</p>
        </footer>
    );
}
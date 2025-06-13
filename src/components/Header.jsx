import styles from './Header.module.css';
export function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>Melhor turma</h1>
            <nav className={styles.nav}>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
}
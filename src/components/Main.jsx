import styles from "./Main.module.css";

export function Main() {
  return (
    <div className={styles.container}>
      <header className={styles.header} />
      <aside className={styles.aside} />
      <div className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <img src="https://picsum.photos/200?random=1"/>
            <h2>Card 1</h2>
            <p>This is the first card.</p>
          </div>
          <div className={styles.card}>
            <img src="https://picsum.photos/200?random=2"/>
            <h2>Card 2</h2>
            <p>This is the second card.</p>
          </div>
          <div className={styles.card}>
            <img src="https://picsum.photos/200?random=3"/>
            <h2>Card 3</h2>
            <p>This is the third card.</p>
          </div>
          <div className={styles.card}>
            <img src="https://picsum.photos/200?random=4"/>
            <h2>Card 4</h2>
            <p>This is the fourth card.</p>
          </div>
          <div className={styles.card}>
            <img src="https://picsum.photos/200?random=5"/>
            <h2>Card 5</h2>
            <p>This is the fifth card.</p>
          </div>
        </div>
      </div>
      <footer className={styles.footer} />
    </div>
  );
}
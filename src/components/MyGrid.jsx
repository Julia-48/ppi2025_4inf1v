import styles from "./MyGrid.module.css";

export function MyGrid() {
    return (
        <div className={styles.container}>
            <header className={styles.header} />
            <div className={styles.main}>
                <h1 className={styles.title}>My Grid</h1>
                <div className={styles.grid}>
                    <div className={styles.card}>
                        <img src="https://picsum.photos/200?random=1"></img>
                        <h2>Card 1</h2>
                        <p>Lorem ipsum potenti consectetur justo donec viverra rhoncus congue pellentesque netus, rutrum enim at placerat arcu risus sit cras ullamcorper praesent aenean.</p>
                    </div>
                    <div className={styles.card}>
                        <img src="https://picsum.photos/200?random=2"></img>
                        <h2>Card 2</h2>
                        <p>Lorem ipsum pharetra cursus venenatis lectus viverra dapibus augue, scelerisque eget accumsan lectus netus phasellus cubilia lobortis, blandit non semper vitae aptent blandit luctus.</p>
                    </div>
                    <div className={styles.card}>
                        <img src="https://picsum.photos/200?random=3"></img>
                        <h2>Card 3</h2>
                        <p>Lorem ipsum sapien placerat erat ipsum arcu odio quam, amet metus justo proin fringilla non turpis pellentesque justo, eleifend pulvinar dui consequat euismod vivamus sodales.</p>
                    </div>
                    <div className={styles.card}>
                        <img src="https://picsum.photos/200?random=4"></img>
                        <h2>Card 4</h2>
                        <p>Lorem ipsum blandit habitasse convallis semper, dui hendrerit ut nisl lectus maecenas, mollis in habitant praesent.</p>
                    </div>
                    <div className={styles.card}>
                        <img src="https://picsum.photos/200?random=5"></img>
                        <h2>Card 5</h2>
                        <p>Lorem ipsum ut ipsum est sollicitudin justo, habitant metus pulvinar scelerisque ultricies adipiscing nam, integer quisque lobortis mi ultrices.</p>
                    </div>
                </div>
            </div>
            <footer className={styles.footer} />
        </div>
    );
}
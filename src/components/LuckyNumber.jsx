import { useState } from "react";
import styles from "./LuckyNumber.module.css";

export function LuckyNumber() {
    const [luckyNumber, setLuckyNumber] = useState(0);
    const [drawnNumbers, setDrawnNumbers] = useState([]);
    const [message, setMessage] = useState("");

    function handleClick() {
        const newNumber = Math.ceil(Math.random() * 31);
        if (drawnNumbers.includes(newNumber)) {
            setMessage(`O número ${newNumber} já foi sorteado!`);
        } else {
            setLuckyNumber(newNumber);
            setDrawnNumbers([...drawnNumbers, newNumber]);
            setMessage("");
        }
    }

    return (
        <div className={styles.centralContainer}>
            {luckyNumber ? (
                <h1>Lucky Number = {luckyNumber}</h1>
            ) : (
                <h1>Lucky Number = 🎲</h1>
            )}
            <button className={styles.button} onClick={handleClick}>
                I'am feeling lucky today!
            </button>
            {message && <p style={{ color: "red" }}>{message}</p>}
        </div>
    );
}
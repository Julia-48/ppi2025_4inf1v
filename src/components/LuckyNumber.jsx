import { useState } from "react";
import styles from "./LuckyNumber.module.css";

export function LuckyNumber() {
    const [luckyNumber, setLuckyNumber] = useState(0);
    const [array, setArray] = useState([]);
    const [message, setMessage] = useState("");

    function handleClick() {
        var n = Math.ceil(Math.random() * 31);
        setLuckyNumber(n);

        if(array.includes(n)) {
            setMessage("You haven't clicked the button yet!");
    } else {
            setMessage("");
            setArray([...array, luckyNumber]);
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
            <button className={styles.button} onClick={(handleClick) => {
                setLuckyNumber(0);
                setArray([]);
                setMessage("");
            }}>
                RESET 🔁
            </button>
            {message  && <p>{message}</p>}
            {array.length > 0 && (
            <div>
                <h3>Lucky Numbers Array:</h3>
                <p>[{array}]</p>
            </div>)}
        </div>
    );
}
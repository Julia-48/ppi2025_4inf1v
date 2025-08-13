import { useState } from "react";
import styles from "./Login.module.css";

export function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && senha) {
      setErro("");
      if (onLogin) onLogin(email);
    } else {
      setErro("Preencha todos os campos.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2 className={styles.loginTitle}>Login</h2>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">E-mail:</label>
            <input
              className={styles.loginInput}
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          <div>
            <label htmlFor="senha">Senha:</label>
            <input
              className={styles.loginInput}
              id="senha"
              type="password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          {erro && <p className={styles.loginError}>{erro}</p>}
          <button className={styles.loginButton} type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}
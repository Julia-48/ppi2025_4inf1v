import { useState } from "react";
import styles from "./Cadastro.module.css";

export function Cadastro({ onRegister }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");
    if (!nome || !email || !senha || !confirmarSenha) {
      setErro("Preencha todos os campos.");
      return;
    }
    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }
    setSucesso("Cadastro realizado com sucesso!");
    if (onRegister) onRegister({ nome, email, senha });
    setNome("");
    setEmail("");
    setSenha("");
    setConfirmarSenha("");
  };

  return (
    <div className={styles.cadastroContainer}>
      <div className={styles.cadastroBox}>
        <h2 className={styles.cadastroTitle}>Cadastro de Usuário</h2>
        <form className={styles.cadastroForm} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nome">Nome:</label>
            <input
              className={styles.cadastroInput}
              id="nome"
              type="text"
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">E-mail:</label>
            <input
              className={styles.cadastroInput}
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="senha">Senha:</label>
            <input
              className={styles.cadastroInput}
              id="senha"
              type="password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmarSenha">Confirmar Senha:</label>
            <input
              className={styles.cadastroInput}
              id="confirmarSenha"
              type="password"
              value={confirmarSenha}
              onChange={e => setConfirmarSenha(e.target.value)}
              required
            />
          </div>
          {erro && <p className={styles.cadastroError}>{erro}</p>}
          {sucesso && <p className={styles.cadastroSuccess}>{sucesso}</p>}
          <button className={styles.cadastroButton} type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
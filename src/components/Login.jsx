import { useState } from "react";

export function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulação de autenticação simples
    if (email && senha) {
      setErro("");
      if (onLogin) onLogin(email);
    } else {
      setErro("Preencha todos os campos.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input
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
            id="senha"
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        {erro && <p style={{ color: "red" }}>{erro}</p>}
        <button type="submit">Entrar</button>
      </form>
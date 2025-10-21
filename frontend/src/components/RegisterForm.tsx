import React, { useState } from "react";

// 1. Definição do Componente
const RegisterForm: React.FC = () => {
  // 2. Estado do Componente (Para guardar os valores dos inputs)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 3. Função de Submissão
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Impede o recarregamento da página
    // Limpa mensagens anteriores
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }

    try {
      // A nossa chamada de API (usando o Proxy que configurámos!)
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const resultText = await response.text();

      if (response.ok) {
        setSuccess(resultText + " Redirecionando para o login...");
        // Em uma aplicação real, aqui redirecionarias
        // setTimeout(() => window.location.href = '/login', 2000);
      } else {
        setError(`Erro no registro: ${resultText}`);
      }
    } catch (err) {
      setError(
        "Erro ao comunicar com o servidor. Verifique se o backend está ativo."
      );
    }
  };

  // 4. Retorno do JSX (Estrutura da tela)
  return (
    <section className="register-form-box">
      <h2>Registar Utilizador</h2>

      {/* Exibe mensagens de erro ou sucesso */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleSubmit} className="register-form">
        <div className="input-group">
          <label htmlFor="new-username">Utilizador</label>
          <input
            type="text"
            id="new-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="new-email">E-mail</label>
          <input
            type="text"
            id="new-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="new-password">Senha</label>
          <input
            type="password"
            id="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirm-password">Confirmar Senha</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="register-button">
          Registar
        </button>
      </form>
      <p className="login-text">
        Já tem uma conta? <a href="#">Faça login</a>
      </p>
    </section>
  );
};

export default RegisterForm;

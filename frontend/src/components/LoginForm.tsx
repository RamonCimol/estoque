import React, { useState } from "react";

// O tipo de dados que esperamos da resposta de sucesso da API
interface AuthResponse {
  message: string;
  token: string;
  // O backend não está enviando userId e username, apenas token e message.
  // Vamos tipar de acordo com a resposta do Controller: { message: string, token: string }
}

const LoginForm: React.FC = () => {
  // 1. Estado para os campos de e-mail e senha
  const [email, setEmail] = useState(""); // Alterado de username para email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Função que lida com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // 2. Envia o 'email' em vez de 'username'
        body: JSON.stringify({ email, password }),
      });

      // O Controller envia JSON tanto para sucesso quanto para erro
      const data = await response.json();

      if (response.ok) {
        const authData = data as AuthResponse; // Força a tipagem de sucesso

        // 3. GUARDA O TOKEN JWT no localStorage
        localStorage.setItem("authToken", authData.token);

        alert(`Login bem-sucedido: ${authData.message}.`);

        // Redireciona para a página principal (rota 'estoque' no front-end)
        window.location.href = "/estoque";
      } else {
        // 4. Lida com o formato de erro do Controller: { error: "mensagem" }
        setError(data.error || "Erro desconhecido durante o login.");
      }
    } catch (err) {
      console.error("Erro de conexão:", err);
      setError("Não foi possível conectar-se ao servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  // Estrutura do formulário (JSX)
  return (
    <section className="login-form-box">
      <h2>Login</h2>

      {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email" // Usamos type="email" para validação do browser
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        {/* Links de navegação */}
        <div className="form-links">
          <a href="#" className="form-link">
            Alterar senha
          </a>
          <a href="/register" className="form-link">
            Registar-se
          </a>
        </div>

        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? "A entrar..." : "Entrar"}
        </button>
      </form>
    </section>
  );
};

export default LoginForm;

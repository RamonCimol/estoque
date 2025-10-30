"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Login.module.css";

export default function LoginForm() {
  // states para guardar os dados
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

  // 2. Função chamada quando o formulário é enviado
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErro("");

    try {
      // Envia os dados para o backend
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Pega a resposta JSON que o backend enviou
      const data = await response.json();

      // O backend envia 'response.ok = false' para status 400+
      if (!response.ok) {
        // 'data.error' deve conter a string "Preencha o e-mail e a senha."
        // que o seu backend enviou!
        // Atualizamos o estado de 'erro' com essa mensagem
        setErro(data.error || "Ocorreu um erro ao tentar logar.");
        return;
      }

      console.log("Login bem-sucedido!", data.token);
      alert("Login feito com sucesso!");
      // Ex: Salvar o token e redirecionar
      // localStorage.setItem('token', data.token);
      // window.location.href = '/dashboard';
    } catch (error) {
      // 7. Pega erros de rede (ex: servidor offline)
      setErro("Não foi possível conectar ao servidor. Tente novamente.");
    }
  };
  return (
    // Container principal que centraliza o formulário na tela
    <div className={styles.loginPage}>
      {/* A caixa do formulário de login */}
      <div className={styles.loginBox}>
        {/* Logo (Substitua 'logo.svg' pelo caminho real do seu logo) */}
        <div className={styles.logoContainer}>
          <Image
            src="/Logo_so_bujigangas.png"
            alt="Logo Gerenciador de Estoque"
            width={150}
            height={40}
          />
          <span className={styles.logoPlaceholder}>Gerenciador de Estoque</span>
        </div>

        <h1 className={styles.title}>Login</h1>
        <p className={styles.subtitle}>Faça login para acessar o sistema.</p>

        {/* Formulário */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              id="email"
              className={styles.input}
              // CORREÇÃO 2: Ligar o input ao state
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Senha</label>
            <div className={styles.passwordWrapper}>
              <input
                type="password"
                id="password"
                className={styles.input}
                // CORREÇÃO 2: Ligar o input ao state
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className={styles.eyeIcon}>👁️</span>
            </div>
          </div>

          <Link href="/register" className={styles.forgotPassword}>
            Não tem um usuário? Registre-se
          </Link>

          <a href="#" className={styles.forgotPassword}>
            Esqueceu a senha?
          </a>

          {erro && (
            <p
              className={styles.errorMessage}
              style={{ color: "red", textAlign: "center", margin: "10px 0" }}
            >
              {erro}
            </p>
          )}

          <button type="submit" className={styles.loginButton}>
            LOGIN
          </button>
        </form>

        <p className={styles.footerText}>2025. Álisson, Eliseu e Ramon</p>
      </div>
    </div>
  );
}

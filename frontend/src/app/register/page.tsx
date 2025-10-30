"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Register.module.css";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter(); // Inicialização do router de páginas

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Previne o comportamento padrão do formulário (recarregar a página)
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const dadosDaRequisicao = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosDaRequisicao),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Algo deu errado no registro.");
      }

      const data = await response.json();
      console.log("Usuário registrado com sucesso:", data);

      setEmail("");
      setPassword("");
      setUsername("");

      setSuccess(
        "Usuário registrado com sucesso! Redirecionando para o login..."
      );

      setTimeout(() => {
        router.push("/login");
      }, 2000); // 2000ms = 2 segundos
    } catch (err: unknown) {
      let errorMessage = "Ocorreu um erro inesperado.";
      // Verifica se 'err' é uma instância de Error
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "string") {
        errorMessage = err;
      }
      setError(errorMessage);
      console.error("Falha ao registrar usuário:", err);
    } finally {
      if (!success) {
        setIsLoading(false);
      }
    }
  };

  return (
    // Container principal que centraliza o formulário na tela
    <div className={styles.registerPage}>
      {/* A caixa do formulário de register */}
      <div className={styles.registerBox}>
        <div className={styles.logoContainer}>
          <Image
            src="/Logo_so_bujigangas.png"
            alt="Logo Gerenciador de Estoque"
            width={150}
            height={40}
          />
          <span className={styles.logoPlaceholder}>Gerenciador de Estoque</span>
        </div>

        <h1 className={styles.title}>Registre-se</h1>
        <p className={styles.subtitle}>Preencha o usuário, e-mail e senha</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <div className={styles.formGroup}>
            <label htmlFor="username">Usuário:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <Link href="/login" className={styles.forgotPassword}>
            Já tem uma conta? Faça login
          </Link>

          <button
            type="submit"
            className={styles.registerButton}
            disabled={isLoading}
          >
            {isLoading ? "Registrando..." : "Registre-se"}
          </button>
        </form>

        <p className={styles.footerText}>2025. Álisson, Eliseu e Ramon</p>
      </div>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import styles from "./Login.module.css";

export default function LoginPage() {
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
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">E-mail</label>
            <input type="text" id="email" className={styles.input} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Senha</label>
            <div className={styles.passwordWrapper}>
              <input type="password" id="password" className={styles.input} />
              {/* Placeholder para o ícone de olho. 
                  Para funcionalidade, você usaria react-icons e useState 
              */}
              <span className={styles.eyeIcon}>👁️</span>
            </div>
          </div>

          <Link href="/register" className={styles.forgotPassword}>
            Não tem um usuário? Registre-se
          </Link>

          <a href="#" className={styles.forgotPassword}>
            Esqueceu a senha?
          </a>

          <button type="submit" className={styles.loginButton}>
            LOGIN
          </button>
        </form>

        <p className={styles.footerText}>2025. Álisson, Eliseu e Ramon</p>
      </div>
    </div>
  );
}

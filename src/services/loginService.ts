import bcrypt from "bcryptjs";
import { pool } from "../database";
import jwt from "jsonwebtoken";
// Importar o tipo RowDataPacket do 'mysql2/promise'
import { RowDataPacket } from "mysql2/promise";

// **Correção:** Importamos a chave secreta do ambiente.
// É essencial que 'dotenv' já tenha sido carregado em algum lugar antes.
const JWT_SECRET = process.env.JWT_SECRET;

interface Usuario {
  id_usuario: number;
  email: string;
  senha: string;
}

// Criar uma interface que estenda RowDataPacket para tipar o resultado do banco
interface UsuarioRow extends RowDataPacket, Usuario {}

export class LoginService {
  public async login(email: string, password: string): Promise<string> {
    if (!JWT_SECRET) {
      console.error("JWT_SECRET não está definida nas variáveis de ambiente!");
      throw new Error("Erro de configuração do servidor.");
    }

    let rows: UsuarioRow[] = [];
    try {
      [rows] = await pool.execute<UsuarioRow[]>(
        "SELECT id_usuario, email, senha FROM usuarios WHERE email = ?",
        [email]
      );
    } catch (dbError) {
      console.error("Erro ao procurar usuário:", dbError);
      throw new Error("Erro de servidor ao tentar logar.");
    }

    if (rows.length === 0) {
      throw new Error("E-mail ou senha incorretos.");
    }

    const usuario: Usuario = rows[0]!;
    const hashedPasswordFromDB = usuario.senha;

    const isMatch = await bcrypt.compare(password, hashedPasswordFromDB);

    if (!isMatch) {
      throw new Error("E-mail ou senha incorretos.");
    }

    // 1. GERAÇÃO DO JWT
    const token = jwt.sign(
      { userId: usuario.id_usuario, email: usuario.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return token;
  }
}

export const loginService = new LoginService();

import mysql from "mysql2/promise";
import { pool } from "../database";

// (Opcional, mas boa prática) Definir a interface do dado
export interface IUserRegister {
  id: number;
  nome_usuario: string;
  email: string;
  senha_hash: string;
}

export class UserRegisterModel {
  /**
   * Encontra um usuário pelo nome.
   * Retorna o usuário ou null se não encontrar.
   */
  public async findByName(username: string): Promise<IUserRegister | null> {
    const [rows] = await pool.query<mysql.RowDataPacket[]>(
      "SELECT * FROM usuarios WHERE nome_usuario = ?",
      [username]
    );

    if (rows.length === 0) {
      return null;
    }
    // Retorna o primeiro usuário encontrado
    return rows[0] as IUserRegister;
  }

  /**
   * Cria um novo usuário no banco de dados.
   * O hashing é feito pelo service.
   */
  public async create(
    username: string,
    email: string,
    hashedPassword: string
  ): Promise<void> {
    try {
      await pool.execute(
        "INSERT INTO usuarios (nome_usuario, email, senha) VALUES (?, ?, ?)",
        [username, email, hashedPassword]
      );
    } catch (dbError) {
      console.error("Erro ao inserir no DB:", dbError);
      throw new Error("Erro de banco de dados ao criar usuário.");
    }
  }
}

// Exportamos uma instância única (Singleton)
export const userRegisterModel = new UserRegisterModel();
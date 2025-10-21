import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

import { pool } from "../database";

export class UserService {
  // O Service recebe o pool (injeção de dependência) ou importa-o
  public async register(
    username: string,
    email: string,
    password: string
  ): Promise<void> {
    // 1. Lógica de Negócio: Verificar se o utilizador existe
    const [rows] = await pool.query<mysql.RowDataPacket[]>(
      "SELECT * FROM usuarios WHERE nome_usuario = ?",
      [username]
    );

    if (rows.length > 0) {
      // Lança um erro específico que o Controller pode entender
      throw new Error("Utilizador já existe.");
    }

    // 2. Lógica de Negócio: Hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Lógica de Negócio: Inserção
    try {
      await pool.execute(
        "INSERT INTO usuarios (nome_usuario, email, senha) VALUES (?, ?, ?)",
        [username, email, hashedPassword]
      );
    } catch (dbError) {
      // Lança um erro mais genérico se a inserção falhar
      console.error("Erro ao inserir no DB:", dbError);
      throw new Error("Não foi possível registar o utilizador.");
    }
  }
}
// Exportamos uma instância única (Singleton) do serviço
export const userService = new UserService();

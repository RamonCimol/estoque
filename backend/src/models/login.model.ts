import { pool } from "../database";
import { RowDataPacket } from "mysql2/promise";

// --- Interfaces ---
// É bom ter as interfaces junto ao modelo que as representa
export interface Usuario {
  id_usuario: number;
  email: string;
  senha_hash: string;
}

// Interface para o resultado do DB
export interface UsuarioRow extends RowDataPacket, Usuario {}

// --- Repositório ---
export class UsuarioModel {
  /**
   * Busca um usuário pelo seu e-mail.
   * Retorna o usuário se encontrado, ou null se não encontrado.
   */
  public async findByEmail(email: string): Promise<UsuarioRow | null> {
    try {
      const [rows] = await pool.execute<UsuarioRow[]>(
        "SELECT id_usuario, email, senha_hash FROM usuarios WHERE email = ?",
        [email]
      );
      if (rows.length === 0) {
        return null;
      }

      // Retorna o primeiro (e único) usuário encontrado
      return rows[0]!;
    } catch (dbError) {
      console.error("Erro no repositório ao buscar usuário:", dbError);
      throw new Error("Erro ao acessar o banco de dados.");
    }
  }
}

export const usuarioModel = new UsuarioModel();

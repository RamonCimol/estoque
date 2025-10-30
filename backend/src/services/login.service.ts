import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// Importamos o repositório e os tipos
import { usuarioModel } from "../models/login.model";

const JWT_SECRET = process.env.JWT_SECRET;

export class LoginService {
  public async login(email: string, password: string): Promise<string> {
    if (!JWT_SECRET) {
      console.error("JWT_SECRET não está definida nas variáveis de ambiente!");
      throw new Error("Erro de configuração do servidor.");
    }

    // 1. Delegamos a busca ao repositório
    const usuario = await usuarioModel.findByEmail(email);

    // 2. A lógica de negócio FICA NO SERVICE
    // Se o repositório retornou null, o *serviço de login*
    // entende que o e-mail ou a senha estão errados.
    if (!usuario) {
      throw new Error("E-mail ou senha incorretos.");
    }

    // 3. A lógica de negócio de comparação FICA NO SERVICE
    const isMatch = await bcrypt.compare(password, usuario.senha_hash);

    if (!isMatch) {
      throw new Error("E-mail ou senha incorretos.");
    }

    // 4. A lógica de negócio de geração de token FICA NO SERVICE
    const token = jwt.sign(
      { userId: usuario.id_usuario, email: usuario.email },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    return token;
  }
}

export const loginService = new LoginService();

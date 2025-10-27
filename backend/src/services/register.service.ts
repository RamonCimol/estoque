import bcrypt from "bcryptjs";
// Importamos o MODEL, não o 'pool'
import { userRegisterModel } from "../models/register.model";

export class UserService {
  public async register(
    username: string,
    email: string,
    password: string
  ): Promise<void> {
    // 1. Lógica de Negócio: Verificar se o utilizador existe
    //    O Service chama o Model para fazer a verificação.
    const existingUser = await userRegisterModel.findByName(username);

    if (existingUser) {
      // Esta é uma regra de negócio
      throw new Error("Utilizador já existe.");
    }

    // 2. Lógica de Negócio: Hashing da senha
    //    Isso é uma regra de negócio, fica no Service.
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Lógica de Negócio: Pedir ao Model para criar o usuário
    //    O Service passa os dados prontos (com senha hasheada) para o Model.
    await userRegisterModel.create(username, email, hashedPassword);
    
    // O try/catch do Model já vai lançar um erro se a inserção falhar,
    // que o Controller vai pegar.
  }
}

// Exportamos uma instância única (Singleton) do serviço
export const userService = new UserService();
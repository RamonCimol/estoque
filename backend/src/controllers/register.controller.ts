import { Request, Response } from "express";
//importando o service, o resto é responsabilidade do controller e abstração em camadas
import { userService, UserExistsError} from "../services/register.service";

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  // 1. Validação de entrada (Controller)
  if (!username || !email || !password) {
    return res
      .status(400).json({ message: 'Todos os campos devem ser preenchidos!' });;
  }

  try {
    // 2. Delega a lógica para o service
    await userService.register(username, email, password);

    // 3. Formata a Resposta de Sucesso (Controller)
    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    // 4. Trata erros no controller, mas vindos do service
    console.error("Erro no registo:", error);

    if (error instanceof UserExistsError) {
      return res.status(400).json({ message: error.message }); // Aqui também é enviado um obejto JSON
    }

    res.status(500).json({ message: "Erro interno no servidor." });
  }
};

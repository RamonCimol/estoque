import { Request, Response } from "express";
// Importamos APENAS o serviço
import { userService } from "../services/registerService";

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  // 1. Validação de entrada (Controller)
  if (!username || !email || !password) {
    return res
      .status(400)
      .send("Nome de utilizador, e-mail e senha são obrigatórios.");
  }

  try {
    // 2. Delega a lógica para o Service (Controller)
    await userService.register(username, email, password);

    // 3. Formata a Resposta de Sucesso (Controller)
    res.status(201).send("Utilizador registado com sucesso!");
  } catch (error) {
    // 4. Trata erros vindos do Service (Controller)
    console.error("Erro no registo:", error);

    if (error instanceof Error && error.message === "Utilizador já existe.") {
      return res.status(400).send(error.message);
    }

    res.status(500).send("Erro no servidor.");
  }
};

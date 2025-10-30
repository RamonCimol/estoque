import { Request, Response } from "express";
// 1. Renomeamos o import para "user.service" (para consistência)
import { userService, UserExistsError } from "../services/register.service";

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Todos os campos devem ser preenchidos!" });
  }

  try {
    // Captura do 'newUserId' que o service retorna
    const newUserId = await userService.register(username, email, password);

    // Retornado o ID do usuário na resposta.
    res.status(201).json({
      message: "Usuário registrado com sucesso!",
      userId: newUserId, // <-- Adicionado
    });
  } catch (error: any) {
    // Tipar como 'any' para checar a instância

    if (error instanceof UserExistsError) {
      //: Usa '409 Conflict'
      return res.status(409).json({ message: error.message });
    }

    // Erro genérico
    console.error("Erro no registo (Inesperado):", error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
};

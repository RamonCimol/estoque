import { Request, Response } from "express";
import { loginService } from "../services/login.service";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: "Preencha o e-mail e a senha." });
  }

  try {
    // 2. Delega a lógica para o Service e CAPTURA O TOKEN retornado
    const token = await loginService.login(email, password); // <--- Captura o token

    // 3. Formata a Resposta de Sucesso (Controller)
    // Usamos 200 OK. Retornamos o token no corpo da resposta.
    res.status(200).json({
      message: "Login realizado com sucesso!",
      token: token, // <--- Retornamos o JWT
    });
  } catch (error) {
    const errorMessage = (error as Error).message;

    if (errorMessage === "E-mail ou senha incorretos.") {
      // Status 401: Não Autorizado (Falha na autenticação)
      return res.status(401).json({ error: errorMessage });
    }

    console.error("Erro inesperado no login:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

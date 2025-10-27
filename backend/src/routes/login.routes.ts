import { Router } from "express";
// Importa ambas as funções do controller
import { loginUser } from "../controllers/login.controller";

const router = Router();

// Rota de Login
router.post("/login", loginUser);

export default router;

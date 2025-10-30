import { Router } from "express";
import registerRoutes from "./register.routes";
import loginRoutes from "./login.routes";

const authRouter = Router();

// O 'authRouter' usa os outros roteadores
// Como os caminhos neles já são "/register" e "/login",
// não precisamos de prefixo aqui.
authRouter.use(registerRoutes);
authRouter.use(loginRoutes);

export default authRouter;

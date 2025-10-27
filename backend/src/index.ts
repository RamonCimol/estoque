import "dotenv/config";
import express from "express";
import registerRoutes from "./routes/register.routes"; // Importa as rotas de autenticação
import loginRoutes from "./routes/login.routes"; // Importa as rotas de autenticação

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para processar requisições JSON
app.use(express.json());

// Usa as rotas de autenticação, prefixando-as com '/api/auth'
app.use("/api/auth", registerRoutes);
app.use("/api/auth", loginRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

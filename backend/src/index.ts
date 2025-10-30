import "dotenv/config";
import express from "express";
import authRoutes from "./routes/auth.routes";

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware para processar requisições JSON
app.use(express.json());

app.use((req, res, next) => {
  console.log(`-----------------------------------`);
  console.log(`[${new Date().toISOString()}] Nova Requisição:`);
  console.log(`Método: ${req.method}`);
  console.log(`URL: ${req.url}`);
  // console.log("Body:", req.body); // Descomente se precisar ver o body
  next(); // <-- IMPORTANTE: Continua para a próxima rota
});

// Usa as rotas de autenticação, prefixando-as com '/api/auth'
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

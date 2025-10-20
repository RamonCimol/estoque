import 'dotenv/config';
import express, { Request, Response } from 'express';
import { pool } from './database'; // Importe o pool de conexões com o MySQL
import authRoutes from './routes/registerRoutes'; // Importa as rotas de autenticação


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para processar requisições JSON
app.use(express.json());

// Usa as rotas de autenticação, prefixando-as com '/api/auth'
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
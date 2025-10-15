import express, { Request, Response } from 'express';
import path from 'path';
import authRoutes from './routes/authRoutes'; // Importa as rotas de autenticação

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para processar requisições JSON
app.use(express.json());

// Servir os ficheiros estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, '..', 'public')));

// Usa as rotas de autenticação, prefixando-as com '/api/auth'
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
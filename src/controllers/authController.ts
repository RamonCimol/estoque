import { Request, Response } from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

// Configuração da conexão com o banco de dados MySQL
// **ATENÇÃO: Altera as credenciais para as tuas**
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'gerenciador_de_estoque'
};

export const registerUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Nome de utilizador e senha são obrigatórios.');
    }

    let connection: mysql.Connection | null = null;
    try {
        connection = await mysql.createConnection(dbConfig);

        const [rows] = await connection.query<mysql.RowDataPacket[]>('SELECT * FROM users WHERE username = ?', [username]);
        
        if (rows.length > 0) {
            return res.status(400).send('Utilizador já existe.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await connection.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

        res.status(201).send('Utilizador registado com sucesso!');

    } catch (error) {
        console.error('Erro no registo:', error);
        res.status(500).send('Erro no servidor.');
    } finally {
        if (connection) {
            connection.end();
        }
    }
};
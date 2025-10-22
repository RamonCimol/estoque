import mysql from 'mysql2/promise';

// Configuração da conexão com o banco de dados MySQL
const dbConfig = {
    host: process.env.DB_HOST!,       
    user: process.env.DB_USER!,       // ! força o tipo de string | undefined para string
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0        
};

// 1. CRIAÇÃO DO POOL DE CONEXÕES (Inicializado apenas uma vez)
// Isso é crucial para o desempenho em aplicações de alto tráfego.
const pool = mysql.createPool(dbConfig);

export { pool };
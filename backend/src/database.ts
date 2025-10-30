import mysql from "mysql2/promise";

// Se o .env não for lido, o servidor vai parar com um erro.
if (
  !process.env.DB_HOST ||
  !process.env.DB_USER ||
  !process.env.DB_PASSWORD ||
  !process.env.DB_NAME
) {
  console.error(
    "ERRO FATAL: Variáveis de ambiente do banco de dados não estão definidas."
  );
  console.error(
    "Verifique se o arquivo .env existe e se 'dotenv/config' está na primeira linha do index.ts."
  );
  process.exit(1); // Para o servidor
}

// 2. Se o código chegou aqui, o TypeScript sabe que as variáveis SÃO strings.
const dbConfig = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// 3. CRIAÇÃO DO POOL DE CONEXÕES
const pool = mysql.createPool(dbConfig);

export { pool };

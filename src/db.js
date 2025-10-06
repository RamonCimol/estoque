const mysql = require('mysql2/promise');

//Criação de um Pool de Conexões
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  //Requisição espera uma conexão se todas estiverem em uso.
  waitForConnections: true,
  //Número máximo de conexões no pool.
  connectionLimit: 10,
  //Número máximo de requisições em espera.
  queueLimit: 5
});

//Função assíncrona para Testar a Conexão
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Conexão com o banco de dados MySQL estabelecida com sucesso!');
    connection.release();
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error.message);
    process.exit(1);
  }
}

testConnection();

//Exporta o Pool de Conexões
module.exports = pool;
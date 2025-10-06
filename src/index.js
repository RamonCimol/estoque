const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json'); // sem 'assert'
const pool = require('./db');

dotenv.config();

const app_estoque = express();
const PORT = process.env.PORT || 3000;

app_estoque.use(express.json());

// Rota de teste
app_estoque.get('/', async (req, res) => {
  try {
    // Tenta executar uma consulta de teste no banco de dados
    const [rows] = await pool.query('SELECT "Conexão bem-sucedida!" AS message');
    res.send(rows[0].message);
  } catch (error) {
    console.error('Erro na consulta de teste:', error);
    res.status(500).send('Erro na conexão com o banco de dados.');
  }
});

// Rota do Swagger
app_estoque.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app_estoque.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

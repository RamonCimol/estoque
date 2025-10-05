const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json'); // sem 'assert'

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Rota de teste
app.get('/api', (req, res) => {
  res.json({ message: 'API de Gestão de Controle de Estoque rodando!' });
});

// Rota do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

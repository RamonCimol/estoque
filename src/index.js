const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes');
const swaggerConfig = require('./docs/swagger'); // sem 'assert'

// Importando rotas
const loginRoutes = require('./routes/loginRoutes');
const descktopRoutes = require('./routes/descktopRoutes');
const graficoRoutes = require('./routes/graficoRoutes');
const estoqueRoutes = require('./routes/estoqueRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const admRoutes = require('./routes/admRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON"
app.use(express.json());

// Rotas principais
app.use('/api', routes);
app.use('/api/login', loginRoutes);
app.use('/api/descktop', descktopRoutes);
app.use('/api/grafico', graficoRoutes);
app.use('/api/estoque', estoqueRoutes);
app.use('/api/pedido', pedidoRoutes);
app.use('/api/adm', admRoutes);

// Swagger
swaggerConfig(app);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

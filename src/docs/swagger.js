// src/docs/swagger.js
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuração básica do Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Controle de Estoque',
      version: '1.0.0',
      description: 'Documentação da API de Gestão de Controle de Estoque',
      contact: {
        name: 'Ramon',
        email: 'ramon-1196371@estudante.rs.gov.br',
        url: 'https://github.com/RamonCimol'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor local de desenvolvimento'
      }
    ]
  },
  apis: ['./src/routes/*.js'] // Caminho para os arquivos de rotas que terão anotações Swagger
};

// Gera a especificação
const swaggerSpec = swaggerJsDoc(options);

// Exporta função que registra o Swagger no Express
module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

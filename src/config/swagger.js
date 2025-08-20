// swagger.js - Configuração do Swagger para documentação da API
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TCC Ecommerce API',
      version: '1.0.0',
      description: 'API para sistema de ecommerce com retaguarda',
      contact: {
        name: 'Victoria Riso',
        email: 'devvicrisosan@gmail.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:5010',
        description: 'Servidor de Desenvolvimento'
      },
      {
        url: 'https://seu-dominio.onrender.com',
        description: 'Servidor de Produção'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: [
    './src/routes/*.js',
    './src/modules/*/*/*.js'
  ]
};

const specs = swaggerJsdoc(options);

module.exports = specs;



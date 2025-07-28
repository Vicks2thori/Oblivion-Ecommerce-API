const dotenv = require("dotenv").config(); // carregar variáveis de ambiente
const express = require("express");
const http = require("http");
const morgan = require("morgan");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const publicRoutes = require('./routes/public');

const PORT = process.env.PORT || 5010;

const app = express();

// Usando morgan para logs do server
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// Importação das rotas públicas e privadas
//const privateRoutes = require('/src/routes/private');

// Middleware para processar JSON (descomente se precisar)
// app.use(express.json());

// Configuração das rotas (no app, não no server)
app.use("/", publicRoutes);
//app.use("/", privateRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    explorer: true,
    swaggerOptions: {
        filter: true,                 
        docExpansion: 'none',         
        defaultModelsExpandDepth: -1, 
        displayRequestDuration: true, 
        persistAuthorization: true   
    },
    customSiteTitle: "API Documentation",
    customfavIcon: "/COLOQUESEUFAVICONAQUIVICK.ico" //icone personalizado para substituir oque vem definido como default pelo swagger
}));

// Rota catch-all para qualquer outra requisição
app.use((req, res) => {
    return res.send("scrr manoecf jsekhncjks");
});

// Cria o servidor HTTP usando o app
const server = http.createServer(app);

// Iniciando o servidor na porta especificada
server.listen(PORT, () => {
    console.log(`Servidor rodando na url http://localhost:${PORT}`);
    console.log(`Documentação disponível na rota: http://localhost:${PORT}/api-docs`)
});

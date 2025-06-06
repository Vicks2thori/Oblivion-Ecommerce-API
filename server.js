const dotenv = require("dotenv").config(); // carregar variáveis de ambiente
const express = require("express");
const http = require("http");
const morgan = require("morgan");

const PORT = process.env.PORT || 3000;

const app = express();

// Usando morgan para logs do server
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// Importação das rotas públicas e privadas
const publicRoutes = require('./src/routes/public');
//const privateRoutes = require('/src/routes/private');

// Middleware para processar JSON (descomente se precisar)
// app.use(express.json());

// Configuração das rotas (no app, não no server)
app.use("/", publicRoutes);
//app.use("/", privateRoutes);

// Rota catch-all para qualquer outra requisição
app.use((req, res) => {
    return res.send("scrr manoecf jsekhncjks");
});

// Cria o servidor HTTP usando o app
const server = http.createServer(app);

// Iniciando o servidor na porta especificada
server.listen(PORT, () => {
    console.log(`Servidor rodando na url http://localhost:${PORT}`);
});

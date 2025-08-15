//server.js
const dotenv = require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
// const swaggerUi = require('swagger-ui-express');
// const specs = require('./config/swagger');
const { connectDB } = require('./model/database'); // ✅ Importar função
const { initializeSite } = require('./modules/site/siteService'); // ✅ Importar inicialização do Site

const PORT = process.env.PORT || 3000;
const app = express();

// Middlewares
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// Swagger Documentation - Comentado temporariamente
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rotas
const publicRoutes = require('./routes/publicRoutes');
const privateRoutes = require('./routes/privateRoutes');

app.use('/api/public', publicRoutes);
app.use('/api/private', privateRoutes);

app.use((req, res) => {
    return res.json({ 
        message: "Endpoint não encontrado",
        availableRoutes: ["/api/public", "/api/private"]
    });
});

// ✅ FUNÇÃO PARA INICIALIZAR DADOS PADRÃO
async function initializeDefaultData() {
    try {
        // Inicializar Site com configuração padrão
        await initializeSite();
        console.log('🎨 Dados padrão inicializados');
    } catch (error) {
        console.error('❌ Erro ao inicializar dados padrão:', error.message);
    }
}

// ✅ FUNÇÃO PARA INICIAR SERVIDOR
async function startServer() {
    try {
        // 1. Conectar banco PRIMEIRO
        await connectDB();
        
        // 2. Inicializar dados padrão
        await initializeDefaultData();
        
        // 3. Depois iniciar servidor
        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando: http://localhost:${PORT}`);
            console.log(`📱 Público: http://localhost:${PORT}/api/public`);
            console.log(`🔒 Privado: http://localhost:${PORT}/api/private`);
        });
        
    } catch (error) {
        console.error('❌ Erro ao iniciar:', error);
        process.exit(1);
    }
}

// ✅ INICIAR TUDO
startServer();
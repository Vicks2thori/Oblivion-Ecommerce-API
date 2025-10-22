//server.js
const dotenv = require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const { connectDB } = require('./model/database'); // ✅ Importar função
const { initializeSite } = require('./modules/site/siteService'); // ✅ Importar inicialização do Site

const SERVER_PORT = process.env.PORT || 3000;
const app = express();

// Middlewares
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use('/uploads', express.static('src/assets/images/uploads'));

// Swagger removido


// Configuração de CORS flexível para desenvolvimento e produção
const corsOptions = require('./config/cors');
app.use(cors(corsOptions));

// Rotas
const loginRoutes = require('./modules/login/loginRouter');
const publicRoutes = require('./routes/publicRoutes');
const privateRoutes = require('./routes/privateRoutes');
const healthRoutes = require('./routes/healthRoutes');
const imagesRoutes = require('./modules/images/imagesRouter');

app.use('/api/login', loginRoutes)
app.use('/api/public', publicRoutes);
app.use('/api/private', privateRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/uploads', imagesRoutes);

app.use((req, res) => {
    return res.json({ 
        message: "Endpoint não encontrado",
        availableRoutes: ["/api/public", "/api/private", "/api/health", "/api/uploads", "/api/login"]
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
        app.listen(SERVER_PORT, () => {
            console.log(`🚀 Servidor rodando: http://localhost:${SERVER_PORT}`);
            console.log(`📱 Público: http://localhost:${SERVER_PORT}/api/public`);
            console.log(`🔒 Privado: http://localhost:${SERVER_PORT}/api/private`);
        });
        
    } catch (error) {
        console.error('❌ Erro ao iniciar:', error);
        process.exit(1);
    }
}

// ✅ INICIAR TUDO
startServer();
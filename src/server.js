//server.js
const dotenv = require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const { connectDB } = require('./model/database');
const { initializeSite } = require('./modules/site/siteService');
const { configureCloudinary, testCloudinaryConnection } = require('./config/cloudinary');

const SERVER_PORT = process.env.PORT || 3000;
const app = express();

// Middlewares
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use('/uploads', express.static('src/assets/images/uploads'));

// Configuração de CORS flexível para desenvolvimento e produção
const corsOptions = require('./config/cors');
app.use(cors(corsOptions));

// Rotas
const loginRoutes = require('./modules/login/loginRouter');
const publicRoutes = require('./routes/publicRoutes');
const privateRoutes = require('./routes/privateRoutes');
const healthRoutes = require('./routes/healthRoutes');
const imagesRoutes = require('./modules/images/imagesRouter');

app.use('/api/login', loginRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/private', privateRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/uploads', imagesRoutes);
app.use('/api/payment-images', express.static('src/assets/imagesPayments'));

app.use((req, res) => {
    return res.json({ 
        message: "Endpoint não encontrado",
        availableRoutes: ["/api/public", "/api/private", "/api/health", "/api/uploads", "/api/login", "/api/payment-images"]
    });
});

async function initializeDefaultData() {
    try {
        await initializeSite();
        console.log('🎨 Dados padrão inicializados');
    } catch (error) {
        console.error('❌ Erro ao inicializar dados padrão:', error.message);
    }
}

async function initializeExternalServices() {
    try {
        console.log('☁️  Configurando Cloudinary...');
        configureCloudinary();
        
        // Testa conexão (não bloqueia se falhar)
        const isConnected = await testCloudinaryConnection();
        if (!isConnected) {
            console.warn('⚠️  Cloudinary não está acessível, mas o servidor continuará');
        }
    } catch (error) {
        console.error('❌ Erro ao configurar Cloudinary:', error.message);
        throw error; // Bloqueia inicialização se Cloudinary falhar
    }
}

async function startServer() {
    try {
        console.log('🚀 Iniciando servidor...\n');
        
        // 1. Conectar ao banco de dados
        console.log('📊 Conectando ao banco de dados...');
        await connectDB();
        console.log('✅ Banco de dados conectado\n');
        
        // 2. Configurar Cloudinary (CRÍTICO para upload de imagens)
        await initializeExternalServices();
        console.log('✅ Cloudinary configurado\n');
        
        // 3. Inicializar dados padrão
        console.log('🔧 Inicializando dados padrão...');
        await initializeDefaultData();
        console.log('✅ Dados padrão inicializados\n');
        
        // 4. Iniciar servidor HTTP
        app.listen(SERVER_PORT, () => {
            console.log('='.repeat(50));
            console.log(`🚀 Servidor rodando: http://localhost:${SERVER_PORT}`);
            console.log(`📱 Público: http://localhost:${SERVER_PORT}/api/public`);
            console.log(`🔒 Privado: http://localhost:${SERVER_PORT}/api/private`);
            console.log(`🖼️  Upload: http://localhost:${SERVER_PORT}/api/uploads`);
            console.log('='.repeat(50));
        });
        
    } catch (error) {
        console.error('❌ Erro crítico ao iniciar servidor:', error);
        console.error(error.stack);
        process.exit(1);
    }
}

// Tratamento de erros não capturados
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    process.exit(1);
});

// ✅ INICIAR TUDO
startServer();
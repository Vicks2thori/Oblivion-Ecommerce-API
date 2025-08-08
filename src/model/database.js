//database.js
const mongoose = require('mongoose');
require('dotenv').config();

// Configurações do MongoDB
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 20,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

// Função para conectar
async function connectDB() {
  try {
    // Usar MONGODB_URI do .env ou construir a partir de partes
    const mongoURI = process.env.MONGODB_URI;
    
    await mongoose.connect(mongoURI, mongoOptions);
    console.log('✅ Conectado ao MongoDB com sucesso!');
    console.log(`📊 Database: ${mongoose.connection.name}`);
  } catch (error) {
    console.error('❌ Erro ao conectar MongoDB:', error.message);
    process.exit(1);
  }
}

// Event listeners para monitoramento
mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose conectado ao MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Erro na conexão MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('🔌 Mongoose desconectado do MongoDB');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🔚 Conexão MongoDB fechada');
  process.exit(0);
});

module.exports = { connectDB, mongoose };
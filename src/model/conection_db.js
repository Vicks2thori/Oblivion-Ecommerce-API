const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config({ path: './model/db/conectiondb/process.env' }); 

// String de conexão MongoDB
const mongoURI = `mongodb://${process.env.HOST}:${process.env.PORT || 27017}/${process.env.DB}`;

// Configurações otimizadas para MongoDB
const mongoOptions = {
  maxPoolSize: 20, // Equivale ao pool do MySQL
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4 // Força IPv4
};

// Função para conectar
async function connectDB() {
  try {
    await mongoose.connect(mongoURI, mongoOptions);
    console.log('✅ Conectado ao MongoDB com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao conectar MongoDB:', error.message);
    process.exit(1);
  }
}

// Event listeners
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
  console.log('🔚 Conexão MongoDB fechada devido ao encerramento da aplicação');
  process.exit(0);
});

module.exports = { connectDB, mongoose };
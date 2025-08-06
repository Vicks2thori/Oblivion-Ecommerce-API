const mysql = require("mysql2/promise");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: '.\model\db\conectiondb\process.env' }); 

// Conexão MySQL
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
  waitForConnections: true,
});

// Conexão MongoDB
const connectMongoDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/oblivion';
    await mongoose.connect(mongoUri);
    console.log('MongoDB conectado com sucesso');
  } catch (error) {
    console.error('Erro ao conectar com MongoDB:', error);
    process.exit(1);
  }
};

// Inicializar conexão MongoDB
connectMongoDB();

module.exports = {
  pool, // MySQL connection
  mongoose // MongoDB connection
};
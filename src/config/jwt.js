//jwt.js
const jwt = require('jsonwebtoken');

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'jwt_secret_padrao_para_desenvolvimento_2024';
const JWT_ACCESS_EXP = process.env.JWT_ACCESS_EXP || '24h';

const generateAccessToken = (payload) => {
  try {
    return jwt.sign(payload, JWT_ACCESS_SECRET, {
      expiresIn: JWT_ACCESS_EXP
    });
  } catch (error) {
    throw new Error(`Erro ao gerar token: ${error.message}`);
  };
};

const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, JWT_ACCESS_SECRET);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token expirado');
    };
    if (error.name === 'JsonWebTokenError') {
      throw new Error('Token inválido');
    };
    throw new Error(`Erro ao verificar token: ${error.message}`);
  };
};


module.exports = {
  generateAccessToken,
  verifyAccessToken,
  JWT_ACCESS_SECRET,
  JWT_ACCESS_EXP
};
//loginUtils.js
const { generateAccessToken, verifyAccessToken } = require('../../config/jwt');

const createTokenPayload = (user) => {
  return {
    sub: user._id.toString(),
    id: user._id.toString(), // Adicionando campo id para compatibilidade
    role: user.type,
    name: user.name,
    email: user.email,
    enterprise_id: user.enterprise_id
  };
};

const generateToken = (user) => {
  const payload = createTokenPayload(user);
  return generateAccessToken(payload);
};

const verifyToken = (token) => {
  return verifyAccessToken(token);
};


module.exports = {
  createTokenPayload,
  generateToken,
  verifyToken
};
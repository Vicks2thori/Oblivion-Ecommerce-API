//loginUtils.js
const { generateAccessToken, verifyAccessToken } = require('../../config/jwt');

const createTokenPayload = (user) => {
  return {
    sub: user._id.toString(),
    role: user.type,
    name: user.name
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
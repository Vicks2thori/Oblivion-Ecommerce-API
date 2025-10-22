//auth.js
const { verifyToken } = require('../modules/login/loginUtils');
const Session = require('../modules/login/sessionEntity');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Token não fornecido'
      });
    }

    const token = authHeader.split(' ')[1];
    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido ou expirado'
      });
    }

    const session = await Session.findOne({
      token,
      active: true,
      userId: decoded.sub,
      expiresAt: { $gt: new Date() }
    });

    if (!session) {
      return res.status(401).json({
        success: false,
        message: 'Sessão inválida ou expirada'
      });
    }

    req.user = {
      sub: decoded.sub,
      role: decoded.role,
      name: decoded.name
    };

    next();

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Erro ao verificar autenticação'
    });
  }
};

module.exports = auth;
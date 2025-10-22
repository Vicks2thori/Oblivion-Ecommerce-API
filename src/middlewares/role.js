//role.js
const isClient = (req, res, next) => {
  if (!req.user || req.user.role !== 'client') {
    return res.status(403).json({
      success: false,
      message: 'Acesso negado. Apenas clientes podem acessar este recurso'
    });
  }
  
  next();
};

const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Acesso negado. Apenas administradores podem acessar este recurso'
    });
  }
  
  next();
};


module.exports = {
  isClient,
  isAdmin
};
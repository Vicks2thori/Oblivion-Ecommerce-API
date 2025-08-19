/**
 * Middlewares de autenticação e autorização
 */

/**
 * Middleware para verificar se o usuário está autenticado
 */
const requireAuth = (req, res, next) => {
  // Aqui você implementaria sua lógica de autenticação
  // Por exemplo, verificar JWT token, session, etc.
  
  // Exemplo básico (substitua pela sua implementação)
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: '401 - Token de autenticação não fornecido'
    });
  }
  
  // TODO: Implementar verificação do token
  // const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // req.user = decoded;
  
  next();
};

/**
 * Middleware para verificar se o usuário tem permissão de admin
 */
const requireAdmin = (req, res, next) => {
  // Verifica se o usuário está autenticado primeiro
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: '401 - Usuário não autenticado'
    });
  }
  
  // Verifica se é admin
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: '403 - Acesso negado. Apenas administradores.'
    });
  }
  
  next();
};

/**
 * Middleware para verificar se o usuário tem permissão específica
 */
const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: '401 - Usuário não autenticado'
      });
    }
    
    if (!req.user.permissions?.includes(permission)) {
      return res.status(403).json({
        success: false,
        message: `403 - Acesso negado. Permissão '${permission}' necessária.`
      });
    }
    
    next();
  };
};

module.exports = {
  requireAuth,
  requireAdmin,
  requirePermission
};

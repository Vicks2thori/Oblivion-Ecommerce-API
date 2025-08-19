/**
 * Middlewares para tratamento de erros
 */

/**
 * Middleware para capturar erros de validação do Mongoose
 */
const mongooseErrorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(error => error.message);
    
    return res.status(400).json({
      success: false,
      message: '400 - Erro de validação',
      errors
    });
  }
  
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: '400 - ID inválido',
      error: 'Formato de ID inválido'
    });
  }
  
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: '409 - Conflito',
      error: 'Dados duplicados'
    });
  }
  
  next(err);
};

/**
 * Middleware para capturar erros de validação customizados (dos middlewares Mongoose)
 */
const customValidationErrorHandler = (err, req, res, next) => {
  if (err.message && err.message.includes('Movimentação de estoque deve ter')) {
    return res.status(400).json({
      success: false,
      message: '400 - Erro de validação',
      error: err.message
    });
  }
  
  next(err);
};

/**
 * Middleware para capturar erros de Joi
 */
const joiErrorHandler = (err, req, res, next) => {
  if (err.isJoi) {
    return res.status(400).json({
      success: false,
      message: '400 - Dados inválidos',
      errors: err.details.map(d => d.message)
    });
  }
  
  next(err);
};

/**
 * Middleware final para capturar todos os outros erros
 */
const globalErrorHandler = (err, req, res, next) => {
  console.error('Erro não tratado:', err);
  
  res.status(500).json({
    success: false,
    message: '500 - Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Erro interno'
  });
};

/**
 * Middleware para capturar rotas não encontradas
 */
const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: '404 - Rota não encontrada'
  });
};

module.exports = {
  mongooseErrorHandler,
  customValidationErrorHandler,
  joiErrorHandler,
  globalErrorHandler,
  notFoundHandler
};

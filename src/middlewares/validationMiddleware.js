/**
 * Middleware Express para validação de DTOs
 */

/**
 * Valida o corpo da requisição usando um schema Joi
 * @param {Object} schema - Schema Joi para validação
 * @returns {Function} - Middleware Express
 */
const validateBody = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: '400 - Dados inválidos',
        errors: error.details.map(d => d.message)
      });
    }
    
    // Substitui req.body pelos dados validados
    req.body = value;
    next();
  };
};

/**
 * Valida os parâmetros da URL usando um schema Joi
 * @param {Object} schema - Schema Joi para validação
 * @returns {Function} - Middleware Express
 */
const validateParams = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.params);
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: '400 - Parâmetros inválidos',
        errors: error.details.map(d => d.message)
      });
    }
    
    // Substitui req.params pelos dados validados
    req.params = value;
    next();
  };
};

/**
 * Valida a query string usando um schema Joi
 * @param {Object} schema - Schema Joi para validação
 * @returns {Function} - Middleware Express
 */
const validateQuery = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.query);
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: '400 - Query inválida',
        errors: error.details.map(d => d.message)
      });
    }
    
    // Substitui req.query pelos dados validados
    req.query = value;
    next();
  };
};

module.exports = {
  validateBody,
  validateParams,
  validateQuery
};

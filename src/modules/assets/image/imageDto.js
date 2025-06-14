//Opcional
//Se for manipulada diretamente (upload de imagens fora do produto)
const Joi = require('joi');

const createAdminSchema = Joi.object({
  names: Joi.string().min(5).max(80).required(),
  emails: Joi.string().email().min(6).max(50).required(),
  passwords: Joi.string().min(8).max(255).required(),
  statusAdmin: Joi.number().valid(0, 1).default(1).required()
});

module.exports = { createAdminSchema };
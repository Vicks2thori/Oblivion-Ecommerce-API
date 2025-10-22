//loginDto.js
const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .min(6)
    .max(50)
    .required()
    .messages({
      'string.email': 'Email deve ser um email válido',
      'string.min': 'Email deve ter no mínimo 6 caracteres',
      'string.max': 'Email deve ter no máximo 50 caracteres',
      'string.empty': 'Email é obrigatório',
      'any.required': 'Email é obrigatório'
    }),

  password: Joi.string()
    .min(8)
    .max(255)
    .required()
    .messages({
      'string.min': 'Senha deve ter no mínimo 8 caracteres',
      'string.max': 'Senha deve ter no máximo 255 caracteres',
      'string.empty': 'Senha é obrigatória',
      'any.required': 'Senha é obrigatória'
    })
});

module.exports = {
  loginSchema
};
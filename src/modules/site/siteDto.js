//siteDto.js
const Joi = require('joi');

const createSiteSchema = Joi.object({
  primaryColor: Joi.string()
  .length(6)
  .hex()
  .required()
  .messages({
    'string.base': 'Cor primária deve ser uma string',
    'string.empty': 'Cor primária é obrigatória',
    'string.length': 'Cor primária deve ter no exatamente 6 caracteres',
    'string.hex': 'Cor primária deve ser um hex válido',
    'any.required': 'Cor primária é obrigatória'
  }),

  secondColor: Joi.string()
  .length(6)
  .hex()
  .required()
  .messages({
    'string.base': 'Cor secundária deve ser uma string',
    'string.empty': 'Cor secundária é obrigatória',
    'string.length': 'Cor secundária deve ter no exatamente 6 caracteres',
    'string.hex': 'Cor secundária deve ser um hex válido',
    'any.required': 'Cor secundárie é obrigatória'
  }),

  textColor: Joi.string()
  .length(6)
  .hex()
  .required()
  .messages({
    'string.base': 'Cor de texto deve ser uma string',
    'string.empty': 'Cor de texto é obrigatória',
    'string.length': 'Cor de texto deve ter no exatamente 6 caracteres',
    'string.hex': 'Cor de texto deve ser um hex válido'
  })
}).min(3).max(3);

const updateSiteSchema = Joi.object({
  primaryColor: Joi.string()
  .length(6)
  .hex()
  .optional()
  .messages({
    'string.base': 'Cor primária deve ser uma string',
    'string.length': 'Cor primária deve ter no exatamente 6 caracteres',
    'string.hex': 'Cor primária deve ser um hex válido'
  }),

  secondColor: Joi.string()
  .length(6)
  .hex()
  .optional()
  .messages({
    'string.base': 'Cor secundária deve ser uma string',
    'string.length': 'Cor secundária deve ter no exatamente 6 caracteres',
    'string.hex': 'Cor secundária deve ser um hex válido'
  }),

  textColor: Joi.string()
  .length(6)
  .hex()
  .optional()
  .messages({
    'string.base': 'Cor de texto deve ser uma string',
    'string.length': 'Cor de texto deve ter no exatamente 6 caracteres',
    'string.hex': 'Cor de texto deve ser um hex válido'
  })
}).min(1);


module.exports = {
  createSiteSchema,
  updateSiteSchema
};
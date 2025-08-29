//categoryDto.js
const Joi = require('joi');

const createCategorySchema = Joi.object({
  name: Joi.string()
  .trim()
  .min(3)
  .max(50)
  .required()
  .messages({
    'string.base': 'Nome deve ser uma string',
    'string.empty': 'Nome é obrigatório',
    'string.min': 'Nome deve ter no mínimo 3 caracteres',
    'string.max': 'Nome deve ter no máximo 50 caracteres'
  }),

  status: Joi.boolean()
  .default(true)
  .optional()
  .messages({
    'boolean.base': 'Status deve ser um booleano',
  }),
}).min(1).max(2);

const updateCategorySchema = Joi.object({
  name: Joi.string()
  .trim()
  .min(3)
  .max(50)
  .optional()
  .messages({
    'string.base': 'Nome deve ser uma string',
    'string.min': 'Nome deve ter no mínimo 3 caracteres',
    'string.max': 'Nome deve ter no máximo 50 caracteres'
  }),

  productsList: Joi.array().items(
    Joi.object({
      productId: Joi.string()
      .length(24)
      .hex()
      .required()
      .messages({
        'string.empty': 'Produto é obrigatório',
        'string.base': 'Produto deve ser uma string',
        'string.length': 'Produto deve ter exatamente 24 caracteres',
        'string.hex': 'Produto deve ser um hexadecimal válido'
      })
    })
  ).optional(),

  status: Joi.boolean()
  .optional()
  .messages({
    'boolean.base': 'Status deve ser um booleano'
  }),

  categoryDeleted: Joi.boolean().optional()
}).min(1);


module.exports = { 
  createCategorySchema, 
  updateCategorySchema 
};
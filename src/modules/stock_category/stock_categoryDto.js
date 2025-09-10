//stock_categoryDto.js
const Joi = require('joi');

const createStockCategorySchema = Joi.object({
  name: Joi.string()
  .min(3)
  .max(50)
  .required()
  .messages({
    'string.base': 'Nome deve ser uma string',
    'string.empty': 'Nome é obrigatório',
    'string.min': 'Nome deve ter no mínimo 3 caracteres',
    'string.max': 'Nome deve ter no máximo 50 caracteres',
    'any.required': 'Nome é obrigatório'
  }),

  status: Joi.boolean()
  .default(true)
  .optional()
  .messages({
    'boolean.base': 'Status deve ser um boolean'
  })
}).min(1).max(2);

const updateStockCategorySchema = Joi.object({
  name: Joi.string()
  .min(3)
  .max(50)
  .optional()
  .messages({
    'string.base': 'Nome deve ser uma string',
    'string.min': 'Nome deve ter no mínimo 3 caracteres',
    'string.max': 'Nome deve ter no máximo 50 caracteres'
  }),

  status: Joi.boolean()
  .optional()
  .messages({
    'boolean.base': 'Status deve ser um boolean'
  }),

  deleted: Joi.boolean().optional()
}).min(1).max(3);

module.exports = { 
  createStockCategorySchema, 
  updateStockCategorySchema 
};
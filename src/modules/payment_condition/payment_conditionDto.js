//payment_conditionDto.js
const Joi = require('joi');

const createPaymentConditionSchema = Joi.object({
  name: Joi.string()
  .min(2)
  .max(50)
  .required()
  .messages({
    'string.empty': 'Nome é obrigatório',
    'string.base': 'Nome deve ser uma string',
    'string.min': 'Nome deve ter no minimo 2 caracteres',
    'string.max': 'Nome deve ter no maximo 50 caracteres',
    'any.required': 'Nome é obrigatório'
  }),

  status: Joi.boolean()
  .default(true)
  .messages({
    'boolean.base': 'Status deve ser um booleano'
  })
}).min(1).max(2);

const updatePaymentConditionSchema = Joi.object({
  name: Joi.string()
  .min(2)
  .max(50)
  .optional()
  .messages({
    'string.base': 'Nome deve ser uma string',
    'string.min': 'Nome deve ter no minimo 2 caracteres',
    'string.max': 'Nome deve ter no maximo 50 caracteres'
  }),

  status: Joi.boolean()
  .optional()
  .messages({
    'boolean.base': 'Status deve ser um booleano'
  }),

  deleted: Joi.boolean()
  .optional()
}).min(1).max(3);

module.exports = { 
  createPaymentConditionSchema,
  updatePaymentConditionSchema
};
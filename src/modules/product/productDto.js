//productDto.js
const Joi = require('joi');

const createProductSchema = Joi.object({
  name: Joi.string()
  .min(1)
  .max(100)
  .required()
  .messages({
    'string.empty': 'Nome é obrigatório',
    'string.min': 'Nome deve ter no mínimo 1 caractere',
    'string.max': 'Nome deve ter no máximo 100 caracteres'
  }),

  imageUrl: Joi.string()
  .uri({ scheme: ['http', 'https'] })  // Valida se é URL válida
  .max(255)
  .optional()
  .messages({
    'string.uri': 'Deve ser uma URL válida',
    'string.max': 'URL deve ter no máximo 255 caracteres'
  }),

  description: Joi.string()
  .max(65535)
  .optional()
  .messages({
    'string.max': 'Descrição deve ter no máximo 65535 caracteres'
  }),

  price: Joi.number()
  .precision(2)
  .min(0.01)
  .max(999999.99)
  .required()
  .messages({
    'number.min': 'Preço deve ser maior que 0.01',
    'number.max': 'Preço deve ser menor que 999999.99',
    'number.precision': 'Preço deve ter no máximo 2 casas decimais',
    'any.required': 'Preço é obrigatório'
  }),

  code: Joi.number()
  .min(1)
  .max(9999999999999999999)
  .required()
  .messages({
    'number.min': 'Código deve ser maior que 1',
    'number.max': 'Código deve ser menor que 9999999999999999999',
    'any.required': 'Código é obrigatório'
  }),

  categoryId: Joi.string()
  .length(24)
  .hex()
  .required()
  .messages({
    'string.length': 'Categoria deve ter exatamente 24 caracteres',
    'string.hex': 'Categoria deve ser um hexadecimal válido',
    'any.required': 'Categoria é obrigatória'
  }),

  quantity: Joi.number()
  .min(1)
  .max(99999)
  .required()
  .messages({
    'number.min': 'Quantidade deve ser maior que 1',
    'number.max': 'Quantidade deve ser menor que 99999',
    'any.required': 'Quantidade é obrigatória'
  }),

  status: Joi.boolean()
  .default(true)
  .optional()
  .messages({
    'any.required': 'Status é obrigatório'
  }),
}).min(5).max(8);

const updateProductSchema = Joi.object({
  name: Joi.string()
  .min(1)
  .max(100)
  .optional()
  .messages({
    'string.min': 'Nome deve ter no mínimo 1 caractere',
    'string.max': 'Nome deve ter no máximo 100 caracteres'
  }),

  imageUrl: Joi.string()
  .uri({ scheme: ['http', 'https'] })
  .max(255)
  .optional()
  .messages({
    'string.uri': 'Deve ser uma URL válida',
    'string.max': 'URL deve ter no máximo 255 caracteres'
  }),

  description: Joi.string()
  .max(65535)
  .optional()
  .messages({
    'string.max': 'Descrição deve ter no máximo 65535 caracteres'
  }),

  code: Joi.number()
  .min(1)
  .max(9999999999999999999)
  .optional()
  .messages({
    'number.min': 'Código deve ser maior que 1',
    'number.max': 'Código deve ser menor que 9999999999999999999'
  }),

  categoryId: Joi.string()
  .length(24)
  .hex()
  .optional()
  .messages({
    'string.length': 'Categoria deve ter exatamente 24 caracteres',
    'string.hex': 'Categoria deve ser um hexadecimal válido'
  }),

  quantity: Joi.number()
  .min(1)
  .max(99999)
  .optional()
  .messages({
    'number.min': 'Quantidade deve ser maior que 1',
    'number.max': 'Quantidade deve ser menor que 99999'
  }),

  status: Joi.boolean().optional(),

  deleted: Joi.boolean().optional(),
}).min(1).max(9);

module.exports = { 
  createProductSchema, 
  updateProductSchema 
};
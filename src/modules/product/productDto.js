//productDto.js
const Joi = require('joi');

const createProductSchema = Joi.object({
  name: Joi.string()
  .min(1)
  .max(100)
  .required()
  .messages({
    'string.base': 'Nome deve ser uma string',
    'string.min': 'Nome deve ter no mínimo 1 caractere',
    'string.max': 'Nome deve ter no máximo 100 caracteres',
    'any.required': 'Nome é obrigatório',
    'string.empty': 'Nome é obrigatório'
  }),

  imageUrl: Joi.string()
  .uri({ scheme: ['http', 'https'] })
  .max(255)
  .optional()
  .messages({
    'string.base': 'URL deve ser uma string',
    'string.uri': 'Deve ser uma URL válida',
    'string.max': 'URL deve ter no máximo 255 caracteres'
  }),

  description: Joi.string()
  .max(65535)
  .optional()
  .messages({
    'string.base': 'Descrição deve ser uma string',
    'string.max': 'Descrição deve ter no máximo 65535 caracteres'
  }),

  price: Joi.number()
  .precision(2)
  .min(0.01)
  .max(999999.99)
  .required()
  .messages({
    'number.base': 'Preço deve ser um número',
    'number.min': 'Preço deve ser maior que 0.01',
    'number.max': 'Preço deve ser menor que 999999.99',
    'number.precision': 'Preço deve ter no máximo 2 casas decimais',
    'any.required': 'Preço é obrigatório',
    'number.empty': 'Preço é obrigatório',
  }),

  code: Joi.number()
  .min(1)
  .max(9999999999999999999)
  .required()
  .messages({
    'number.base': 'Código deve ser um número',
    'number.min': 'Código deve ser maior que 1',
    'number.max': 'Código deve ser menor que 9999999999999999999',
    'any.required': 'Código é obrigatório',
    'number.empty': 'Código é obrigatório'
  }),

  categoryId: Joi.string()
  .length(24)
  .hex()
  .required()
  .messages({
    'string.base': 'Categoria deve ser uma string',
    'string.length': 'Categoria deve ter exatamente 24 caracteres',
    'string.hex': 'Categoria deve ser um hexadecimal válido',
    'any.required': 'Categoria é obrigatória',
    'string.empty': 'Categoria é obrigatória'
  }),

  quantity: Joi.number()
  .max(99999)
  .default(0)
  .messages({
    'number.base': 'Quantidade deve ser um número',
    'number.max': 'Quantidade deve ser menor que 99999'
  }),

  status: Joi.boolean()
  .default(true)
  .optional()
  .messages({
    'boolean.base': 'Status deve ser um booleano'
  }),
}).min(5).max(8);

const updateProductSchema = Joi.object({
  name: Joi.string()
  .min(1)
  .max(100)
  .optional()
  .messages({
    'string.base': 'Nome deve ser uma string',
    'string.min': 'Nome deve ter no mínimo 1 caractere',
    'string.max': 'Nome deve ter no máximo 100 caracteres'
  }),

  imageUrl: Joi.string()
  .uri({ scheme: ['http', 'https'] })
  .max(255)
  .optional()
  .messages({
    'string.base': 'URL deve ser uma string',
    'string.uri': 'Deve ser uma URL válida',
    'string.max': 'URL deve ter no máximo 255 caracteres'
  }),

  description: Joi.string()
  .max(65535)
  .optional()
  .messages({
    'string.base': 'Descrição deve ser uma string',
    'string.max': 'Descrição deve ter no máximo 65535 caracteres'
  }),

  code: Joi.number()
  .min(1)
  .max(9999999999999999999)
  .optional()
  .messages({
    'number.base': 'Código deve ser um número',
    'number.min': 'Código deve ser maior que 1',
    'number.max': 'Código deve ser menor que 9999999999999999999'
  }),

  categoryId: Joi.string()
  .length(24)
  .hex()
  .optional()
  .messages({
    'string.base': 'Categoria deve ser uma string',
    'string.length': 'Categoria deve ter exatamente 24 caracteres',
    'string.hex': 'Categoria deve ser um hexadecimal válido'
  }),

  quantity: Joi.number()
  .min(1)
  .max(99999)
  .optional()
  .messages({
    'number.base': 'Quantidade deve ser um número',
    'number.min': 'Quantidade deve ser maior que 1',
    'number.max': 'Quantidade deve ser menor que 99999'
  }),

  status: Joi.boolean()
  .optional()
  .messages({
    'boolean.base': 'Status deve ser um booleano'
  }),

  deleted: Joi.boolean().optional(),
}).min(1).max(8);


module.exports = { 
  createProductSchema, 
  updateProductSchema 
};
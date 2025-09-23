//paymentDto.js
const Joi = require('joi');

const createPaymentSchema = Joi.object({
  name: Joi.string()
  .min(3)
  .max(50)
  .required()
  .messages({
    'string.empty': 'Nome é obrigatório',
    'string.base': 'Nome deve ser uma string',
    'string.min': 'Nome deve ter no minimo 3 caracteres',
    'string.max': 'Nome deve ter no maximo 50 caracteres',
    'any.required': 'Nome é obrigatório'
  }),

  imageType: Joi.string()
  .valid('Pix', 'Others', 'Money', 'Card', 'Voucher')
  .required()
  .messages({
    'string.empty': 'Tipo de imagem é obrigatório',
    'string.base': 'Tipo de imagem deve ser uma string',
    'any.only': 'Tipo de imagem deve ser um dos valores: Pix, Others, Money, Card, Voucher',
    'any.required': 'Tipo de imagem é obrigatório'
  }),

  paymentConditions: Joi.array().items(
    Joi.object({
      conditionsId: Joi.string()
      .length(24)
      .hex()
      .required()
      .messages({
        'string.empty': 'ConditionsId é obrigatório',
        'string.base': 'ConditionsId deve ser uma string',
        'string.length': 'ConditionsId deve ter no exatamente 24 caracteres',
        'string.hex': 'ConditionsId deve ser um hexadecimal valido',
        'any.required': 'ConditionsId é obrigatório'
      }),
    })
  ).required().min(1),

  status: Joi.boolean()
  .default(true)
  .messages({
    'boolean.base': 'status deve ser um boolean',
  })
}).min(3).max(4);

const updatePaymentSchema = Joi.object({
  name: Joi.string()
  .min(3)
  .max(50)
  .optional()
  .messages({
    'string.base': 'Nome deve ser uma string',
    'string.min': 'Nome deve ter no minimo 3 caracteres',
    'string.max': 'Nome deve ter no maximo 50 caracteres'
  }),

  imageType: Joi.string()
  .valid('Pix', 'Others', 'Money', 'Card', 'Voucher')
  .optional()
  .messages({
    'string.base': 'Tipo de imagem deve ser uma string',
    'any.only': 'Tipo de imagem deve ser um dos valores: Pix, Others, Money, Card, Voucher'
  }),

  paymentConditions: Joi.array().items(
    Joi.object({
      conditionsId: Joi.string()
      .length(24)
      .hex()
      .required()
      .messages({
        'string.base': 'ConditionsId deve ser uma string',
        'string.length': 'ConditionsId deve ter no exatamente 24 caracteres',
        'string.hex': 'ConditionsId deve ser um hexadecimal valido'
      }),
    
      action: Joi.string()
      .valid('add', 'remove')
      .required()
      .messages({
        'string.base': 'Action deve ser uma string',
        'any.only': 'Action deve ser um dos valores: remove ou add'
      }),
    })
  ).optional(),

  status: Joi.boolean()
  .optional()
  .messages({
    'boolean.base': 'status deve ser um boolean',
  }),

  deleted: Joi.boolean().optional()
}).min(1);

module.exports = { 
  createPaymentSchema, 
  updatePaymentSchema 
};
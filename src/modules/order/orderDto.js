//orderDto.js
const Joi = require('joi');

const createOrderSchema = Joi.object({
  client: Joi.object({
    clientId: Joi.string()
    .length(24)
    .hex()
    .required()
    .messages({
      'string.empty': 'Cliente é obrigatório',
      'string.base': 'Cliente deve ser uma string',
      'string.length': 'Cliente deve ter exatamente 24 caracteres',
      'string.hex': 'Cliente deve ser um hexadecimal válido'
    }),
  }).required(),

  products: Joi.array().items(
    Joi.object({
      productId: Joi.string()
      .length(24)
      .hex()
      .required()
      .messages({
        'string.empty': 'Produto é obrigatório',
        'string.base': 'Producto deve ser uma string',
        'string.length': 'Produto deve ter exatamente 24 caracteres',
        'string.hex': 'Produto deve ser um hexadecimal válido'
      }),

      quantity: Joi.number()
      .min(1)
      .required().messages({
        'number.empty': 'Quantidade é obrigatório',
        'number.base': 'Quantidade deve ser um numero',
        'number.min': 'Quantidade deve ter no minimo 1'
      })
    })
  ).min(1).required(),

  payment: Joi.object({
    methodId: Joi.string()
    .length(24)
    .hex()
    .required()
    .messages({
      'string.empty': 'Método de pagamento é obrigatório',
      'string.base': 'Método de pagamento deve ser uma string',
      'string.length': 'Método de pagamento deve ter exatamente 24 caracteres',
      'string.hex': 'Método de pagamento deve ser um hexadecimal válido'
    }),

    conditionId: Joi.string()
    .length(24)
    .hex()
    .required()
    .messages({
      'string.empty': 'Condição de pagamento é obrigatório',
      'string.base': 'Condição de pagamento deve ser uma string',
      'string.length': 'Condição de pagamento deve ter exatamente 24 caracteres',
      'string.hex': 'Condição de pagamento deve ser um hexadecimal válido'
    }),
  }).required()
});

const updateOrderSchema = Joi.object({
  status: Joi.string()
  .valid('in_progress','cancel','approved')
  .required()
  .messages({
    "string.empty": "O status não pode estar vazio",
    "any.only": "O status deve ser 'in_progress', 'cancel' ou 'approved'",
    "any.required": "O status é obrigatório"
  })
});


module.exports = {
  createOrderSchema,
  updateOrderSchema
};
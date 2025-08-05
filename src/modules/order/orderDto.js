// orderDto.js
const Joi = require('joi');

// Schema para validação de produto individual
const productSchema = Joi.object({
  productId: Joi.string().required().messages({
    'string.empty': 'ID do produto é obrigatório',
    'any.required': 'ID do produto é obrigatório'
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    'number.base': 'Quantidade deve ser um número',
    'number.integer': 'Quantidade deve ser um número inteiro',
    'number.min': 'Quantidade deve ser maior que 0',
    'any.required': 'Quantidade é obrigatória'
  })
});

// Schema para validação de pagamento
const paymentSchema = Joi.object({
  method_id: Joi.string().required().messages({
    'string.empty': 'ID do método de pagamento é obrigatório',
    'any.required': 'ID do método de pagamento é obrigatório'
  }),
  condition_id: Joi.string().required().messages({
    'string.empty': 'ID da condição de pagamento é obrigatório',
    'any.required': 'ID da condição de pagamento é obrigatório'
  })
});

// Schema principal para criação de pedido
const createOrderSchema = Joi.object({
  client_id: Joi.string().required().messages({
    'string.empty': 'ID do cliente é obrigatório',
    'any.required': 'ID do cliente é obrigatório'
  }),
  products: Joi.array().items(productSchema).min(1).required().messages({
    'array.min': 'Pedido deve ter pelo menos um produto',
    'any.required': 'Produtos são obrigatórios'
  }),
  payment: paymentSchema.required().messages({
    'any.required': 'Dados de pagamento são obrigatórios'
  }),
  total: Joi.number().positive().required().messages({
    'number.base': 'Total deve ser um número',
    'number.positive': 'Total deve ser maior que 0',
    'any.required': 'Total é obrigatório'
  })
});

// Schema para atualização de status
const updateStatusSchema = Joi.object({
  status: Joi.string().valid('pending', 'in_progress', 'cancel', 'approved').required().messages({
    'string.empty': 'Status é obrigatório',
    'any.only': 'Status deve ser: pending, in_progress, cancel ou approved',
    'any.required': 'Status é obrigatório'
  })
});

// Funções de validação
const validateCreateOrder = (data) => {
  return createOrderSchema.validate(data, { abortEarly: false });
};

const validateUpdateStatus = (data) => {
  return updateStatusSchema.validate(data, { abortEarly: false });
};

module.exports = {
  validateCreateOrder,
  validateUpdateStatus
};
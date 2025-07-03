//payment_conditionDto.js
//Opcional
//Se for manipulada diretamente (upload de imagens fora do produto)
const Joi = require('joi');

const createPaymentConditionSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  status: Joi.boolean().default(true).required(),
  deleted: Joi.boolean().default(false).required()
});

const updatePaymentConditionSchema = Joi.object({
  name: Joi.string().min(2).max(50).optional(),
  status: Joi.boolean().optional(),
  deleted: Joi.boolean().optional()
});

module.exports = { 
  createPaymentConditionSchema, 
  updatePaymentConditionSchema };
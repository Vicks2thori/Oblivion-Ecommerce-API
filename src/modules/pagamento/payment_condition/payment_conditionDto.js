//payment_conditionDto.js
//Opcional
//Se for manipulada diretamente (upload de imagens fora do produto)
const Joi = require('joi');

const createPaymentConditionSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  status: Joi.boolean().default(true).required()
});

module.exports = { createPaymentConditionSchema };
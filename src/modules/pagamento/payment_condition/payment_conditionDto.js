//payment_conditionDto.js
//Opcional
//Se for manipulada diretamente (upload de imagens fora do produto)
const Joi = require('joi');

const createPaymentConditionSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  status: Joi.boolean().default(true).required(),
  //deleted não vem do front é controlado no back (pelo menos na hora de criar)
}).min(2).max(2);

const updatePaymentConditionSchema = Joi.object({
  name: Joi.string().min(2).max(50).optional(),
  status: Joi.boolean().optional(),
  deleted: Joi.boolean().optional()
}).min(1).max(3);

module.exports = { 
  createPaymentConditionSchema, 
  updatePaymentConditionSchema };
//paymentDto.js
const Joi = require('joi');

const createPaymentSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  image_id: Joi.number().min(1).max(255).required(),
  condition_id: Joi.number().min(1).max(255).required(),
  statusPayment: Joi.boolean().default(true).required()
});

const updatePaymentSchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  image_id: Joi.number().min(1).max(255).optional(),
  condition_id: Joi.number().min(1).max(255).optional(),
  statusPayment: Joi.boolean().optional()
});

module.exports = { 
  createPaymentSchema, 
  updatePaymentSchema };
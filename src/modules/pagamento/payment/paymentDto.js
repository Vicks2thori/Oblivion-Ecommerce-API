//paymentDto.js
const Joi = require('joi');

const createPaymentSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  image_id: Joi.number().min(1).max(255).required(),
  condition_id: Joi.number().min(1).max(255).required(),
  statusPayment: Joi.boolean().default(true).required()
});

module.exports = { createPaymentSchema };
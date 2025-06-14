//paymentDto.js
const Joi = require('joi');

const createPaymentSchema = Joi.object({
  namePayment: Joi.string().min(3).max(50).required(),
  //idImagPayment
  //idPaymentCondition
  statusPayment: Joi.number().valid(0, 1).default(1).required()
});

module.exports = { createPaymentSchema };
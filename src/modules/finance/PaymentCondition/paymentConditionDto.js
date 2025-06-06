//paymentConditionDto.js
const Joi = require('joi');

const createPymentConditionSchema = Joi.object({
  namePaymentCondition: Joi.string().min(2).max(50).required(),
  statusPaymentCondition: Joi.number().valid(0, 1).default(1).required()
});

module.exports = { createPymentConditionSchema };
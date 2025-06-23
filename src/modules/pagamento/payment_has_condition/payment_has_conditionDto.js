//payment_has_conditionDto.js
const Joi = require('joi');

const createPaymentHasConditionSchema = Joi.object({
  idPayment: Joi.number().min(1).max(255).required(),
  idPaymentCondition: Joi.number().min(1).max(255).required()
});

const updatePaymentHasConditionSchema = Joi.object({
  idPayment: Joi.number().min(1).max(255).optional(),
  idPaymentCondition: Joi.number().min(1).max(255).optional()
});

module.exports = { 
  createPaymentHasConditionSchema, 
  updatePaymentHasConditionSchema };
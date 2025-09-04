//payment_conditionDto.js
const Joi = require('joi');

const createPaymentConditionSchema = Joi.object({
  name: Joi.string()
  .min(2)
  .max(50)
  .required(),

  status: Joi.boolean()
  .default(true)
}).min(1).max(2);

const updatePaymentConditionSchema = Joi.object({
  name: Joi.string()
  .min(2)
  .max(50)
  .optional(),

  status: Joi.boolean()
  .optional(),

  deleted: Joi.boolean()
  .optional()
}).min(1).max(3);

module.exports = { 
  createPaymentConditionSchema,
  updatePaymentConditionSchema
};
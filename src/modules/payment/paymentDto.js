//paymentDto.js
const Joi = require('joi');

const createPaymentSchema = Joi.object({
  name: Joi.string()
  .min(3)
  .max(50)
  .required(),

  imageType: Joi.string()
  .valid('Pix', 'Others', 'Money', 'Card', 'Voucher')
  .required(),

  paymentConditions: Joi.array().items(
    Joi.object({
      conditionsId: Joi.string()
      .length(24)
      .hex()
      .required(),
    })
  ).required().min(1),

  status: Joi.boolean()
  .default(true)
}).min(3).max(4);

const updatePaymentSchema = Joi.object({
  name: Joi.string()
  .min(3)
  .max(50)
  .optional(),

  imageType: Joi.string()
  .valid('Pix', 'Others', 'Money', 'Card', 'Voucher')
  .optional(),

  paymentConditions: Joi.array().items(
    Joi.object({
      conditionsId: Joi.string()
      .length(24)
      .hex()
      .required(),
    
      action: Joi.string()
      .valid('add', 'remove')
      .required()
    })
  ).optional(),

  status: Joi.boolean().optional(),

  deleted: Joi.boolean().optional()
}).min(1);

module.exports = { 
  createPaymentSchema, 
  updatePaymentSchema 
};
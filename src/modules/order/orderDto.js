//orderDto.js
const Joi = require('joi');

const createOrderSchema = Joi.object({
  clientId: Joi.string()
  .length(24)
  .hex()
  .required(),

  products: Joi.array().items(
    Joi.object({
      productId: Joi.string()
      .length(24)
      .hex()
      .required(),

      quantity: Joi.number()
      .min(1)
      .required()
    })
  ).min(1).required(),

  payment: Joi.object({
    methodId: Joi.string()
    .length(24)
    .hex()
    .required(),

    conditionId: Joi.string()
    .length(24)
    .hex()
    .required()
  }).required()
});

const updateOrderSchema = Joi.object({
  status: Joi.string()
  .valid('in_progress','cancel','approved')
  .required()
});


module.exports = {
  createOrderSchema,
  updateOrderSchema
};
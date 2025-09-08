//stock_movementDto.js
const Joi = require('joi');

const createStockMovementSchema = Joi.object({
  date: Joi.date()
  .iso()
  .required(),

  name: Joi.string()
  .min(3)
  .max(50)
  .required(),

  description: Joi.string()
  .min(0)
  .max(255)
  .required(),

  stockCategory: Joi.array().items(
    Joi.object({
      stockCategoryId: Joi.string()
      .length(24)
      .hex()
      .required(),

      nameStockCategory: Joi.string()
      .min(3)
      .max(50)
      .required()
    })
  ).min(1).max(1).required(),

  type: Joi.string()
  .valid('exit', 'entry', 'definition')
  .required(),

  products: Joi.array().items(
    Joi.object({
      productId: Joi.string()
      .length(24)
      .hex()
      .required(),

      nameProduct: Joi.string()
      .min(1)
      .max(50)
      .required(),

      quantity: Joi.number()
      .min(1)
      .max(65535)
      .required()
    })
  ).min(1).required(),

  admin: Joi.array().items(
    Joi.object({
      adminId: Joi.string()
      .length(24)
      .hex()
      .required(),

      nameAdmin: Joi.string()
      .min(5)
      .max(80)
      .required()
    })
  ).min(1).max(1).required(),
}).min(7).max(7); 

module.exports = { createStockMovementSchema };
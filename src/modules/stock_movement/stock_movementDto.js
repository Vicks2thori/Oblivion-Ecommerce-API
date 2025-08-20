//stock_movementDto.js
const Joi = require('joi');

const createStockMovementSchema = Joi.object({
  date: Joi.date().iso().required(), //iso YYYY-MM-DD
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().min(0).max(255).required(),
  stockCategoryId: Joi.string().length(24).hex().required(), //um id no mongo é uma string de 24 digitos hexadecimal
  type: Joi.string().valid('exit', 'entry', 'definition').required(),
  products: Joi.array().items(
    Joi.object({
      productId: Joi.string().length(24).hex().required(), //um id no mongo é uma string de 24 digitos hexadecimal
      quantity: Joi.number().min(1).max(65535).required()
    })
  ).min(1).required(),
  adminId: Joi.string().length(24).hex().required() //um id no mongo é uma string de 24 digitos hexadecimal
}).min(7).max(7); 

//Não tem Update, nem Delete

module.exports = { createStockMovementSchema };
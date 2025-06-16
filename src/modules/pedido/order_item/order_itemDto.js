//order_itemDto.js
//tenho que ver o schema ainda pois tenho 2 tabelas
const Joi = require('joi');

const createOrderItemSchema = Joi.object({
  order_id: Joi.number().min(1).max(65535).required(),
  product_id: Joi.number().min(1).max(65535).required(),
  quantity: Joi.number().min(1).max(65535).required(),
  subtotal: Joi.number().precision(2).min(0.01).max(99999999.99).required()
});

//preciso pensar como vou fazer o update aqui

module.exports = { createOrderItemSchema };
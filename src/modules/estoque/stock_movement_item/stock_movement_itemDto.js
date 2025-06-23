//stock_movement_itemDto.js
const Joi = require('joi');

const createStockMovementItemSchema = Joi.object({
  stock_movement_id: Joi.number().min(1).max(65535).required(),
  product_id: Joi.number().min(1).max(65535).required(),
  quantity: Joi.number().min(1).max(65535).required(),
});

//Não tem Update, nem Delete

module.exports = { 
  createStockMovementItemSchema };
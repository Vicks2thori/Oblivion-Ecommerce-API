//stock_categoryDto.js
const Joi = require('joi');

const createStockCategorySchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  status: Joi.boolean().default(true).optional()
  //não se cria deleted isso é o backend que faz
}).min(1).max(2); //mesmo esquema do categoryDto

const updateStockCategorySchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  status: Joi.boolean().optional(),
  deleted: Joi.boolean().optional()
}).min(1).max(3); //mesma duvida relacionada ao payment_condition

module.exports = { 
  createStockCategorySchema, 
  updateStockCategorySchema };
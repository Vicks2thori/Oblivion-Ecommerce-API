//stock_categoryDto.js
const Joi = require('joi');

const createStockCategorySchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  status: Joi.boolean().default(true).required(),
  //não se cria deleted isso é o backend que faz
});

const updateStockCategorySchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  status: Joi.boolean().optional(),
  deleted: Joi.boolean().optional()
});

module.exports = { 
  createStockCategorySchema, 
  updateStockCategorySchema };
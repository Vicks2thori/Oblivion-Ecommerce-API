//categoryStockDto.js
const Joi = require('joi');

const createCategoryStockSchema = Joi.object({
  nameCategoryStock: Joi.string().min(3).max(50).required(),
  statusCategoryStock: Joi.number().valid(0, 1).default(1).required()
});

module.exports = { createCategoryStockSchema };
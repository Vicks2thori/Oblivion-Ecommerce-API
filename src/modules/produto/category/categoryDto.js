//categoryDto.js
const Joi = require('joi');

const createCategorySchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  status: Joi.boolean().default(true).required()
});

const updateCategorySchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  status: Joi.boolean().optional()
});

module.exports = { 
  createCategorySchema, 
  updateCategorySchema };
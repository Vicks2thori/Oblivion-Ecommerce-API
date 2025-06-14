//categoryDto.js
const Joi = require('joi');

const createCategorySchema = Joi.object({
  nameCategory: Joi.string().min(3).max(50).required(),
  statusCategory: Joi.number().valid(0, 1).default(1).required()
});

module.exports = { createCategorySchema };
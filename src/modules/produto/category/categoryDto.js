//categoryDto.js
const Joi = require('joi');

const createCategorySchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  status: Joi.boolean().default(true).required(),
  //não se cria deleted isso é o backend que faz
}).min(2).max(2);

const updateCategorySchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  status: Joi.boolean().optional(),
  deleted: Joi.boolean().optional()
}).min(1).max(3);

module.exports = { 
  createCategorySchema, 
  updateCategorySchema };
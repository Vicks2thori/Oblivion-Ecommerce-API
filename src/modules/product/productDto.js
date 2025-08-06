//productDto.js
const Joi = require('joi');

const createProductSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  image_id: Joi.number().min(1).max(65535).optional(),
  description: Joi.string().max(65535).optional(),
  price: Joi.number().precision(2).min(0.01).max(999999.99).required(),
  code: Joi.number().min(1).max(9223372036854775807).required(),
  status: Joi.boolean().default(true).required(),
  category_id: Joi.number().min(1).max(255).required(),
  quantity: Joi.number().min(1).max(65535).required()
})

const updateProductSchema = Joi.object({
  name: Joi.string().min(1).max(100).optional(),
  image_id: Joi.number().min(1).max(65535).optional(),
  description: Joi.string().max(65535).optional(),
  price: Joi.number().precision(2).min(0.01).max(999999.99).optional(),
  code: Joi.number().min(1).max(9223372036854775807).optional(),
  status: Joi.boolean().optional(),
  category_id: Joi.number().min(1).max(255).optional(),
  quantity: Joi.number().min(1).max(65535).optional()
})
module.exports = { 
  createProductSchema, 
  updateProductSchema };
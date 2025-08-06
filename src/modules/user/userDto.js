//userDto.js
const Joi = require('joi');

const createUserSchema = Joi.object({
  name: Joi.string().min(5).max(80).required(),
  email: Joi.string().email().min(6).max(50).required(), //unique
  password: Joi.string().min(8).max(255).required(),
  type: Joi.string().valid('client', 'admin').required()
});

const updateUserSchema = Joi.object({
  name: Joi.string().min(5).max(80).optional(),
  email: Joi.string().email().min(6).max(50).optional(), //unique
  password: Joi.string().min(8).max(255).optional()
});

module.exports = { 
  createUserSchema, 
  updateUserSchema};

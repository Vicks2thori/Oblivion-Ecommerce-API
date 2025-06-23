//adminDto.js
const Joi = require('joi');

const createAdminSchema = Joi.object({
  user_id: Joi.number().min(1).max(65535).required(),
  status: Joi.boolean().default(true).required()
});

const updateAdminSchema = Joi.object({
  //ele não pode nem receber o id pois não pode alterar
  status: Joi.boolean().optional()
});

module.exports = { 
  createAdminSchema, 
  updateAdminSchema };
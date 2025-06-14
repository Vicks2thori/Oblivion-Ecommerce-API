//adminDto.js
const Joi = require('joi');

const createAdminSchema = Joi.object({
  user_id: Joi.number().min(1).max(65535).required(),
  status: Joi.boolean().default(true).required()
});

module.exports = { createAdminSchema };
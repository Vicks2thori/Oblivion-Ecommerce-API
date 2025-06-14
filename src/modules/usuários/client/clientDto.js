// clientDto.js
const Joi = require('joi');

const createClientSchema = Joi.object({
  names: Joi.string().min(5).max(80).required(),
  emails: Joi.string().email().min(6).max(50).required(),
  passwords: Joi.string().min(8).max(255).required(),
  cpfs: Joi.string().min(11).max(11).required(),
  cells: Joi.string().min(11).max(11).required()
});

module.exports = { createClientSchema };

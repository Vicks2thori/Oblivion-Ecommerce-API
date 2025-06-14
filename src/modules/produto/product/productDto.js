//productDto.js
const Joi = require('joi');

const createProductSchema = Joi.object({
  nameProduct: Joi.string().min(6).max(100).required(),
  //idImg optional
  descriptionProduct: Joi.string().max(65535).optional(),
  priceProduct: Joi.number().precision(2).min(0.00).max(999999.99).required(),
  //idCategory required
  //idStock?
  text_colorEnterprise: Joi.string().min(6).max(6).required(),
  codProduct: Joi.number().min(1).max(9223372036854775807).required(),
  statusProduct: Joi.number().valid(0, 1).default(1).required()
});

module.exports = { createProductSchema };
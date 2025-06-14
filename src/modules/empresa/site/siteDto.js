//siteDto.js
const Joi = require('joi');

const createSiteSchema = Joi.object({
  enterprise_id: Joi.number().length(1).required(), //chave estrangeira
  primary_color: Joi.string().length(6).required().default('000000'), //ainda vamos pensar no esquema de cores
  second_color: Joi.string().length(6).required().default('123456'),
  text_color: Joi.string().length(6).required().default('FFFFFF'),
});

module.exports = { createSiteSchema };
//configEnterpriseDto.js
const Joi = require('joi');

const createEnterpriseSchema = Joi.object({
  nameEnterprise: Joi.string().min(3).max(50).required(),
  //idImg opcional vai ser o logo
  cellEnterprise: Joi.string().min(11).max(11).required(),
  instagramEnterprise: Joi.string().min(1).max(30).optional(),
  facebookEnterprise: Joi.string().min(5).max(50).optional(),
  emailEnterprise: Joi.string().email().min(6).max(50).optional()
});

module.exports = { createEnterpriseSchema };
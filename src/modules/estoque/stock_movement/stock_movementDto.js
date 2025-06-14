//stock_movementDto.js
const Joi = require('joi');

const createStockMovementSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  date: Joi.date().iso().required(), //iso YYYY-MM-DD
  category_id: Joi.number().min(1).max(65535).required(),
  admin_id: Joi.number().min(1).max(255).required(),
  type: Joi.string().valid('exit', 'entry', 'definition').required(),
});

module.exports = { createStockMovementSchema };
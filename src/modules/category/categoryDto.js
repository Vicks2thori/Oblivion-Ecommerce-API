const Joi = require('joi');

const createCategorySchema = Joi.object({
  name: Joi.string().trim().min(3).max(50).required(),

  status: Joi.boolean().default(true).optional(),
}).min(1).max(2);

const updateCategorySchema = Joi.object({
  name: Joi.string().trim().min(3).max(50).optional(),

  productsList: Joi.array().items(
    Joi.object({
      productId: Joi.string().length(24).hex().required()
    })
  ).optional(),

  status: Joi.boolean().optional(),

  categoryDeleted: Joi.boolean().optional()
}).min(1);

module.exports = { 
  createCategorySchema, 
  updateCategorySchema 
};
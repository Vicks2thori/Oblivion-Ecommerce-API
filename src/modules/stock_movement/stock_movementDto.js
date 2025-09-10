// stock_movementDto.js
const Joi = require('joi');

const createStockMovementSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      "string.base": "O nome deve ser um texto",
      "string.empty": "O nome não pode estar vazio",
      "string.min": "O nome deve ter no mínimo 3 caracteres",
      "string.max": "O nome deve ter no máximo 50 caracteres",
      "any.required": "O nome é obrigatório"
    }),

  description: Joi.string()
    .max(255)
    .messages({
      "string.base": "A descrição deve ser um texto",
      "string.max": "A descrição deve ter no máximo 255 caracteres",
    }),

  stockCategory: Joi.object({
    stockCategoryId: Joi.string()
      .length(24)
      .hex()
      .required()
      .messages({
        "string.length": "O stockCategoryId da categoria deve ter exatamente 24 caracteres",
        "string.empty": "O stockCategoryId não pode estar vazio",
        "string.hex": "O stockCategoryId deve estar em formato hexadecimal",
        "any.required": "O stockCategoryId é obrigatório"
      })
  }).required()
    .messages({
      "any.required": "A categoria do estoque é obrigatória"
    }),

  type: Joi.string()
    .valid('exit', 'entry', 'definition')
    .required()
    .messages({
      "string.empty": "O tipo não pode estar vazio",
      "any.only": "O tipo deve ser 'exit', 'entry' ou 'definition'",
      "any.required": "O tipo é obrigatório"
    }),

  products: Joi.array().items(
    Joi.object({
      productId: Joi.string()
        .length(24)
        .hex()
        .required()
        .messages({
          "string.empty": "O ID do produto não pode estar vazio",
          "string.length": "O ID do produto deve ter exatamente 24 caracteres",
          "string.hex": "O ID do produto deve estar em formato hexadecimal",
          "any.required": "O ID do produto é obrigatório"
        }),

      quantity: Joi.number()
        .min(1)
        .required()
        .messages({
          "number.base": "A quantidade deve ser um número",
          "number.min": "A quantidade mínima é 1",
          "any.required": "A quantidade é obrigatória"
        })
    })
  ).min(1)
    .required()
    .messages({
      "array.min": "É necessário informar pelo menos um produto",
      "any.required": "A lista de produtos é obrigatória"
    }),

  admin: Joi.object({
    adminId: Joi.string()
      .length(24)
      .hex()
      .required()
      .messages({
        "string.empty": "O ID do admin não pode estar vazio",
        "string.length": "O ID do admin deve ter exatamente 24 caracteres",
        "string.hex": "O ID do admin deve estar em formato hexadecimal",
        "any.required": "O ID do admin é obrigatório"
      })
  }).required()
    .messages({
      "any.required": "O administrador é obrigatório"
    }),
}).required();

module.exports = { createStockMovementSchema };
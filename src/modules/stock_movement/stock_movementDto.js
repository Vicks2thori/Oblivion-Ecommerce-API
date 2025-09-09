//stock_movementDto.js
const Joi = require('joi');

const createStockMovementSchema = Joi.object({
  date: Joi.date()
  .iso()
  .required()
  .messages({
    "date.base": "A data deve ser válida",
    "date.format": "A data deve estar no formato ISO",
    "any.required": "A data é obrigatória"
  }),

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
  .min(0)
  .max(255)
  .required()
  .messages({
    "string.base": "A descrição deve ser um texto",
    "string.max": "A descrição deve ter no máximo 255 caracteres",
  }),

  stockCategory: Joi.array().items(
    Joi.object({
      stockCategoryId: Joi.string()
      .length(24)
      .hex()
      .required()
      .messages({
        "string.length": "O stockCategoryId da categoria deve ter exatamente 24 caracteres",
        "string.empty": "O stockCategoryId não pode estar vazio",
        "string.hex": "O stockCategoryId da categoria deve estar em formato hexadecimal",
        "any.required": "O stockCategoryId da categoria é obrigatório"
      }),

      nameStockCategory: Joi.string()
      .min(3)
      .max(50)
      .required()
      .messages({
        "string.empty": "O nome da categoria não pode estar vazio",
        "string.min": "O nome da categoria deve ter no mínimo 3 caracteres",
        "string.max": "O nome da categoria deve ter no máximo 50 caracteres",
        "any.required": "O nome da categoria é obrigatório"
      })
    })
  ).min(1)
  .max(1)
  .required()
  .messages({
    "array.min": "É necessário informar pelo menos uma categoria",
    "array.max": "Só é permitida uma categoria",
    "any.required": "A categoria do estoque é obrigatória"
  }),

  type: Joi.string()
  .valid('exit', 'entry', 'definition')
  .required()
  .messages({
    "string.empty": "O o tipo não pode estar vazio",
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
        "string.empty": "O ID não pode estar vazio",
        "string.length": "O ID do produto deve ter exatamente 24 caracteres",
        "string.hex": "O ID do produto deve estar em formato hexadecimal",
        "any.required": "O ID do produto é obrigatório"
      }),

      nameProduct: Joi.string()
      .min(1)
      .max(50)
      .required()
      .messages({
        "string.empty": "O nome do produto não pode estar vazio",
        "string.min": "O nome do produto deve ter no mínimo 1 caracteres",
        "string.max": "O nome do produto deve ter no máximo 255 caracteres",
        "any.required": "O nome do produto é obrigatório"
      }),

      quantity: Joi.number()
      .min(1)
      .max(65535)
      .required()
      .messages({
        "number.empty": "A quantidade não pode estar vazia",
        "number.base": "A quantidade deve ser um número",
        "number.min": "A quantidade mínima é 1",
        "number.max": "A quantidade máxima é 65535",
        "any.required": "A quantidade é obrigatória"
      })
    })
  ).min(1)
  .required()
  .messages({
    "array.min": "É necessário informar pelo menos um produto",
    "any.required": "A lista de produtos é obrigatória"
  }),

  admin: Joi.array().items(
    Joi.object({
      adminId: Joi.string()
      .length(24)
      .hex()
      .required()
      .messages({
        "string.empty": "O ID do admin não pode estar vazio",
        "string.length": "O ID do admin deve ter exatamente 24 caracteres",
        "string.hex": "O ID do admin deve estar em formato hexadecimal",
        "any.required": "O ID do admin é obrigatório"
      }),

      nameAdmin: Joi.string()
      .min(5)
      .max(80)
      .required()
      .messages({
        "string.empty": "O nome do admin não pode estar vazio",
        "string.min": "O nome do admin deve ter no mínimo 5 caracteres",
        "string.max": "O nome do admin deve ter no máximo 80 caracteres",
        "any.required": "O nome do admin é obrigatório"
      })
    })
  ).min(1)
  .max(1)
  .required()
  .messages({
    "array.min": "É necessário informar pelo menos um administrador",
    "array.max": "Só é permitido um administrador",
    "any.required": "O administrador é obrigatório"
  }),
}).min(7).max(7); 

module.exports = { createStockMovementSchema };
//categoryDto.js
const Joi = require('joi');

const createCategorySchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  status: Joi.boolean().default(true).optional(), //tirei para testar se a resposta viria do Entity
  //na hora de criar a categoria não se vincula produto, só na hora de criar produto (atualizar)
  //não se cria deleted isso é o backend que faz
}); //tirei para testar se a resposta viria do Entity

const updateCategorySchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  status: Joi.boolean().optional(),
  products: Joi.array().items( //para a validação de muitos produtos
    Joi.object({
      productId: Joi.string().length(24).hex().required(),
      action: Joi.string().valid('add', 'remove').required() // Ação para adicionar ou remover
    })
  ).optional(),
  deleted: Joi.boolean().optional()
}).min(1).max(4); //mesma duvida a cerca da quantidade de requisições (no caso de deleted como que o front manda? vai mandar SÓ ele ou o resto?)

module.exports = { 
  createCategorySchema, 
  updateCategorySchema };
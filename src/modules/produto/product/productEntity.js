//productEntity.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Nome é obrigatório'], //required + mensagem personalizada
    trim: true,  //Remove espaços inicio/fim
    minlength: [1, 'Nome deve ter um minímo de 1 caracteres'],
    maxlength: [50, 'Nome deve ter um máximo de 50 caracteres']
    //unique: true, //Quando o unique esta ativo ele retorna um erro, mesmo quando o item foi "deletado"
  },
  imageUrl: {
    type: String,
    required: [true, 'URL da imagem é obrigatória'],
    trim: true,
    minlength: [1, 'URL da imagem deve ter um minímo de 1 caracteres'], //Preciso analisar melhor o contexto para restringir
    maxlength: [255, 'URL da imagem deve ter um máximo de 255 caracteres']
  },
  description: {
    type: String,
    required: false,
    trim: true,
    minlength: [1, 'Descrição deve ter um minímo de 1 caracteres'],
    maxlength: [65535, 'Descrição deve ter um máximo de 65535 caracteres'] //Fiz com base no tipo do SQL Varchar
  },
  price: {
    type: Number,
    required: [true, 'Preço é obrigatório'],
    min: [0.01, 'Preço deve ser maior que 0'],
    max: [999999.99, 'Preço deve ser menor que 999999.99'] //Fiz com base no tipo do SQL Decimal(8,2)
  },
  code: { //código do produto vai ser obrigatório? vai ser inserido ou gerado automaticamente?
    type: Number,
    required: [true, 'Código é obrigatório'],
    min: [1, 'Código deve ser maior que 0'],
    max: [9223372036854775807, 'Código deve ser menor que 9223372036854775807'] //Fiz com base no tipo do SQL BigInt (Para alocar código de barras)
  },
  quantity: { //vou obrigar? pode ser negativo dependendo das vendas? ou ele vai ter que barrar?
    type: Number,
    required: [true, 'Quantidade é obrigatória'],
    min: [1, 'Quantidade deve ser maior que 0'],
    max: [65535, 'Quantidade deve ser menor que 65535'] //Fiz com base no tipo do SQL SmallInt
  },
  categoryId: { //Vou fazer um relacionamento bidirecional? na categoria vai ter uma lista de produtos?
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Categoria é obrigatória'],
    min: [1, 'Categoria deve ser igual a 1'],
    max: [1, 'Categoria deve ser igual a 1']
  },
  status: { 
    type: Boolean,
    required: true,
    default: true 
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false
  }
}, { 
  timestamps: true, //controle automático de tempo
  versionKey: false //remove campo inutil
});

//indexação para performance
ProductSchema.index({name: 1})
ProductSchema.index({status: 1, deleted: 1}) //melhorar

module.exports = mongoose.model('Product', ProductSchema);
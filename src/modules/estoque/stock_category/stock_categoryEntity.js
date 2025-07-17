//stock_categoryEntity.js
const mongoose = require('mongoose');

const StockCategorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Nome é obrigatório'], //required + mensagem personalizada
    trim: true,  //Remove espaços inicio/fim
    minlength: [3, 'Nome deve ter um minímo de 3 caracteres'],
    maxlength: [50, 'Nome deve ter um máximo de 50 caracteres']
    //unique: true, //Quando o unique esta ativo ele retorna um erro, mesmo quando o item foi "deletado"
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
StockCategorySchema.index({name: 1})
StockCategorySchema.index({status: 1, deleted: 1}) //melhorar

module.exports = mongoose.model('StockCategory', StockCategorySchema);
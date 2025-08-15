//stock_movementEntity.js
const mongoose = require('mongoose');

const StockMovementSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Nome é obrigatório'], //required + mensagem personalizada
    trim: true,  //Remove espaços inicio/fim
    minlength: [2, 'Nome deve ter um minímo de 2 caracteres'],
    maxlength: [50, 'Nome deve ter um máximo de 50 caracteres'],
    //unique: true, //Quando o unique esta ativo ele retorna um erro, mesmo quando o item foi "deletado"
  },
  description:{
    type: String,
    required: false,
    trim: true,
    maxlength: [255, 'Descrição deve ter um máximo de 255 caracteres']
  },

  stockCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StockCategory',
    required: [true, 'stockCategoryId é obrigatório']
  },
  //REFERENCING - subdocumentos
  products: [
    {
    _id: false, //Impede que o Mongo gere um _id para o subdocumento
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'productId é obrigatório']
    },
    quantity: {
      type: Number,
      required: [true, 'quantity é obrigatório']
    }
    },
  ],
},{
  timestamps: true, //controle automático de tempo
  versionKey: false, //remove campo inutil
});


//MIDDLEWARES
// Validação customizada para garantir pelo menos um produto
StockMovementSchema.pre('save', function(next) {
  if (this.products.length === 0) {
    return next(new Error('Movimentação de estoque deve ter pelo menos um produto'));
  }
  next();
});

// Validação customizada para garantir uma categoria
StockMovementSchema.pre('save', function(next) {
  if (!this.stockCategoryId) {
    return next(new Error('Movimentação de estoque deve ter uma categoria'));
  }
  next();
});



// Índices para performance
StockMovementSchema.index({ name: 1 });
StockMovementSchema.index({ stockCategoryId: 1 });

module.exports = mongoose.model('StockMovement', StockMovementSchema);
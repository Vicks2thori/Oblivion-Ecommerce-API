//stock_movementEntity.js
const mongoose = require('mongoose');

const StockMovementSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'Data é obrigatória'],
    default: Date.now
  },

  name: { 
    type: String, 
    required: [true, 'Nome é obrigatório'],
    trim: true,
    minlength: [2, 'Nome deve ter um minímo de 2 caracteres'],
    maxlength: [50, 'Nome deve ter um máximo de 50 caracteres']
  },
  
  description:{
    type: String,
    required: false,
    trim: true,
    maxlength: [255, 'Descrição deve ter um máximo de 255 caracteres']
  },

  //1:1
  stockCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StockCategory',
    required: [true, 'stockCategoryId é obrigatório']
  },

  type: {
    type: String,
    required: [true, 'Tipo é obrigatório'],
    enum: ['entry', 'exit', 'definition']
  },
  
  //Referencing - subdocumentos
  //1:N
  products: [
    {
    _id: false,
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

  //1:1
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'adminId é obrigatório']
  }
},{
  timestamps: true,
  versionKey: false,
});

StockMovementSchema.pre('save', function(next) {
  if (this.products.length === 0) {
    return next(new Error('Movimentação de estoque deve ter pelo menos um produto'));
  };
  next();
});

StockMovementSchema.pre('save', function(next) {
  if (!this.stockCategoryId) {
    return next(new Error('Movimentação de estoque deve ter uma categoria'));
  };
  next();
});

StockMovementSchema.index({ name: 1 });
StockMovementSchema.index({ stockCategoryId: 1 });

module.exports = mongoose.model('StockMovement', StockMovementSchema);
//stock_movementEntity.js
const mongoose = require('mongoose');

const StockMovementSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },

  type: {
    type: String,
    required: true,
    enum: ['entry', 'exit', 'definition']
  },

  name: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  
  description:{
    type: String,
    trim: true,
    maxlength: 255
  },

  //Referencing - subdocumentos
  //1:1
  stockCategory: {
    _id: false,
    stockCategoryId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'StockCategory',
      required: true,
    },

    nameStockCategory:{
      type: String,
      trim: true,
      required: true,
      minlength: 3,
      maxlength: 50
    }
  },
  
  //1:N
  products: [
    {
    _id: false,
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },

    nameProduct: {
      type: String,
      trim: true,
      minlength: 1,
      maxlength: 50
    },

    quantity: {
      type: Number,
      required: true
    }
    },
  ],

  //1:1
  admin: {
    _id: false,
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    nameAdmin: {
      type: String,
      minlength: 5,
      maxlength: 80,
      required: true
    }
  }
}, {
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
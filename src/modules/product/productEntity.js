//productEntity.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 50
  },

  imageUrl: {
    type: String,
    trim: true,
    minlength: 1,
    maxlength: 255
  },

  description: {
    type: String,
    trim: true,
    minlength: 1,
    maxlength: 65535
  },

  price: {
    type: Number,
    required: true,
    min: 0.01,
    max: 999999.99
  },

  code: { 
    type: Number,
    required: true,
    min: 1,
    max: 9999999999999999999
  },

  quantity: {
    type: Number,
    max: 65535
  },

  //Referencing - Bidirecional
  //N:1
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },

  status: { 
    type: Boolean,
    default: true 
  },

  //Soft delete
  deleted: {
    type: Boolean,
    default: false
  }
}, { 
  timestamps: true,
  versionKey: false
});

ProductSchema.pre('save', function(next) {
  if (this.name === null) {
    return next(new Error('Produto deve ter um nome'));
  };

  if (this.price === null) {
    return next(new Error('Produto deve ter um preço'));
  };

  if (this.code === null) {
    return next(new Error('Produto deve ter um código'));
  };

  if (this.categoryId === null) {
    return next(new Error('Produto deve ter uma categoria'));
  };
  
  next();
});

ProductSchema.index({name: 1})
ProductSchema.index({status: 1, deleted: 1})

module.exports = mongoose.model('Product', ProductSchema);
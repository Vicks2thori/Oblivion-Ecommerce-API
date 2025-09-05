//stock_categoryEntity.js
const mongoose = require('mongoose');

const StockCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },

  status: {
    type: Boolean,
    required: true,
    default: true
  },

  //Soft delete
  deleted: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true,
  versionKey: false
});

StockCategorySchema.index({name: 1});
StockCategorySchema.index({status: 1, deleted: 1});

module.exports = mongoose.model('StockCategory', StockCategorySchema);
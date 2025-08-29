const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  productsList: [
    {
    _id: false,
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    }
    },
  ],
  status: { 
    type: Boolean,
    default: true 
  },
  categoryDeleted: {
    type: Boolean,
    default: false
  }
}, { 
  timestamps: true,
  versionKey: false
});

CategorySchema.index({name: 1})
CategorySchema.index({status: 1, categoryDeleted: 1})
CategorySchema.index({'productsList.productId': 1, categoryDeleted: 1})

module.exports = mongoose.model('Category', CategorySchema);
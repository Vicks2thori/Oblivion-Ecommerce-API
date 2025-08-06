//categoryEntity.js
const mongoose = require('mongoose');

// Schema da categoria
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    unique: true
  },
  status: {
    type: Boolean,
    default: true
  },
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  }],
  deleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Índices
categorySchema.index({ name: 1 });
categorySchema.index({ deleted: 1 });
categorySchema.index({ status: 1 });

// Métodos estáticos
categorySchema.statics.findActive = function() {
  return this.find({ deleted: false, status: true });
};

categorySchema.statics.findNotDeleted = function() {
  return this.find({ deleted: false });
};

// Métodos de instância
categorySchema.methods.addProduct = function(productId) {
  // Verificar se o produto já existe na categoria
  const existingProduct = this.products.find(p => p.productId.toString() === productId.toString());
  if (!existingProduct) {
    this.products.push({ productId });
  }
  return this.save();
};

categorySchema.methods.removeProduct = function(productId) {
  this.products = this.products.filter(p => p.productId.toString() !== productId.toString());
  return this.save();
};

// Middleware para soft delete
categorySchema.methods.softDelete = function() {
  this.deleted = true;
  return this.save();
};

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

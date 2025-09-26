// imageEntity.js
const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 24,
    maxlength: 24
  }
}, {
  timestamps: true,
  versionKey: false
});

ImageSchema.pre('save', function(next) {
  if (!this.name) {
    return next(new Error('Imagem deve ter um ID de entidade'));
  };
  
  next();
});

ImageSchema.index({ name: 1 }, { unique: true });
ImageSchema.index({ createdAt: 1 });

module.exports = mongoose.model('Image', ImageSchema);
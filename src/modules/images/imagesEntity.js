//imagesEntity.js
const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 24,
    maxlength: 24,
    index: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  publicId: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true,
  versionKey: false
});

ImageSchema.pre('save', function(next) {
  if (!this.name) {
    return next(new Error('Imagem deve ter um ID de entidade'));
  }
  
  if (!this.url) {
    return next(new Error('URL da imagem é obrigatória'));
  }
  
  next();
});

ImageSchema.index({ name: 1 }, { unique: true });
ImageSchema.index({ createdAt: 1 });
ImageSchema.index({ publicId: 1 });

module.exports = mongoose.model('Image', ImageSchema);
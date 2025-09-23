//siteEntity.js
const mongoose = require('mongoose');

const SiteSchema = new mongoose.Schema({
  singleton: {
    type: String,
    default: 'singleton',
    unique: true,
    required: true,
    immutable: true
  },

  primaryColor: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    maxlength: 6
  },

  secondColor: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    maxlength: 6
  },

  textColor: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    maxlength: 6
  }
}, { 
  timestamps: true,
  versionKey: false
});

SiteSchema.index({ singleton: 1 }, { unique: true });

SiteSchema.pre('save', async function(next) {
  if (this.isNew) {
    const existingSite = await this.constructor.findOne({});
    if (existingSite) {
      throw new Error('Apenas um registro Site pode existir');
    }
  }
  next();
});

module.exports = mongoose.model('Site', SiteSchema);
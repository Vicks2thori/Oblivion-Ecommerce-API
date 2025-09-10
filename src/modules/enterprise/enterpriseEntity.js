//enterpriseEntity.js
const mongoose = require('mongoose');

const EnterpriseSchema = new mongoose.Schema({
  singleton: {
    type: String,
    default: 'singleton',
    unique: true,
    required: true,
    immutable: true
  },

  nameEnterprise: { 
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },

  logoUrl: { 
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 255
  },

  cell: {
    type: String,
    required: false,
    trim: true,
    minlength: 11,
    maxlength: 11
  },

  nameInstagram: {
    type: String,
    required: false,
    trim: true,
    minlength: 1,
    maxlength: 30
  },

  nameFacebook: {
    type: String,
    required: false,
    trim: true,
    minlength: 5,
    maxlength: 50
  },

  email: {
    type: String,
    required: false,
    trim: true,
    minlength: 6,
    maxlength: 50
  }
}, { 
  timestamps: true,
  versionKey: false
});

EnterpriseSchema.index({ singleton: 1 }, { unique: true });

EnterpriseSchema.pre('save', async function(next) {
  if (this.isNew) {
    const existingEnterprise = await this.constructor.findOne({});

    if (existingEnterprise) {
      throw new Error('Apenas um registro Enterprise pode existir');
    };
  };
  next();
});

module.exports = mongoose.model('Enterprise', EnterpriseSchema);
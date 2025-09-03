//userEntity.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 80
  },

  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 64,
    maxlength: 64,
    unique: true
  },

  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 60,
    maxlength: 60
  },

  type: {
    type: String,
    required: true,
    enum: ['admin', 'client']
  },

  // Embedding - Subdocumentos
  //1:1
  adminDetails: {
    _id: false,
    status: { 
      type: Boolean
    }
  },

  //1:1
  clientDetails: {
    _id: false,
    cpf: { 
      type: String,
      trim: true,
      minlength: 64,
      maxlength: 64
    },

    cell: { 
      type: String,
      trim: true,
      minlength: 64,
      maxlength: 64
    }
  },

  deleted: {
    type: Boolean,
    required: true,
    default: false
  }
}, { 
  timestamps: true,
  versionKey: false
});

UserSchema.pre('validate', function(next) {
  if (this.type === 'admin') {
    delete this.clientDetails;

    if (!this.adminDetails) {
      this.adminDetails = { status: true };
    };
  } else if (this.type === 'client') {
    delete this.adminDetails;

    if (!this.clientDetails || !this.clientDetails.cpf || !this.clientDetails.cell) {
      return next(new Error('Para clientes, CPF e telefone são obrigatórios'));
    };
  };
  next();
});

UserSchema.index({ email: 1 });
UserSchema.index({ type: 1 });
UserSchema.index({ deleted: 1, type: 1 });

UserSchema.index(
  { 'clientDetails.cpf': 1 }, 
  { 
    unique: true, 
    sparse: true,
    partialFilterExpression: { 
      type: 'client',
      deleted: false,
      'clientDetails.cpf': { $exists: true, $ne: null }
    }
  }
);

UserSchema.index(
  { 'clientDetails.cell': 1 }, 
  { 
    unique: true, 
    sparse: true,
    partialFilterExpression: { 
      type: 'client',
      deleted: false,
      'clientDetails.cell': { $exists: true, $ne: null, $ne: '' }
    }
  }
);

module.exports = mongoose.model('User', UserSchema);
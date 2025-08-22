//userEntity.js
//Caso de uso de Embedding
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Nome é obrigatório'], //required + mensagem personalizada
    trim: true,  //Remove espaços inicio/fim
    minlength: [5, 'Nome deve ter um minímo de 5 caracteres'],
    maxlength: [80, 'Nome deve ter um máximo de 80 caracteres']
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    trim: true,
    minlength: [6, 'Email deve ter um minímo de 6 caracteres'],
    maxlength: [50, 'Email deve ter um máximo de 50 caracteres'],
    unique: true, //validar no service
  },
  password: {
    type: String,
    required: [true, 'Senha é obrigatória'],
    trim: true,
    minlength: [8, 'Senha deve ter um minímo de 8 caracteres'],
    maxlength: [255, 'Senha deve ter um máximo de 255 caracteres']
  },
  type: {
    type: String,
    required: true,
    enum: ['admin', 'client']
  },

  // EMBEDDING - Subdocumentos
  adminDetails: {
    _id: false,
    type: {
      status: { 
        type: Boolean,
        default: true },
    },
    required: function() { return this.type === 'admin'; }
  },
  
  clientDetails: {
    _id: false,
    type: {
      cpf: { 
        type: String,
        required: [true, 'Cpf é obrigatório'],
        trim: true,
        minlength: [11, 'Cpf deve ter exatamente 11 digitos (min)'],
        maxlength: [11, 'Cpf deve ter exatamente 11 digitos (max)'],
        unique: true //Unique
      },
      cell: { 
        type: String,
        required: [true, 'Telefone é obrigatório'],
        trim: true,
        minlength: [11, 'Telefone deve ter exatamente 11 digitos (min)'],
        maxlength: [11, 'Telefone deve ter exatamente 11 digitos (max)'],
        unique: true //Unique
      },
    },
    required: function() { return this.type === 'client'; }
  },

  deleted: {
    type: Boolean,
    required: true,
    default: false
  }
}, { 
  timestamps: true, //controle automático de tempo
  versionKey: false //remove campo inutil
});

//indexação para performance
UserSchema.index({ email: 1 }); // Email único
UserSchema.index({ type: 1 }); // Filtrar por tipo
UserSchema.index({ deleted: 1, type: 1 }); // Composto principal

//Client
UserSchema.index(
  { 'clientDetails.cpf': 1 }, 
  { 
    unique: true, 
    sparse: true,  // Só cria índice se campo existir
    partialFilterExpression: { 
      type: 'client',
      deleted: false 
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
      deleted: false 
    }
  }
);

module.exports = mongoose.model('User', UserSchema);
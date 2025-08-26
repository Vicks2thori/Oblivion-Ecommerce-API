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
    status: { 
      type: Boolean,
      default: true 
    }
  },
  
  clientDetails: {
    _id: false,
    cpf: { 
      type: String,
      trim: true,
      minlength: [11, 'Cpf deve ter exatamente 11 digitos (min)'],
      maxlength: [11, 'Cpf deve ter exatamente 11 digitos (max)']
    },
    cell: { 
      type: String,
      trim: true,
      minlength: [11, 'Telefone deve ter exatamente 11 digitos (min)'],
      maxlength: [11, 'Telefone deve ter exatamente 11 digitos (max)']
    }
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

// Validação condicional - campos obrigatórios por tipo
UserSchema.pre('validate', function(next) {
  if (this.type === 'admin') {
    // Para admin: clientDetails deve ser completamente removido
    this.clientDetails = undefined;
    // Para admin: adminDetails é opcional mas pode ter valor padrão
    if (!this.adminDetails) {
      this.adminDetails = { status: true };
    }
  } else if (this.type === 'client') {
    // Para client: adminDetails deve ser completamente removido
    this.adminDetails = undefined;
    
    // Para client: cpf e cell são obrigatórios
    if (!this.clientDetails || !this.clientDetails.cpf || !this.clientDetails.cell) {
      return next(new Error('Para clientes, CPF e telefone são obrigatórios'));
    }
  }
  next();
});

//indexação para performance
UserSchema.index({ email: 1 }); // Email único
UserSchema.index({ type: 1 }); // Filtrar por tipo
UserSchema.index({ deleted: 1, type: 1 }); // Composto principal

//Client - CPF (só para clientes)
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

//Client - Telefone (só para clientes)
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
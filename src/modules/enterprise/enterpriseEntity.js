//enterpriseEntity.js
const mongoose = require('mongoose');

const EnterpriseSchema = new mongoose.Schema({
  // Campo especial para garantir unicidade - apenas um registro pode existir
  singleton: {
    type: String,
    default: 'singleton',
    unique: true,
    required: true,
    immutable: true // Impede modificação após criação
  },
  name: { 
    type: String, 
    required: [true, 'Nome é obrigatório'], //required + mensagem personalizada
    trim: true,  //Remove espaços inicio/fim
    minlength: [2, 'Nome deve ter mais que 2 caracteres'],
    maxlength: [50, 'Nome deve menos que 50 caracteres']
  },
  logoUrl: { 
    type: String, 
    required: [true, 'Logo é obrigatório'], //required + mensagem personalizada
    trim: true,  //Remove espaços inicio/fim
    minlength: [2, 'Logo deve ter mais que 2 caracteres'],
    maxlength: [255, 'Logo deve menos que 255 caracteres']
  },
  phone: {
    type: String, 
    required: false, //required + mensagem personalizada
    trim: true,  //Remove espaços inicio/fim
    minlength: [11, 'Telefone deve ter exatamente 11 caracteres'],
    maxlength: [11, 'Telefone deve ter exatamente 11 caracteres']
  },
  instagram: { //só o nome do instagram
    type: String, 
    required: false, //required + mensagem personalizada
    trim: true,  //Remove espaços inicio/fim
    minlength: [1, 'Instagram deve ter mais que 1 caracteres'],
    maxlength: [30, 'Instagram deve ter menos que 30 caracteres']
  },
  facebook: {
    type: String, 
    required: false, //required + mensagem personalizada
    trim: true,  //Remove espaços inicio/fim
    minlength: [5, 'Facebook deve ter mais que 5 caracteres'],
    maxlength: [50, 'Facebook deve menos que 50 caracteres']
  },  
  email: {
    type: String, 
    required: false, //required + mensagem personalizada
    trim: true,  //Remove espaços inicio/fim
    minlength: [6, 'Email deve ter mais que 6 caracteres'],
    maxlength: [50, 'Email deve menos que 50 caracteres']
  }
}, { 
  timestamps: true, //controle automático de tempo
  versionKey: false //remove campo inutil
});

// Índice único para garantir apenas um registro
EnterpriseSchema.index({ singleton: 1 }, { unique: true });

// Middleware para prevenir criação de múltiplos registros (vou criar um arquivo para isso?)
EnterpriseSchema.pre('save', async function(next) {
  if (this.isNew) {
    const existingEnterprise = await this.constructor.findOne({});
    if (existingEnterprise) {
      throw new Error('Apenas um registro Enterprise pode existir');
    }
  }
  next();
});

module.exports = mongoose.model('Enterprise', EnterpriseSchema);
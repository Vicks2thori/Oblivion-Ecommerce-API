//siteEntity.js
const mongoose = require('mongoose');

const SiteSchema = new mongoose.Schema({
  // Campo especial para garantir unicidade - apenas um registro pode existir
  singleton: {
    type: String,
    default: 'singleton',
    unique: true,
    required: true,
    immutable: true // Impede modificação após criação
  },
  primaryColor: { 
    type: String, 
    required: [true, 'primaryColor é obrigatório'], //required + mensagem personalizada
    trim: true,  //Remove espaços inicio/fim
    minlength: [6, 'primaryColor deve exatamente 6 caracteres'],
    maxlength: [6, 'primaryColor deve exatamente 6 caracteres'], //isso no caso de não receber #
    match: [/^[0-9A-Fa-f]{6}$/, 'primaryColor deve ser um hexadecimal válido']
  },
  secondColor: { 
    type: String, 
    required: [true, 'secondColor é obrigatório'], //required + mensagem personalizada
    trim: true,  //Remove espaços inicio/fim
    minlength: [6, 'secondColor deve exatamente 6 caracteres'],
    maxlength: [6, 'secondColor deve exatamente 6 caracteres'], //isso no caso de não receber #
    match: [/^[0-9A-Fa-f]{6}$/, 'secondColor deve ser um hexadecimal válido']
  },
  textColor: {
    type: String, 
    required: [true, 'textColor é obrigatório'], //required + mensagem personalizada
    trim: true,  //Remove espaços inicio/fim
    minlength: [6, 'textColor deve exatamente 6 caracteres'],
    maxlength: [6, 'textColor deve exatamente 6 caracteres'], //isso no caso de não receber #
    match: [/^[0-9A-Fa-f]{6}$/, 'textColor deve ser um hexadecimal válido']
  }
}, { 
  timestamps: true, //controle automático de tempo
  versionKey: false //remove campo inutil
});

// Índice único para garantir apenas um registro
SiteSchema.index({ singleton: 1 }, { unique: true });

// Middleware para prevenir criação de múltiplos registros (vou criar um arquivo para isso?)
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
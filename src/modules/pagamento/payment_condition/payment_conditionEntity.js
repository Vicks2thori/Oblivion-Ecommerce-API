//payment_conditionEntity.js
const mongoose = require('mongoose');

const PaymentConditionSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Nome é obrigatório'], //required + mensagem personalizada
    trim: true,  //Remove espaços inicio/fim
    minlength: [2, 'Nome deve ter um minímo de 2 caracteres'],
    maxlength: [50, 'Nome deve ter um máximo de 50 caracteres']
  },
  status: { 
    type: Boolean,
    required: true,
    default: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('PaynentCondition', PaymentConditionSchema);
//paymentEntity.js
const mongoose = require('mongoose');

const paymentImages = {
  Pix: '/images/pix.png',
  Others: '/images/others.png',
  Money: '/images/money.png',
  Card: '/images/card.png',
  Voucher: '/images/voucher.png',
};

const PaymentSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Nome é obrigatório'], //required + mensagem personalizada
    trim: true,  //Remove espaços inicio/fim
    minlength: [2, 'Nome deve ter um minímo de 2 caracteres'],
    maxlength: [50, 'Nome deve ter um máximo de 50 caracteres'],
    //unique: true, //Quando o unique esta ativo ele retorna um erro, mesmo quando o item foi "deletado"
  },
  imageType:{
    type: String,
    required:[true, 'Imagem do pagamento é orbigatório'],
    enum: ['Pix', 'Others', 'Money', 'Card', 'Voucher']
  },
  //REFERENCING - subdocumentos
  paymentConditions: [
    {
    _id: false, //Impede que o Mongo gere um _id para o subdocumento
    conditionsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PaymentCondition',
      required: [true, 'conditionsId é obrigatório']
      //para name e status vou usar o populate no controller
    },
    action: {
      type: String,
      enum: ["add", "remove"]
    }
    },
  ],
  status: { 
    type: Boolean,
    required: true,
    default: true 
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false
  }
}, { 
  timestamps: true, //controle automático de tempo
  versionKey: false, //remove campo inutil
});

// Validação customizada para garantir pelo menos uma condição
PaymentSchema.pre('save', function(next) {
  if (this.paymentConditions.length === 0) {
    return next(new Error('Pagamento deve ter pelo menos uma condição de pagamento'));
  }
  next();
});

PaymentSchema.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate();
  if (update.paymentConditions && update.paymentConditions.length === 0) {
    return next(new Error('Pagamento deve ter pelo menos uma condição de pagamento'));
  }
  next();
});

// Virtual para mapear imageId para URL real da imagem
PaymentSchema.virtual('imageUrl').get(function() {
  return paymentImages[this.imageType];
});

// Incluir virtuals na saída JSON e Object
PaymentSchema.set('toObject', { virtuals: true });

// Índices para performance
PaymentSchema.index({ name: 1 });
PaymentSchema.index({ status: 1, deleted: 1 });

module.exports = mongoose.model('Payment', PaymentSchema);

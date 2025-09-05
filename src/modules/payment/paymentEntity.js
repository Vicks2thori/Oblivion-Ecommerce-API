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
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },

  imageType:{
    type: String,
    required:true,
    enum: ['Pix', 'Others', 'Money', 'Card', 'Voucher']
  },

  //Referencing - subdocumento
  //1:N
  paymentConditions: [
    {
    _id: false,
    conditionsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PaymentCondition',
      required: true
    },
  },
  ],

  status: { 
    type: Boolean,
    default: true 
  },

  //Soft delete
  deleted: {
    type: Boolean,
    default: false
  }
}, { 
  timestamps: true,
  versionKey: false
});

PaymentSchema.pre('save', function(next) {
  if (this.paymentConditions.length === 0) {
    return next(new Error('Pagamento deve ter pelo menos uma condição de pagamento'));
  };
  next();
});

PaymentSchema.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate();
  if (update.paymentConditions && update.paymentConditions.length === 0) {
    return next(new Error('Pagamento deve ter pelo menos uma condição de pagamento'));
  };
  next();
});

PaymentSchema.virtual('imageUrl').get(function() {
  return paymentImages[this.imageType];
});

PaymentSchema.set('toObject', { virtuals: true });

PaymentSchema.index({ name: 1 });
PaymentSchema.index({ status: 1, deleted: 1 });

module.exports = mongoose.model('Payment', PaymentSchema);

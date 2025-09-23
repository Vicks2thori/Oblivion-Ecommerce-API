//payment_conditionEntity.js
const mongoose = require('mongoose');

const PaymentConditionSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },

  status: { 
    type: Boolean,
    default: true 
  },

  deleted: {
    type: Boolean,
    default: false
  }
}, { 
  timestamps: true,
  versionKey: false
});

PaymentConditionSchema.index({name: 1})
PaymentConditionSchema.index({status: 1, deleted: 1})

module.exports = mongoose.model('PaymentCondition', PaymentConditionSchema);
//orderEntity.js
const mongoose = require('mongoose');
const { generateOrderCode } = require('./orderUtils');

const OrderSchema = new mongoose.Schema({
  date: { 
    type: Date,
    default: Date.now
  },
  
  code: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    default: null
  },
  
  client: {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    clientName: {
      type: String,
      required: true,
      trim: true
    },

    clientCell: {
      type: String,
      required: true,
      trim: true
    }
  },
    
    products: [
      {
      _id: false,
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },

      quantity: {
        type: Number,
        required: true,
        min: 1
      },

      productName: {
        type: String,
        required: true,
        trim: true
      },

      productPrice: {
        type: Number,
        required: true,
        min: 0
      },

      productSubtotal: {
        type: Number,
        required: true,
        min: 0
      }
      },
    ],

  payment: {
    _id: false,
    methodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',
      required: true
    },

    methodName: {
      type: String,
      required: true,
      trim: true
    },

    conditionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PaymentCondition',
      required: true
    },

    conditionName: {
      type: String,
      required: true,
      trim: true
    }
  },

  total: {
    type: Number,
    required: true,
    min: 0.01
  },

  status: {
    type: String,
    enum: ['pending', 'in_progress', 'cancel', 'approved'],
    required: true,
    default: 'pending'
  }
}, {
  timestamps: true,
  versionKey: false
});

OrderSchema.index({code: 1})
OrderSchema.index({status: 1})
OrderSchema.index({'payment.method_id': 1})

OrderSchema.pre('validate', async function(next) {
  try {
    this.code = await generateOrderCode();
  } catch (error) {
    return next(error);
  }
  next();
});

module.exports = mongoose.model('Order', OrderSchema);
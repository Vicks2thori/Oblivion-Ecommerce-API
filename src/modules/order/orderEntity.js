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
    required: [true, 'Código é obrigatório'],
    trim: true,
    unique: true,
    default: null
  },
  
  client: {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'userId é obrigatório']
    },

    client_name: {
      type: String,
      required: [true, 'Nome é obrigatório'],
      trim: true
    },

    client_phone: {
      type: String,
      required: [true, 'Telefone é obrigatório'],
      trim: true
    }
  },
    
    products: [
      {
      _id: false,
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'productId é obrigatório']
      },

      quantity: {
        type: Number,
        required: [true, 'quantity é obrigatório'],
        min: [1, 'quantity deve ser maior que 0']
      },

      product_name: {
        type: String,
        required: [true, 'Nome do produto é obrigatório'],
        trim: true
      },

      product_price: {
        type: Number,
        required: [true, 'Preço do produto é obrigatório'],
        min: [0, 'Preço deve ser maior ou igual a 0']
      },

      product_subtotal: {
        type: Number,
        required: [true, 'subtotal é obrigatório'],
        min: [0, 'subtotal deve ser maior ou igual a 0']
      }
      },
    ],

  payment: {
    _id: false,
    methodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',
      required: [true, 'Método de pagamento é obrigatório']
    },

    method_name: {
      type: String,
      required: [true, 'Nome do método de pagamento é obrigatório'],
      trim: true
    },

    conditionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PaymentCondition',
      required: [true, 'Condição de pagamento é obrigatória']
    },

    condition_name: {
      type: String,
      required: [true, 'Nome da condição de pagamento é obrigatório'],
      trim: true
    }
  },

  total: {
    type: Number,
    required: [true, 'total é obrigatório'],
    min: [0.01, 'total deve ser maior que 0']
  },

  status: {
    type: String,
    enum: ['pending', 'in_progress', 'cancel', 'approved'],
    required: [true, 'status é obrigatório'],
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
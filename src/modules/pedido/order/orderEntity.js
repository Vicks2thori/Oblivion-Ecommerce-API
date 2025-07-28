//orderEntity.js
const mongoose = require('mongoose');
const { generateOrderCode } = require('./orderUtills'); //importa utilitário para geração de códigos de pedido

const OrderSchema = new mongoose.Schema({
  date: { 
    type: Date,
    default: Date.now
  },
  code: {
    type: String,
    required: [true, 'Código é obrigatório'],
    trim: true,
    unique: true, //garante que o código seja único
    default: null //será gerado automaticamente
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'userId é obrigatório']
  },
    //REFERENCING - subdocumentos
    products: [
      {
      _id: false, //Impede que o Mongo gere um _id para o subdocumento
      productId: { //faz sentido usar o productId? se eu posso só puxar os atributos?
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'productId é obrigatório']
        //para os atributos vou usar o populate no controller
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
      product_quantity: {
        type: Number,
        required: [true, 'quantity é obrigatório'],
        //max deveria ser o estoque do produto (mas isso só se o admin quiser, mas seria mais um campo para colocar)
        min: [1, 'quantity deve ser maior que 0']
      },
      product_subtotal: {
        type: Number,
        required: [true, 'subtotal é obrigatório'],
        min: [0, 'subtotal deve ser maior ou igual a 0']
      }
      },
    ],
  payment: {
    methodId: { //faz sentido usar o methodId? se eu posso só puxar os atributos?
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
    default: 'pending' //ao criar um pedido, ele será pendente
  }
}, { 
  timestamps: true, //controle automático de tempo
  versionKey: false //remove campo inutil
});

//indexação para performance
OrderSchema.index({code: 1})
OrderSchema.index({status: 1})
OrderSchema.index({'payment.method_id': 1})

// Middleware para gerar código único automaticamente
OrderSchema.pre('save', async function(next) {
  // Gera código sempre que o pedido for salvo
  try {
    this.code = await generateOrderCode();
  } catch (error) {
    return next(error);
  }
  next();
});

module.exports = mongoose.model('Order', OrderSchema);
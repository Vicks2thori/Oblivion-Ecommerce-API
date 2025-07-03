//payment_conditionEntity.js
const mongoose = require('mongoose');

const PaymentConditionSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Nome é obrigatório'], //required + mensagem personalizada
    trim: true,  //Remove espaços inicio/fim
    minlength: [2, 'Nome deve ter um minímo de 2 caracteres'],
    maxlength: [50, 'Nome deve ter um máximo de 50 caracteres'],
    unique: true,
    index: true //aponta o indice
  },
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
  versionKey: false //remove campo inutil
});

//CRUD

//Create
PaymentConditionSchema.statics.createPaymentCondition = async function(data) {
  const paymentCondition = new this(data);
  return await paymentCondition.save();
};


//Read
//All
PaymentConditionSchema.statics.getAllPaymentConditions = async function() {
  return await this.find({ delete: false }).sort({ name: 1 });
};

//by ID
PaymentConditionSchema.statics.getPaymentConditionById = async function(id) {
  const paymentCondition = await this.findById({
    id: id,
    deleted: false //não retornar itens deletados
  });
  if (!paymentCondition) {
    throw new Error('Condição de pagamento não encontrada');
  }
  return paymentCondition;
};


//Update
PaymentConditionSchema.statics.updatePaymentCondition = async function(id, validatedData) {
  try {
    const updated = await this.findOneAndUpdate(
      { 
        _id: id, 
        isDeleted: false  //só atualiza se não foi deletado
      },
      validatedData, 
      { 
        new: true, 
        runValidators: true 
      }
    );
    
    if (!updated) {
      throw new Error('Condição de pagamento não encontrada');
    }
    
    return updated;
  } catch (error) {
    throw new Error(`Erro ao atualizar condição de pagamento: ${error.message}`);
  }
};


//Delete (soft delete)
PaymentConditionSchema.statics.deletePaymentCondition = async function(id) {
  const deleted = await this.findByIdAndUpdate({
    id: id,
    deleted: false
    }, 
    { deleted: true }, 
    { new: true }
  );
  
  if (!deleted) {
    throw new Error('Condição de pagamento não encontrada');
  }
  
  return deleted;
};

module.exports = mongoose.model('PaymentCondition', PaymentConditionSchema);
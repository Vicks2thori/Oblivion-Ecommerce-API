//paymentService.js
const Payment = require("./paymentEntity");
const { filterPaymentConditionsActive,
  addPaymentConditionInPayment,
  removePaymentConditionInPayment } = require('./paymentUtils')


//CREATE
const createPayment = async function(data) {
  try { 
    const payment = new Payment(data);
    return await payment.save();
  } catch (error) {
    throw new Error(`Erro ao criar pagamento: ${error.message}`);
  };
};


//READ
const getAllPayments = async function() {
  try {
    return await Payment.find({deleted: false}).sort({name: 1});
  } catch (error) {
    throw new Error(`Erro ao buscar todos os pagamento: ${error.message}`);
  };
};

const getActivePayments = async function() {
  try {
    return await Payment.find({
      deleted: false,
      status: true 
    })
    .populate({
      path: 'paymentConditions.conditionsId',
      select: 'name status deleted'
    })
    .sort({ name: 1 })
    .then(payments => {
      return payments.map(payment => {
        const activePaymentConditions = filterPaymentConditionsActive(payment.paymentConditions);
        
        return {
          _id: payment._id,
          name: payment.name,
          paymentConditions: activePaymentConditions
        };
      });
    });
  } catch (error) {
    throw new Error(`Erro ao buscar categorias ativas: ${error.message}`);
  };
};

const getPaymentById = async function(id) {
  try {
    const getById = await Payment.findById(id);
    
    if (!getById || getById.deleted) {
      throw new Error('Pagamento não encontrado');
    };
    
    return getById;
  } catch (error) {
    throw new Error(`Erro ao buscar pagamento: ${error.message}`);
  };
};

//UPDATE
const updatePayment = async function(id, updateData) {
  try {
    const payment = await Payment.findById(id);
    
    if (!payment || payment.deleted) {
      throw new Error('Pagamento não encontrado');
    };

    if (updateData.paymentConditions && Array.isArray(updateData.paymentConditions)) {
      for (const condition of updateData.paymentConditions) {
        if (condition.action === 'add') {
          await addPaymentConditionInPayment(payment._id, condition.conditionsId);

        } else if (condition.action === 'remove') {
          await removePaymentConditionInPayment(payment._id, condition.conditionsId);
        };
      };
      
      delete updateData.paymentConditions;
    };
    
    Object.assign(payment, updateData);
    return await Payment.findById(id);
  } catch (error) {
    throw new Error(`Erro ao atualizar pagamento: ${error.message}`);
  };
};

//DELETE
const deletePayment = async function(id) {
 try {
    const deleted = await Payment.findOneAndUpdate(
      {_id: id, deleted: false},
      {deleted: true},
      {new: true}
    );
    
    if (!deleted) {
      throw new Error('Pagamento não encontrado');
    };
    
    return deleted;
  } catch (error) {
    throw new Error(`Erro ao deletar condição de pagamento: ${error.message}`);
  };
};

module.exports = {
    createPayment,
    getAllPayments,
    getActivePayments,
    getPaymentById,
    updatePayment,
    deletePayment
};
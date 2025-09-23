//payment_conditionService.js
const PaymentCondition = require("./payment_conditionEntity");


//CREATE
const createPaymentCondition = async function(data) {
  try { 
    const paymentCondition = new PaymentCondition(data);
    return await paymentCondition.save();
  } catch (error) {
    throw new Error(`Erro ao criar condição de pagamento: ${error.message}`);
  };
};


//READ
const getAllPaymentConditions = async function() {
  try {
    return await PaymentCondition.find({deleted: false}).sort({name: 1});
  }catch (error) {
    throw new Error(`Erro ao buscar todas as condições de pagamento: ${error.message}`);
  }
};

const getPaymentConditionById = async function(id) {
  try {
    const getById = await PaymentCondition.findById(id);
    
    if (!getById || getById.deleted) {
      throw new Error('Condição de pagamento não encontrada');
    };
    
    return getById;
  } catch (error) {
    throw new Error(`Erro ao buscar condição de pagamento: ${error.message}`);
  };
};


//UPDATE
const updatePaymentCondition = async function(id, updateData) {
  try {
    const updated = await PaymentCondition.findOneAndUpdate(
      {_id: id, deleted: false },
      updateData, 
      {new: true, runValidators: true}
    );
    
    if (!updated) {
      throw new Error('Condição de pagamento não encontrada');
    };
    
    return updated;
  } catch (error) {
    throw new Error(`Erro ao atualizar condição de pagamento: ${error.message}`);
  };
};


//DELETE
const deletePaymentCondition = async function(id) {
 try {
    const deleted = await PaymentCondition.findOneAndUpdate(
      {_id: id, deleted: false},
      {deleted: true},
      {new: true}
    );
    
    if (!deleted) {
      throw new Error('Condição de pagamento não encontrada');
    };
    
    return deleted;
  } catch (error) {
    throw new Error(`Erro ao deletar condição de pagamento: ${error.message}`);
  };
};

module.exports = {
    createPaymentCondition,
    getAllPaymentConditions,
    getPaymentConditionById,
    updatePaymentCondition,
    deletePaymentCondition
};
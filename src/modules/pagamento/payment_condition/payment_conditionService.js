//payment_conditionService.js
const PaymentCondition = require("./payment_conditionEntity");

//CRUD

//Create
const createPaymentCondition = async function(data) {
  try { 
    const paymentCondition = new PaymentCondition(data); //cria um novo
    return await paymentCondition.save(); //salva no banco
  }catch (error) {
    throw new Error(`Erro ao criar condição de pagamento: ${error.message}`);
  }
};


//Read
//All
const getAllPaymentConditions = async function() {
  try {
    return await PaymentCondition.find({deleted: false}).sort({name: 1});
  }catch (error) {
    throw new Error(`Erro ao buscar todas as condições de pagamento: ${error.message}`);
  }
};

//Active
const getActivePaymentConditions = async function() {
  try {
    return await PaymentCondition.find({
      deleted: false,
      status: true 
    }).sort({ name: 1 });
  }catch (error) {
    throw new Error(`Erro ao buscar condições de pagamento ativas: ${error.message}`);
  }
};

//By ID
const getPaymentConditionById = async function(id) {
  try {
    const getById = await PaymentCondition.findById(id);
    
    if (!getById || getById.deleted) { //se não encontrou ou encontrou e esta deletada
      throw new Error('Condição de pagamento não encontrada'); //cria um novo erro
    }
    
    return getById;
  } catch (error) {
    throw new Error(`Erro ao buscar condição de pagamento: ${error.message}`);
  }
};


//Update
const updatePaymentCondition = async function(id, updateData) {
  try {
    const updated = await PaymentCondition.findOneAndUpdate(
      {_id: id, deleted: false }, //só atualiza se não foi deletado
      updateData, 
      {new: true, runValidators: true}
    );
    
    if (!updated) {
      throw new Error('Condição de pagamento não encontrada'); //novo erro caso não encontre
    }
    
    return updated;
  } catch (error) {
    throw new Error(`Erro ao atualizar condição de pagamento: ${error.message}`);
  }
};


//Delete (soft delete)
const deletePaymentCondition = async function(id) {
 try {
    const deleted = await PaymentCondition.findOneAndUpdate(
      {_id: id, deleted: false},
      {deleted: true},
      {new: true}
    );
    
    if (!deleted) {
      throw new Error('Condição de pagamento não encontrada');
    }
    
    return deleted;
  } catch (error) {
    throw new Error(`Erro ao deletar condição de pagamento: ${error.message}`);
  }
};

module.exports = {
    createPaymentCondition,
    getAllPaymentConditions,
    getActivePaymentConditions,
    getPaymentConditionById,
    updatePaymentCondition,
    deletePaymentCondition
};
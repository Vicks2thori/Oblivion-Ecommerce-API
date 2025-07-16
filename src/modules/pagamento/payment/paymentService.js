//paymentService.js
const Payment = require("./paymentEntity");

//CRUD

//Create
const createPayment = async function(data) {
  try { 
    const payment = new Payment(data); //cria um novo
    return await payment.save(); //salva no banco
  }catch (error) {
    throw new Error(`Erro ao criar pagamento: ${error.message}`);
  }
};


//Read
//All
const getAllPayments = async function() {
  try {
    return await Payment.find({deleted: false}).sort({name: 1});
  }catch (error) {
    throw new Error(`Erro ao buscar todos os pagamento: ${error.message}`);
  }
};

//Active
const getActivePayments = async function() {
  try {
    return await Payment.find({
      deleted: false,
      status: true 
    }).sort({ name: 1 });
  }catch (error) {
    throw new Error(`Erro ao buscar os pagamento ativos: ${error.message}`);
  }
};

//By ID
const getPaymentById = async function(id) {
  try {
    const getById = await Payment.findById(id);
    
    if (!getById || getById.deleted) { //se não encontrou ou encontrou e esta deletada
      throw new Error('Pagamento não encontrado'); //cria um novo erro
    }
    
    return getById;
  } catch (error) {
    throw new Error(`Erro ao buscar pagamento: ${error.message}`);
  }
};


//Update
const updatePayment = async function(id, updateData) {
  try {
    const updated = await Payment.findOneAndUpdate(
      {_id: id, deleted: false }, //só atualiza se não foi deletado
      updateData, 
      {new: true, runValidators: true}
    );
    
    if (!updated) {
      throw new Error('Pagamento não encontrado'); //novo erro caso não encontre
    }
    
    return updated;
  } catch (error) {
    throw new Error(`Erro ao atualizar pagamento: ${error.message}`);
  }
};


//Delete (soft delete)
const deletePayment = async function(id) {
 try {
    const deleted = await Payment.findOneAndUpdate(
      {_id: id, deleted: false},
      {deleted: true},
      {new: true}
    );
    
    if (!deleted) {
      throw new Error('Pagamento não encontrado');
    }
    
    return deleted;
  } catch (error) {
    throw new Error(`Erro ao deletar condição de pagamento: ${error.message}`);
  }
};

module.exports = {
    createPayment,
    getAllPayments,
    getActivePayments,
    getPaymentById,
    updatePayment,
    deletePayment
};
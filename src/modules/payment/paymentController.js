//paymentController.js
const { createPaymentSchema, updatePaymentSchema } = require('./paymentDto');
const Payment = require('./paymentService');


//CREATE
async function create(req, res) {
  try {
    const { error, value } = createPaymentSchema.validate(req.body);
    if (error) {
      //Dados inválidos
      return res.status(400).json({
        success: false,
        message: '400 - Dados inválidos',
        errors: error.details.map(d => d.message)
      });
    };

    const payment = await Payment.createPayment(value);

    //Sucesso
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: payment
    });
  } catch (error) {
    //Erro interno do servidor
    return res.status(500).json({
      success: false,
      message: error.message
    });
  };
};


//READ
async function getAll(req, res) {
  try {
    const payment = await Payment.getAllPayments();

    //Sucesso
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: payment
    });
  } catch (error) {
    //Erro interno do servidor
    return res.status(500).json({
      success: false,
      message: error.message
    });
  };
};

async function getActive(req, res) {
  try {
    const activePayments = await Payment.getActivePayments();

    //Sucesso
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: activePayments
    });
  } catch (error) {
    //Erro interno do servidor
    return res.status(500).json({
      success: false,
      message: error.message
    });
  };
};

async function getById(req, res) {
  try {
    const { id } = req.params;
    const payment = await Payment.getPaymentById(id);

    //Sucesso
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: payment
    });
  } catch (error) {
    //Erro interno do servidor
    return res.status(500).json({
      success: false,
      message: error.message 
    });
  };
};


//UPDATE
async function update(req, res) {
  try {
    const { id } = req.params;
    const { error, value } = updatePaymentSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        errors: error.details.map(d => d.message)
      });
    };
    
    const result = await Payment.updatePayment(id, value);
    
    //Sucesso
    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    //Erro interno do servidor
    return res.status(500).json({
      success: false,
      message: error.message
    });
  };
};


//DELETE
async function deletePayment(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Payment.deletePayment(id);

    //Sucesso geral
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: deleted
    });

  } catch (error) {
    //Erro interno do servidor
    return res.status(500).json({
      success: false,
      message: error.message
    });
  };
};


module.exports = {
  create,
  getAll,
  getActive,
  getById,
  update,
  deletePayment
};
//payment_conditionController.js
const { createPaymentConditionSchema, updatePaymentConditionSchema } = require('./payment_conditionDto');
const PaymentCondition = require('./payment_conditionService');


//CREATE
async function create(req, res) {
  try {
    const { error, value } = createPaymentConditionSchema.validate(req.body);

    if (error) {
      //Dados inválidos
      return res.status(400).json({
        success: false,
        message: `400 - Dados inválidos: ${error.details.map(d => d.message)}`
      });
    };

    const paymentCondition = await PaymentCondition.createPaymentCondition(value);

    //Sucesso
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: paymentCondition
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
    const paymentCondition = await PaymentCondition.getAllPaymentConditions();

    //Sucesso
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: paymentCondition
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
    const paymentCondition = await PaymentCondition.getPaymentConditionById(id);

    //Sucesso geral
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: paymentCondition
    });

  }catch (error) {
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

    const { error, value } = updatePaymentConditionSchema.validate(req.body);

    if (error) {
      //Dados inválidos
      return res.status(400).json({
        success: false,
        message: `400 - Dados inválidos: ${error.details.map(d => d.message)}`
      });
    };
    
    const paymentCondition = await PaymentCondition.updatePaymentCondition(id, value);
    
    //Sucesso
    return res.status(200).json({
      success: true,
      data: paymentCondition
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
async function deletePaymentCondition(req, res) {
  try {
    const { id } = req.params;
    const deleted = await PaymentCondition.deletePaymentCondition(id);

    //Sucesso
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
  getById,
  update,
  deletePaymentCondition
};
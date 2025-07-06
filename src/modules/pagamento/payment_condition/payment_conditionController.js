const { createPaymentConditionSchema, updatePaymentConditionSchema } = require('./paymentConditionDto');
const PaymentCondition = require('./paymentConditionEntity');

//CRUD

//Create
async function create(req, res) {
  try {
    // 1. Validar DTO
    const { error, value } = createPaymentConditionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos',
        errors: error.details.map(d => d.message)
      });
    }

    // 2. Criar através da Entity
    const paymentCondition = await PaymentCondition.createPaymentCondition(value);

    // 3. Resposta padronizada
    res.status(201).json({
      success: true,
      message: 'Condição de pagamento criada com sucesso',
      data: paymentCondition
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}


//Read

//Get all
async function getAll(req, res) {
  try {
    const paymentConditions = await PaymentCondition.getAllPaymentConditions();

    res.json({
      success: true,
      data: paymentConditions
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar condições de pagamento'
    });
  }
}

//Get by id
async function getById(req, res) {
  try {
    const { id } = req.params;
    const paymentCondition = await PaymentCondition.getPaymentConditionById(id);

    res.json({
      success: true,
      data: paymentCondition
    });

  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
}


//Update
async function update(req, res) {
  try {
    const { id } = req.params;
    
    const { error, value } = updatePaymentConditionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        errors: error.details.map(d => d.message)
      });
    }

    const updated = await PaymentCondition.updatePaymentCondition(id, value);

    res.json({
      success: true,
      message: 'Condição atualizada com sucesso',
      data: updated
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

//Delete
async function deletePaymentCondition(req, res) {
  try {
    const { id } = req.params;
    const deleted = await PaymentCondition.deletePaymentCondition(id);

    res.json({
      success: true,
      message: 'Condição excluída com sucesso',
      data: deleted
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  deletePaymentCondition
};

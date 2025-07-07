//payment_conditionController.js
const { createPaymentConditionSchema, updatePaymentConditionSchema } = require('./payment_conditionDto');
const PaymentCondition = require('./payment_conditionService');
const { badRequest400, responseHelpersOk, responseHelpersError } = require("../../../routes/responseHelpers");

//CRUD

//Create
async function create(req, res) {
  try {
    //Validar DTO
    const { error, value } = createPaymentConditionSchema.validate(req.body); //validate do Joi retorna um erro(null se estiver ok) e os valores
    if (error) {
      //400 - Dados inválidos
      return res.status(400).json({
        success: false,
        message: '400 - Dados inválidos',
        errors: error.details.map(d => d.message) //extrai só as mensagens
      });
    };

    //Criar através do Service
    const paymentCondition = await PaymentCondition.createPaymentCondition(value);



    //RESPOSTAS PADRONIZADAS (400 o Joi valida)

    //OK
    //200 - Sucesso geral
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: paymentCondition
    });

    //201 - Criado com sucesso
    res.status(201).json({
      success: true,
      message: '201 - Condição de pagamento criada com sucesso',
      data: paymentCondition
    });

  }catch (error) {

    //ERROR
    //401 - Não autenticado (TEMPORÁRIO até a criação do middleware)
    res.status(401).json({
      success: false,
      message: '401 - Não autenticado'
    });

    //403 - Não autorizado (TEMPORÁRIO até a criação do middleware)
    res.status(403).json({
      success: false,
      message: '403 - Não autorizado'
    });

    //404 - Não encontrado
    res.status(404).json({
      success: false,
      message: '404 - Não encontrado'
    });

    //409 - Conflito
    res.status(409).json({
      success: false,
      message: '409 - Conflito com recurso existente'
    });

    //422 - Entidade não processavel
    res.status(404).json({
      success: false,
      message: '422 - Não foi possivel processar requisição'
    });

    //500 - Erro interno do servidor
    res.status(500).json({
      success: false,
      message: '500 - Erro interno do servidor'
    });
  };
};


//Read

//All
async function getAll(req, res) {
  try {
    const paymentCondition = await PaymentCondition.getAllPaymentConditions();

    //OK
    //200 - Sucesso geral
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: paymentCondition
    });

    //201 - Criado com sucesso
    res.status(201).json({
      success: true,
      message: '201 - Condição de pagamento criada com sucesso',
      data: paymentCondition
    });

  } catch (error) {

    //ERROR
    //400 - Dados inválidos
    res.status(400).json({
      success: false,
      message: '400 - Dados inválidos',
      errors: error.details.map(d => d.message) //extrai só as mensagens
    });

    //401 - Não autenticado (TEMPORÁRIO até a criação do middleware)
    res.status(401).json({
      success: false,
      message: '401 - Não autenticado'
    });

    //403 - Não autorizado (TEMPORÁRIO até a criação do middleware)
    res.status(403).json({
      success: false,
      message: '403 - Não autorizado'
    });

    //404 - Não encontrado
    res.status(404).json({
      success: false,
      message: '404 - Não encontrado'
    });

    //409 - Conflito
    res.status(409).json({
      success: false,
      message: '409 - Conflito com recurso existente'
    });

    //422 - Entidade não processavel
    res.status(404).json({
      success: false,
      message: '422 - Não foi possivel processar requisição'
    });

    //500 - Erro interno do servidor
    res.status(500).json({
      success: false,
      message: '500 - Erro interno do servidor'
    });
  }
}

//Active
async function getActive(req, res) {
  try {
    const activeConditions = await PaymentCondition.getActivePaymentConditions();

    //OK
    //200 - Sucesso geral
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: paymentCondition
    });

    //201 - Criado com sucesso
    res.status(201).json({
      success: true,
      message: '201 - Condição de pagamento criada com sucesso',
      data: paymentCondition
    });

  }catch (error) {
    
    //ERROR
    //400 - Dados inválidos
    res.status(400).json({
      success: false,
      message: '400 - Dados inválidos',
      errors: error.details.map(d => d.message) //extrai só as mensagens
    });

    //401 - Não autenticado (TEMPORÁRIO até a criação do middleware)
    res.status(401).json({
      success: false,
      message: '401 - Não autenticado'
    });

    //403 - Não autorizado (TEMPORÁRIO até a criação do middleware)
    res.status(403).json({
      success: false,
      message: '403 - Não autorizado'
    });

    //404 - Não encontrado
    res.status(404).json({
      success: false,
      message: '404 - Não encontrado'
    });

    //409 - Conflito
    res.status(409).json({
      success: false,
      message: '409 - Conflito com recurso existente'
    });

    //422 - Entidade não processavel
    res.status(404).json({
      success: false,
      message: '422 - Não foi possivel processar requisição'
    });

    //500 - Erro interno do servidor
    res.status(500).json({
      success: false,
      message: '500 - Erro interno do servidor'
    });
  }
};

//By ID
async function getById(req, res) {
  try {
    const { id } = req.params;
    const paymentCondition = await PaymentCondition.getPaymentConditionById(id);

    //OK
    //200 - Sucesso geral
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: paymentCondition
    });

    //201 - Criado com sucesso
    res.status(201).json({
      success: true,
      message: '201 - Condição de pagamento criada com sucesso',
      data: paymentCondition
    });

  }catch (error) {
    //ERROR
    //400 - Dados inválidos
    res.status(400).json({
      success: false,
      message: '400 - Dados inválidos',
      errors: error.details.map(d => d.message) //extrai só as mensagens
    });

    //401 - Não autenticado (TEMPORÁRIO até a criação do middleware)
    res.status(401).json({
      success: false,
      message: '401 - Não autenticado'
    });

    //403 - Não autorizado (TEMPORÁRIO até a criação do middleware)
    res.status(403).json({
      success: false,
      message: '403 - Não autorizado'
    });

    //404 - Não encontrado
    res.status(404).json({
      success: false,
      message: '404 - Não encontrado'
    });

    //409 - Conflito
    res.status(409).json({
      success: false,
      message: '409 - Conflito com recurso existente'
    });

    //422 - Entidade não processavel
    res.status(404).json({
      success: false,
      message: '422 - Não foi possivel processar requisição'
    });

    //500 - Erro interno do servidor
    res.status(500).json({
      success: false,
      message: '500 - Erro interno do servidor'
    });
  };
};


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

    //OK
    //200 - Sucesso geral
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: paymentCondition
    });

    //201 - Criado com sucesso
    res.status(201).json({
      success: true,
      message: '201 - Condição de pagamento criada com sucesso',
      data: paymentCondition
    });

  } catch (error) {
    //ERROR
    //400 - Dados inválidos
    res.status(400).json({
      success: false,
      message: '400 - Dados inválidos',
      errors: error.details.map(d => d.message) //extrai só as mensagens
    });

    //401 - Não autenticado (TEMPORÁRIO até a criação do middleware)
    res.status(401).json({
      success: false,
      message: '401 - Não autenticado'
    });

    //403 - Não autorizado (TEMPORÁRIO até a criação do middleware)
    res.status(403).json({
      success: false,
      message: '403 - Não autorizado'
    });

    //404 - Não encontrado
    res.status(404).json({
      success: false,
      message: '404 - Não encontrado'
    });

    //409 - Conflito
    res.status(409).json({
      success: false,
      message: '409 - Conflito com recurso existente'
    });

    //422 - Entidade não processavel
    res.status(404).json({
      success: false,
      message: '422 - Não foi possivel processar requisição'
    });

    //500 - Erro interno do servidor
    res.status(500).json({
      success: false,
      message: '500 - Erro interno do servidor'
    });
  }
}

//Delete
async function deletePaymentCondition(req, res) {
  try {
    const { id } = req.params;
    const deleted = await PaymentCondition.deletePaymentCondition(id);

    //OK
    //200 - Sucesso geral
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: paymentCondition
    });

    //201 - Criado com sucesso
    res.status(201).json({
      success: true,
      message: '201 - Condição de pagamento criada com sucesso',
      data: paymentCondition
    });

  } catch (error) {
    //ERROR
    //400 - Dados inválidos
    res.status(400).json({
      success: false,
      message: '400 - Dados inválidos',
      errors: error.details.map(d => d.message) //extrai só as mensagens
    });

    //401 - Não autenticado (TEMPORÁRIO até a criação do middleware)
    res.status(401).json({
      success: false,
      message: '401 - Não autenticado'
    });

    //403 - Não autorizado (TEMPORÁRIO até a criação do middleware)
    res.status(403).json({
      success: false,
      message: '403 - Não autorizado'
    });

    //404 - Não encontrado
    res.status(404).json({
      success: false,
      message: '404 - Não encontrado'
    });

    //409 - Conflito
    res.status(409).json({
      success: false,
      message: '409 - Conflito com recurso existente'
    });

    //422 - Entidade não processavel
    res.status(404).json({
      success: false,
      message: '422 - Não foi possivel processar requisição'
    });

    //500 - Erro interno do servidor
    res.status(500).json({
      success: false,
      message: '500 - Erro interno do servidor'
    });
  }
}

module.exports = {
  create,
  getAll,
  getActive,
  getById,
  update,
  deletePaymentCondition
};
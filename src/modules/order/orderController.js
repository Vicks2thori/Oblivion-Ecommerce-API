//orderController.js
const { createOrderSchema, updateOrderSchema } = require('./orderDto');
const Order = require('./orderService');


//CREATE
async function create(req, res) {
  try {
    const { error, value } = createOrderSchema.validate(req.body);

    if (error) {
      //Dados inválidos
      return res.status(400).json({
        success: false,
        message: '400 - Dados inválidos',
        errors: error.details.map(d => d.message)
      });
    };

    const order = await Order.createOrder(value);

    //Sucesso
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: order
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
async function getById(req, res) {
  try {
    const id = req.params.id;
    const order = await Order.getOrderById(id);

    //Sucesso
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: order
    });
  } catch (error) {
    //Erro interno do servidor
    return res.status(500).json({
      success: false,
      message: error.message
    });
  };
};

async function getByStatus(req, res) {
  try {
    const status = req.params.status;
    const order = await Order.getOrdersByStatus(status);

    //Sucesso geral
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: order
    });
  } catch (error) {
    //Erro interno do servidor
    return res.status(500).json({
      success: false,
      message: error.message
    });
  };
};

async function getByClient(req, res) {
  try {
    const clientId = req.params.clientId;
    const order = await Order.getOrdersByClient(clientId);

    //Sucesso
    res.status(200).json({
      success: true,
      message: '200 - Operação realizada com sucesso',
      data: order
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
    const { id } = req.params.id;
    const { error, value } = updateOrderSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        errors: error.details.map(d => d.message)
      });
    };
    
    const result = await Order.updateOrder(id, value.status);
    
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


module.exports = {
  create,
  getById,
  getByStatus,
  getByClient,
  update
};
// orderService.js
const Order = require("./orderEntity");
const { prepareOrderData } = require('./orderUtils');

//CRUD

//Create
const createOrder = async function(data) {
  try { 
    // Prepara dados com snapshots e cálculos
    const preparedData = await prepareOrderData(data);
    
    const order = new Order(preparedData);
    return await order.save();
  } catch (error) {
    throw new Error(`Erro ao criar pedido: ${error.message}`);
  }
};

// Read - Kanban (Retaguarda)
const getOrdersByStatus = async function(status) {
  try {
    return await Order.find({
      status: status
    })
    .populate('clientId', 'name phone')
    .populate('products.productId', 'name price')
    .populate('payment.methodId', 'name imageType')
    .populate('payment.conditionId', 'name')
    .sort({ createdAt: -1 });
  } catch (error) {
    throw new Error(`Erro ao buscar pedidos por status: ${error.message}`);
  }
};

// Read - Pedidos por cliente (Frontend)
const getOrdersByClient = async function(clientId) {
  try {
    return await Order.find({
      'client.clientId': clientId
    })
    .populate('products.productId', 'name price image')
    .populate('payment.methodId', 'name imageType')
    .populate('payment.conditionId', 'name')
    .sort({ createdAt: -1 });
  } catch (error) {
    throw new Error(`Erro ao buscar pedidos do cliente: ${error.message}`);
  }
};

// Update - Status do pedido
const updateOrder = async function(id, status) {
  try {
    // Validação dos status permitidos
    const validStatuses = ['in_progress', 'cancel', 'approved'];
    if (!validStatuses.includes(status)) {
      throw new Error('Status inválido');
    }

    const updated = await Order.findByIdAndUpdate(
      id,
      { status: status },
      { new: true, runValidators: true }
    )
    
    if (!updated) {
      throw new Error('Pedido não encontrado');
    }
    
    return updated;
  } catch (error) {
    throw new Error(`Erro ao atualizar status do pedido: ${error.message}`);
  }
};

module.exports = {
  createOrder,
  getOrdersByStatus,
  getOrdersByClient,
  updateOrder
};
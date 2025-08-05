// orderController.js
const OrderService = require('./orderService');
const { validateCreateOrder, validateUpdateStatus } = require('./orderDto');
const { successResponse, errorResponse } = require('../../routes/responseHelpers');

class OrderController {
  
  // Criar novo pedido
  static async create(req, res) {
    try {
      // 1. Valida dados de entrada
      const { error, value } = validateCreateOrder(req.body);
      if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        return errorResponse(res, 400, 'Dados inválidos', errorMessages);
      }
      
      // 2. Cria pedido usando o service
      const order = await OrderService.createOrder(value);
      
      return successResponse(res, 201, 'Pedido criado com sucesso', order);
      
    } catch (error) {
      return errorResponse(res, 500, 'Erro ao criar pedido', error.message);
    }
  }
  
  // Buscar pedido por ID
  static async findById(req, res) {
    try {
      const { id } = req.params;
      
      const order = await OrderService.findOrderById(id);
      
      return successResponse(res, 200, 'Pedido encontrado', order);
      
    } catch (error) {
      if (error.message === 'Pedido não encontrado') {
        return errorResponse(res, 404, error.message);
      }
      return errorResponse(res, 500, 'Erro ao buscar pedido', error.message);
    }
  }
  
  // Buscar pedido por código
  static async findByCode(req, res) {
    try {
      const { code } = req.params;
      
      const order = await OrderService.findOrderByCode(code);
      
      return successResponse(res, 200, 'Pedido encontrado', order);
      
    } catch (error) {
      if (error.message === 'Pedido não encontrado') {
        return errorResponse(res, 404, error.message);
      }
      return errorResponse(res, 500, 'Erro ao buscar pedido', error.message);
    }
  }
  
  // Listar todos os pedidos
  static async findAll(req, res) {
    try {
      const filters = {
        status: req.query.status,
        client_id: req.query.client_id
      };
      
      const orders = await OrderService.findAllOrders(filters);
      
      return successResponse(res, 200, 'Pedidos listados com sucesso', orders);
      
    } catch (error) {
      return errorResponse(res, 500, 'Erro ao listar pedidos', error.message);
    }
  }
  
  // Buscar pedidos por cliente
  static async findByClient(req, res) {
    try {
      const { clientId } = req.params;
      
      const orders = await OrderService.findOrdersByClient(clientId);
      
      return successResponse(res, 200, 'Pedidos do cliente encontrados', orders);
      
    } catch (error) {
      return errorResponse(res, 500, 'Erro ao buscar pedidos do cliente', error.message);
    }
  }
  
  // Atualizar status do pedido
  static async updateStatus(req, res) {
    try {
      const { id } = req.params;
      
      // 1. Valida dados de entrada
      const { error, value } = validateUpdateStatus(req.body);
      if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        return errorResponse(res, 400, 'Dados inválidos', errorMessages);
      }
      
      // 2. Atualiza status usando o service
      const order = await OrderService.updateOrderStatus(id, value.status);
      
      return successResponse(res, 200, 'Status do pedido atualizado', order);
      
    } catch (error) {
      if (error.message === 'Pedido não encontrado') {
        return errorResponse(res, 404, error.message);
      }
      return errorResponse(res, 500, 'Erro ao atualizar status', error.message);
    }
  }
}

module.exports = OrderController;

// orderService.js
const Order = require('./orderEntity');
const Product = require('../../produto/product/productEntity');
const { 
  calculateProductsSubtotals, 
  calculateOrderTotal, 
  getPaymentData 
} = require('./orderUtills');

class OrderService {
  
  /**
   * Cria um novo pedido com validações completas
   * @param {Object} orderData - Dados do pedido
   * @returns {Promise<Object>} - Pedido criado
   */
  static async createOrder(orderData) {
    const { client_id, products, payment, total } = orderData;
    
    // 1. Busca e valida dados dos produtos
    const productsWithData = await this.getProductsData(products);
    
    // 2. Calcula subtotais dos produtos
    const productsWithSubtotals = calculateProductsSubtotals(productsWithData);
    
    // 3. Calcula total do pedido
    const calculatedTotal = calculateOrderTotal(productsWithSubtotals);
    
    // 4. Valida se o total enviado corresponde ao calculado
    if (Math.abs(calculatedTotal - total) > 0.01) {
      throw new Error('Total calculado não corresponde ao total enviado');
    }
    
    // 5. Busca e valida dados de pagamento
    const paymentData = await getPaymentData(payment.method_id, payment.condition_id);
    
    // 6. Cria o pedido
    const order = new Order({
      client_id,
      products: productsWithSubtotals,
      payment: paymentData,
      total: calculatedTotal
    });
    
    await order.save();
    return order;
  }
  
  /**
   * Busca dados completos dos produtos
   * @param {Array} products - Array com productId e quantity
   * @returns {Promise<Array>} - Produtos com dados completos
   */
  static async getProductsData(products) {
    const productsWithData = [];
    
    for (const product of products) {
      const productData = await Product.findById(product.productId);
      if (!productData) {
        throw new Error(`Produto com ID ${product.productId} não encontrado`);
      }
      
      productsWithData.push({
        productId: product.productId,
        name: productData.name,
        price: productData.price,
        quantity: product.quantity
      });
    }
    
    return productsWithData;
  }
  
  /**
   * Busca pedido por ID com dados populados
   * @param {string} orderId - ID do pedido
   * @returns {Promise<Object>} - Pedido encontrado
   */
  static async findOrderById(orderId) {
    const order = await Order.findById(orderId)
      .populate('client_id')
      .populate('payment.method_id')
      .populate('payment.condition_id');
    
    if (!order) {
      throw new Error('Pedido não encontrado');
    }
    
    return order;
  }
  
  /**
   * Lista todos os pedidos
   * @param {Object} filters - Filtros opcionais
   * @returns {Promise<Array>} - Lista de pedidos
   */
  static async findAllOrders(filters = {}) {
    const query = { deleted: { $ne: true } };
    
    // Aplica filtros se fornecidos
    if (filters.status) {
      query.status = filters.status;
    }
    
    if (filters.client_id) {
      query.client_id = filters.client_id;
    }
    
    const orders = await Order.find(query)
      .populate('client_id')
      .populate('payment.method_id')
      .populate('payment.condition_id')
      .sort({ createdAt: -1 });
    
    return orders;
  }
  
  /**
   * Atualiza status do pedido
   * @param {string} orderId - ID do pedido
   * @param {string} status - Novo status
   * @returns {Promise<Object>} - Pedido atualizado
   */
  static async updateOrderStatus(orderId, status) {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!order) {
      throw new Error('Pedido não encontrado');
    }
    
    return order;
  }
  
  /**
   * Busca pedidos por cliente
   * @param {string} clientId - ID do cliente
   * @returns {Promise<Array>} - Pedidos do cliente
   */
  static async findOrdersByClient(clientId) {
    const orders = await Order.find({ 
      client_id: clientId, 
      deleted: { $ne: true } 
    })
      .populate('payment.method_id')
      .populate('payment.condition_id')
      .sort({ createdAt: -1 });
    
    return orders;
  }
  
  /**
   * Busca pedido por código
   * @param {string} code - Código do pedido
   * @returns {Promise<Object>} - Pedido encontrado
   */
  static async findOrderByCode(code) {
    const order = await Order.findOne({ code })
      .populate('client_id')
      .populate('payment.method_id')
      .populate('payment.condition_id');
    
    if (!order) {
      throw new Error('Pedido não encontrado');
    }
    
    return order;
  }
}

module.exports = OrderService;


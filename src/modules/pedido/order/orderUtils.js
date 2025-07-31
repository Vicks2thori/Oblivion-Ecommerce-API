// orderUtils.js
const mongoose = require('mongoose');

//Gera um código único de 5 dígitos para o pedido
const generateOrderCode = async () => {
  let code;
  let isUnique = false;
  let attempts = 0;
  const maxAttempts = 10;
  
  while (!isUnique && attempts < maxAttempts) {
    // Gera código numérico de 5 dígitos
    code = Math.floor(10000 + Math.random() * 90000).toString();
    
    // Verifica se o código já existe
    const Order = mongoose.model('Order');
    const existingOrder = await Order.findOne({ code });
    if (!existingOrder) {
      isUnique = true;
    }
    attempts++;
  }
  
  if (!isUnique) {
    throw new Error('Não foi possível gerar um código único para o pedido');
  }
  
  return code;
};

//Cria a snapshot do cliente com nome e telefone
const getClientSnapshot = async (clientId) => {
  try {
    const User = mongoose.model('User');
    const client = await User.findById(clientId);
    
    if (!client || client.deleted) {
      throw new Error(`Cliente com ID ${clientId} não encontrado`);
    }
    
    return {
      clientId: client._id,
      client_name: client.name,
      client_phone: client.phone
    };
  } catch (error) {
    throw new Error(`Erro ao buscar dados do cliente: ${error.message}`);
  }
};

//Cria a snapshot do produto com nome e preço 
const getProductSnapshot = async (productId) => {
  try {
    const Product = mongoose.model('Product');
    const product = await Product.findById(productId);
    
    if (!product || product.deleted) {
      throw new Error(`Produto com ID ${productId} não encontrado`);
    }
    
    if (!product.status) {
      throw new Error(`Produto ${product.name} não está disponível`); //se bem que no ecommerce só aparece ativos
    }
    
    return {
      productId: product._id,
      product_name: product.name,
      product_price: product.price
    };
  } catch (error) {
    throw new Error(`Erro ao buscar dados do produto: ${error.message}`);
  }
};

//Cria a napshot do método de pagamento com nome
const getPaymentMethodSnapshot = async (methodId) => {
  try {
    const Payment = mongoose.model('Payment');
    const payment = await Payment.findById(methodId);
    
    if (!payment || payment.deleted) {
      throw new Error(`Método de pagamento com ID ${methodId} não encontrado`);
    }
    
    if (!payment.status) {
      throw new Error(`Método de pagamento ${payment.name} não está disponível`);
    }
    
    return {
      methodId: payment._id,
      method_name: payment.name
    };
  } catch (error) {
    throw new Error(`Erro ao buscar dados do método de pagamento: ${error.message}`);
  }
};

//Cria a snapshot da condição de pagamento com nome
const getPaymentConditionSnapshot = async (conditionId) => {
  try {
    const PaymentCondition = mongoose.model('PaymentCondition');
    const condition = await PaymentCondition.findById(conditionId);
    
    if (!condition || condition.deleted) {
      throw new Error(`Condição de pagamento com ID ${conditionId} não encontrada`);
    }
    
    if (!condition.status) {
      throw new Error(`Condição de pagamento ${condition.name} não está disponível`);
    }
    
    return {
      conditionId: condition._id,
      condition_name: condition.name
    };
  } catch (error) {
    throw new Error(`Erro ao buscar dados da condição de pagamento: ${error.message}`);
  }
};

const calculateItemSubtotal = (price, quantity) => {
  return price * quantity;
};

//Calcula o total do pedido
const calculateOrderTotal = (products) => {
  return products.reduce((total, product) => {
    return total + product.product_subtotal;
  }, 0);
};

//Prepara dados do pedido com snapshots e cálculos
const prepareOrderData = async (orderData) => {
  try {
    const { clientId, products, payment, ...otherData } = orderData;
    
    // Busca snapshot do cliente
    const clientSnapshot = await getClientSnapshot(clientId);
    
    // Prepara produtos com snapshots e subtotais
    const preparedProducts = [];
    for (const productItem of products) {
      const productSnapshot = await getProductSnapshot(productItem.productId);
      const subtotal = calculateItemSubtotal(productSnapshot.product_price, productItem.quantity);
      
      preparedProducts.push({
        ...productSnapshot,
        quantity: productItem.quantity,
        product_subtotal: subtotal
      });
    }
    
    // Prepara dados de pagamento com snapshots
    const paymentMethodSnapshot = await getPaymentMethodSnapshot(payment.methodId);
    const paymentConditionSnapshot = await getPaymentConditionSnapshot(payment.conditionId);
    
    const preparedPayment = {
      ...paymentMethodSnapshot,
      ...paymentConditionSnapshot
    };
    
    // Calcula total do pedido
    const total = calculateOrderTotal(preparedProducts);
    
    return {
      ...otherData,
      client: clientSnapshot,
      products: preparedProducts,
      payment: preparedPayment,
      total: total
    };
  } catch (error) {
    throw new Error(`Erro ao preparar dados do pedido: ${error.message}`);
  }
};

module.exports = {
  generateOrderCode,
  prepareOrderData
}; 
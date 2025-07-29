// orderUtills.js
const mongoose = require('mongoose');

/**
 * Gera um código único numérico de 5 dígitos para pedidos
 * @returns {Promise<string>} - Código único do pedido
 */
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

const calculateOrderTotal = (products) => {
  return products.reduce((total, product) => {
    // Se o produto já tem subtotal calculado, usa ele
    if (product.subtotal !== undefined) {
      return total + product.subtotal;
    }
    // Caso contrário, calcula baseado no preço e quantidade
    return total + product.price * product.quantity;
  }, 0);
};

const calculateProductSubtotal = (price, quantity) => {
  return price * quantity;
};

const calculateProductsSubtotals = (products) => {
  return products.map(product => ({
    ...product,
    subtotal: calculateProductSubtotal(product.price, product.quantity)
  }));
};

/**
 * Valida se a condição de pagamento pertence ao método de pagamento
 * @param {string} methodId - ID do método de pagamento
 * @param {string} conditionId - ID da condição de pagamento
 * @returns {Promise<boolean>} - True se válido, false caso contrário
 */
const validatePaymentMethodCondition = async (methodId, conditionId) => {
  const Payment = mongoose.model('Payment');
  const payment = await Payment.findById(methodId);
  
  if (!payment) {
    throw new Error('Método de pagamento não encontrado');
  }
  
  const conditionExists = payment.paymentConditions.some(
    condition => condition.conditionsId.toString() === conditionId.toString()
  );
  
  if (!conditionExists) {
    throw new Error('Condição de pagamento não pertence ao método de pagamento escolhido');
  }
  
  return true;
};

/**
 * Busca e valida dados de pagamento
 * @param {string} methodId - ID do método de pagamento
 * @param {string} conditionId - ID da condição de pagamento
 * @returns {Promise<Object>} - Dados validados de pagamento
 */
const getPaymentData = async (methodId, conditionId) => {
  const Payment = mongoose.model('Payment');
  const PaymentCondition = mongoose.model('PaymentCondition');
  
  // Valida se a condição pertence ao método
  await validatePaymentMethodCondition(methodId, conditionId);
  
  // Busca os dados
  const [payment, condition] = await Promise.all([
    Payment.findById(methodId),
    PaymentCondition.findById(conditionId)
  ]);
  
  if (!payment || !condition) {
    throw new Error('Método de pagamento ou condição não encontrado');
  }
  
  return {
    method_id: methodId,
    method_name: payment.name,
    condition_id: conditionId,
    condition_name: condition.name
  };
};

module.exports = { 
  generateOrderCode, 
  calculateOrderTotal,
  calculateProductSubtotal,
  calculateProductsSubtotals,
  validatePaymentMethodCondition,
  getPaymentData
}; 
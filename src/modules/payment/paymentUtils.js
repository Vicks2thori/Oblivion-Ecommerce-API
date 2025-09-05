//paymentUtils.js
const Payment = require("./paymentEntity");
const PaymentCondition = require("../payment_condition/payment_conditionEntity");

const filterPaymentConditionsActive = (paymentCondition) => {
    return paymentCondition
      .map(pc => pc.conditionId)
      .filter(paymentConditions => paymentConditions && !paymentConditions.deleted && paymentConditions.status);
};

const removePaymentConditionInPayment = async (paymentId, conditionId) => {
    const payment = await Payment.findOne({ _id: paymentId, deleted: false });
    const condition = await PaymentCondition.findOne({ _id: conditionId, deleted: false });
    
    if (!payment) {
      throw new Error('Pagamento não encontrado ou já foi excluído.');
    } else if (!condition) {
        throw new Error('Condição de pagamento não encontrada ou já foi excluída.');
    };
  
    const sizeInitial = payment.paymentConditions.length;
  
    payment.paymentConditions = payment.paymentConditions.filter(
      (pc) => pc.conditionsId.toString() !== conditionId.toString()
    );

    if (payment.paymentConditions.length === sizeInitial) {
      throw new Error('Essa condição não existe neste pagamento.');
    } else if (payment.paymentConditions.length === 0) {
      throw new Error('Pagamento não pode ficar sem nenhuma condição.');
    };
    return await payment.save();
};

const addPaymentConditionInPayment = async (paymentId, conditionId) => {
    const payment = await Payment.findOne({ _id: paymentId, deleted: false });
    const condition = await PaymentCondition.findOne({ _id: conditionId, deleted: false });

    if (!payment) {
        throw new Error('Pagamento não encontrado ou já foi excluído.');
    } else if (!condition) {
        throw new Error('Condição de pagamento não encontrada ou já foi excluída.');
    };
  
    const conditionExistInPayment = payment.paymentConditions.some(
        pc => pc.conditionsId.toString() === conditionId.toString()
    );

    if (!conditionExistInPayment) {
        payment.paymentConditions.push({
          conditionsId: conditionId
        });
    };
  
    return await payment.save();
};
  

module.exports = {
    filterPaymentConditionsActive,
    removePaymentConditionInPayment,
    addPaymentConditionInPayment
};
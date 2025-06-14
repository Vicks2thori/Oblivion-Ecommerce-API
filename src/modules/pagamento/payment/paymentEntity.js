//paymentEntity.js
const { DataTypes } = require('sequelize');
const pool = require('../../../model/conection_db'); // Ajuste o caminho conforme sua estrutura

const Payment = sequelize.define('Payment', {
  idPayment: {
    type: DataTypes.TINYINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  namePayment: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },

//Chave estrangeira imagem
/*idImgPayment: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
  }, */

//Chave estrangeira condição de pagamento
/*idPaymentCondition: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
  }, */
  statusPayment: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  freezeTableName: true,
  timestamps: false, //depois altero e testo Vai guardar a hora que foi criado e atualizado
});

module.exports = Payment;

//productEntity.js
const { DataTypes } = require('sequelize');
const pool = require('../../../model/conection_db'); // Ajuste o caminho conforme sua estrutura

const Orders = sequelize.define('Orders', {
  idOrders: {
    type: DataTypes.SMALLINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  dateOrders: {
    type: DataTypes.DATE, //vou ver isso aqui
    allowNull: false,
  },
  codOrders: {
    type: DataTypes.STRING(5), //vou ver isso aqui
    //colocar aqui o UNIQUE  
    allowNull: false,
  }, 

//Chave estrangeira clients
/*idClients: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
  }, */

//Chave estrangeira produto (tenho que criar um intermediário)
/*idProduct: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
  }, */

//Chave estrangeira pagamento
/*idPayment: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
  }, */

//Chave estrangeira condição de pagamento
/*idPaymentCondition: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
  }, */
  totalityOrders: {
    type: DataTypes.SMALLINT.UNSIGNED,
    allowNull: false,
  },
  descriptionOrders: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  statusOrders: {
    type: DataTypes.STRING, //??? tenho que colocar os valores aceitos... se bem que ja ta no DTO
    allowNull: false,
    defaultValue: 'pending',
  },
}, {
  freezeTableName: true,
  timestamps: false, //depois altero e testo Vai guardar a hora que foi criado e atualizado
});

module.exports = Orders;
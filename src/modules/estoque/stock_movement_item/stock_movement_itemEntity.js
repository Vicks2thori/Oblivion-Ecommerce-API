//productEntity.js esqueci de alterar os nomes em cima uadfhcaehfc\ea
const { DataTypes } = require('sequelize');
const pool = require('../../../model/conection_db'); // Ajuste o caminho conforme sua estrutura

const StockMoviment = sequelize.define('StockMoviment', { //ta assim no BD depois eu choro aqui
  idStockMoviment: {
    type: DataTypes.SMALLINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  nameStockMoviment: {
    type: DataTypes.STRING(50), 
    allowNull: false,
  },
  dateStockMoviment: { //ver certinho sobre data
    type: DataTypes.DATE,
    allowNull: false,
  }, 

//Chave estrangeira categoria de estoque hfbehr
/*idStockCategory: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
  }, */

  typeStockMoviment: {
    type: DataTypes.SMALLINT.UNSIGNED,
    allowNull: false,
    //mesmo esquema do valor padrão exit, entry, definition
  },

//Chave estrangeira produto (tenho que criar um intermediário)
/*idProduct: {
    type: DataTypes.SMALLINT.UNSIGNED,
    allowNull: false,
  }, */

//Chave estrangeira admin
/*idAdmins  : {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
  }, */
}, {
  freezeTableName: true,
  timestamps: false, //depois altero e testo Vai guardar a hora que foi criado e atualizado
});

module.exports = StockMoviment;
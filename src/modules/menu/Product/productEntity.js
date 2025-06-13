//productEntity.js
const { DataTypes } = require('sequelize');
const pool = require('../../../model/conection_db'); // Ajuste o caminho conforme sua estrutura

const Product = sequelize.define('Product', {
  idProduct: {
    type: DataTypes.SMALLINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  nameProduct: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },

//Chave estrangeira imagem
/*idImg: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
  }, */
  descriptionProduct: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  priceProduct: {
    type: DataTypes.DECIMAL(8,2),
    allowNull: false,
    default: 0,
  },
  codProduct: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },

//Chave estrangeira categorias
/*idCategory: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
  }, */

  statusProduct: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  freezeTableName: true,
  timestamps: false, //depois altero e testo Vai guardar a hora que foi criado e atualizado
});

module.exports = Product;
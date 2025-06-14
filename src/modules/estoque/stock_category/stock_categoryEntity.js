//categoryStockEntity.js
const { DataTypes } = require('sequelize');
const pool = require('../../../model/conection_db'); // Ajuste o caminho conforme sua estrutura

const CategoryStock = sequelize.define('CategoryStock', {
  idCategoryStock: {
    type: DataTypes.TINYINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  nameCategoryStock: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  statusCategoryStock: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  freezeTableName: true,
  timestamps: false, //depois altero e testo Vai guardar a hora que foi criado e atualizado
});

module.exports = CategoryStock;

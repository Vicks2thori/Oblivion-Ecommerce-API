//paymentEntity.js
const { DataTypes } = require('sequelize');
const pool = require('../../../model/conection_db'); // Ajuste o caminho conforme sua estrutura

const Site = sequelize.define('Site', {
  idSite: {
    type: DataTypes.TINYINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  primaryColorSite: {
    type: DataTypes.STRING(6),
    allowNull: false,
    defaultValue: "000000", //ainda precisamos padronizar
  },
  secondColorSite: {
    type: DataTypes.STRING(6),
    allowNull: false,
    defaultValue: "123456", //ainda precisamos padronizar
  },
    primaryColorSite: {
    type: DataTypes.STRING(6),
    allowNull: false,
    defaultValue: "FFFFFF", //ainda precisamos padronizar
  },
}, {
  freezeTableName: true,
  timestamps: false, //depois altero e testo Vai guardar a hora que foi criado e atualizado
});

module.exports = Site;

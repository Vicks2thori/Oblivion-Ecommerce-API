//paymentEntity.js
const { DataTypes } = require('sequelize');
const pool = require('../../../model/conection_db'); // Ajuste o caminho conforme sua estrutura

const Enterprise = sequelize.define('Enterprise', {
  idEnterprise: {
    type: DataTypes.TINYINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  nameEnterprise: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },

//Chave estrangeira imagem logo
/*idImg: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: true,
  }, */

  cellEnterprise: {
    type: DataTypes.STRING(11),
    allowNull: false,
  },
  instagramEnterprise: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  facebookEnterprise: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  emailEnterprise: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
}, {
  freezeTableName: true,
  timestamps: false, //depois altero e testo Vai guardar a hora que foi criado e atualizado
});

module.exports = Enterprise;
//productEntity.js esqueci de alterar os nomes em cima uadfhcaehfc\ea
const { DataTypes } = require('sequelize');
const pool = require('../../../model/conection_db'); // Ajuste o caminho conforme sua estrutura

const Admins = sequelize.define('Admins', { //ta assim no BD depois eu choro aqui
  idAdmins: {
    type: DataTypes.TINYINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  statusAdmins: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    default: true,
  }, 

//Chave estrangeira users
/*idUsers: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
  }, */
}, {
  freezeTableName: true,
  timestamps: false, //depois altero e testo Vai guardar a hora que foi criado e atualizado
});

module.exports = Admins;
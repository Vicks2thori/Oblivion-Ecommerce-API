//productEntity.js esqueci de alterar os nomes em cima uadfhcaehfc\ea
const { DataTypes } = require('sequelize');
const pool = require('../../../model/conection_db'); // Ajuste o caminho conforme sua estrutura

const Clients = sequelize.define('Admins', { //ta assim no BD depois eu choro aqui
  idClients: {
    type: DataTypes.TINYINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  cpfs: {
    type: DataTypes.STRING(11),
    allowNull: false,
  }, 
  cells: {
    type: DataTypes.STRING(11),
    allowNull: false,
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
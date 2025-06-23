//clientEntiy.js
const pool = require('../../../model/conection_db');
const { getUserType, createUser, updateUser } = require('../user/userEntity');

//Create
async function createClient(name, email, password, cpf, phone) {
  const type = "client",
  user_id = createUser(name, email, password, type)
  const [result] = await pool.query(`
    INSERT INTO client (user_id, cpf, phone)
    VALUES (?, ?, ?)`, [user_id, cpf, phone]
  );
  return result.insertId;
}

//Read
async function getClient() {
  getUserType("client");
}

//preciso buscar uma forma de buscar o user_id
//Update
async function updateClient(id, user_id, name, email, password, cpf, phone) {
// Filtra apenas campos que foram enviados (não undefined/null)
  updateUser(user_id, name, email, password); //alteração da tabela users
  const fieldsToUpdate = {};

  if (cpf) fieldsToUpdate.cpf = cpf;
  if (phone) fieldsToUpdate.phone = phone;

  if (Object.keys(fieldsToUpdate).length === 0) {
    return { success: false, message: 'Nenhum campo para atualizar' };
  }

  // Constrói query dinâmica
  const fields = Object.keys(fieldsToUpdate);
  const values = Object.values(fieldsToUpdate);
  const setClause = fields.map(field => `${field} = ?`).join(', ');

  const [result] = await pool.query(`
    UPDATE client
    SET ${setClause}
    WHERE id = ?
    LIMIT 1
  `, [...values, id]); //... "espalha" os arrays

  return {
    success: result.affectedRows > 0,
    affectedRows: result.affectedRows
  };
}

module.exports = { 
  createClient, 
  getClient, 
  updateClient };
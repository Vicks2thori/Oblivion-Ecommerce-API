//adminEntiy.js
const pool = require('../../../model/conection_db');
const { getUser, createUser } = require('../user/userEntity');

//Create
async function createAdmin(name, email, password, status) {
  const type = "admin";
  user_id = createUser(name, email, password, type)
  const [result] = await pool.query(`
    INSERT INTO admin (user_id, status)
    VALUES (?, ?)`, [user_id, status]
  );
  return result.insertId;
}

//Read
async function getAdmin() {
  getUser("admin");
}

//Update
async function updateAdmin(id, user_id, name, email, password, status) {
// Filtra apenas campos que foram enviados (não undefined/null)
  updateUser(user_id, name, email, password); //alteração da tabela users
  const fieldsToUpdate = {};

  if (status !== undefined) fieldsToUpdate.phone = phone;

  if (Object.keys(fieldsToUpdate).length === 0) {
    return { success: false, message: 'Nenhum campo para atualizar' };
  }

  // Constrói query dinâmica
  const fields = Object.keys(fieldsToUpdate);
  const values = Object.values(fieldsToUpdate);
  const setClause = fields.map(field => `${field} = ?`).join(', ');

  const [result] = await pool.query(`
    UPDATE admin
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
  createAdmin, 
  getAdmin, 
  updateAdmin };
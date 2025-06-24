//userEntiy.js
const pool = require('../../../model/conection_db');

//Create
async function createUser({name, email, password, type}) {
  const [result] = await pool.query(`
    INSERT INTO user (name, email, password, type)
    VALUES (?, ?, ?, ?)`, [name, email, password, type]
  );
  return result.insertId;
};

//tem que criar 2 gets, um que vai ser chamado na hora de exibir (geral)
//outro que vai chamar na hora de fazer update (vai ser mandado pelo front espero eu)
//Read
async function getUserType({type}) {
  const [rows] = await pool.query(`
    SELECT * FROM user WHERE type = ?`, [type]
  );
  return rows[0];
}

//Update
async function updateUser({name, email, password}) {
// Filtra apenas campos que foram enviados (não undefined/null)
  const fieldsToUpdate = {};

  if (name) fieldsToUpdate.name = name;
  if (email) fieldsToUpdate.email = email;
  if (password) fieldsToUpdate.password = password;

  if (Object.keys(fieldsToUpdate).length === 0) {
    return { success: false, message: 'Nenhum campo para atualizar' };
  }

  // Constrói query dinâmica
  const fields = Object.keys(fieldsToUpdate);
  const values = Object.values(fieldsToUpdate);
  const setClause = fields.map(field => `${field} = ?`).join(', ');

  const [result] = await pool.query(`
    UPDATE user
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
  createUser, 
  getUserType, 
  updateUser };
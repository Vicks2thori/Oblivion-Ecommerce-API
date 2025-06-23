//category.js
const pool = require('../../../model/conection_db');

//Create
async function createCategory(name, status) {
  const [result] = await pool.query(`
    INSERT INTO category (name, status)
    VALUES (?, ?)`, [name, status]
  );
  return result.insertId;
}

//Read
async function getCategory(name) {
  const [rows] = await pool.query(`
    SELECT * FROM category WHERE name = ?`, [name]
  );
  return rows[0];
}

//Update
async function updateCategory(id, name, status) {
// Filtra apenas campos que foram enviados (não undefined/null)
  const fieldsToUpdate = {};

  if (name) fieldsToUpdate.name = name;
  if (status !== undefined) fieldsToUpdate.status = status;

  if (Object.keys(fieldsToUpdate).length === 0) {
    return { success: false, message: 'Nenhum campo para atualizar' };
  }

  // Constrói query dinâmica
  const fields = Object.keys(fieldsToUpdate);
  const values = Object.values(fieldsToUpdate);
  const setClause = fields.map(field => `${field} = ?`).join(', ');

  const [result] = await pool.query(`
    UPDATE category
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
  createCategory, 
  getCategory, 
  updateCategory };

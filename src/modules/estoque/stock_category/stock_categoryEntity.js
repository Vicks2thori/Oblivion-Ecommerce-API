//stock_category.js
const pool = require('../../../model/conection_db');

//Create
async function createStockCategory(name, status) {
  const [result] = await pool.query(`
    INSERT INTO stock_category (name, status)
    VALUES (?, ?)`, [name, status]
  );
  return result.insertId;
}

//Read
async function getStockCategory(name) {
  const [rows] = await pool.query(`
    SELECT * FROM stock_category WHERE name = ?`, [name]
  );
  return rows[0];
}

//Update
async function updateStockCategory(id, name, status) {
  // Filtra apenas campos que foram enviados (não undefined/null)
  const fieldsToUpdate = {};
  
  if (name) fieldsToUpdate.name = name;
  if (status !== undefined) fieldsToUpdate.status = status; // Boolean pode ser false

  if (Object.keys(fieldsToUpdate).length === 0) {
    return { success: false, message: 'Nenhum campo para atualizar' };
  }

  // Constrói query dinâmica
  const fields = Object.keys(fieldsToUpdate);
  const values = Object.values(fieldsToUpdate);
  const setClause = fields.map(field => `${field} = ?`).join(', ');

  const [result] = await pool.query(`
    UPDATE stock_category
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
  createStockCategory, 
  getStockCategory, 
  updateStockCategory };

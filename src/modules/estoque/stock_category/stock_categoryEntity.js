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
async function updateStockCategory(name, status) {
    const [result] = await pool.query(`
    UPDATE stock_category
    SET name = ?, status = ?
  `, [name, status]);

  return result.affectedRows > 0;
}

module.exports = { 
  createStockCategory, 
  getStockCategory, 
  updateStockCategory };

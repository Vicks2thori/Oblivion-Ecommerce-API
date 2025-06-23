//stock_movement.js
const pool = require('../../../model/conection_db');

//Create
async function createStockMovement(name, date, category_id, admin_id, type) {
  const [result] = await pool.query(`
    INSERT INTO stock_movement (name, date, category_id, admin_id, type)
    VALUES (?, ?, ?, ?, ?, ?)`, [name, date, category_id, admin_id, type]
  );
  return result.insertId;
}

//Read
async function getStockMovement(name) {
  const [rows] = await pool.query(`
    SELECT * FROM stock_movement WHERE name = ?`, [name]
  );
  return rows[0];
}

module.exports = { 
  createStockMovement, 
  getStockMovement };

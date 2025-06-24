//stock_movement_item.js
const pool = require('../../../model/conection_db');

//Create
async function createStockMovementItem({stock_movement_id, product_id, quantity}) {
  const [result] = await pool.query(`
    INSERT INTO stock_movement_item (stock_movement_id, product_id, quantity)
    VALUES (?, ?, ?)`, [stock_movement_id, product_id, quantity]
  );
  return result.insertId;
}

//Read
async function getStockMovementItem({stock_movement_id}) {
  const [rows] = await pool.query(`
    SELECT * FROM stock_movement_item WHERE stock_movement_id = ?`, [stock_movement_id]
  );
  return rows[0];
}

module.exports = { 
  createStockMovementItem, 
  getStockMovementItem };

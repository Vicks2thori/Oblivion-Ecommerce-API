//order_itemEntity.js
const pool = require('../../../model/conection_db');

//Create
async function createOrderItem(order_id, product_id, quantity, subtotal) {
  const [result] = await pool.query(`
    INSERT INTO order_item (order_id, product_id, quantity, subtotal)
    VALUES (?, ?, ?, ?)`, [order_id, product_id, quantity, subtotal]
  );
  return result.insertId;
}

//Read
async function getOrderItem(order_id) {
  const [rows] = await pool.query(`
    SELECT * FROM order_item WHERE order_id = ?`, [order_id]
  );
  return rows[0];
}

module.exports = { 
  createOrderItem, 
  getOrderItem };

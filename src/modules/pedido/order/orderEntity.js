//orderEntity.js
const pool = require('../../../model/conection_db');

//Create
async function createOrder(date, code, client_id, payment_id, payment_condition_id, total, status) {
  /*if (status === "pending") { //tenho que ver certinho se aqui eu valido...
    return
  }
  else{
    status = "pending"
  }*/
  const [result] = await pool.query(`
    INSERT INTO order (date, code, client_id, payment_id, payment_condition_id, total, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)`, [date, code, client_id, payment_id, payment_condition_id, total, status]
  );
  return result.insertId;
}

//tenho que puxar o order_item tambem
//Read
async function getOrder(code) {
  const [rows] = await pool.query(`
    SELECT * FROM order WHERE code = ?`, [code]
  );
  return rows[0];
}

//Depois de aprovado ele tambem da baixa no estoque
//Update
async function updateOrder(status) {
  const [result] = await pool.query(`
    UPDATE payment_has_condition
    SET status = ?
  `, [status]);

  return result.affectedRows > 0;
}

module.exports = { createOrder, getOrder, updateOrder };

//paymentEntity.js
const pool = require('../../../model/conection_db');

//Create
async function createPayment(name, image_id, condition_id, status) {
  const [result] = await pool.query(`
    INSERT INTO payment (name, image_id, condition_id, status)
    VALUES (?, ?, ?, ?)`, [name, image_id, condition_id, status]
  );
  return result.insertId;
}

//Read
async function getPayment(name) {
  const [rows] = await pool.query(`
    SELECT * FROM payment WHERE name = ?`, [name]
  );
  return rows[0];
}

//Update
async function updatePayment(name, image_id, condition_id, status) {
  const [result] = await pool.query(`
    UPDATE payment
    SET name = ?, image_id = ?, condition_di = ?, status = ?
  `, [name, image_id, condition_id, status]);

  return result.affectedRows > 0;
}

module.exports = { createPayment, getPayment, updatePayment };

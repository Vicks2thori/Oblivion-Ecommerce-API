//payment_conditionEntity.js
const pool = require('../../../model/conection_db');

//Create
async function createPaymentCondition(name, status) {
  const [result] = await pool.query(`
    INSERT INTO payment_condition (name, status)
    VALUES (?, ?)`, [name, status]
  );
  return result.insertId;
}

//Read
async function getPaymentCondition(name) {
  const [rows] = await pool.query(`
    SELECT * FROM payment_condition WHERE name = ?`, [name]
  );
  return rows[0];
}

//Update
async function updatePaymentCondition(name, status) {

  const [result] = await pool.query(`
    UPDATE payment_condition
    SET name = ?, status = ?
  `, [name, status]);

  return result.affectedRows > 0;
}

module.exports = { 
  createPaymentCondition, 
  getPaymentCondition, 
  updatePaymentCondition };

//payment_has_conditionEntity.js
const pool = require('../../../model/conection_db');

//Vou precisar fazer uma lógica com criação para validar antes de criar
//E uma com DELETE para enviar os valores que não estão selecionados...

//Create
async function createPaymentHasCondition(payment_id, condition_id) {
  const [result] = await pool.query(`
    INSERT INTO payment_has_condition (payment_id, condition_id)
    VALUES (?, ?)`, [payment_id, condition_id]
  );
  return result.insertId;
}

//Read
async function getPaymentHasCondition(payment_id) {
  const [rows] = await pool.query(`
    SELECT * FROM payment_has_condition WHERE name = ?`, [payment_id]
  );
  return rows[0];
}

//Update (não faz nem sentido)
/*async function updatePaymentHasCondition(name, status) {
  const [result] = await pool.query(`
    UPDATE payment_has_condition
    SET name = ?, status = ?
  `, [name, status]);

  return result.affectedRows > 0;
}*/

//Delete
async function deletePaymentHasCondition(payment_id, condition_id) {
  const [result] = await pool.query(`
    DELETE FROM payment_has_condition WHERE payment_id = ? AND condition_id = ?`, [payment_id, condition_id]
  );
  return result.affectedRows > 0;
}

module.exports = { createPaymentHasCondition, getPaymentHasCondition, deletePaymentHasCondition };

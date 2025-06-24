//payment_conditionEntity.js
const pool = require('../../../model/conection_db');

//Create
async function createPaymentCondition({name, status}) {
  const [result] = await pool.query(`
    INSERT INTO payment_condition (name, status)
    VALUES (?, ?)`, [name, status]
  );
  return result.insertId;
}

//Read
async function getPaymentCondition({name}) {
  const [rows] = await pool.query(`
    SELECT * FROM payment_condition WHERE name = ?`, [name]
  );
  return rows[0];
}

//Update
async function updatePaymentCondition({id, name, status}) {
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
    UPDATE payment_condition
    SET ${setClause}
    WHERE id = ?
    LIMIT 1
  `, [...values, id]);

  return {
    success: result.affectedRows > 0,
    affectedRows: result.affectedRows
  };
}

module.exports = { 
  createPaymentCondition, 
  getPaymentCondition, 
  updatePaymentCondition };

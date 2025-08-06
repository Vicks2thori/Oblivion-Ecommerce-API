//paymentEntity.js
const pool = require('../../../model/conection_db');

//Create
async function createPayment({name, image_id, condition_id, status}) {
  const [result] = await pool.query(`
    INSERT INTO payment (name, image_id, condition_id, status)
    VALUES (?, ?, ?, ?)`, [name, image_id, condition_id, status]
  );
  return result.insertId;
}

//Read
async function getPayment({name}) {
  const [rows] = await pool.query(`
    SELECT * FROM payment WHERE name = ?`, [name]
  );
  return rows[0];
}

//agrupar com o payment_has_condition, tanto o update e o create (delete do payment_has)
//vou receber condition_id? nada (depois eu tiro com calma)
//Update
async function updatePayment({ id, name, image_id, condition_id, status }) {
  // Filtra apenas campos que foram enviados (não undefined/null)
  const fieldsToUpdate = {};
  
  if (name) fieldsToUpdate.name = name;
  if (image_id) fieldsToUpdate.image_id = image_id;
  if (condition_id) fieldsToUpdate.condition_id = condition_id;
  if (status !== undefined) fieldsToUpdate.status = status; // Boolean pode ser false

  if (Object.keys(fieldsToUpdate).length === 0) {
    return { success: false, message: 'Nenhum campo para atualizar' };
  }

  // Constrói query dinâmica
  const fields = Object.keys(fieldsToUpdate);
  const values = Object.values(fieldsToUpdate);
  const setClause = fields.map(field => `${field} = ?`).join(', ');

  const [result] = await pool.query(`
    UPDATE payment
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
  createPayment, 
  getPayment, 
  updatePayment };

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
async function updateOrder(id, status) {
  // Filtra apenas campos que foram enviados (não undefined/null)
  const fieldsToUpdate = {};

  if (status) fieldsToUpdate.status = status; //status é a string

  if (Object.keys(fieldsToUpdate).length === 0) {
    return { success: false, message: 'Nenhum campo para atualizar' };
  }

  // Constrói query dinâmica
  const fields = Object.keys(fieldsToUpdate);
  const values = Object.values(fieldsToUpdate);
  const setClause = fields.map(field => `${field} = ?`).join(', ');

  const [result] = await pool.query(`
    UPDATE order
    SET ${setClause}
    WHERE id = ?
    LIMIT 1
  `, [...values, id]); //... "espalha" os arrays

  //depois de atualizar o status para finalizado ir pra função de add na tabela estatica e dar baixa no estoque
  return {
    success: result.affectedRows > 0,
    affectedRows: result.affectedRows
  };
}

module.exports = { 
  createOrder, 
  getOrder, 
  updateOrder };

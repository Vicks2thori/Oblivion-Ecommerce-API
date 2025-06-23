//clientEntiy.js
const pool = require('../../../model/conection_db');
const { getUserType, createUser, updateUser } = require('../user/userEntity');

//Create
async function createClient(name, email, password, cpf, phone) {
  const type = "client",
  user_id = createUser(name, email, password, type)
  const [result] = await pool.query(`
    INSERT INTO client (user_id, cpf, phone)
    VALUES (?, ?, ?)`, [user_id, cpf, phone]
  );
  return result.insertId;
}

//Read
async function getClient() {
  getUserType("client");
}

//preciso buscar uma forma de buscar o user_id
//Update
async function updateClient(name, email, password, cpf, phone) {
  const type = "client"
  getUser(type);
  updateUser(name, email, password)
  const [result] = await pool.query(`
    UPDATE admin
    SET status = ?
  `, [status]);

  return result.affectedRows > 0;
}

module.exports = { 
  createClient, 
  getClient, 
  updateClient };
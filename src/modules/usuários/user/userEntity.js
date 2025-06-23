//userEntiy.js
const pool = require('../../../model/conection_db');

//Create
async function createUser(name, email, password, type) {
  const [result] = await pool.query(`
    INSERT INTO user (name, email, password, type)
    VALUES (?, ?, ?, ?)`, [name, email, password, type]
  );
  return result.insertId;
};

//tem que criar 2 gets, um que vai ser chamado na hora de exibir (geral)
//outro que vai chamar na hora de fazer update (vai ser mandado pelo front espero eu)
//Read
async function getUserType(type) {
  const [rows] = await pool.query(`
    SELECT * FROM user WHERE type = ?`, [type]
  );
  return rows[0];
}

//Update
async function updateUser(name, email, password) {
    const [result] = await pool.query(`
    UPDATE user
    SET name = ?, email = ?, password = ?
  `, [name, email, password]);

  return result.affectedRows > 0;
}

module.exports = { 
  createUser, 
  getUserType, 
  updateUser };
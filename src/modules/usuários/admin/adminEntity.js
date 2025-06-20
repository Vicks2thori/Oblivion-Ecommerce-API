//adminEntiy.js
const pool = require('../../../model/conection_db');
const { getUser, createUser } = require('../user/userEntity');

//Create
async function createAdmin(name, email, password, status) {
  const type = "admin";
  user_id = createUser(name, email, password, type)
  const [result] = await pool.query(`
    INSERT INTO admin (user_id, status)
    VALUES (?, ?)`, [user_id, status]
  );
  return result.insertId;
}

//Read
async function getAdmin() {
  getUser("admin");
}

//Update
async function updateAdmin(status) {
    const [result] = await pool.query(`
    UPDATE admin
    SET status = ?
  `, [status]);

  return result.affectedRows > 0;
}

module.exports = { createAdmin, getAdmin, updateAdmin };
//category.js
const pool = require('../../../model/conection_db');

//Create
async function createCategory(name, status) {
  const [result] = await pool.query(`
    INSERT INTO category (name, status)
    VALUES (?, ?)`, [name, status]
  );
  return result.insertId;
}

//Read
async function getCategory(name) {
  const [rows] = await pool.query(`
    SELECT * FROM category WHERE name = ?`, [name]
  );
  return rows[0];
}

//Update
async function updateCategory(name, status) {
    const [result] = await pool.query(`
    UPDATE category
    SET name = ?, status = ?
  `, [name, status]);

  return result.affectedRows > 0;
}

module.exports = { 
  createCategory, 
  getCategory, 
  updateCategory };

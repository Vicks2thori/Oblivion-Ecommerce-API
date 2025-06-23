// imageEntity.js
const pool = require('../../../model/conection_db');

//Create
async function createImage(name, patch) {
  const [result] = await pool.query(`
    INSERT INTO image (name, patch)
    VALUES (?, ?)`, [name, patch]
  );
  return result.insertId;
}

//Read
async function getImage(name) {
  const [rows] = await pool.query(`
    SELECT * FROM image WHERE name = ?`, [name]
  );
  return rows[0];
}

//Update
async function updateImage(id, newName, newPatch) {
  const [result] = await pool.query(`
    UPDATE image SET name = ?, patch = ? WHERE id = ?
  `, [newName, newPatch, id]);
  return result.affectedRows > 0;
}

//Delete
async function deleteImage(name) {
  const [result] = await pool.query(`
    DELETE FROM image WHERE name = ?`, [name]
  );
  return result.affectedRows > 0;
}

module.exports = { 
  createImage, 
  getImage, 
  updateImage, 
  deleteImage };

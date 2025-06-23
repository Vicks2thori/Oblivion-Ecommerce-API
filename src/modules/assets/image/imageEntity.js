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
async function updateImage(id, name, patch) {
  // Filtra apenas campos que foram enviados (não são null/undefined)
  const fieldsToUpdate = {};

  if (name) fieldsToUpdate.name = name;
  if (patch) fieldsToUpdate.patch = patch;

  // Se não há campos para atualizar, retorna false
  if (Object.keys(fieldsToUpdate).length === 0) {
    return false;
  }

  // Constrói a query dinamicamente
  const fields = Object.keys(fieldsToUpdate);
  const values = Object.values(fieldsToUpdate);
  const setClause = fields.map(field => `${field} = ?`).join(', ');

  const [result] = await pool.query(`
    UPDATE image
    SET ${setClause}
  `, [...values, id]);

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

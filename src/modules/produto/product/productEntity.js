//productEntity.js
const pool = require('../../../model/conection_db');

//vai criar junto o estoque
//Create
async function createProduct(name, image_id, description, price, code, status, category_id, quantity) {
  const [result] = await pool.query(`
    INSERT INTO product (name, image_id, description, price, code, status, category_id, quantity)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [name, image_id, description, price, code, status, category_id, quantity]
  );
  return result.insertId;
}

//Tem que ter um get por categoria ja que vou apresentar no ecommerce
//Read
async function getProduct(name) {
  const [rows] = await pool.query(`
    SELECT * FROM product WHERE name = ?`, [name]
  );
  return rows[0];
} // como que é melhor puxar?

//Update
async function updateProduct(id, name, image_id, description, price, code, status, category_id) {
// Filtra apenas campos que foram enviados (não undefined/null)
  const fieldsToUpdate = {};

  if (name) fieldsToUpdate.name = name;
  if (image_id) fieldsToUpdate.image_id = image_id;
  if (description) fieldsToUpdate.description = description;
  if (price) fieldsToUpdate.price = price;
  if (code) fieldsToUpdate.code = code;
  if (category_id) fieldsToUpdate.category_id = category_id;
  if (status !== undefined) fieldsToUpdate.status = status;

  if (Object.keys(fieldsToUpdate).length === 0) {
    return { success: false, message: 'Nenhum campo para atualizar' };
  }

  // Constrói query dinâmica
  const fields = Object.keys(fieldsToUpdate);
  const values = Object.values(fieldsToUpdate);
  const setClause = fields.map(field => `${field} = ?`).join(', ');

  const [result] = await pool.query(`
    UPDATE product
    SET ${setClause}
    WHERE id = ?
    LIMIT 1
  `, [...values, id]); //... "espalha" os arrays

  return {
    success: result.affectedRows > 0,
    affectedRows: result.affectedRows
  };
}

//Delete
async function deleteProduct(code) {
  const [result] = await pool.query(`
    DELETE FROM product WHERE code = ?`, [code]
  );
  return result.affectedRows > 0;
}

module.exports = { 
  createProduct, 
  getProduct, 
  updateProduct, 
  deleteProduct};

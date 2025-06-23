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
async function updateProduct(name, status) {
    const [result] = await pool.query(`
    UPDATE product
    SET name = ?, image_id = ?, description = ?, price = ?, code = ?, status = ?, category_id = ?
  `, [name, image_id, description, price, code, status, category_id]);

  return result.affectedRows > 0;
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

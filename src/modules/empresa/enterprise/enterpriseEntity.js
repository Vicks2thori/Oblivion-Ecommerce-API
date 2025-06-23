//enterpriseEntity.js
const pool = require('../../../model/conection_db');

//Definir uma logo padrão de ? para a emresa
//Read
async function getEnterprise() {
  const [rows] = await pool.query(`SELECT * FROM enterprise LIMIT 1`);
  return rows[0];
}

//CreateDefault (só existe uma empresa)
async function defaultEnterprise({
  name = "Oblivion",
  phone = "10987654321",
  instagram = null,
  facebook = null,
  email = null,
  logo_image = null
}) {
  const existing = await getEnterprise();

  if (existing) {
    return existing.id;
  }

  const [create] = await pool.query(`
    INSERT INTO enterprise (name, phone, instagram, facebook, email, logo_image)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [name, phone, instagram, facebook, email, logo_image]
  );

  return create.insertId;
}

//Update
async function updateEnterprise({ name, phone, instagram, facebook, email, logo_image }) {
  // Filtra apenas campos que foram enviados (não são null/undefined)
  const fieldsToUpdate = {};
  
  if (name) fieldsToUpdate.name = name;
  if (phone) fieldsToUpdate.phone = phone;
  if (instagram) fieldsToUpdate.instagram = instagram;
  if (facebook) fieldsToUpdate.facebook = facebook;
  if (email) fieldsToUpdate.email = email;
  if (logo_image) fieldsToUpdate.logo_image = logo_image;

  // Se não há campos para atualizar, retorna false
  if (Object.keys(fieldsToUpdate).length === 0) {
    return false;
  }

  // Constrói a query dinamicamente
  const fields = Object.keys(fieldsToUpdate);
  const values = Object.values(fieldsToUpdate);
  const setClause = fields.map(field => `${field} = ?`).join(', ');

  const [result] = await pool.query(`
    UPDATE enterprise
    SET ${setClause}
    LIMIT 1
  `, values);

  return result.affectedRows > 0;
}

module.exports = { 
  getEnterprise, 
  defaultEnterprise, 
  updateEnterprise };

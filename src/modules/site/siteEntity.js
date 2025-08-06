//siteEntity.js
const pool = require('../../../model/conection_db');

//Read
async function getSite() {
  const [rows] = await pool.query(`SELECT * FROM site LIMIT 1`);
  return rows[0];
}

//CreateDefault (só existe um site)
async function defaultSite({
  primary_color = "000000",
  secondary_color = "123456",
  text_color = "FFFFFF"
}) {
  const existing = await getEnterprise();

  if (existing) {
    return existing.id;
  }

  const [create] = await pool.query(`
    INSERT INTO enterprise (primary_color, secondary_color, text_color)
    VALUES (?, ?, ?)`,
    [primary_color, secondary_color, text_color]);

  return create.insertId;
}

//Update
async function updateSite({ primary_color, secondary_color, text_color }) {
  // Filtra apenas campos que foram enviados (não são null/undefined)
  const fieldsToUpdate = {};
  
  if (primary_color) fieldsToUpdate.primary_color = primary_color;
  if (secondary_color) fieldsToUpdate.secondary_color = secondary_color;
  if (text_color) fieldsToUpdate.text_color = text_color;

  // Se não há campos para atualizar, retorna false
  if (Object.keys(fieldsToUpdate).length === 0) {
    return false;
  }

  // Constrói a query dinamicamente
  const fields = Object.keys(fieldsToUpdate);
  const values = Object.values(fieldsToUpdate);
  const setClause = fields.map(field => `${field} = ?`).join(', ');

  const [result] = await pool.query(`
    UPDATE site
    SET ${setClause}
    LIMIT 1
  `, values);

  return result.affectedRows > 0;
}

module.exports = { 
  getSite, 
  defaultSite, 
  updateSite };

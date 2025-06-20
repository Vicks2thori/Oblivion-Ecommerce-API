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
async function updateSite({primary_color, secondary_color, text_color}) {
  const [result] = await pool.query(`
    UPDATE site
    SET primary_color = ?, secondary_color = ?, text_color = ?
    LIMIT 1
  `, [primary_color, secondary_color, text_color]);

  return result.affectedRows > 0;
}

module.exports = { getSite, defaultSite, updateSite};

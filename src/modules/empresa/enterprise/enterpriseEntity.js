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
  const [result] = await pool.query(`
    UPDATE enterprise
    SET name = ?, phone = ?, instagram = ?, facebook = ?, email = ?, logo_image = ?
    LIMIT 1
  `, [name, phone, instagram, facebook, email, logo_image]);

  return result.affectedRows > 0;
}

module.exports = { getEnterprise, defaultEnterprise, updateEnterprise};

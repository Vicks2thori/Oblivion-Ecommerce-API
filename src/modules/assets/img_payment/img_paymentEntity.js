//img_paymentEntity.js
const pool = require('../../../model/conection_db');

//Create
async function createImage(name, patch) {
  const [result] = await pool.query(`
    INSERT INTO image (name, patch)
    VALUES (?, ?)`, [name, patch]
  );
  return result.insertId;
}

// Read
async function getImage(name) {
  const [rows] = await pool.query(`
    SELECT * FROM image WHERE name = ?`, [name]
  );
  return rows[0];
}

// Default - insere imagens padrão apenas se não existirem
async function defaultImages() {
  const defaultImages = [
    { name: 'Pix', patch: 'images/payment/pix.png' },
    { name: 'Money', patch: 'images/payment/money.png' },
    { name: 'Card', patch: 'images/payment/card.png' },
    { name: 'Ticket', patch: 'images/payment/ticket.png' },
    { name: 'Other', patch: 'images/payment/other.png' },
  ];

  for (const img of defaultImages) {
    const existing = await getImage(img.name);
    if (!existing) {
      await createImage(img.name, img.patch);
    }
  }
}

module.exports = { 
  getImage, 
  defaultImages };

const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config({ path: '.\model\db\conectiondb\process.env' }); 

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
  waitForConnections: true,
});


module.exports = pool;
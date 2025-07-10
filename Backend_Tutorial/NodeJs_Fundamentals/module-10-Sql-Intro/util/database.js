// connecting the application to mysql2 database.
const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

module.exports = pool.promise(); // exporting it as a default module.
// it ensures that connection has been established before any code execution can be made through using async/await

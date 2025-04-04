const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node_complete",
  password: "08038838681",
});

module.exports = pool.promise(); // exporting it as a default module.
// it ensures that connection has been established before any code execution can be made through using async/await

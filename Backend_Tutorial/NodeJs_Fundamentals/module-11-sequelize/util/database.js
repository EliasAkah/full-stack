const Sequelize = require("sequelize");

const sequelize = new Sequelize("node_complete", "root", "08038838681", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;

const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Order = sequelize.define("order", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Order;

//these model now represent our table we can populate, update, delete or fetch data from it.
//And we use it to establish relationship  with order model(table);

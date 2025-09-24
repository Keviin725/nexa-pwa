const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Client = sequelize.define(
  "Client",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
    },
    observations: {
      type: DataTypes.TEXT,
    },
    creditBalance: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  },
  {
    tableName: "clients",
    timestamps: true,
  }
);

module.exports = Client;

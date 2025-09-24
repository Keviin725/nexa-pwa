const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SaleItem = sequelize.define(
  "SaleItem",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    unitPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "sale_items",
    timestamps: true,
  }
);

module.exports = SaleItem;

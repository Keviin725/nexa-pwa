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
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    credit_balance: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    totalPurchases: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    lastPurchase: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
      comment: "Código único do cliente",
    },
  },
  {
    tableName: "clients",
    timestamps: true,
  }
);

module.exports = Client;

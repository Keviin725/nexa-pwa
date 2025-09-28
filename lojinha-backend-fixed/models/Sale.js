const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Sale = sequelize.define(
  "Sale",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    saleNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      field: "sale_number",
    },
    subtotal: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    discount: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    tax: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: "total_amount",
    },
    paymentMethod: {
      type: DataTypes.ENUM("cash", "card", "transfer", "credit"),
      allowNull: false,
      field: "payment_method",
    },
    paymentStatus: {
      type: DataTypes.ENUM("paid", "pending", "partial"),
      defaultValue: "paid",
      field: "payment_status",
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "due_date",
      comment: "Data de vencimento para vendas fiadas",
    },
    notes: {
      type: DataTypes.TEXT,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "sales",
    timestamps: true,
  }
);

module.exports = Sale;

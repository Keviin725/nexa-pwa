const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CreditPayment = sequelize.define(
  "CreditPayment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amountPaid: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    paymentMethod: {
      type: DataTypes.ENUM("cash", "card", "pix", "transfer"),
      allowNull: false,
      field: "payment_method",
    },
    notes: {
      type: DataTypes.TEXT,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
      comment: "Código único do pagamento",
    },
  },
  {
    tableName: "credit_payments",
    timestamps: true,
  }
);

module.exports = CreditPayment;

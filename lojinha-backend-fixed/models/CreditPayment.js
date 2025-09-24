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
    },
    notes: {
      type: DataTypes.TEXT,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "credit_payments",
    timestamps: true,
  }
);

module.exports = CreditPayment;

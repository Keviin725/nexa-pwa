const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Product = sequelize.define(
  "Product",
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
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    costPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: "Preço de custo para cálculo de lucro",
    },
    category: {
      type: DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING,
      unique: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    minStock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: "Estoque mínimo para alertas",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "products",
    timestamps: true,
  }
);

module.exports = Product;

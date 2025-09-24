const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
  "User",
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
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "manager", "seller"),
      defaultValue: "seller",
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    permissions: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: "Permissões específicas do usuário",
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

module.exports = User;

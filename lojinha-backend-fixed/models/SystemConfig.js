const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SystemConfig = sequelize.define(
  "SystemConfig",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    key: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "system_configs",
    timestamps: true,
  }
);

module.exports = SystemConfig;

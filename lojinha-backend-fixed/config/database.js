require("dotenv").config();
const { Sequelize } = require("sequelize");
const path = require("path");

// Verificar se JWT_SECRET está definido
if (!process.env.JWT_SECRET) {
  console.warn(
    "⚠️ JWT_SECRET não está definido. Usando valor padrão para desenvolvimento."
  );
  process.env.JWT_SECRET = "nexa-development-secret-key";
}

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT || "sqlite",
  storage:
    process.env.DB_STORAGE || path.resolve(__dirname, "./database.sqlite"),
  logging: false,

  define: {
    timestamps: true, // Cria created_at e updated_at
    underscored: true, // Converte camelCase para snake_case
  },
});

module.exports = sequelize;

require("dotenv").config();
const { Sequelize } = require("sequelize");
const path = require("path");

// Verificar se JWT_SECRET está definido
if (!process.env.JWT_SECRET) {
  throw new Error(
    "JWT_SECRET não está definido nas variáveis de ambiente. Crie um arquivo .env com JWT_SECRET=seu-secret-seguro"
  );
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

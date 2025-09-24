require("dotenv").config();
const { Sequelize } = require("sequelize");
const path = require("path");

// Configurar variáveis de ambiente se não existirem
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'lojinha-pwa-secret-key-2024';
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

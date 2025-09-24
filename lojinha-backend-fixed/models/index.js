// Exportar todos os modelos
const User = require("./User");
const Product = require("./Product");
const Client = require("./Client");
const Sale = require("./Sale");
const CreditPayment = require("./CreditPayment");
const SystemConfig = require("./SystemConfig");
const SaleItem = require("./SaleItem");

// Importar associações
require("./associations");

module.exports = {
  User,
  Product,
  Client,
  Sale,
  CreditPayment,
  SystemConfig,
  SaleItem,
};

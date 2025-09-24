const Product = require("./Product");
const Client = require("./Client");
const Sale = require("./Sale");
const SaleItem = require("./SaleItem");
const CreditPayment = require("./CreditPayment");
const User = require("./User");
const SystemConfig = require("./SystemConfig");
const Category = require("./Category");

// Associações
Client.hasMany(Sale);
Sale.belongsTo(Client);

Sale.hasMany(SaleItem);
SaleItem.belongsTo(Sale);

Product.hasMany(SaleItem);
SaleItem.belongsTo(Product);

Client.hasMany(CreditPayment);
CreditPayment.belongsTo(Client);

Sale.hasMany(CreditPayment);
CreditPayment.belongsTo(Sale);

// Associações com User (opcional para múltiplos usuários)
User.hasMany(Sale);
Sale.belongsTo(User);

// Associações com Category
Category.hasMany(Product);
Product.belongsTo(Category);

module.exports = {
  Product,
  Client,
  Sale,
  SaleItem,
  CreditPayment,
  User,
  SystemConfig,
  Category,
};

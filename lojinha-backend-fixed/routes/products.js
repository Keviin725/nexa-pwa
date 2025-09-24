const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock,
  getCategories,
  getLowStockProducts,
} = require("../controllers/productController");

// Rotas específicas (devem vir antes das rotas com parâmetros)
router.get("/categories", getCategories);
router.get("/low-stock", getLowStockProducts);

// Rotas principais
router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

// Rotas com parâmetros
router.put("/:id/stock", updateStock);

module.exports = router;

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

// Rotas principais
router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

// Rotas específicas
router.put("/:id/stock", updateStock);
router.get("/categories/list", getCategories);
router.get("/low-stock/list", getLowStockProducts);

module.exports = router;

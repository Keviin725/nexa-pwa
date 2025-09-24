const express = require("express");
const router = express.Router();
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryProducts,
  getCategoryStats,
} = require("../controllers/categoryController");

// Middleware de autenticação (assumindo que existe)
// const auth = require("../middleware/auth");

// GET /categories - Listar todas as categorias
router.get("/", getCategories);

// GET /categories/stats - Estatísticas das categorias
router.get("/stats", getCategoryStats);

// GET /categories/:id - Buscar categoria por ID
router.get("/:id", getCategoryById);

// GET /categories/:id/products - Produtos de uma categoria
router.get("/:id/products", getCategoryProducts);

// POST /categories - Criar nova categoria
router.post("/", createCategory);

// PUT /categories/:id - Atualizar categoria
router.put("/:id", updateCategory);

// DELETE /categories/:id - Desativar categoria
router.delete("/:id", deleteCategory);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
  updateUserPermissions,
  getUserStats,
  bulkUserAction,
} = require("../controllers/userController");

// Middleware de autenticação (assumindo que existe)
// const auth = require("../middleware/auth");

// GET /users/stats - Estatísticas dos usuários
router.get("/stats", getUserStats);

// GET /users - Listar todos os usuários
router.get("/", getUsers);

// GET /users/:id - Buscar usuário por ID
router.get("/:id", getUserById);

// POST /users - Criar novo usuário
router.post("/", createUser);

// PUT /users/:id - Atualizar usuário
router.put("/:id", updateUser);

// PUT /users/:id/status - Alterar status do usuário
router.put("/:id/status", toggleUserStatus);

// PUT /users/:id/permissions - Atualizar permissões do usuário
router.put("/:id/permissions", updateUserPermissions);

// POST /users/bulk-action - Ações em lote
router.post("/bulk-action", bulkUserAction);

// DELETE /users/:id - Desativar usuário
router.delete("/:id", deleteUser);

module.exports = router;

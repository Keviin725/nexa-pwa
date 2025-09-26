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

// Middleware de autenticação
const {
  authenticateToken,
  requireActiveUser,
  requireRole,
  canManageUser,
} = require("../middleware/auth");

// GET /users/stats - Estatísticas dos usuários
router.get(
  "/stats",
  authenticateToken,
  requireActiveUser,
  requireRole(["admin", "manager"]),
  getUserStats
);

// GET /users - Listar todos os usuários
router.get(
  "/",
  authenticateToken,
  requireActiveUser,
  requireRole(["admin", "manager"]),
  getUsers
);

// GET /users/:id - Buscar usuário por ID
router.get(
  "/:id",
  authenticateToken,
  requireActiveUser,
  requireRole(["admin", "manager"]),
  getUserById
);

// POST /users - Criar novo usuário
router.post(
  "/",
  authenticateToken,
  requireActiveUser,
  requireRole(["admin", "manager"]),
  createUser
);

// PUT /users/:id - Atualizar usuário
router.put(
  "/:id",
  authenticateToken,
  requireActiveUser,
  canManageUser,
  updateUser
);

// PUT /users/:id/status - Alterar status do usuário
router.put(
  "/:id/status",
  authenticateToken,
  requireActiveUser,
  canManageUser,
  toggleUserStatus
);

// PUT /users/:id/permissions - Atualizar permissões do usuário
router.put(
  "/:id/permissions",
  authenticateToken,
  requireActiveUser,
  requireRole(["admin"]),
  updateUserPermissions
);

// POST /users/bulk-action - Ações em lote
router.post(
  "/bulk-action",
  authenticateToken,
  requireActiveUser,
  requireRole(["admin", "manager"]),
  bulkUserAction
);

// DELETE /users/:id - Desativar usuário
router.delete(
  "/:id",
  authenticateToken,
  requireActiveUser,
  canManageUser,
  deleteUser
);

module.exports = router;

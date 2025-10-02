const express = require("express");
const router = express.Router();
const {
  getSubscriptionInfo,
  updateSubscriptionPlan,
  checkLimits,
} = require("../controllers/subscriptionController");

// Middleware de autenticação
const { authenticateToken, requireActiveUser } = require("../middleware/auth");

// GET /subscription/info - Obter informações da subscription
router.get("/info", authenticateToken, requireActiveUser, getSubscriptionInfo);

// PUT /subscription/plan - Atualizar plano de subscription
router.put(
  "/plan",
  authenticateToken,
  requireActiveUser,
  updateSubscriptionPlan
);

// GET /subscription/limits - Verificar limites atuais
router.get("/limits", authenticateToken, requireActiveUser, checkLimits);

module.exports = router;

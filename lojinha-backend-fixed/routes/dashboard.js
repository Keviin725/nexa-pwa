const express = require("express");
const router = express.Router();
const {
  getDashboardData,
  getSalesSummary,
  getAnalytics,
} = require("../controllers/dashboardController");

// Middleware de autenticação (assumindo que existe)
// const auth = require("../middleware/auth");

// GET /dashboard - Métricas do dashboard
router.get("/", getDashboardData);

// GET /dashboard/sales-summary - Resumo de vendas
router.get("/sales-summary", getSalesSummary);

// GET /dashboard/analytics - Análises avançadas
router.get("/analytics", getAnalytics);

module.exports = router;

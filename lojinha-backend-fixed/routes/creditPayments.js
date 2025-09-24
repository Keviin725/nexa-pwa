const express = require("express");
const router = express.Router();
const {
  getCreditPayments,
  getCreditPaymentById,
  createCreditPayment,
  updateCreditPayment,
  deleteCreditPayment,
  getPaymentsBySale,
  getPaymentsByClient,
} = require("../controllers/creditPaymentController");

// Rotas principais
router.get("/", getCreditPayments);
router.get("/:id", getCreditPaymentById);
router.post("/", createCreditPayment);
router.put("/:id", updateCreditPayment);
router.delete("/:id", deleteCreditPayment);

// Rotas específicas
router.get("/sale/:saleId", getPaymentsBySale);
router.get("/client/:clientId", getPaymentsByClient);

module.exports = router;

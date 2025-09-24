const express = require("express");
const router = express.Router();
const {
  getSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale,
  generateReceipt,
  getSalesByClient,
} = require("../controllers/SaleController");

// Rotas principais
router.get("/", getSales);
router.get("/:id", getSaleById);
router.post("/", createSale);
router.put("/:id", updateSale);
router.delete("/:id", deleteSale);

// Rotas específicas
router.get("/:id/receipt", generateReceipt);
router.get("/client/:clientId", getSalesByClient);

module.exports = router;

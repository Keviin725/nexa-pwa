const express = require("express");
const router = express.Router();
const {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getClientDebts,
  getClientHistory,
  getClientsWithDebts,
} = require("../controllers/clientController");

// Rotas principais
router.get("/", getClients);
router.get("/:id", getClientById);
router.post("/", createClient);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

// Rotas específicas
router.get("/:clientId/debts", getClientDebts);
router.get("/:clientId/history", getClientHistory);
router.get("/debts/list", getClientsWithDebts);

module.exports = router;

const express = require("express");
const router = express.Router();
const { SystemConfig } = require("../models/associations");

// GET /system-config - Listar todas as configurações
router.get("/", async (req, res) => {
  try {
    const configs = await SystemConfig.findAll();
    res.json(configs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /system-config/:key - Buscar configuração por chave
router.get("/:key", async (req, res) => {
  try {
    const config = await SystemConfig.findOne({
      where: { key: req.params.key },
    });
    if (!config) {
      return res.status(404).json({ error: "Configuração não encontrada" });
    }
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /system-config - Criar nova configuração
router.post("/", async (req, res) => {
  try {
    const config = await SystemConfig.create(req.body);
    res.status(201).json(config);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /system-config/:key - Atualizar configuração
router.put("/:key", async (req, res) => {
  try {
    const config = await SystemConfig.findOne({
      where: { key: req.params.key },
    });
    if (!config) {
      return res.status(404).json({ error: "Configuração não encontrada" });
    }
    await config.update(req.body);
    res.json(config);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /system-config/:key - Deletar configuração
router.delete("/:key", async (req, res) => {
  try {
    const config = await SystemConfig.findOne({
      where: { key: req.params.key },
    });
    if (!config) {
      return res.status(404).json({ error: "Configuração não encontrada" });
    }
    await config.destroy();
    res.json({ message: "Configuração deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

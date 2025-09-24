const express = require("express");
const router = express.Router();
const { User } = require("../models/associations");

// GET /users - Listar todos os usuários
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      where: { isActive: true },
      attributes: { exclude: ["password"] },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /users/:id - Buscar usuário por ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /users - Criar novo usuário
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    const { password, ...userWithoutPassword } = user.toJSON();
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /users/:id - Atualizar usuário
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    await user.update(req.body);
    const { password, ...userWithoutPassword } = user.toJSON();
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /users/:id - Desativar usuário (soft delete)
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    await user.update({ isActive: false });
    res.json({ message: "Usuário desativado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

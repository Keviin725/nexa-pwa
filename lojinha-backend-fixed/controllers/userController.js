const { User, Sale } = require("../models/associations");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

// GET /users - Listar todos os usuários
const getUsers = async (req, res) => {
  try {
    const { search, role, status, page = 1, limit = 10 } = req.query;

    let whereClause = {};

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
      ];
    }

    if (role) {
      whereClause.role = role;
    }

    if (status) {
      whereClause.status = status;
    }

    const offset = (page - 1) * limit;

    const { count, rows: users } = await User.findAndCountAll({
      where: whereClause,
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Sale,
          attributes: ["id"],
          required: false,
        },
      ],
      order: [["name", "ASC"]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    // Adicionar contagem de vendas para cada usuário
    const usersWithStats = users.map((user) => ({
      ...user.toJSON(),
      salesCount: user.Sales ? user.Sales.length : 0,
    }));

    res.json({
      users: usersWithStats,
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /users/:id - Buscar usuário por ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Sale,
          attributes: ["id", "sale_number", "total_amount", "created_at"],
          order: [["created_at", "DESC"]],
          limit: 10,
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /users - Criar novo usuário
const createUser = async (req, res) => {
  try {
    const { name, email, phone, password, role, permissions } = req.body;

    // Verificar se email já existe
    const existingUser = await User.findOne({
      where: { email: { [Op.like]: email } },
    });

    if (existingUser) {
      return res.status(400).json({
        error: "Já existe um usuário com este email",
      });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: role || "seller",
      permissions: permissions || [],
    });

    // Retornar usuário sem senha
    const userResponse = user.toJSON();
    delete userResponse.password;

    res.status(201).json(userResponse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PUT /users/:id - Atualizar usuário
const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Verificar se o novo email já existe (se foi alterado)
    if (req.body.email && req.body.email !== user.email) {
      const existingUser = await User.findOne({
        where: {
          email: { [Op.iLike]: req.body.email },
          id: { [Op.ne]: req.params.id },
        },
      });

      if (existingUser) {
        return res.status(400).json({
          error: "Já existe um usuário com este email",
        });
      }
    }

    // Hash da nova senha se fornecida
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    await user.update(req.body);

    // Retornar usuário sem senha
    const userResponse = user.toJSON();
    delete userResponse.password;

    res.json(userResponse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE /users/:id - Desativar usuário
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Verificar se é o último admin
    if (user.role === "admin") {
      const adminCount = await User.count({
        where: { role: "admin", is_active: true },
      });

      if (adminCount <= 1) {
        return res.status(400).json({
          error: "Não é possível desativar o último administrador",
        });
      }
    }

    await user.update({ is_active: false });
    res.json({ message: "Usuário desativado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /users/:id/status - Alterar status do usuário
const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Verificar se é o último admin ativo
    if (user.role === "admin" && user.is_active) {
      const activeAdminCount = await User.count({
        where: { role: "admin", is_active: true },
      });

      if (activeAdminCount <= 1) {
        return res.status(400).json({
          error: "Não é possível desativar o último administrador ativo",
        });
      }
    }

    await user.update({
      is_active: !user.is_active,
      status: user.is_active ? "inactive" : "active",
    });

    res.json({
      message: `Usuário ${
        user.is_active ? "ativado" : "desativado"
      } com sucesso`,
      is_active: !user.is_active,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /users/:id/permissions - Atualizar permissões do usuário
const updateUserPermissions = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const { permissions } = req.body;

    await user.update({ permissions });

    res.json({
      message: "Permissões atualizadas com sucesso",
      permissions: user.permissions,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET /users/stats - Estatísticas dos usuários
const getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const activeUsers = await User.count({ where: { is_active: true } });
    const adminUsers = await User.count({
      where: { role: "admin", is_active: true },
    });
    const managerUsers = await User.count({
      where: { role: "manager", is_active: true },
    });
    const sellerUsers = await User.count({
      where: { role: "seller", is_active: true },
    });

    res.json({
      totalUsers,
      activeUsers,
      adminUsers,
      managerUsers,
      sellerUsers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /users/bulk-action - Ações em lote
const bulkUserAction = async (req, res) => {
  try {
    const { userIds, action } = req.body;

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ error: "Lista de usuários é obrigatória" });
    }

    let result;

    switch (action) {
      case "activate":
        result = await User.update(
          { is_active: true, status: "active" },
          { where: { id: { [Op.in]: userIds } } }
        );
        break;

      case "deactivate":
        // Verificar se algum dos usuários é admin
        const adminUsers = await User.findAll({
          where: { id: { [Op.in]: userIds }, role: "admin", is_active: true },
        });

        if (adminUsers.length > 0) {
          const activeAdminCount = await User.count({
            where: { role: "admin", is_active: true },
          });

          if (activeAdminCount - adminUsers.length <= 0) {
            return res.status(400).json({
              error: "Não é possível desativar todos os administradores",
            });
          }
        }

        result = await User.update(
          { is_active: false, status: "inactive" },
          { where: { id: { [Op.in]: userIds } } }
        );
        break;

      case "delete":
        // Verificar se algum dos usuários é admin
        const adminUsersToDelete = await User.findAll({
          where: { id: { [Op.in]: userIds }, role: "admin", is_active: true },
        });

        if (adminUsersToDelete.length > 0) {
          const activeAdminCount = await User.count({
            where: { role: "admin", is_active: true },
          });

          if (activeAdminCount - adminUsersToDelete.length <= 0) {
            return res.status(400).json({
              error: "Não é possível excluir todos os administradores",
            });
          }
        }

        result = await User.update(
          { is_active: false },
          { where: { id: { [Op.in]: userIds } } }
        );
        break;

      default:
        return res.status(400).json({ error: "Ação inválida" });
    }

    res.json({
      message: `Ação ${action} executada com sucesso`,
      affectedRows: result[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
  updateUserPermissions,
  getUserStats,
  bulkUserAction,
};

const jwt = require("jsonwebtoken");
const { User } = require("../models/associations");

// Middleware para verificar token JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token de acesso requerido" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido" });
    }
    req.user = decoded;
    next();
  });
};

// Middleware para verificar se usuário está ativo
const requireActiveUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user || user.status !== "active" || !user.is_active) {
      return res.status(401).json({ message: "Usuário inativo" });
    }
    req.currentUser = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "Erro ao verificar usuário" });
  }
};

// Middleware para verificar role específico
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.currentUser) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    const userRole = req.currentUser.role;
    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    next();
  };
};

// Middleware para verificar permissões específicas
const requirePermission = (permissions) => {
  return (req, res, next) => {
    if (!req.currentUser) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    const userRole = req.currentUser.role;
    const userPermissions = req.currentUser.permissions || [];

    // Admin tem todas as permissões
    if (userRole === "admin") {
      return next();
    }

    // Verificar se usuário tem pelo menos uma das permissões necessárias
    const hasPermission = permissions.some((permission) =>
      userPermissions.includes(permission)
    );

    if (!hasPermission) {
      return res.status(403).json({ message: "Permissão insuficiente" });
    }

    next();
  };
};

// Middleware para verificar se pode gerenciar outro usuário
const canManageUser = (req, res, next) => {
  if (!req.currentUser) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }

  const currentUser = req.currentUser;
  const targetUserId = req.params.id;

  // Admin pode gerenciar todos
  if (currentUser.role === "admin") {
    return next();
  }

  // Gerente pode gerenciar vendedores
  if (currentUser.role === "manager") {
    // Verificar se o usuário alvo é vendedor
    User.findByPk(targetUserId)
      .then((targetUser) => {
        if (!targetUser) {
          return res.status(404).json({ message: "Usuário não encontrado" });
        }

        if (targetUser.role === "seller") {
          return next();
        }

        return res.status(403).json({ message: "Acesso negado" });
      })
      .catch((error) => {
        res.status(500).json({ message: "Erro ao verificar usuário" });
      });
  } else {
    return res.status(403).json({ message: "Acesso negado" });
  }
};

module.exports = {
  authenticateToken,
  requireActiveUser,
  requireRole,
  requirePermission,
  canManageUser,
};

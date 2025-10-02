const { User } = require("../models");

// Planos e seus limites
const PLAN_LIMITS = {
  teste: {
    maxUsers: 1,
    maxProducts: 50,
    maxSales: 100,
    aiFeatures: [],
  },
  starter: {
    maxUsers: 1,
    maxProducts: 100,
    maxSales: 200,
    aiFeatures: [],
  },
  pro: {
    maxUsers: 5,
    maxProducts: 500,
    maxSales: 1000,
    aiFeatures: [
      "AI Stock Predictor",
      "AI Sales Optimizer",
      "AI Customer Insights",
    ],
  },
  enterprise: {
    maxUsers: -1, // ilimitado
    maxProducts: -1, // ilimitado
    maxSales: -1, // ilimitado
    aiFeatures: [
      "AI Stock Predictor",
      "AI Sales Optimizer",
      "AI Customer Insights",
      "AI Analytics Dashboard",
      "AI Mobile Assistant",
      "AI Security & Permissions",
    ],
  },
};

// Middleware para verificar limites de subscription
const validateSubscriptionLimits = (resourceType) => {
  return async (req, res, next) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
      }

      // Buscar usuário e plano atual
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      const currentPlan = user.subscription_plan || "teste";
      const limits = PLAN_LIMITS[currentPlan];

      if (!limits) {
        return res
          .status(400)
          .json({ error: "Plano de subscription inválido" });
      }

      // Verificar limites baseado no tipo de recurso
      switch (resourceType) {
        case "users":
          if (limits.maxUsers !== -1) {
            const userCount = await User.count({ where: { is_active: true } });
            if (userCount >= limits.maxUsers) {
              return res.status(403).json({
                error: "Limite de usuários atingido",
                message: `Seu plano ${currentPlan} permite apenas ${limits.maxUsers} usuário(s)`,
                upgradeRequired: true,
              });
            }
          }
          break;

        case "products":
          if (limits.maxProducts !== -1) {
            const { Product } = require("../models");
            const productCount = await Product.count({
              where: { is_active: true },
            });
            if (productCount >= limits.maxProducts) {
              return res.status(403).json({
                error: "Limite de produtos atingido",
                message: `Seu plano ${currentPlan} permite apenas ${limits.maxProducts} produtos`,
                upgradeRequired: true,
              });
            }
          }
          break;

        case "sales":
          if (limits.maxSales !== -1) {
            const { Sale } = require("../models");
            const saleCount = await Sale.count();
            if (saleCount >= limits.maxSales) {
              return res.status(403).json({
                error: "Limite de vendas atingido",
                message: `Seu plano ${currentPlan} permite apenas ${limits.maxSales} vendas`,
                upgradeRequired: true,
              });
            }
          }
          break;

        default:
          return res.status(400).json({ error: "Tipo de recurso inválido" });
      }

      // Adicionar informações do plano ao request
      req.subscriptionPlan = currentPlan;
      req.planLimits = limits;
      next();
    } catch (error) {
      console.error("Erro na validação de subscription:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  };
};

// Middleware para verificar funcionalidades de IA
const validateAIFeature = (aiFeature) => {
  return async (req, res, next) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
      }

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      const currentPlan = user.subscription_plan || "teste";
      const limits = PLAN_LIMITS[currentPlan];

      if (!limits.aiFeatures.includes(aiFeature)) {
        return res.status(403).json({
          error: "Funcionalidade de IA não disponível",
          message: `A funcionalidade ${aiFeature} não está disponível no plano ${currentPlan}`,
          upgradeRequired: true,
          requiredPlan: getRequiredPlan(aiFeature),
        });
      }

      req.subscriptionPlan = currentPlan;
      req.planLimits = limits;
      next();
    } catch (error) {
      console.error("Erro na validação de IA:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  };
};

// Função para determinar qual plano é necessário para uma funcionalidade
const getRequiredPlan = (aiFeature) => {
  const proFeatures = [
    "AI Stock Predictor",
    "AI Sales Optimizer",
    "AI Customer Insights",
  ];
  const enterpriseFeatures = [
    "AI Analytics Dashboard",
    "AI Mobile Assistant",
    "AI Security & Permissions",
  ];

  if (proFeatures.includes(aiFeature)) return "pro";
  if (enterpriseFeatures.includes(aiFeature)) return "enterprise";
  return "pro";
};

// Middleware para obter informações do plano atual
const getSubscriptionInfo = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const currentPlan = user.subscription_plan || "teste";
    const limits = PLAN_LIMITS[currentPlan];

    req.subscriptionPlan = currentPlan;
    req.planLimits = limits;
    next();
  } catch (error) {
    console.error("Erro ao obter informações de subscription:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

module.exports = {
  validateSubscriptionLimits,
  validateAIFeature,
  getSubscriptionInfo,
  PLAN_LIMITS,
};

const { User, Product, Sale } = require("../models/associations");
const { PLAN_LIMITS } = require("../middleware/subscriptionValidation");

// GET /subscription/info - Obter informações da subscription
const getSubscriptionInfo = async (req, res) => {
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

    // Contar recursos atuais
    const [userCount, productCount, saleCount] = await Promise.all([
      User.count({ where: { is_active: true } }),
      Product.count({ where: { is_active: true } }),
      Sale.count(),
    ]);

    // Calcular uso percentual
    const usage = {
      users:
        limits.maxUsers === -1
          ? null
          : {
              current: userCount,
              limit: limits.maxUsers,
              percentage: Math.round((userCount / limits.maxUsers) * 100),
            },
      products:
        limits.maxProducts === -1
          ? null
          : {
              current: productCount,
              limit: limits.maxProducts,
              percentage: Math.round((productCount / limits.maxProducts) * 100),
            },
      sales:
        limits.maxSales === -1
          ? null
          : {
              current: saleCount,
              limit: limits.maxSales,
              percentage: Math.round((saleCount / limits.maxSales) * 100),
            },
    };

    res.json({
      currentPlan,
      planInfo: {
        name: limits.name || currentPlan,
        color: limits.color || "gray",
        features: limits.features || [],
        aiFeatures: limits.aiFeatures || [],
      },
      limits,
      usage,
      canUpgrade: currentPlan !== "enterprise",
    });
  } catch (error) {
    console.error("Erro ao obter informações de subscription:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// PUT /subscription/plan - Atualizar plano de subscription
const updateSubscriptionPlan = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { plan } = req.body;

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    if (!plan || !PLAN_LIMITS[plan]) {
      return res.status(400).json({ error: "Plano de subscription inválido" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Atualizar plano
    await user.update({ subscription_plan: plan });

    res.json({
      message: "Plano de subscription atualizado com sucesso",
      newPlan: plan,
      planInfo: {
        name: PLAN_LIMITS[plan].name || plan,
        color: PLAN_LIMITS[plan].color || "gray",
        features: PLAN_LIMITS[plan].features || [],
        aiFeatures: PLAN_LIMITS[plan].aiFeatures || [],
      },
    });
  } catch (error) {
    console.error("Erro ao atualizar plano de subscription:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// GET /subscription/limits - Verificar limites atuais
const checkLimits = async (req, res) => {
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

    // Verificar se está próximo dos limites
    const [userCount, productCount, saleCount] = await Promise.all([
      User.count({ where: { is_active: true } }),
      Product.count({ where: { is_active: true } }),
      Sale.count(),
    ]);

    const warnings = [];

    if (limits.maxUsers !== -1 && userCount >= limits.maxUsers * 0.8) {
      warnings.push({
        type: "users",
        message: `Você está usando ${userCount}/${limits.maxUsers} usuários`,
        critical: userCount >= limits.maxUsers,
      });
    }

    if (limits.maxProducts !== -1 && productCount >= limits.maxProducts * 0.8) {
      warnings.push({
        type: "products",
        message: `Você está usando ${productCount}/${limits.maxProducts} produtos`,
        critical: productCount >= limits.maxProducts,
      });
    }

    if (limits.maxSales !== -1 && saleCount >= limits.maxSales * 0.8) {
      warnings.push({
        type: "sales",
        message: `Você está usando ${saleCount}/${limits.maxSales} vendas`,
        critical: saleCount >= limits.maxSales,
      });
    }

    res.json({
      currentPlan,
      limits,
      usage: {
        users: userCount,
        products: productCount,
        sales: saleCount,
      },
      warnings,
      canUpgrade: currentPlan !== "enterprise",
    });
  } catch (error) {
    console.error("Erro ao verificar limites:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

module.exports = {
  getSubscriptionInfo,
  updateSubscriptionPlan,
  checkLimits,
};

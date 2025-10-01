import { defineStore } from "pinia";

export const useSubscriptionStore = defineStore("subscription", {
  state: () => ({
    currentPlan: "teste", // teste, starter, pro, enterprise
    planFeatures: {
      teste: {
        name: "Teste",
        color: "gray",
        maxUsers: 1,
        maxProducts: 50,
        maxSales: 100,
        features: [
          "Gestão básica de vendas",
          "Produtos limitados",
          "Relatórios simples",
          "Suporte por email",
        ],
        aiFeatures: [],
      },
      starter: {
        name: "Starter",
        color: "green",
        maxUsers: 1,
        maxProducts: 100,
        maxSales: 200,
        features: [
          "Gestão básica de vendas",
          "Até 100 produtos",
          "1 utilizador",
          "Relatórios básicos",
          "Suporte por email",
          "Backup automático",
        ],
        aiFeatures: [],
      },
      pro: {
        name: "Pro",
        color: "blue",
        maxUsers: 5,
        maxProducts: 500,
        maxSales: 1000,
        features: [
          "Gestão completa de vendas",
          "Produtos ilimitados",
          "Relatórios avançados",
          "Suporte prioritário",
          "Backup automático",
        ],
        aiFeatures: [
          "AI Stock Predictor",
          "AI Sales Optimizer",
          "AI Customer Insights",
        ],
      },
      enterprise: {
        name: "Enterprise",
        color: "purple",
        maxUsers: -1, // ilimitado
        maxProducts: -1, // ilimitado
        maxSales: -1, // ilimitado
        features: [
          "Todas as funcionalidades Pro",
          "Usuários ilimitados",
          "Produtos ilimitados",
          "Vendas ilimitadas",
          "Suporte 24/7",
          "API personalizada",
          "Integrações avançadas",
        ],
        aiFeatures: [
          "AI Stock Predictor",
          "AI Sales Optimizer",
          "AI Customer Insights",
          "AI Analytics Dashboard",
          "AI Mobile Assistant",
          "AI Security & Permissions",
        ],
      },
    },
  }),

  getters: {
    currentPlanInfo: (state) => state.planFeatures[state.currentPlan],
    isTestPlan: (state) => state.currentPlan === "teste",
    isStarterPlan: (state) => state.currentPlan === "starter",
    isProPlan: (state) => state.currentPlan === "pro",
    isEnterprisePlan: (state) => state.currentPlan === "enterprise",

    // Verificar se tem acesso a funcionalidade específica
    hasFeature: (state) => (feature) => {
      const plan = state.planFeatures[state.currentPlan];
      return plan.features.includes(feature);
    },

    // Verificar se tem acesso a funcionalidade de IA
    hasAIFeature: (state) => (aiFeature) => {
      const plan = state.planFeatures[state.currentPlan];
      return plan.aiFeatures.includes(aiFeature);
    },

    // Verificar limites
    canCreateUser: (state) => {
      const plan = state.planFeatures[state.currentPlan];
      return plan.maxUsers === -1 || plan.maxUsers > 0; // Simplificado para demo
    },

    canCreateProduct: (state) => {
      const plan = state.planFeatures[state.currentPlan];
      return plan.maxProducts === -1 || plan.maxProducts > 0; // Simplificado para demo
    },

    canCreateSale: (state) => {
      const plan = state.planFeatures[state.currentPlan];
      return plan.maxSales === -1 || plan.maxSales > 0; // Simplificado para demo
    },
  },

  actions: {
    // Mudar plano de subscription
    setPlan(plan) {
      if (this.planFeatures[plan]) {
        this.currentPlan = plan;
        localStorage.setItem("subscription_plan", plan);
      }
    },

    // Carregar plano do localStorage
    loadFromStorage() {
      const savedPlan = localStorage.getItem("subscription_plan");
      if (savedPlan && this.planFeatures[savedPlan]) {
        this.currentPlan = savedPlan;
      }
    },

    // Inicializar store
    init() {
      this.loadFromStorage();
    },

    // Upgrade de plano
    upgradeToStarter() {
      this.setPlan("starter");
    },

    upgradeToPro() {
      this.setPlan("pro");
    },

    upgradeToEnterprise() {
      this.setPlan("enterprise");
    },

    // Downgrade para teste
    downgradeToTest() {
      this.setPlan("teste");
    },
  },
});

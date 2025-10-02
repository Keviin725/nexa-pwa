import { defineStore } from "pinia";
import { apiService } from "@/services/api";

export const useSubscriptionStore = defineStore("subscription", {
  state: () => ({
    currentPlan: "teste", // teste, starter, pro, enterprise
    planInfo: null,
    limits: null,
    usage: null,
    loading: false,
    error: null,
    planFeatures: {
      teste: {
        name: "Oferta Pro",
        color: "blue",
        price: 0,
        isFree: true,
        isOffer: true, // É uma oferta, não um plano
        isTrial: true,
        trialDays: 30,
        basePlan: "pro", // Acesso ao plano Pro
        maxUsers: 5,
        maxProducts: 500,
        maxSales: 1000,
        features: [
          "30 dias de acesso completo ao Pro",
          "Todas as funcionalidades Pro",
          "IA Stock Predictor",
          "AI Sales Optimizer",
          "AI Customer Insights",
          "Suporte prioritário",
        ],
        aiFeatures: [
          "AI Stock Predictor",
          "AI Sales Optimizer",
          "AI Customer Insights",
        ],
      },
      starter: {
        name: "Starter",
        color: "green",
        price: 499,
        yearlyPrice: 399,
        isFree: false,
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
        price: 999,
        yearlyPrice: 799,
        isFree: false,
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
        price: 1999,
        yearlyPrice: 1599,
        isFree: false,
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
    // Usar dados do backend se disponíveis, senão fallback para dados locais
    currentPlanInfo: (state) =>
      state.planInfo || state.planFeatures[state.currentPlan],
    isTestPlan: (state) => state.currentPlan === "teste",
    isStarterPlan: (state) => state.currentPlan === "starter",
    isProPlan: (state) => state.currentPlan === "pro",
    isEnterprisePlan: (state) => state.currentPlan === "enterprise",

    // Verificar se tem acesso a funcionalidade específica
    hasFeature: (state) => (feature) => {
      const planInfo = state.planInfo || state.planFeatures[state.currentPlan];
      return planInfo?.features?.includes(feature) || false;
    },

    // Verificar se tem acesso a funcionalidade de IA
    hasAIFeature: (state) => (aiFeature) => {
      const planInfo = state.planInfo || state.planFeatures[state.currentPlan];
      return planInfo?.aiFeatures?.includes(aiFeature) || false;
    },

    // Verificar limites baseado em dados reais do backend
    canCreateUser: (state) => {
      if (!state.limits || !state.usage) return true;
      return (
        state.limits.maxUsers === -1 ||
        state.usage.users < state.limits.maxUsers
      );
    },

    canCreateProduct: (state) => {
      if (!state.limits || !state.usage) return true;
      return (
        state.limits.maxProducts === -1 ||
        state.usage.products < state.limits.maxProducts
      );
    },

    canCreateSale: (state) => {
      if (!state.limits || !state.usage) return true;
      return (
        state.limits.maxSales === -1 ||
        state.usage.sales < state.limits.maxSales
      );
    },

    // Obter percentual de uso
    usagePercentage: (state) => (resource) => {
      if (!state.usage || !state.limits) return 0;
      const resourceUsage = state.usage[resource];
      const resourceLimit =
        state.limits[
          `max${resource.charAt(0).toUpperCase() + resource.slice(1)}`
        ];
      if (resourceLimit === -1) return 0;
      return Math.round((resourceUsage / resourceLimit) * 100);
    },
  },

  actions: {
    // Carregar informações de subscription do backend
    async loadSubscriptionInfo() {
      this.loading = true;
      this.error = null;

      try {
        const response = await apiService.subscription.getInfo();

        // Garantir que currentPlan não seja undefined
        this.currentPlan = response.currentPlan || "teste";
        this.planInfo = response.planInfo;
        this.limits = response.limits;
        this.usage = response.usage;

        // Salvar no localStorage para persistência
        localStorage.setItem("subscription_plan", this.currentPlan);
      } catch (error) {
        console.error("Erro ao carregar informações de subscription:", error);
        this.error = error.message;

        // Se for erro de autenticação, não mostrar erro
        if (error.response?.status === 401) {
          this.loadFromStorage();
        } else {
          // Para outros erros, usar fallback
          this.loadFromStorage();
        }
      } finally {
        this.loading = false;
      }
    },

    // Atualizar plano de subscription no backend
    async setPlan(plan) {
      this.loading = true;
      this.error = null;

      try {
        const response = await apiService.subscription.updatePlan({ plan });
        this.currentPlan = response.newPlan;
        this.planInfo = response.planInfo;

        // Salvar no localStorage
        localStorage.setItem("subscription_plan", response.newPlan);

        // Recarregar informações completas
        await this.loadSubscriptionInfo();

        return response;
      } catch (error) {
        console.error("Erro ao atualizar plano de subscription:", error);
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Verificar limites atuais
    async checkLimits() {
      try {
        const response = await apiService.subscription.checkLimits();
        return response;
      } catch (error) {
        console.error("Erro ao verificar limites:", error);
        this.error = error.message;
        throw error;
      }
    },

    // Carregar plano do localStorage (fallback)
    loadFromStorage() {
      const savedPlan = localStorage.getItem("subscription_plan");
      if (savedPlan && this.planFeatures[savedPlan]) {
        this.currentPlan = savedPlan;
      } else {
        // Se não há plano salvo, usar padrão
        this.currentPlan = "teste";
      }
    },

    // Inicializar store
    async init() {
      // Primeiro, garantir que temos um plano padrão
      if (!this.currentPlan) {
        this.currentPlan = "teste";
      }

      // Tentar carregar do backend primeiro
      try {
        await this.loadSubscriptionInfo();
      } catch (error) {
        // Se falhar, usar dados locais
        this.loadFromStorage();
      }
    },

    // Upgrade de plano
    async upgradeToStarter() {
      return await this.setPlan("starter");
    },

    async upgradeToPro() {
      return await this.setPlan("pro");
    },

    async upgradeToEnterprise() {
      return await this.setPlan("enterprise");
    },

    // Downgrade para teste
    async downgradeToTest() {
      return await this.setPlan("teste");
    },
  },
});

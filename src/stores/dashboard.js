import { defineStore } from "pinia";
import { apiService } from "@/services/api";

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    data: {
      totalRevenue: 0,
      totalSales: 0,
      pendingSales: 0,
      totalProducts: 0,
      lowStockProducts: 0,
      totalClients: 0,
      totalUsers: 0,
      clientsWithDebts: 0,
      salesByDay: [],
      topProducts: [],
      growth: {
        salesGrowth: 0,
        revenueGrowth: 0,
      },
    },
    salesSummary: [],
    analytics: {
      revenueByPaymentMethod: [],
      salesByCategory: [],
      currentPeriod: 0,
      previousPeriod: 0,
      growthRate: 0,
    },
    // Metas dinâmicas
    targets: {
      monthlyRevenue: 25000,
      monthlySales: 100,
      monthlyProducts: 500,
      monthlyClients: 20,
      averageTicket: 150,
      profitMargin: 25,
      salesPerDay: 5,
    },
    loading: false,
    error: null,
    lastUpdated: null,
  }),

  getters: {
    // Métricas formatadas
    formattedMetrics: (state) => ({
      totalRevenue: new Intl.NumberFormat("pt-PT", {
        style: "currency",
        currency: "MZN",
      }).format(state.data.totalRevenue),
      totalSales: state.data.totalSales.toLocaleString("pt-PT"),
      pendingSales: state.data.pendingSales.toLocaleString("pt-PT"),
      totalProducts: state.data.totalProducts.toLocaleString("pt-PT"),
      lowStockProducts: state.data.lowStockProducts.toLocaleString("pt-PT"),
      totalClients: state.data.totalClients.toLocaleString("pt-PT"),
      clientsWithDebts: state.data.clientsWithDebts.toLocaleString("pt-PT"),
    }),

    // Taxa de crescimento formatada
    formattedGrowthRate: (state) => {
      const rate = state.analytics.growthRate;
      return {
        value: rate,
        formatted: `${rate >= 0 ? "+" : ""}${rate.toFixed(1)}%`,
        isPositive: rate >= 0,
        color: rate >= 0 ? "text-green-600" : "text-red-600",
      };
    },

    // Progressos dinâmicos baseados nas metas
    progressMetrics: (state) => ({
      revenue: Math.min(
        (state.data.totalRevenue / state.targets.monthlyRevenue) * 100,
        100
      ),
      sales: Math.min(
        (state.data.totalSales / state.targets.monthlySales) * 100,
        100
      ),
      products: Math.min(
        (state.data.totalProducts / state.targets.monthlyProducts) * 100,
        100
      ),
      clients: Math.min(
        (state.data.totalClients / state.targets.monthlyClients) * 100,
        100
      ),
    }),

    // Status das metas
    targetStatus: (state) => ({
      revenue:
        state.data.totalRevenue >= state.targets.monthlyRevenue
          ? "achieved"
          : "pending",
      sales:
        state.data.totalSales >= state.targets.monthlySales
          ? "achieved"
          : "pending",
      products:
        state.data.totalProducts >= state.targets.monthlyProducts
          ? "achieved"
          : "pending",
      clients:
        state.data.totalClients >= state.targets.monthlyClients
          ? "achieved"
          : "pending",
    }),

    // Dados para gráficos
    chartData: (state) => ({
      salesByDay: state.data.salesByDay.map((item) => ({
        date: item.date,
        count: parseInt(item.count),
        total: parseFloat(item.total),
      })),
      topProducts: state.data.topProducts.map((item) => ({
        name: item.Product?.name || "Produto",
        quantity: parseInt(item.totalQuantity),
        revenue: parseFloat(item.totalRevenue),
      })),
      revenueByPaymentMethod: state.analytics.revenueByPaymentMethod.map(
        (item) => ({
          method: item.paymentMethod,
          count: parseInt(item.count),
          total: parseFloat(item.total),
        })
      ),
      salesByCategory: state.analytics.salesByCategory.map((item) => ({
        category: item.Product?.category || "Categoria",
        quantity: parseInt(item.totalQuantity),
        revenue: parseFloat(item.totalRevenue),
      })),
    }),
  },

  actions: {
    // Carregar dados do dashboard
    async loadDashboardData(params = {}) {
      this.loading = true;
      this.error = null;

      try {
        const response = await apiService.dashboard.getData(params);
        this.data = response.data;
        this.lastUpdated = new Date();
        return { success: true, data: response.data };
      } catch (error) {
        this.error =
          error.response?.data?.error || "Erro ao carregar dados do dashboard";
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },

    // Carregar resumo de vendas
    async loadSalesSummary(params = {}) {
      try {
        const response = await apiService.dashboard.getSalesSummary(params);
        this.salesSummary = response.data;
        return { success: true, data: response.data };
      } catch (error) {
        this.error =
          error.response?.data?.error || "Erro ao carregar resumo de vendas";
        return { success: false, error: this.error };
      }
    },

    // Carregar análises
    async loadAnalytics(params = {}) {
      try {
        const response = await apiService.dashboard.getAnalytics(params);
        this.analytics = response.data;
        return { success: true, data: response.data };
      } catch (error) {
        this.error = error.response?.data?.error || "Erro ao carregar análises";
        return { success: false, error: this.error };
      }
    },

    // Carregar todos os dados
    async loadAllData(params = {}) {
      this.loading = true;
      this.error = null;

      try {
        const [dashboardResponse, salesResponse, analyticsResponse] =
          await Promise.all([
            apiService.dashboard.getData(params),
            apiService.dashboard.getSalesSummary(params),
            apiService.dashboard.getAnalytics(params),
          ]);

        this.data = dashboardResponse.data;
        this.salesSummary = salesResponse.data;
        this.analytics = analyticsResponse.data;
        this.lastUpdated = new Date();

        return { success: true };
      } catch (error) {
        this.error = error.response?.data?.error || "Erro ao carregar dados";
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },

    // Atualizar dados específicos
    async refreshData(type = "all", params = {}) {
      switch (type) {
        case "dashboard":
          return await this.loadDashboardData(params);
        case "sales":
          return await this.loadSalesSummary(params);
        case "analytics":
          return await this.loadAnalytics(params);
        case "all":
        default:
          return await this.loadAllData(params);
      }
    },

    // Verificar se os dados estão atualizados
    isDataStale(maxAgeMinutes = 5) {
      if (!this.lastUpdated) return true;
      const now = new Date();
      const diffMinutes = (now - this.lastUpdated) / (1000 * 60);
      return diffMinutes > maxAgeMinutes;
    },

    // Limpar erro
    clearError() {
      this.error = null;
    },

    // Atualizar metas
    updateTargets(newTargets) {
      this.targets = { ...this.targets, ...newTargets };
    },

    // Definir meta específica
    setTarget(targetName, value) {
      if (this.targets.hasOwnProperty(targetName)) {
        this.targets[targetName] = value;
      }
    },

    // Resetar metas para valores padrão
    resetTargets() {
      this.targets = {
        monthlyRevenue: 25000,
        monthlySales: 100,
        monthlyProducts: 500,
        monthlyClients: 20,
        averageTicket: 150,
        profitMargin: 25,
        salesPerDay: 5,
      };
    },
  },
});

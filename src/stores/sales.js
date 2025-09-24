import { defineStore } from "pinia";
import { apiService } from "@/services/api";

export const useSalesStore = defineStore("sales", {
  state: () => ({
    sales: [],
    pendingSales: [],
    loading: false,
    error: null,
    filters: {
      search: "",
      startDate: "",
      endDate: "",
      clientId: "",
      paymentStatus: "",
      paymentMethod: "",
    },
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    },
  }),

  getters: {
    // Vendas filtradas
    filteredSales: (state) => {
      let filtered = [...state.sales];

      if (state.filters.search) {
        const search = state.filters.search.toLowerCase();
        filtered = filtered.filter(
          (sale) =>
            sale.saleNumber?.toLowerCase().includes(search) ||
            sale.notes?.toLowerCase().includes(search) ||
            sale.Client?.name?.toLowerCase().includes(search)
        );
      }

      if (state.filters.startDate && state.filters.endDate) {
        const startDate = new Date(state.filters.startDate);
        const endDate = new Date(state.filters.endDate);
        filtered = filtered.filter((sale) => {
          const saleDate = new Date(sale.createdAt);
          return saleDate >= startDate && saleDate <= endDate;
        });
      }

      if (state.filters.clientId) {
        filtered = filtered.filter(
          (sale) => sale.ClientId === parseInt(state.filters.clientId)
        );
      }

      if (state.filters.paymentStatus) {
        filtered = filtered.filter(
          (sale) => sale.paymentStatus === state.filters.paymentStatus
        );
      }

      if (state.filters.paymentMethod) {
        filtered = filtered.filter(
          (sale) => sale.paymentMethod === state.filters.paymentMethod
        );
      }

      return filtered;
    },

    // Vendas pendentes
    pendingSales: (state) => {
      return state.sales.filter((sale) => sale.paymentStatus === "pending");
    },

    // Vendas por status
    salesByStatus: (state) => {
      const grouped = {
        paid: state.sales.filter((s) => s.paymentStatus === "paid"),
        pending: state.sales.filter((s) => s.paymentStatus === "pending"),
        partial: state.sales.filter((s) => s.paymentStatus === "partial"),
      };
      return grouped;
    },

    // Vendas por método de pagamento
    salesByPaymentMethod: (state) => {
      const grouped = {};
      state.sales.forEach((sale) => {
        if (!grouped[sale.paymentMethod]) {
          grouped[sale.paymentMethod] = [];
        }
        grouped[sale.paymentMethod].push(sale);
      });
      return grouped;
    },

    // Vendas recentes (últimas 5)
    recentSales: (state) => {
      return state.sales
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
    },

    // Estatísticas
    stats: (state) => ({
      total: state.sales.length,
      totalRevenue: state.sales
        .filter((s) => s.paymentStatus === "paid")
        .reduce((sum, s) => sum + s.totalAmount, 0),
      pendingRevenue: state.sales
        .filter((s) => s.paymentStatus === "pending")
        .reduce((sum, s) => sum + s.totalAmount, 0),
      averageSale:
        state.sales.length > 0
          ? state.sales.reduce((sum, s) => sum + s.totalAmount, 0) /
            state.sales.length
          : 0,
    }),
  },

  actions: {
    // Carregar vendas
    async loadSales(params = {}) {
      this.loading = true;
      this.error = null;

      try {
        const response = await apiService.sales.getAll({
          ...params,
          ...this.filters,
        });
        this.sales = response.data;
        return { success: true, data: response.data };
      } catch (error) {
        this.error = error.response?.data?.error || "Erro ao carregar vendas";
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },

    // Carregar vendas pendentes
    async loadPendingSales() {
      try {
        const response = await apiService.sales.getAll({
          paymentStatus: "pending",
        });
        this.pendingSales = response.data;
        return { success: true, data: response.data };
      } catch (error) {
        this.error =
          error.response?.data?.error || "Erro ao carregar vendas pendentes";
        return { success: false, error: this.error };
      }
    },

    // Criar venda
    async createSale(saleData) {
      this.loading = true;
      this.error = null;

      try {
        const response = await apiService.sales.create(saleData);
        this.sales.unshift(response.data);
        return { success: true, data: response.data };
      } catch (error) {
        this.error = error.response?.data?.error || "Erro ao criar venda";
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },

    // Atualizar venda
    async updateSale(id, saleData) {
      this.loading = true;
      this.error = null;

      try {
        const response = await apiService.sales.update(id, saleData);
        const index = this.sales.findIndex((s) => s.id === id);
        if (index !== -1) {
          this.sales[index] = response.data;
        }
        return { success: true, data: response.data };
      } catch (error) {
        this.error = error.response?.data?.error || "Erro ao atualizar venda";
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },

    // Deletar venda
    async deleteSale(id) {
      this.loading = true;
      this.error = null;

      try {
        await apiService.sales.delete(id);
        this.sales = this.sales.filter((s) => s.id !== id);
        return { success: true };
      } catch (error) {
        this.error = error.response?.data?.error || "Erro ao deletar venda";
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },

    // Gerar recibo
    async generateReceipt(id) {
      try {
        const response = await apiService.sales.getReceipt(id);
        return { success: true, data: response.data };
      } catch (error) {
        this.error = error.response?.data?.error || "Erro ao gerar recibo";
        return { success: false, error: this.error };
      }
    },

    // Carregar vendas por cliente
    async loadSalesByClient(clientId, params = {}) {
      try {
        const response = await apiService.sales.getByClient(clientId, params);
        return { success: true, data: response.data };
      } catch (error) {
        this.error =
          error.response?.data?.error || "Erro ao carregar vendas do cliente";
        return { success: false, error: this.error };
      }
    },

    // Aplicar filtros
    setFilters(filters) {
      this.filters = { ...this.filters, ...filters };
    },

    // Limpar filtros
    clearFilters() {
      this.filters = {
        search: "",
        startDate: "",
        endDate: "",
        clientId: "",
        paymentStatus: "",
        paymentMethod: "",
      };
    },

    // Buscar venda por ID
    getSaleById(id) {
      return this.sales.find((s) => s.id === id);
    },

    // Limpar erro
    clearError() {
      this.error = null;
    },
  },
});

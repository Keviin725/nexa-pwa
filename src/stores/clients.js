import { defineStore } from "pinia";
import { apiService } from "@/services/api";

export const useClientsStore = defineStore("clients", {
  state: () => ({
    clients: [],
    clientsWithDebts: [],
    loading: false,
    error: null,
    filters: {
      search: "",
      hasDebt: false,
    },
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    },
  }),

  getters: {
    // Clientes filtrados
    filteredClients: (state) => {
      let filtered = [...state.clients];

      if (state.filters.search) {
        const search = state.filters.search.toLowerCase();
        filtered = filtered.filter(
          (client) =>
            client.name.toLowerCase().includes(search) ||
            client.phone?.toLowerCase().includes(search) ||
            client.email?.toLowerCase().includes(search)
        );
      }

      if (state.filters.hasDebt) {
        filtered = filtered.filter((client) => client.creditBalance > 0);
      }

      return filtered;
    },

    // Clientes com dívidas
    clientsWithDebts: (state) => {
      return state.clients.filter((client) => client.creditBalance > 0);
    },

    // Estatísticas
    stats: (state) => ({
      total: state.clients.length,
      withDebts: state.clients.filter((c) => c.creditBalance > 0).length,
      totalDebts: state.clients.reduce((sum, c) => sum + c.creditBalance, 0),
      totalPurchases: state.clients.reduce(
        (sum, c) => sum + c.totalPurchases,
        0
      ),
    }),
  },

  actions: {
    // Carregar clientes
    async loadClients(params = {}) {
      this.loading = true;
      this.error = null;

      try {
        const response = await apiService.clients.getAll({
          ...params,
          ...this.filters,
        });
        this.clients = response.data;
        return { success: true, data: response.data };
      } catch (error) {
        this.error = error.response?.data?.error || "Erro ao carregar clientes";
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },

    // Carregar clientes com dívidas
    async loadClientsWithDebts() {
      try {
        const response = await apiService.clients.getWithDebts();
        this.clientsWithDebts = response.data;
        return { success: true, data: response.data };
      } catch (error) {
        this.error =
          error.response?.data?.error ||
          "Erro ao carregar clientes com dívidas";
        return { success: false, error: this.error };
      }
    },

    // Criar cliente
    async createClient(clientData) {
      this.loading = true;
      this.error = null;

      try {
        const response = await apiService.clients.create(clientData);
        this.clients.unshift(response.data);
        return { success: true, data: response.data };
      } catch (error) {
        this.error = error.response?.data?.error || "Erro ao criar cliente";
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },

    // Atualizar cliente
    async updateClient(id, clientData) {
      this.loading = true;
      this.error = null;

      try {
        const response = await apiService.clients.update(id, clientData);
        const index = this.clients.findIndex((c) => c.id === id);
        if (index !== -1) {
          this.clients[index] = response.data;
        }
        return { success: true, data: response.data };
      } catch (error) {
        this.error = error.response?.data?.error || "Erro ao atualizar cliente";
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },

    // Deletar cliente
    async deleteClient(id) {
      this.loading = true;
      this.error = null;

      try {
        await apiService.clients.delete(id);
        this.clients = this.clients.filter((c) => c.id !== id);
        return { success: true };
      } catch (error) {
        this.error = error.response?.data?.error || "Erro ao deletar cliente";
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },

    // Carregar dívidas do cliente
    async loadClientDebts(clientId, params = {}) {
      try {
        const response = await apiService.clients.getDebts(clientId, params);
        return { success: true, data: response.data };
      } catch (error) {
        this.error =
          error.response?.data?.error || "Erro ao carregar dívidas do cliente";
        return { success: false, error: this.error };
      }
    },

    // Carregar histórico do cliente
    async loadClientHistory(clientId, params = {}) {
      try {
        const response = await apiService.clients.getHistory(clientId, params);
        return { success: true, data: response.data };
      } catch (error) {
        this.error =
          error.response?.data?.error ||
          "Erro ao carregar histórico do cliente";
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
        hasDebt: false,
      };
    },

    // Buscar cliente por ID
    getClientById(id) {
      return this.clients.find((c) => c.id === id);
    },

    // Métodos de paginação
    setPage(page) {
      this.pagination.page = page;
    },

    setLimit(limit) {
      this.pagination.limit = limit;
    },

    setFilters(filters) {
      this.filters = { ...this.filters, ...filters };
      this.pagination.page = 1; // Reset para primeira página
    },

    // Limpar erro
    clearError() {
      this.error = null;
    },
  },
});

import { defineStore } from "pinia";
import { apiService } from "@/services/api";

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [],
    stats: {
      totalUsers: 0,
      activeUsers: 0,
      adminUsers: 0,
      managerUsers: 0,
      sellerUsers: 0,
    },
    loading: false,
    error: null,
    filters: {
      search: "",
      role: "",
      status: "",
    },
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    },
  }),

  getters: {
    // Usuários filtrados
    filteredUsers: (state) => {
      let filtered = [...state.users];

      if (state.filters.search) {
        const search = state.filters.search.toLowerCase();
        filtered = filtered.filter(
          (user) =>
            user.name.toLowerCase().includes(search) ||
            user.email.toLowerCase().includes(search) ||
            user.phone?.toLowerCase().includes(search)
        );
      }

      if (state.filters.role) {
        filtered = filtered.filter((user) => user.role === state.filters.role);
      }

      if (state.filters.status) {
        filtered = filtered.filter(
          (user) => user.status === state.filters.status
        );
      }

      return filtered;
    },

    // Usuários por role
    usersByRole: (state) => {
      const grouped = {
        admin: state.users.filter((u) => u.role === "admin"),
        manager: state.users.filter((u) => u.role === "manager"),
        seller: state.users.filter((u) => u.role === "seller"),
      };
      return grouped;
    },

    // Usuários ativos
    activeUsers: (state) => {
      return state.users.filter((user) => user.isActive);
    },

    // Usuários inativos
    inactiveUsers: (state) => {
      return state.users.filter((user) => !user.isActive);
    },
  },

  actions: {
    // Carregar usuários
    async loadUsers(params = {}) {
      this.loading = true;
      this.error = null;

      try {
        const response = await apiService.users.getAll({
          ...params,
          ...this.filters,
        });
        this.users = response.data.users || response.data;
        this.pagination = {
          page: response.data.page || 1,
          limit: response.data.limit || 10,
          total: response.data.total || response.data.length,
          totalPages: response.data.totalPages || 1,
        };
        return { success: true, data: response.data };
      } catch (error) {
        this.error = error.response?.data?.error || "Erro ao carregar usuários";
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },

    // Carregar estatísticas
    async loadStats() {
      try {
        const response = await apiService.users.getStats();
        this.stats = response.data;
        return { success: true, data: response.data };
      } catch (error) {
        this.error =
          error.response?.data?.error || "Erro ao carregar estatísticas";
        return { success: false, error: this.error };
      }
    },

    // Criar usuário
    async createUser(userData) {
      this.loading = true;
      this.error = null;

      try {
        const response = await apiService.users.create(userData);
        this.users.unshift(response.data);
        return { success: true, data: response.data };
      } catch (error) {
        this.error = error.response?.data?.error || "Erro ao criar usuário";
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },

    // Atualizar usuário
    async updateUser(id, userData) {
      this.loading = true;
      this.error = null;

      try {
        const response = await apiService.users.update(id, userData);
        const index = this.users.findIndex((u) => u.id === id);
        if (index !== -1) {
          this.users[index] = response.data;
        }
        return { success: true, data: response.data };
      } catch (error) {
        this.error = error.response?.data?.error || "Erro ao atualizar usuário";
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },

    // Deletar usuário
    async deleteUser(id) {
      this.loading = true;
      this.error = null;

      try {
        await apiService.users.delete(id);
        this.users = this.users.filter((u) => u.id !== id);
        return { success: true };
      } catch (error) {
        this.error = error.response?.data?.error || "Erro ao deletar usuário";
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },

    // Alterar status do usuário
    async toggleUserStatus(id) {
      this.loading = true;
      this.error = null;

      try {
        const response = await apiService.users.toggleStatus(id);
        const index = this.users.findIndex((u) => u.id === id);
        if (index !== -1) {
          this.users[index] = response.data;
        }
        return { success: true, data: response.data };
      } catch (error) {
        this.error =
          error.response?.data?.error || "Erro ao alterar status do usuário";
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },

    // Atualizar permissões
    async updateUserPermissions(id, permissions) {
      this.loading = true;
      this.error = null;

      try {
        const response = await apiService.users.updatePermissions(id, {
          permissions,
        });
        const index = this.users.findIndex((u) => u.id === id);
        if (index !== -1) {
          this.users[index].permissions = permissions;
        }
        return { success: true, data: response.data };
      } catch (error) {
        this.error =
          error.response?.data?.error || "Erro ao atualizar permissões";
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },

    // Ações em lote
    async bulkAction(userIds, action) {
      this.loading = true;
      this.error = null;

      try {
        const response = await apiService.users.bulkAction({ userIds, action });

        // Recarregar usuários após ação em lote
        await this.loadUsers();

        return { success: true, data: response.data };
      } catch (error) {
        this.error =
          error.response?.data?.error || "Erro ao executar ação em lote";
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
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
        role: "",
        status: "",
      };
    },

    // Buscar usuário por ID
    getUserById(id) {
      return this.users.find((u) => u.id === id);
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

    clearFilters() {
      this.filters = {
        search: "",
        role: "",
        status: "",
      };
      this.pagination.page = 1;
    },

    // Limpar erro
    clearError() {
      this.error = null;
    },
  },
});

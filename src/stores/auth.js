import { defineStore } from "pinia";
import { apiService } from "@/services/api";
import { permissionManager } from "@/utils/permissions";

/**
 * Store de autenticação do NEXA
 * Gerencia o estado de autenticação do utilizador
 */
export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  }),

  getters: {
    userRole: (state) => state.user?.role || "guest",
    userName: (state) => state.user?.name || "",
    userEmail: (state) => state.user?.email || "",
    userPermissions: (state) => state.user?.permissions || [],
    isAdmin: (state) => state.user?.role === "admin",
    isManager: (state) => state.user?.role === "manager",
    isSeller: (state) => state.user?.role === "seller",
  },

  actions: {
    /**
     * Inicializa o store carregando dados do localStorage
     */
    init() {
      this.loadFromStorage();
    },

    /**
     * Realiza login do utilizador
     * @param {Object} credentials - Credenciais de login
     * @returns {Object} - Resultado do login
     */
    async login(credentials) {
      this.loading = true;
      this.error = null;

      try {
        const response = await apiService.auth.login(credentials);
        const { user, token } = response.data;

        this.saveAuthData(user, token);
        permissionManager.setCurrentUser(user);

        return { success: true, user };
      } catch (error) {
        this.error = error.response?.data?.error || "Erro ao fazer login";
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },

    /**
     * Realiza logout do utilizador
     */
    async logout() {
      this.clearAuthData();
      permissionManager.clearCurrentUser();
      window.location.href = "/auth/login";
    },

    /**
     * Salva dados de autenticação
     * @param {Object} user - Dados do utilizador
     * @param {string} token - Token de autenticação
     */
    saveAuthData(user, token) {
      localStorage.setItem("auth_token", token);
      localStorage.setItem("user_data", JSON.stringify(user));

      this.user = user;
      this.token = token;
      this.isAuthenticated = true;
    },

    /**
     * Limpa dados de autenticação
     */
    clearAuthData() {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");

      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      this.error = null;
    },

    /**
     * Carrega dados do utilizador do localStorage
     * @returns {boolean} - True se carregou com sucesso
     */
    loadFromStorage() {
      try {
        const token = localStorage.getItem("auth_token");
        const userData = localStorage.getItem("user_data");

        if (token && userData) {
          const user = JSON.parse(userData);
          this.user = user;
          this.token = token;
          this.isAuthenticated = true;
          permissionManager.setCurrentUser(user);
          return true;
        }
        return false;
      } catch (error) {
        console.error("Erro ao carregar dados do utilizador:", error);
        this.clearAuthData();
        return false;
      }
    },

    /**
     * Atualiza perfil do utilizador
     * @param {Object} userData - Dados do utilizador
     * @returns {Object} - Resultado da atualização
     */
    async updateProfile(userData) {
      this.loading = true;
      this.error = null;

      try {
        const response = await apiService.users.update(this.user.id, userData);
        const updatedUser = response.data;

        this.user = updatedUser;
        localStorage.setItem("user_data", JSON.stringify(updatedUser));

        return { success: true, user: updatedUser };
      } catch (error) {
        this.error = error.response?.data?.error || "Erro ao atualizar perfil";
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },

    /**
     * Verifica se tem permissão
     * @param {string} permission - Permissão a verificar
     * @returns {boolean} - True se tem permissão
     */
    hasPermission(permission) {
      if (!this.user) return false;
      return permissionManager.hasPermission(permission);
    },

    /**
     * Verifica se pode aceder a uma rota
     * @param {string} route - Rota a verificar
     * @returns {boolean} - True se pode aceder
     */
    canAccess(route) {
      if (!this.user) return false;
      return permissionManager.canAccessRoute(route);
    },

    /**
     * Limpa erro do store
     */
    clearError() {
      this.error = null;
    },
  },
});

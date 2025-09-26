import { defineStore } from "pinia";
import { apiService } from "@/services/api";
import { permissionManager } from "@/utils/permissions";

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
    // Inicializar store
    init() {
      this.loadFromStorage();
    },

    // Login
    async login(credentials) {
      this.loading = true;
      this.error = null;

      try {
        const response = await apiService.auth.login(credentials);
        const { user, token } = response.data;

        // Salvar dados no localStorage
        localStorage.setItem("auth_token", token);
        localStorage.setItem("user_data", JSON.stringify(user));

        // Atualizar estado
        this.user = user;
        this.token = token;
        this.isAuthenticated = true;

        // Configurar permissões
        permissionManager.setCurrentUser(user);

        return { success: true, user };
      } catch (error) {
        this.error = error.response?.data?.error || "Erro ao fazer login";
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },

    // Logout
    async logout() {
      // Limpar dados locais
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");

      // Resetar estado
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      this.error = null;

      // Limpar permissões
      permissionManager.clearCurrentUser();

      // Redirecionar para login
      window.location.href = "/auth/login";
    },

    // Carregar dados do usuário do localStorage
    loadFromStorage() {
      try {
        const token = localStorage.getItem("auth_token");
        const userData = localStorage.getItem("user_data");

        if (token && userData) {
          const user = JSON.parse(userData);
          this.user = user;
          this.token = token;
          this.isAuthenticated = true;

          // Configurar permissionManager
          permissionManager.setCurrentUser(user);
          return true;
        }
        return false;
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        this.clearAuth();
        return false;
      }
    },

    // Atualizar perfil do usuário
    async updateProfile(userData) {
      this.loading = true;
      this.error = null;

      try {
        const response = await apiService.users.update(this.user.id, userData);
        const updatedUser = response.data;

        // Atualizar dados locais
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

    // Alterar senha
    async changePassword(passwordData) {
      this.loading = true;
      this.error = null;

      try {
        await apiService.users.update(this.user.id, passwordData);
        return { success: true };
      } catch (error) {
        this.error = error.response?.data?.error || "Erro ao alterar senha";
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },

    // Verificar se tem permissão
    hasPermission(permission) {
      if (!this.user) return false;
      return permissionManager.hasPermission(permission);
    },

    // Verificar se pode acessar rota
    canAccess(route) {
      if (!this.user) return false;
      return permissionManager.canAccess(route);
    },

    // Limpar erro
    clearError() {
      this.error = null;
    },

    // Limpar autenticação
    clearAuth() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      this.error = null;
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
    },
  },
});

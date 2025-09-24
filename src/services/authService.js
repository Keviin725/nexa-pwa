// Serviço de Autenticação
class AuthService {
  constructor() {
    this.currentUser = null;
    this.token = null;
    this.loadFromStorage();
  }

  // Carregar dados do localStorage
  loadFromStorage() {
    try {
      const user = localStorage.getItem("lojinha-user");
      const token = localStorage.getItem("auth_token");

      if (user && token) {
        this.currentUser = JSON.parse(user);
        this.token = token;

        // Configurar permissionManager
        if (typeof window !== "undefined" && window.permissionManager) {
          window.permissionManager.setCurrentUser(this.currentUser);
        }
      }
    } catch (error) {
      console.error("Erro ao carregar dados de autenticação:", error);
      this.clearAuth();
    }
  }

  // Salvar dados no localStorage
  saveToStorage() {
    try {
      if (this.currentUser) {
        localStorage.setItem("lojinha-user", JSON.stringify(this.currentUser));
      }
      if (this.token) {
        localStorage.setItem("auth_token", this.token);
      }
    } catch (error) {
      console.error("Erro ao salvar dados de autenticação:", error);
    }
  }

  // Limpar dados de autenticação
  clearAuth() {
    this.currentUser = null;
    this.token = null;
    localStorage.removeItem("lojinha-user");
    localStorage.removeItem("auth_token");
  }

  // Login
  async login(email, password) {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        this.currentUser = data.user;
        this.token = data.token;
        this.saveToStorage();

        // Configurar permissionManager
        if (typeof window !== "undefined" && window.permissionManager) {
          window.permissionManager.setCurrentUser(data.user);
        }

        return { success: true, user: data.user };
      } else {
        const error = await response.json();
        return {
          success: false,
          message: error.message || "Erro ao fazer login",
        };
      }
    } catch (error) {
      console.error("Erro no login:", error);
      return { success: false, message: "Erro de conexão" };
    }
  }

  // Registro
  async register(userData) {
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        return { success: true, user: data.user };
      } else {
        const error = await response.json();
        return {
          success: false,
          message: error.message || "Erro ao criar conta",
        };
      }
    } catch (error) {
      console.error("Erro no registro:", error);
      return { success: false, message: "Erro de conexão" };
    }
  }

  // Logout
  logout() {
    this.clearAuth();
    // Redirecionar para landing page
    window.location.href = "/";
  }

  // Verificar se está autenticado
  isAuthenticated() {
    return !!this.currentUser && !!this.token;
  }

  // Obter utilizador actual
  getCurrentUser() {
    return this.currentUser;
  }

  // Obter token
  getToken() {
    return this.token;
  }

  // Verificar permissões
  hasPermission(permission) {
    if (!this.currentUser) return false;

    // Admin tem todas as permissões
    if (this.currentUser.role === "admin") return true;

    // Verificar permissões específicas
    return this.currentUser.permissions?.includes(permission) || false;
  }

  // Verificar se é admin
  isAdmin() {
    return this.currentUser?.role === "admin";
  }

  // Verificar se é gerente
  isManager() {
    return this.currentUser?.role === "manager" || this.isAdmin();
  }

  // Verificar se é vendedor
  isSeller() {
    return this.currentUser?.role === "seller" || this.isManager();
  }

  // Atualizar perfil
  async updateProfile(userData) {
    try {
      const response = await fetch("http://localhost:3000/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        this.currentUser = { ...this.currentUser, ...data.user };
        this.saveToStorage();
        return { success: true, user: data.user };
      } else {
        const error = await response.json();
        return {
          success: false,
          message: error.message || "Erro ao atualizar perfil",
        };
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      return { success: false, message: "Erro de conexão" };
    }
  }

  // Alterar senha
  async changePassword(currentPassword, newPassword) {
    try {
      const response = await fetch(
        "http://localhost:3000/auth/change-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify({ currentPassword, newPassword }),
        }
      );

      if (response.ok) {
        return { success: true };
      } else {
        const error = await response.json();
        return {
          success: false,
          message: error.message || "Erro ao alterar senha",
        };
      }
    } catch (error) {
      console.error("Erro ao alterar senha:", error);
      return { success: false, message: "Erro de conexão" };
    }
  }

  // Verificar token
  async verifyToken() {
    try {
      const response = await fetch("http://localhost:3000/auth/verify", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        this.currentUser = data.user;
        this.saveToStorage();
        return true;
      } else {
        this.clearAuth();
        return false;
      }
    } catch (error) {
      console.error("Erro ao verificar token:", error);
      this.clearAuth();
      return false;
    }
  }
}

// Instância singleton
export const authService = new AuthService();

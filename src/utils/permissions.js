/**
 * Sistema de Permissões do NEXA
 * Define todas as permissões disponíveis no sistema
 */

export const PERMISSIONS = {
  // Vendas
  SALES_CREATE: "sales.create",
  SALES_EDIT: "sales.edit",
  SALES_DELETE: "sales.delete",
  SALES_VIEW: "sales.view",

  // Produtos
  PRODUCTS_CREATE: "products.create",
  PRODUCTS_EDIT: "products.edit",
  PRODUCTS_DELETE: "products.delete",
  PRODUCTS_VIEW: "products.view",

  // Clientes a Fiado
  CLIENTS_CREATE: "clients.create",
  CLIENTS_EDIT: "clients.edit",
  CLIENTS_DELETE: "clients.delete",
  CLIENTS_VIEW: "clients.view",

  // Relatórios
  REPORTS_VIEW: "reports.view",
  REPORTS_EXPORT: "reports.export",

  // Usuários
  USERS_MANAGE: "users.manage",
  USERS_VIEW: "users.view",

  // Configurações
  SETTINGS_MANAGE: "settings.manage",
  SETTINGS_VIEW: "settings.view",

  // Sistema
  SYSTEM_BACKUP: "system.backup",
  SYSTEM_RESTORE: "system.restore",
};

// Roles e suas permissões padrão
export const ROLE_PERMISSIONS = {
  admin: [
    PERMISSIONS.SALES_CREATE,
    PERMISSIONS.SALES_EDIT,
    PERMISSIONS.SALES_DELETE,
    PERMISSIONS.SALES_VIEW,
    PERMISSIONS.PRODUCTS_CREATE,
    PERMISSIONS.PRODUCTS_EDIT,
    PERMISSIONS.PRODUCTS_DELETE,
    PERMISSIONS.PRODUCTS_VIEW,
    PERMISSIONS.CLIENTS_CREATE,
    PERMISSIONS.CLIENTS_EDIT,
    PERMISSIONS.CLIENTS_DELETE,
    PERMISSIONS.CLIENTS_VIEW,
    PERMISSIONS.REPORTS_VIEW,
    PERMISSIONS.REPORTS_EXPORT,
    PERMISSIONS.USERS_MANAGE,
    PERMISSIONS.USERS_VIEW,
    PERMISSIONS.SETTINGS_MANAGE,
    PERMISSIONS.SETTINGS_VIEW,
    PERMISSIONS.SYSTEM_BACKUP,
    PERMISSIONS.SYSTEM_RESTORE,
  ],
  manager: [
    PERMISSIONS.SALES_CREATE,
    PERMISSIONS.SALES_EDIT,
    PERMISSIONS.SALES_VIEW,
    PERMISSIONS.PRODUCTS_CREATE,
    PERMISSIONS.PRODUCTS_EDIT,
    PERMISSIONS.PRODUCTS_VIEW,
    PERMISSIONS.CLIENTS_CREATE,
    PERMISSIONS.CLIENTS_EDIT,
    PERMISSIONS.CLIENTS_VIEW,
    PERMISSIONS.REPORTS_VIEW,
    PERMISSIONS.REPORTS_EXPORT,
    PERMISSIONS.USERS_VIEW,
  ],
  seller: [
    PERMISSIONS.SALES_CREATE,
    PERMISSIONS.SALES_EDIT,
    PERMISSIONS.SALES_VIEW,
    PERMISSIONS.PRODUCTS_VIEW,
    PERMISSIONS.CLIENTS_CREATE,
    PERMISSIONS.CLIENTS_EDIT,
    PERMISSIONS.CLIENTS_VIEW,
  ],
};

/**
 * Classe para gestão de permissões do sistema
 */
export class PermissionManager {
  constructor() {
    this.currentUser = null;
    this.userPermissions = [];
  }

  /**
   * Define o utilizador atual
   * @param {Object} user - Objeto do utilizador
   */
  setCurrentUser(user) {
    this.currentUser = user;
    this.userPermissions = user?.permissions || [];
  }

  /**
   * Limpa o utilizador atual
   */
  clearCurrentUser() {
    this.currentUser = null;
    this.userPermissions = [];
  }

  /**
   * Verifica se o utilizador tem uma permissão específica
   * @param {string} permission - Permissão a verificar
   * @returns {boolean} - True se tem permissão
   */
  hasPermission(permission) {
    if (!this.currentUser) return false;

    // Admin tem todas as permissões
    if (this.currentUser.role === "admin") return true;

    // Verificar permissões específicas do utilizador
    const userPermissions = this.currentUser.permissions || [];
    if (userPermissions.includes(permission)) return true;

    // Verificar permissões baseadas no role
    const rolePermissions = this.getRolePermissions(this.currentUser.role);
    return rolePermissions.includes(permission);
  }

  /**
   * Verifica se o utilizador tem qualquer uma das permissões
   * @param {Array} permissions - Array de permissões
   * @returns {boolean} - True se tem pelo menos uma
   */
  hasAnyPermission(permissions) {
    if (!this.currentUser) return false;
    if (this.currentUser.role === "admin") return true;

    const userPermissions = this.currentUser.permissions || [];
    const rolePermissions = this.getRolePermissions(this.currentUser.role);
    const allPermissions = [...userPermissions, ...rolePermissions];

    return permissions.some((permission) =>
      allPermissions.includes(permission)
    );
  }

  /**
   * Verifica se o utilizador tem todas as permissões
   * @param {Array} permissions - Array de permissões
   * @returns {boolean} - True se tem todas
   */
  hasAllPermissions(permissions) {
    if (!this.currentUser) return false;
    if (this.currentUser.role === "admin") return true;

    const userPermissions = this.currentUser.permissions || [];
    const rolePermissions = this.getRolePermissions(this.currentUser.role);
    const allPermissions = [...userPermissions, ...rolePermissions];

    return permissions.every((permission) =>
      allPermissions.includes(permission)
    );
  }

  /**
   * Verifica se pode aceder a uma rota
   * @param {string} routeName - Nome da rota
   * @returns {boolean} - True se pode aceder
   */
  canAccessRoute(routeName) {
    const routePermissions = this.getRoutePermissions(routeName);
    return this.hasAnyPermission(routePermissions);
  }

  /**
   * Obtém permissões necessárias para uma rota
   * @param {string} routeName - Nome da rota
   * @returns {Array} - Array de permissões
   */
  getRoutePermissions(routeName) {
    const routePermissionMap = {
      sales: [PERMISSIONS.SALES_VIEW],
      products: [PERMISSIONS.PRODUCTS_VIEW],
      clients: [PERMISSIONS.CLIENTS_VIEW],
      reports: [PERMISSIONS.REPORTS_VIEW],
      "user-management": [PERMISSIONS.USERS_MANAGE],
      settings: [PERMISSIONS.SETTINGS_VIEW],
    };

    return routePermissionMap[routeName] || [];
  }

  /**
   * Verifica se pode executar uma ação
   * @param {string} action - Ação a executar
   * @param {string} resource - Recurso
   * @returns {boolean} - True se pode executar
   */
  canPerformAction(action, resource) {
    const actionPermissionMap = {
      create: `${resource}.create`,
      edit: `${resource}.edit`,
      delete: `${resource}.delete`,
      view: `${resource}.view`,
    };

    const permission = actionPermissionMap[action];
    return permission ? this.hasPermission(permission) : false;
  }

  /**
   * Obtém permissões do utilizador atual
   * @returns {Array} - Array de permissões
   */
  getCurrentUserPermissions() {
    return this.userPermissions;
  }

  /**
   * Obtém permissões disponíveis para um role
   * @param {string} role - Role do utilizador
   * @returns {Array} - Array de permissões
   */
  getRolePermissions(role) {
    return ROLE_PERMISSIONS[role] || [];
  }

  /**
   * Verifica se é admin
   * @returns {boolean} - True se é admin
   */
  isAdmin() {
    return this.currentUser?.role === "admin";
  }

  /**
   * Verifica se é gerente
   * @returns {boolean} - True se é gerente
   */
  isManager() {
    return this.currentUser?.role === "manager";
  }

  /**
   * Verifica se é vendedor
   * @returns {boolean} - True se é vendedor
   */
  isSeller() {
    return this.currentUser?.role === "seller";
  }
}

/**
 * Instância global do gerenciador de permissões
 */
export const permissionManager = new PermissionManager();

/**
 * Middleware para verificar permissão específica
 * @param {string} permission - Permissão necessária
 * @returns {Function} - Middleware de rota
 */
export const requirePermission = (permission) => {
  return (to, from, next) => {
    if (permissionManager.hasPermission(permission)) {
      next();
    } else {
      next("/unauthorized");
    }
  };
};

/**
 * Middleware para verificar role específico
 * @param {string} role - Role necessário
 * @returns {Function} - Middleware de rota
 */
export const requireRole = (role) => {
  return (to, from, next) => {
    const currentUser = permissionManager.currentUser;
    if (currentUser && currentUser.role === role) {
      next();
    } else {
      next("/unauthorized");
    }
  };
};

// Sistema de Permissões
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

// Classe para gerir permissões
export class PermissionManager {
  constructor() {
    this.currentUser = null;
    this.userPermissions = [];
  }

  // Definir utilizador actual
  setCurrentUser(user) {
    this.currentUser = user;
    this.userPermissions = user?.permissions || [];
  }

  // Limpar utilizador actual
  clearCurrentUser() {
    this.currentUser = null;
    this.userPermissions = [];
  }

  // Verificar se utilizador tem permissão específica
  hasPermission(permission) {
    if (!this.currentUser) return false;

    // Admin tem todas as permissões
    if (this.currentUser.role === "admin") return true;

    // Verificar permissões específicas do usuário
    const userPermissions = this.currentUser.permissions || [];
    if (userPermissions.includes(permission)) return true;

    // Verificar permissões baseadas no role
    const rolePermissions = this.getRolePermissions(this.currentUser.role);
    return rolePermissions.includes(permission);
  }

  // Verificar se utilizador tem qualquer uma das permissões
  hasAnyPermission(permissions) {
    if (!this.currentUser) return false;

    if (this.currentUser.role === "admin") return true;

    // Verificar permissões específicas do usuário
    const userPermissions = this.currentUser.permissions || [];
    if (permissions.some((permission) => userPermissions.includes(permission)))
      return true;

    // Verificar permissões baseadas no role
    const rolePermissions = this.getRolePermissions(this.currentUser.role);
    return permissions.some((permission) =>
      rolePermissions.includes(permission)
    );
  }

  // Verificar se utilizador tem todas as permissões
  hasAllPermissions(permissions) {
    if (!this.currentUser) return false;

    if (this.currentUser.role === "admin") return true;

    // Verificar permissões específicas do usuário
    const userPermissions = this.currentUser.permissions || [];
    if (permissions.every((permission) => userPermissions.includes(permission)))
      return true;

    // Verificar permissões baseadas no role
    const rolePermissions = this.getRolePermissions(this.currentUser.role);
    return permissions.every((permission) =>
      rolePermissions.includes(permission)
    );
  }

  // Verificar se utilizador pode aceder a uma rota
  canAccessRoute(routeName) {
    const routePermissions = this.getRoutePermissions(routeName);
    return this.hasAnyPermission(routePermissions);
  }

  // Obter permissões necessárias para uma rota
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

  // Verificar se utilizador pode executar uma acção
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

  // Obter permissões do utilizador actual
  getCurrentUserPermissions() {
    return this.userPermissions;
  }

  // Verificar se utilizador é admin
  isAdmin() {
    return this.currentUser?.role === "admin";
  }

  // Verificar se utilizador é gerente
  isManager() {
    return this.currentUser?.role === "manager";
  }

  // Verificar se utilizador é vendedor
  isSeller() {
    return this.currentUser?.role === "seller";
  }

  // Obter nível de acesso do utilizador
  getAccessLevel() {
    if (!this.currentUser) return 0;

    const levels = {
      admin: 3,
      manager: 2,
      seller: 1,
    };

    return levels[this.currentUser.role] || 0;
  }

  // Verificar se utilizador pode gerir outro utilizador
  canManageUser(targetUser) {
    if (!this.currentUser) return false;

    // Admin pode gerir todos
    if (this.currentUser.role === "admin") return true;

    // Gerente pode gerir vendedores
    if (this.currentUser.role === "manager" && targetUser.role === "seller")
      return true;

    return false;
  }

  // Obter permissões disponíveis para um role
  getRolePermissions(role) {
    return ROLE_PERMISSIONS[role] || [];
  }

  // Validar permissões de um utilizador
  validateUserPermissions(user) {
    const rolePermissions = this.getRolePermissions(user.role);
    const userPermissions = user.permissions || [];

    // Verificar se todas as permissões do utilizador são válidas para o role
    return userPermissions.every((permission) =>
      rolePermissions.includes(permission)
    );
  }

  // Filtrar permissões baseado no role
  filterPermissionsByRole(role) {
    return ROLE_PERMISSIONS[role] || [];
  }

  // Obter permissões em formato legível
  getPermissionLabels(permissions) {
    const labels = {
      [PERMISSIONS.SALES_CREATE]: "Criar Vendas",
      [PERMISSIONS.SALES_EDIT]: "Editar Vendas",
      [PERMISSIONS.SALES_DELETE]: "Excluir Vendas",
      [PERMISSIONS.SALES_VIEW]: "Ver Vendas",
      [PERMISSIONS.PRODUCTS_CREATE]: "Criar Produtos",
      [PERMISSIONS.PRODUCTS_EDIT]: "Editar Produtos",
      [PERMISSIONS.PRODUCTS_DELETE]: "Excluir Produtos",
      [PERMISSIONS.PRODUCTS_VIEW]: "Ver Produtos",
      [PERMISSIONS.CLIENTS_CREATE]: "Criar Clientes a Fiado",
      [PERMISSIONS.CLIENTS_EDIT]: "Editar Clientes a Fiado",
      [PERMISSIONS.CLIENTS_DELETE]: "Excluir Clientes a Fiado",
      [PERMISSIONS.CLIENTS_VIEW]: "Ver Clientes a Fiado",
      [PERMISSIONS.REPORTS_VIEW]: "Ver Relatórios",
      [PERMISSIONS.REPORTS_EXPORT]: "Exportar Relatórios",
      [PERMISSIONS.USERS_MANAGE]: "Gerir Usuários",
      [PERMISSIONS.USERS_VIEW]: "Ver Usuários",
      [PERMISSIONS.SETTINGS_MANAGE]: "Gerir Configurações",
      [PERMISSIONS.SETTINGS_VIEW]: "Ver Configurações",
      [PERMISSIONS.SYSTEM_BACKUP]: "Fazer Backup",
      [PERMISSIONS.SYSTEM_RESTORE]: "Restaurar Backup",
    };

    return permissions.map((permission) => ({
      value: permission,
      label: labels[permission] || permission,
      description: this.getPermissionDescription(permission),
    }));
  }

  // Obter descrição de uma permissão
  getPermissionDescription(permission) {
    const descriptions = {
      [PERMISSIONS.SALES_CREATE]: "Permite registrar novas vendas",
      [PERMISSIONS.SALES_EDIT]: "Permite modificar vendas existentes",
      [PERMISSIONS.SALES_DELETE]: "Permite excluir vendas",
      [PERMISSIONS.SALES_VIEW]: "Permite visualizar vendas",
      [PERMISSIONS.PRODUCTS_CREATE]: "Permite adicionar novos produtos",
      [PERMISSIONS.PRODUCTS_EDIT]: "Permite modificar produtos existentes",
      [PERMISSIONS.PRODUCTS_DELETE]: "Permite excluir produtos",
      [PERMISSIONS.PRODUCTS_VIEW]: "Permite visualizar produtos",
      [PERMISSIONS.CLIENTS_CREATE]: "Permite registar novos clientes a fiado",
      [PERMISSIONS.CLIENTS_EDIT]:
        "Permite modificar clientes a fiado existentes",
      [PERMISSIONS.CLIENTS_DELETE]: "Permite excluir clientes a fiado",
      [PERMISSIONS.CLIENTS_VIEW]: "Permite visualizar clientes a fiado",
      [PERMISSIONS.REPORTS_VIEW]: "Permite aceder a relatórios",
      [PERMISSIONS.REPORTS_EXPORT]: "Permite exportar relatórios",
      [PERMISSIONS.USERS_MANAGE]: "Permite gerir utilizadores do sistema",
      [PERMISSIONS.USERS_VIEW]: "Permite visualizar utilizadores",
      [PERMISSIONS.SETTINGS_MANAGE]: "Permite modificar configurações",
      [PERMISSIONS.SETTINGS_VIEW]: "Permite visualizar configurações",
      [PERMISSIONS.SYSTEM_BACKUP]: "Permite fazer backup do sistema",
      [PERMISSIONS.SYSTEM_RESTORE]: "Permite restaurar backup do sistema",
    };

    return descriptions[permission] || "Permissão do sistema";
  }
}

// Instância global do gerenciador de permissões
export const permissionManager = new PermissionManager();

// Middleware para verificar permissões
export const requirePermission = (permission) => {
  return (to, from, next) => {
    if (permissionManager.hasPermission(permission)) {
      next();
    } else {
      next("/unauthorized");
    }
  };
};

// Middleware para verificar role
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

// Middleware para verificar múltiplas permissões
export const requireAnyPermission = (permissions) => {
  return (to, from, next) => {
    if (permissionManager.hasAnyPermission(permissions)) {
      next();
    } else {
      next("/unauthorized");
    }
  };
};

// Middleware para verificar todas as permissões
export const requireAllPermissions = (permissions) => {
  return (to, from, next) => {
    if (permissionManager.hasAllPermissions(permissions)) {
      next();
    } else {
      next("/unauthorized");
    }
  };
};

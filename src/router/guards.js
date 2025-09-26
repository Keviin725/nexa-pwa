import { permissionManager, PERMISSIONS } from "../utils/permissions.js";

// Guards de autenticação
export const requireAuth = (to, from, next) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    next();
  } else {
    next("/auth/login");
  }
};

export const requireAdmin = (to, from, next) => {
  const token = localStorage.getItem("auth_token");
  if (token && permissionManager.currentUser?.role === "admin") {
    next();
  } else {
    next("/unauthorized");
  }
};

export const requireManager = (to, from, next) => {
  const token = localStorage.getItem("auth_token");
  const user = permissionManager.currentUser;
  if (token && (user?.role === "admin" || user?.role === "gerente")) {
    next();
  } else {
    next("/unauthorized");
  }
};

export const redirectIfAuthenticated = (to, from, next) => {
  const token = localStorage.getItem("auth_token");
  const userData = localStorage.getItem("user_data");

  if (token && userData) {
    next("/app");
  } else {
    next();
  }
};

// Guard para verificar permissões
export const permissionGuard = (requiredPermissions) => {
  return (to, from, next) => {
    if (permissionManager.hasAnyPermission(requiredPermissions)) {
      next();
    } else {
      next("/unauthorized");
    }
  };
};

// Guard para verificar role
export const roleGuard = (requiredRole) => {
  return (to, from, next) => {
    const currentUser = permissionManager.currentUser;
    if (currentUser && currentUser.role === requiredRole) {
      next();
    } else {
      next("/unauthorized");
    }
  };
};

// Guard para admin
export const adminGuard = roleGuard("admin");

// Guard para gerente ou admin
export const managerGuard = (to, from, next) => {
  const currentUser = permissionManager.currentUser;
  if (
    currentUser &&
    (currentUser.role === "admin" || currentUser.role === "gerente")
  ) {
    next();
  } else {
    next("/unauthorized");
  }
};

// Guards específicos para cada seção
export const salesGuard = permissionGuard([PERMISSIONS.SALES_VIEW]);
export const productsGuard = permissionGuard([PERMISSIONS.PRODUCTS_VIEW]);
export const clientsGuard = permissionGuard([PERMISSIONS.CLIENTS_VIEW]);
export const reportsGuard = permissionGuard([PERMISSIONS.REPORTS_VIEW]);
export const usersGuard = permissionGuard([PERMISSIONS.USERS_MANAGE]);
export const settingsGuard = permissionGuard([PERMISSIONS.SETTINGS_VIEW]);

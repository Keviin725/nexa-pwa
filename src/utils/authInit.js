// Inicialização do sistema de autenticação
import { permissionManager } from "./permissions.js";
import { authService } from "../services/authService.js";

// Configurar permissionManager globalmente
export const initAuth = () => {
  // Tornar permissionManager disponível globalmente
  if (typeof window !== "undefined") {
    window.permissionManager = permissionManager;
  }

  // Configurar utilizador actual se já estiver autenticado
  const currentUser = authService.getCurrentUser();
  if (currentUser) {
    permissionManager.setCurrentUser(currentUser);
  }
};

// Exportar para uso em outros arquivos
export { permissionManager, authService };

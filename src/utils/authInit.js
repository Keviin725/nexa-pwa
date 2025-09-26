// Inicialização do sistema de autenticação
import { permissionManager } from "./permissions.js";

// Configurar permissionManager globalmente
export const initAuth = () => {
  // Tornar permissionManager disponível globalmente
  if (typeof window !== "undefined") {
    window.permissionManager = permissionManager;
  }
};

// Exportar para uso em outros arquivos
export { permissionManager };

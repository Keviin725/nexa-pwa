/**
 * Configuração da API - Lojinha PWA
 * Centraliza todas as configurações de API do frontend
 */

// Configurações baseadas no ambiente
const getApiConfig = () => {
  const isDevelopment = import.meta.env.DEV;
  const isProduction = import.meta.env.PROD;

  // URLs da API baseadas no ambiente
  const apiUrls = {
    development: import.meta.env.VITE_API_URL || "http://localhost:3000",
    production: import.meta.env.VITE_API_URL || "https://api.lojinha.com",
    test: "http://localhost:3000",
  };

  // Determinar URL base
  let baseURL;
  if (isDevelopment) {
    baseURL = apiUrls.development;
  } else if (isProduction) {
    baseURL = apiUrls.production;
  } else {
    baseURL = apiUrls.test;
  }

  return {
    baseURL,
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
    retryAttempts: parseInt(import.meta.env.VITE_API_RETRY_ATTEMPTS) || 3,
    retryDelay: parseInt(import.meta.env.VITE_API_RETRY_DELAY) || 1000,
    isDevelopment,
    isProduction,
  };
};

// Configuração atual
export const apiConfig = getApiConfig();

// Constantes
export const API_ENDPOINTS = {
  // Autenticação
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    VERIFY: "/auth/verify",
    PROFILE: "/auth/profile",
    CHANGE_PASSWORD: "/auth/change-password",
  },

  // Produtos
  PRODUCTS: {
    LIST: "/products",
    CREATE: "/products",
    UPDATE: (id) => `/products/${id}`,
    DELETE: (id) => `/products/${id}`,
    UPLOAD_IMAGE: (id) => `/products/${id}/image`,
  },

  // Vendas
  SALES: {
    LIST: "/sales",
    CREATE: "/sales",
    UPDATE: (id) => `/sales/${id}`,
    DELETE: (id) => `/sales/${id}`,
    DETAILS: (id) => `/sales/${id}`,
  },

  // Clientes
  CLIENTS: {
    LIST: "/clients",
    CREATE: "/clients",
    UPDATE: (id) => `/clients/${id}`,
    DELETE: (id) => `/clients/${id}`,
    PAYMENTS: (id) => `/clients/${id}/payments`,
  },

  // Relatórios
  REPORTS: {
    DASHBOARD: "/dashboard",
    SALES_SUMMARY: "/dashboard/sales-summary",
    ANALYTICS: "/dashboard/analytics",
  },

  // Usuários
  USERS: {
    LIST: "/users",
    CREATE: "/users",
    UPDATE: (id) => `/users/${id}`,
    DELETE: (id) => `/users/${id}`,
    STATS: "/users/stats",
  },

  // Categorias
  CATEGORIES: {
    LIST: "/categories",
    CREATE: "/categories",
    UPDATE: (id) => `/categories/${id}`,
    DELETE: (id) => `/categories/${id}`,
    PRODUCTS: (id) => `/categories/${id}/products`,
  },
};

// Headers padrão
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

// Configurações de retry
export const RETRY_CONFIG = {
  maxAttempts: apiConfig.retryAttempts,
  delay: apiConfig.retryDelay,
  backoff: "exponential",
};

export default apiConfig;

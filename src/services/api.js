import axios from "axios";
import { apiConfig, DEFAULT_HEADERS } from "../config/api";

/**
 * Configuração da API do NEXA
 * Centraliza todas as chamadas HTTP para o backend
 */

// Constantes
const AUTH_TOKEN_KEY = "auth_token";
const USER_DATA_KEY = "user_data";

/**
 * Instância do Axios configurada
 */
const api = axios.create({
  baseURL: apiConfig.baseURL,
  timeout: apiConfig.timeout,
  headers: DEFAULT_HEADERS,
});

/**
 * Interceptor de requisição para adicionar token de autenticação
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Interceptor de resposta para tratar erros de autenticação
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido - limpar dados e redirecionar
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(USER_DATA_KEY);
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

/**
 * Serviços da API organizados por funcionalidade
 */
export const apiService = {
  /**
   * Serviços de autenticação
   */
  auth: {
    login: (credentials) => api.post("/auth/login", credentials),
    register: (userData) => api.post("/auth/register", userData),
    logout: () => api.post("/auth/logout"),
    refresh: () => api.post("/auth/refresh"),
  },

  /**
   * Serviços do dashboard
   */
  dashboard: {
    getData: (params = {}) => api.get("/dashboard", { params }),
    getSalesSummary: (params = {}) =>
      api.get("/dashboard/sales-summary", { params }),
    getAnalytics: (params = {}) => api.get("/dashboard/analytics", { params }),
  },

  /**
   * Serviços de relatórios
   */
  reports: {
    getSales: (params = {}) => api.get("/reports/sales", { params }),
    getProfit: (params = {}) => api.get("/reports/profit", { params }),
    getCredit: (params = {}) => api.get("/reports/credit", { params }),
    getDashboard: (params = {}) => api.get("/reports/dashboard", { params }),
    getTopProducts: (params = {}) =>
      api.get("/reports/top-products", { params }),
    getSalesDistribution: (params = {}) =>
      api.get("/reports/sales-distribution", { params }),
  },

  /**
   * Serviços de subscrição
   */
  subscription: {
    getInfo: () => api.get("/subscription/info"),
    updatePlan: (data) => api.put("/subscription/plan", data),
    checkLimits: () => api.get("/subscription/limits"),
  },

  /**
   * Serviços de produtos
   */
  products: {
    getAll: (params = {}) => api.get("/products", { params }),
    getById: (id) => api.get(`/products/${id}`),
    create: (data) => api.post("/products", data),
    update: (id, data) => api.put(`/products/${id}`, data),
    delete: (id) => api.delete(`/products/${id}`),
    updateStock: (id, data) => api.put(`/products/${id}/stock`, data),
    getCategories: () => api.get("/products/categories"),
    getLowStock: () => api.get("/products/low-stock"),
  },

  /**
   * Serviços de clientes a fiado
   */
  clients: {
    getAll: (params = {}) => api.get("/clients", { params }),
    getById: (id) => api.get(`/clients/${id}`),
    create: (data) => api.post("/clients", data),
    update: (id, data) => api.put(`/clients/${id}`, data),
    delete: (id) => api.delete(`/clients/${id}`),
    getDebts: (id, params = {}) => api.get(`/clients/${id}/debts`, { params }),
    getHistory: (id, params = {}) =>
      api.get(`/clients/${id}/history`, { params }),
    getWithDebts: () => api.get("/clients/with-debts"),
  },

  /**
   * Serviços de vendas
   */
  sales: {
    getAll: (params = {}) => api.get("/sales", { params }),
    getById: (id) => api.get(`/sales/${id}`),
    create: (data) => api.post("/sales", data),
    update: (id, data) => api.put(`/sales/${id}`, data),
    delete: (id) => api.delete(`/sales/${id}`),
    getReceipt: (id) => api.get(`/sales/${id}/receipt`),
    getByClient: (clientId, params = {}) =>
      api.get(`/sales/client/${clientId}`, { params }),
  },

  /**
   * Serviços de utilizadores
   */
  users: {
    getAll: (params = {}) => api.get("/users", { params }),
    getById: (id) => api.get(`/users/${id}`),
    create: (data) => api.post("/users", data),
    update: (id, data) => api.put(`/users/${id}`, data),
    delete: (id) => api.delete(`/users/${id}`),
    toggleStatus: (id) => api.put(`/users/${id}/status`),
    updatePermissions: (id, data) => api.put(`/users/${id}/permissions`, data),
    getStats: () => api.get("/users/stats"),
    bulkAction: (data) => api.post("/users/bulk-action", data),
  },

  /**
   * Serviços de categorias
   */
  categories: {
    getAll: (params = {}) => api.get("/categories", { params }),
    getById: (id) => api.get(`/categories/${id}`),
    create: (data) => api.post("/categories", data),
    update: (id, data) => api.put(`/categories/${id}`, data),
    delete: (id) => api.delete(`/categories/${id}`),
    getProducts: (id, params = {}) =>
      api.get(`/categories/${id}/products`, { params }),
    getStats: () => api.get("/categories/stats"),
  },

  /**
   * Serviços de pagamentos a crédito
   */
  creditPayments: {
    create: (data) => api.post("/credit-payments", data),
    getAll: (params = {}) => api.get("/credit-payments", { params }),
    getById: (id) => api.get(`/credit-payments/${id}`),
    update: (id, data) => api.put(`/credit-payments/${id}`, data),
    delete: (id) => api.delete(`/credit-payments/${id}`),
    getBySale: (saleId) => api.get(`/credit-payments/sale/${saleId}`),
    getByClient: (clientId, params = {}) =>
      api.get(`/credit-payments/client/${clientId}`, { params }),
  },
};

export default api;

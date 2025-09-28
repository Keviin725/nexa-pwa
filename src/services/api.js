import axios from "axios";

// Configuração base da API
const API_BASE_URL = "http://localhost:3000";

// Criar instância do Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas e erros
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

// Serviços da API
export const apiService = {
  // Autenticação
  auth: {
    login: (credentials) => api.post("/auth/login", credentials),
    register: (userData) => api.post("/auth/register", userData),
    logout: () => api.post("/auth/logout"),
    refresh: () => api.post("/auth/refresh"),
  },

  // Dashboard
  dashboard: {
    getData: (params = {}) => api.get("/dashboard", { params }),
    getSalesSummary: (params = {}) =>
      api.get("/dashboard/sales-summary", { params }),
    getAnalytics: (params = {}) => api.get("/dashboard/analytics", { params }),
  },

  // Produtos
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

  // Clientes a Fiado
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

  // Vendas
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

  // Usuários
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

  // Categorias
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

  // Pagamentos a Crédito
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

  // Relatórios
  reports: {
    getSales: (params = {}) => api.get("/reports/sales", { params }),
    getProducts: (params = {}) => api.get("/reports/products", { params }),
    getClients: (params = {}) => api.get("/reports/clients", { params }),
    getFinancial: (params = {}) => api.get("/reports/financial", { params }),
  },
};

export default api;

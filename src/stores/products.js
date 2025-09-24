import { defineStore } from "pinia";
import { apiService } from "@/services/api";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [],
    categories: [],
    lowStockProducts: [],
    loading: false,
    error: null,
    filters: {
      search: "",
      category: "",
      lowStock: false,
    },
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    },
  }),

  getters: {
    // Produtos filtrados
    filteredProducts: (state) => {
      let filtered = [...state.products];

      if (state.filters.search) {
        const search = state.filters.search.toLowerCase();
        filtered = filtered.filter(
          (product) =>
            product.name.toLowerCase().includes(search) ||
            product.code?.toLowerCase().includes(search) ||
            product.description?.toLowerCase().includes(search)
        );
      }

      if (state.filters.category) {
        filtered = filtered.filter(
          (product) => product.category === state.filters.category
        );
      }

      if (state.filters.lowStock) {
        filtered = filtered.filter(
          (product) => product.stock <= product.minStock
        );
      }

      return filtered;
    },

    // Produtos por categoria
    productsByCategory: (state) => {
      const grouped = {};
      state.products.forEach((product) => {
        if (!grouped[product.category]) {
          grouped[product.category] = [];
        }
        grouped[product.category].push(product);
      });
      return grouped;
    },

    // Estatísticas
    stats: (state) => ({
      total: state.products.length,
      lowStock: state.products.filter((p) => p.stock <= p.minStock).length,
      outOfStock: state.products.filter((p) => p.stock === 0).length,
      totalValue: state.products.reduce((sum, p) => sum + p.price * p.stock, 0),
    }),
  },

  actions: {
    // Carregar produtos
    async loadProducts(params = {}) {
      this.loading = true;
      this.error = null;

      try {
        const response = await apiService.products.getAll({
          ...params,
          ...this.filters,
        });
        this.products = response.data;
        return { success: true, data: response.data };
      } catch (error) {
        this.error = error.response?.data?.error || "Erro ao carregar produtos";
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },

    // Carregar categorias
    async loadCategories() {
      try {
        const response = await apiService.products.getCategories();
        this.categories = response.data;
        return { success: true, data: response.data };
      } catch (error) {
        this.error =
          error.response?.data?.error || "Erro ao carregar categorias";
        return { success: false, error: this.error };
      }
    },

    // Carregar produtos com estoque baixo
    async loadLowStockProducts() {
      try {
        const response = await apiService.products.getLowStock();
        this.lowStockProducts = response.data;
        return { success: true, data: response.data };
      } catch (error) {
        this.error =
          error.response?.data?.error ||
          "Erro ao carregar produtos com estoque baixo";
        return { success: false, error: this.error };
      }
    },

    // Criar produto
    async createProduct(productData) {
      this.loading = true;
      this.error = null;

      try {
        const response = await apiService.products.create(productData);
        this.products.unshift(response.data);
        return { success: true, data: response.data };
      } catch (error) {
        this.error = error.response?.data?.error || "Erro ao criar produto";
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },

    // Atualizar produto
    async updateProduct(id, productData) {
      this.loading = true;
      this.error = null;

      try {
        const response = await apiService.products.update(id, productData);
        const index = this.products.findIndex((p) => p.id === id);
        if (index !== -1) {
          this.products[index] = response.data;
        }
        return { success: true, data: response.data };
      } catch (error) {
        this.error = error.response?.data?.error || "Erro ao atualizar produto";
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },

    // Deletar produto
    async deleteProduct(id) {
      this.loading = true;
      this.error = null;

      try {
        await apiService.products.delete(id);
        this.products = this.products.filter((p) => p.id !== id);
        return { success: true };
      } catch (error) {
        this.error = error.response?.data?.error || "Erro ao deletar produto";
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },

    // Atualizar estoque
    async updateStock(id, stockData) {
      this.loading = true;
      this.error = null;

      try {
        const response = await apiService.products.updateStock(id, stockData);
        const index = this.products.findIndex((p) => p.id === id);
        if (index !== -1) {
          this.products[index] = response.data;
        }
        return { success: true, data: response.data };
      } catch (error) {
        this.error = error.response?.data?.error || "Erro ao atualizar estoque";
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },

    // Aplicar filtros
    setFilters(filters) {
      this.filters = { ...this.filters, ...filters };
    },

    // Limpar filtros
    clearFilters() {
      this.filters = {
        search: "",
        category: "",
        lowStock: false,
      };
    },

    // Buscar produto por ID
    getProductById(id) {
      return this.products.find((p) => p.id === id);
    },

    // Limpar erro
    clearError() {
      this.error = null;
    },
  },
});

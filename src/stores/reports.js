import { defineStore } from "pinia";
import { apiService } from "@/services/api";

export const useReportsStore = defineStore("reports", {
  state: () => ({
    loading: false,
    error: null,
    metrics: {
      totalSales: 0,
      totalRevenue: 0,
      productsSold: 0,
      newClients: 0,
      averageTicket: 0,
      profitMargin: 0,
      salesPerDay: 0,
      growth: 0,
      salesTrend: "up",
      salesTrendPercentage: 0,
      revenueTrend: "up",
      revenueTrendPercentage: 0,
      productsTrend: "up",
      productsTrendPercentage: 0,
      clientsTrend: "up",
      clientsTrendPercentage: 0,
    },
    salesData: [],
    topProductsData: [],
    salesDistributionData: [],
    detailedSales: [],
    filters: {
      startDate: "",
      endDate: "",
      reportType: "sales",
    },
  }),

  getters: {
    // Métricas formatadas
    formattedMetrics: (state) => ({
      totalRevenue: state.metrics.totalRevenue.toLocaleString("pt-PT", {
        style: "currency",
        currency: "MZN",
        minimumFractionDigits: 0,
      }),
      averageTicket: state.metrics.averageTicket.toLocaleString("pt-PT", {
        style: "currency",
        currency: "MZN",
        minimumFractionDigits: 2,
      }),
      profitMargin: `${state.metrics.profitMargin.toFixed(1)}%`,
      growth: `${
        state.metrics.growth >= 0 ? "+" : ""
      }${state.metrics.growth.toFixed(1)}%`,
    }),

    // Dados dos gráficos formatados
    chartData: (state) => ({
      sales: state.salesData,
      topProducts: state.topProductsData,
      distribution: state.salesDistributionData,
    }),
  },

  actions: {
    // Carregar dados do relatório
    async loadReportData(filters = {}) {
      this.loading = true;
      this.error = null;

      try {
        // Aplicar filtros
        this.filters = { ...this.filters, ...filters };

        // Carregar métricas do dashboard
        const dashboardResponse = await apiService.dashboard.getData({
          startDate: this.filters.startDate,
          endDate: this.filters.endDate,
        });

        if (dashboardResponse.data) {
          this.metrics = {
            totalSales: dashboardResponse.data.totalSales || 0,
            totalRevenue: dashboardResponse.data.totalRevenue || 0,
            productsSold: dashboardResponse.data.productsSold || 0,
            newClients: dashboardResponse.data.newClients || 0,
            averageTicket: dashboardResponse.data.averageTicket || 0,
            profitMargin: dashboardResponse.data.profitMargin || 0,
            salesPerDay: dashboardResponse.data.salesPerDay || 0,
            growth: dashboardResponse.data.growth || 0,
            salesTrend: dashboardResponse.data.salesTrend || "up",
            salesTrendPercentage:
              dashboardResponse.data.salesTrendPercentage || 0,
            revenueTrend: dashboardResponse.data.revenueTrend || "up",
            revenueTrendPercentage:
              dashboardResponse.data.revenueTrendPercentage || 0,
            productsTrend: dashboardResponse.data.productsTrend || "up",
            productsTrendPercentage:
              dashboardResponse.data.productsTrendPercentage || 0,
            clientsTrend: dashboardResponse.data.clientsTrend || "up",
            clientsTrendPercentage:
              dashboardResponse.data.clientsTrendPercentage || 0,
          };
        }

        // Carregar dados de vendas
        const salesResponse = await apiService.sales.getAll({
          startDate: this.filters.startDate,
          endDate: this.filters.endDate,
          limit: 50,
        });

        if (salesResponse.data) {
          this.detailedSales = salesResponse.data.map((sale) => ({
            id: sale.id,
            date: sale.createdAt,
            number: sale.saleNumber,
            client: sale.Client?.name || "Cliente não informado",
            products: sale.SaleItems?.length || 0,
            total: sale.totalAmount,
            status: this.getStatusText(sale.paymentStatus),
          }));
        }

        // Carregar dados dos gráficos
        await this.loadChartData();

        return { success: true };
      } catch (error) {
        this.error =
          error.response?.data?.error || "Erro ao carregar dados do relatório";
        console.error("Erro ao carregar relatório:", error);
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },

    // Carregar dados dos gráficos
    async loadChartData() {
      try {
        // Dados de vendas por período (últimos 30 dias)
        const salesResponse = await apiService.sales.getAll({
          startDate: this.getDate30DaysAgo(),
          endDate: new Date().toISOString().split("T")[0],
          limit: 100,
        });

        if (salesResponse.data) {
          // Agrupar vendas por dia
          const salesByDay = {};
          salesResponse.data.forEach((sale) => {
            const date = new Date(sale.createdAt).toLocaleDateString("pt-PT", {
              day: "2-digit",
              month: "short",
            });
            if (!salesByDay[date]) {
              salesByDay[date] = 0;
            }
            salesByDay[date] += sale.totalAmount;
          });

          this.salesData = Object.entries(salesByDay).map(
            ([period, value]) => ({
              period,
              value: Math.round(value),
            })
          );

          // Top produtos (simulado - seria melhor ter endpoint específico)
          this.topProductsData = [
            { name: "Produto A", value: 45 },
            { name: "Produto B", value: 38 },
            { name: "Produto C", value: 32 },
            { name: "Produto D", value: 28 },
            { name: "Produto E", value: 25 },
          ];

          // Distribuição de vendas (simulado)
          this.salesDistributionData = [
            { label: "Bebidas", value: 45000 },
            { label: "Padaria", value: 32000 },
            { label: "Laticínios", value: 28000 },
            { label: "Carnes", value: 15000 },
            { label: "Outros", value: 5430 },
          ];
        }
      } catch (error) {
        console.error("Erro ao carregar dados dos gráficos:", error);
      }
    },

    // Aplicar filtros
    async applyFilters(filters) {
      return await this.loadReportData(filters);
    },

    // Limpar filtros
    clearFilters() {
      const today = new Date();
      const lastMonth = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        today.getDate()
      );

      this.filters = {
        startDate: lastMonth.toISOString().split("T")[0],
        endDate: today.toISOString().split("T")[0],
        reportType: "sales",
      };

      return this.loadReportData();
    },

    // Exportar relatório
    async exportReport() {
      try {
        // Implementar exportação
        console.log("Exportando relatório...");
        return { success: true };
      } catch (error) {
        this.error = "Erro ao exportar relatório";
        return { success: false, error: this.error };
      }
    },

    // Utilitários
    getDate30DaysAgo() {
      const date = new Date();
      date.setDate(date.getDate() - 30);
      return date.toISOString().split("T")[0];
    },

    getStatusText(status) {
      const statusMap = {
        paid: "Pago",
        pending: "Pendente",
        partial: "Parcial",
        cancelled: "Cancelado",
      };
      return statusMap[status] || "Desconhecido";
    },

    // Limpar erro
    clearError() {
      this.error = null;
    },
  },
});

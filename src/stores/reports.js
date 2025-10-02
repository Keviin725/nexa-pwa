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
        try {
          const dashboardResponse = await apiService.dashboard.getData({
            startDate: this.filters.startDate,
            endDate: this.filters.endDate,
          });

          if (dashboardResponse.data) {
            // Usar dados diretos do backend
            const data = dashboardResponse.data;

            // Calcular métricas baseadas nos dados reais
            const totalSales = data.totalSales || 0;
            const totalRevenue = data.totalRevenue || 0;
            console.log(
              "💰 Total Sales:",
              totalSales,
              "Total Revenue:",
              totalRevenue
            );
            const averageTicket =
              totalSales > 0 ? totalRevenue / totalSales : 0;
            const salesPerDay = totalSales; // Para o período atual

            this.metrics = {
              totalSales: totalSales,
              totalRevenue: totalRevenue,
              productsSold: 0, // Será calculado com dados reais
              newClients: 0, // Será calculado com dados reais
              averageTicket: averageTicket,
              profitMargin: 0, // Será calculado com dados de lucro
              salesPerDay: salesPerDay,
              growth: data.growth?.salesGrowth || 0,
              salesTrend: (data.growth?.salesGrowth || 0) >= 0 ? "up" : "down",
              salesTrendPercentage: Math.abs(data.growth?.salesGrowth || 0),
              revenueTrend:
                (data.growth?.revenueGrowth || 0) >= 0 ? "up" : "down",
              revenueTrendPercentage: Math.abs(data.growth?.revenueGrowth || 0),
              productsTrend: "up",
              productsTrendPercentage: 0,
              clientsTrend: "up",
              clientsTrendPercentage: 0,
            };
          }
        } catch (dashboardError) {
          console.warn(
            "Erro ao carregar dashboard, usando dados padrão:",
            dashboardError
          );
          // Usar dados padrão se o dashboard falhar
          this.metrics = {
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
          };
        }

        // Carregar dados de vendas
        try {
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
        } catch (salesError) {
          console.warn(
            "Erro ao carregar vendas, usando dados vazios:",
            salesError
          );
          this.detailedSales = [];
        }

        // Carregar dados dos gráficos (não crítico)
        try {
          await this.loadChartData();
        } catch (chartError) {
          console.warn("Erro ao carregar gráficos:", chartError);
        }

        // Carregar dados adicionais de relatórios (não crítico)
        try {
          await this.loadAdditionalReportData();
        } catch (additionalError) {
          console.warn("Erro ao carregar dados adicionais:", additionalError);
        }

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
        // Usar endpoint específico de relatórios de vendas
        const salesReportResponse = await apiService.reports.getSales({
          startDate: this.getDate30DaysAgo(),
          endDate: new Date().toISOString().split("T")[0],
          period: "day",
        });

        if (salesReportResponse.data && salesReportResponse.data.length > 0) {
          this.salesData = salesReportResponse.data.map((item) => ({
            period: item.period,
            value: Math.round(item.totalAmount),
          }));
        } else {
          this.salesData = [];
        }
      } catch (error) {
        console.warn("Erro ao carregar dados de vendas:", error);
        this.salesData = [];
      }

      // Carregar produtos mais vendidos
      try {
        const topProductsResponse = await apiService.reports.getTopProducts({
          startDate: this.getDate30DaysAgo(),
          endDate: new Date().toISOString().split("T")[0],
          limit: 10,
        });

        if (topProductsResponse.data && topProductsResponse.data.length > 0) {
          this.topProductsData = topProductsResponse.data.map((product) => ({
            name: product.name,
            value: product.quantity,
          }));
        } else {
          this.topProductsData = [];
        }
      } catch (error) {
        console.warn("Erro ao carregar produtos mais vendidos:", error);
        this.topProductsData = [];
      }

      // Carregar distribuição de vendas
      try {
        const distributionResponse =
          await apiService.reports.getSalesDistribution({
            startDate: this.getDate30DaysAgo(),
            endDate: new Date().toISOString().split("T")[0],
          });

        if (distributionResponse.data && distributionResponse.data.length > 0) {
          this.salesDistributionData = distributionResponse.data;
        } else {
          this.salesDistributionData = [];
        }
      } catch (error) {
        console.warn("Erro ao carregar distribuição de vendas:", error);
        this.salesDistributionData = [];
      }
    },

    // Carregar dados adicionais de relatórios
    async loadAdditionalReportData() {
      try {
        // Carregar dados de lucro
        const profitResponse = await apiService.reports.getProfit({
          startDate: this.filters.startDate,
          endDate: this.filters.endDate,
        });

        if (profitResponse.data) {
          const profitData = profitResponse.data.summary;
          this.metrics.profitMargin = profitData.profitMargin || 0;
        }

        // Carregar dados de clientes
        const clientsResponse = await apiService.clients.getAll({
          startDate: this.filters.startDate,
          endDate: this.filters.endDate,
        });

        if (clientsResponse.data) {
          this.metrics.newClients = clientsResponse.data.length;
        }

        // Calcular produtos vendidos baseado nas vendas
        if (this.detailedSales.length > 0) {
          this.metrics.productsSold = this.detailedSales.reduce(
            (total, sale) => total + sale.products,
            0
          );
        }
      } catch (error) {
        console.warn("Erro ao carregar dados adicionais:", error);
        // Manter valores padrão (0) se não conseguir carregar
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

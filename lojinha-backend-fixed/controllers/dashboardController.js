const {
  Sale,
  Product,
  Client,
  SaleItem,
  User,
} = require("../models/associations");
const { Op } = require("sequelize");

// GET /dashboard - Métricas do dashboard
const getDashboardData = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let whereClause = { is_active: true };

    if (startDate && endDate) {
      whereClause.created_at = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    }

    // Total de receita (vendas pagas)
    const totalRevenue =
      (await Sale.sum("total_amount", {
        where: {
          ...whereClause,
          payment_status: "paid",
        },
      })) || 0;

    // Total de vendas
    const totalSales = await Sale.count({
      where: whereClause,
    });

    // Vendas pendentes
    const pendingSales = await Sale.count({
      where: {
        ...whereClause,
        payment_status: "pending",
      },
    });

    // Vendas parciais
    const partialSales = await Sale.count({
      where: {
        ...whereClause,
        payment_status: "partial",
      },
    });

    // Total de produtos
    const totalProducts = await Product.count({
      where: { is_active: true },
    });

    // Produtos com Stock baixo (Stock <= 5)
    const lowStockProducts = await Product.count({
      where: {
        is_active: true,
        stock: {
          [Op.lte]: 5,
        },
      },
    });

    // Total de clientes
    const totalClients = await Client.count({
      where: { is_active: true },
    });

    // Clientes com dívidas
    const clientsWithDebts = await Client.count({
      where: {
        is_active: true,
        credit_balance: {
          [Op.gt]: 0,
        },
      },
    });

    // Total de usuários
    const totalUsers = await User.count({
      where: { is_active: true },
    });

    // Vendas por dia (últimos 7 dias) - Simplificado
    const salesByDay = [];

    // Produtos mais vendidos - Simplificado
    const topProducts = [];

    // Calcular crescimento vs mês anterior
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Mês anterior
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    // Vendas do mês atual
    const currentMonthSales = await Sale.count({
      where: {
        is_active: true,
        created_at: {
          [Op.and]: [
            { [Op.gte]: new Date(currentYear, currentMonth, 1) },
            { [Op.lt]: new Date(currentYear, currentMonth + 1, 1) },
          ],
        },
      },
    });

    // Vendas do mês anterior
    const lastMonthSales = await Sale.count({
      where: {
        is_active: true,
        created_at: {
          [Op.and]: [
            { [Op.gte]: new Date(lastMonthYear, lastMonth, 1) },
            { [Op.lt]: new Date(lastMonthYear, lastMonth + 1, 1) },
          ],
        },
      },
    });

    // Receita do mês atual
    const currentMonthRevenue =
      (await Sale.sum("total_amount", {
        where: {
          is_active: true,
          payment_status: "paid",
          created_at: {
            [Op.and]: [
              { [Op.gte]: new Date(currentYear, currentMonth, 1) },
              { [Op.lt]: new Date(currentYear, currentMonth + 1, 1) },
            ],
          },
        },
      })) || 0;

    // Receita do mês anterior
    const lastMonthRevenue =
      (await Sale.sum("total_amount", {
        where: {
          is_active: true,
          payment_status: "paid",
          created_at: {
            [Op.and]: [
              { [Op.gte]: new Date(lastMonthYear, lastMonth, 1) },
              { [Op.lt]: new Date(lastMonthYear, lastMonth + 1, 1) },
            ],
          },
        },
      })) || 0;

    // Calcular percentual de crescimento
    const salesGrowth =
      lastMonthSales > 0
        ? Math.round(
            ((currentMonthSales - lastMonthSales) / lastMonthSales) * 100
          )
        : 0;

    const revenueGrowth =
      lastMonthRevenue > 0
        ? Math.round(
            ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
          )
        : 0;

    res.json({
      totalRevenue,
      totalSales,
      pendingSales,
      partialSales,
      totalProducts,
      lowStockProducts,
      totalClients,
      totalUsers,
      clientsWithDebts,
      salesByDay,
      topProducts,
      growth: {
        salesGrowth,
        revenueGrowth,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /dashboard/sales-summary - Resumo de vendas
const getSalesSummary = async (req, res) => {
  try {
    const { period = "month" } = req.query;

    let dateFilter;
    const now = new Date();

    switch (period) {
      case "day":
        dateFilter = {
          [Op.gte]: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
        };
        break;
      case "week":
        dateFilter = {
          [Op.gte]: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
        };
        break;
      case "month":
        dateFilter = {
          [Op.gte]: new Date(now.getFullYear(), now.getMonth(), 1),
        };
        break;
      case "year":
        dateFilter = {
          [Op.gte]: new Date(now.getFullYear(), 0, 1),
        };
        break;
      default:
        dateFilter = {
          [Op.gte]: new Date(now.getFullYear(), now.getMonth(), 1),
        };
    }

    const sales = await Sale.findAll({
      where: {
        is_active: true,
        created_at: dateFilter,
      },
      include: [
        {
          model: SaleItem,
          include: [{ model: Product, attributes: ["name", "category"] }],
        },
        { model: Client, attributes: ["name"] },
      ],
      order: [["created_at", "DESC"]],
    });

    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /dashboard/analytics - Análises avançadas
const getAnalytics = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let whereClause = { is_active: true };

    if (startDate && endDate) {
      whereClause.created_at = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    }

    // Receita por método de pagamento
    const revenueByPaymentMethod = await Sale.findAll({
      attributes: [
        "payment_method",
        [Sale.sequelize.fn("COUNT", Sale.sequelize.col("id")), "count"],
        [Sale.sequelize.fn("SUM", Sale.sequelize.col("total_amount")), "total"],
      ],
      where: {
        ...whereClause,
        payment_status: "paid",
      },
      group: ["payment_method"],
    });

    // Vendas por categoria - Simplificado
    const salesByCategory = [];

    // Crescimento de vendas (comparação com período anterior)
    const currentPeriod =
      (await Sale.sum("total_amount", {
        where: {
          ...whereClause,
          payment_status: "paid",
        },
      })) || 0;

    // Período anterior (mesmo intervalo, mas anterior)
    const periodLength =
      endDate && startDate
        ? new Date(endDate) - new Date(startDate)
        : 30 * 24 * 60 * 60 * 1000; // 30 dias por padrão

    const previousStartDate = new Date(
      new Date(startDate || new Date()) - periodLength
    );
    const previousEndDate = new Date(startDate || new Date());

    const previousPeriod =
      (await Sale.sum("total_amount", {
        where: {
          is_active: true,
          payment_status: "paid",
          created_at: {
            [Op.between]: [previousStartDate, previousEndDate],
          },
        },
      })) || 0;

    const growthRate =
      previousPeriod > 0
        ? ((currentPeriod - previousPeriod) / previousPeriod) * 100
        : 0;

    res.json({
      revenueByPaymentMethod,
      salesByCategory,
      currentPeriod,
      previousPeriod,
      growthRate,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDashboardData,
  getSalesSummary,
  getAnalytics,
};

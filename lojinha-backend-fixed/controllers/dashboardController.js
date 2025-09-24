const { Sale, Product, Client, SaleItem } = require("../models/associations");
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
      (await Sale.sum("totalAmount", {
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

    // Total de produtos
    const totalProducts = await Product.count({
      where: { is_active: true },
    });

    // Produtos com estoque baixo (estoque <= 5)
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
        creditBalance: {
          [Op.gt]: 0,
        },
      },
    });

    // Vendas por dia (últimos 7 dias)
    const salesByDay = await Sale.findAll({
      attributes: [
        [Sale.sequelize.fn("DATE", Sale.sequelize.col("created_at")), "date"],
        [Sale.sequelize.fn("COUNT", Sale.sequelize.col("id")), "count"],
        [Sale.sequelize.fn("SUM", Sale.sequelize.col("totalAmount")), "total"],
      ],
      where: {
        ...whereClause,
        created_at: {
          [Op.gte]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
      group: [Sale.sequelize.fn("DATE", Sale.sequelize.col("created_at"))],
      order: [
        [Sale.sequelize.fn("DATE", Sale.sequelize.col("created_at")), "ASC"],
      ],
    });

    // Produtos mais vendidos
    const topProducts = await SaleItem.findAll({
      attributes: [
        "ProductId",
        [
          SaleItem.sequelize.fn("SUM", SaleItem.sequelize.col("quantity")),
          "totalQuantity",
        ],
        [
          SaleItem.sequelize.fn(
            "SUM",
            SaleItem.sequelize.col("unitPrice") *
              SaleItem.sequelize.col("quantity")
          ),
          "totalRevenue",
        ],
      ],
      include: [
        {
          model: Product,
          attributes: ["name", "code"],
        },
        {
          model: Sale,
          where: whereClause,
          attributes: [],
        },
      ],
      group: ["ProductId"],
      order: [
        [
          SaleItem.sequelize.fn("SUM", SaleItem.sequelize.col("quantity")),
          "DESC",
        ],
      ],
      limit: 10,
    });

    res.json({
      totalRevenue,
      totalSales,
      pendingSales,
      totalProducts,
      lowStockProducts,
      totalClients,
      clientsWithDebts,
      salesByDay,
      topProducts,
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
        "paymentMethod",
        [Sale.sequelize.fn("COUNT", Sale.sequelize.col("id")), "count"],
        [Sale.sequelize.fn("SUM", Sale.sequelize.col("totalAmount")), "total"],
      ],
      where: {
        ...whereClause,
        payment_status: "paid",
      },
      group: ["paymentMethod"],
    });

    // Vendas por categoria
    const salesByCategory = await SaleItem.findAll({
      attributes: [
        [
          SaleItem.sequelize.fn("SUM", SaleItem.sequelize.col("quantity")),
          "totalQuantity",
        ],
        [
          SaleItem.sequelize.fn(
            "SUM",
            SaleItem.sequelize.col("unitPrice") *
              SaleItem.sequelize.col("quantity")
          ),
          "totalRevenue",
        ],
      ],
      include: [
        {
          model: Product,
          attributes: ["category"],
        },
        {
          model: Sale,
          where: whereClause,
          attributes: [],
        },
      ],
      group: ["Product.category"],
      order: [
        [
          SaleItem.sequelize.fn(
            "SUM",
            SaleItem.sequelize.col("unitPrice") *
              SaleItem.sequelize.col("quantity")
          ),
          "DESC",
        ],
      ],
    });

    // Crescimento de vendas (comparação com período anterior)
    const currentPeriod =
      (await Sale.sum("totalAmount", {
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
      (await Sale.sum("totalAmount", {
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

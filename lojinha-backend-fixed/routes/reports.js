const express = require("express");
const router = express.Router();
const {
  Sale,
  SaleItem,
  Product,
  Client,
  CreditPayment,
} = require("../models/associations");
const { Op } = require("sequelize");

// GET /reports/sales - Relatório de vendas por período
router.get("/sales", async (req, res) => {
  try {
    const { startDate, endDate, period = "day" } = req.query;

    let whereClause = { is_active: true };
    if (startDate && endDate) {
      whereClause.created_at = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    }

    const sales = await Sale.findAll({
      where: whereClause,
      include: [
        { model: Client, attributes: ["name"] },
        {
          model: SaleItem,
          include: [{ model: Product, attributes: ["name", "price"] }],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    // Agrupar por período
    const groupedSales = {};
    sales.forEach((sale) => {
      const date = new Date(sale.created_at);
      let key;

      switch (period) {
        case "day":
          key = date.toISOString().split("T")[0];
          break;
        case "week":
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - date.getDay());
          key = weekStart.toISOString().split("T")[0];
          break;
        case "month":
          key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
            2,
            "0"
          )}`;
          break;
        default:
          key = date.toISOString().split("T")[0];
      }

      if (!groupedSales[key]) {
        groupedSales[key] = {
          period: key,
          totalSales: 0,
          totalAmount: 0,
          sales: [],
        };
      }

      groupedSales[key].totalSales += 1;
      groupedSales[key].totalAmount += sale.totalAmount;
      groupedSales[key].sales.push(sale);
    });

    res.json(Object.values(groupedSales));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /reports/products - Produtos mais vendidos
router.get("/products", async (req, res) => {
  try {
    const { startDate, endDate, limit = 10 } = req.query;

    let whereClause = { is_active: true };
    if (startDate && endDate) {
      whereClause.created_at = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    }

    const products = await SaleItem.findAll({
      where: whereClause,
      include: [
        { model: Product, attributes: ["name", "price", "cost_price"] },
        { model: Sale, where: { is_active: true } },
      ],
      attributes: [
        "ProductId",
        [
          SaleItem.sequelize.fn("SUM", SaleItem.sequelize.col("quantity")),
          "totalQuantity",
        ],
        [
          SaleItem.sequelize.fn(
            "SUM",
            SaleItem.sequelize.literal("quantity * unit_price")
          ),
          "totalRevenue",
        ],
      ],
      group: [
        "ProductId",
        "Product.id",
        "Product.name",
        "Product.price",
        "Product.cost_price",
      ],
      order: [[SaleItem.sequelize.literal("totalQuantity"), "DESC"]],
      limit: parseInt(limit),
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /reports/profit - Relatório de lucro
router.get("/profit", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let whereClause = { is_active: true };
    if (startDate && endDate) {
      whereClause.created_at = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    }

    const sales = await Sale.findAll({
      where: whereClause,
      include: [
        {
          model: SaleItem,
          include: [
            { model: Product, attributes: ["name", "price", "cost_price"] },
          ],
        },
      ],
    });

    let totalRevenue = 0;
    let totalCost = 0;
    let profitByProduct = {};

    sales.forEach((sale) => {
      sale.SaleItems.forEach((item) => {
        const revenue = item.quantity * item.unit_price;
        const cost = item.Product.cost_price
          ? item.quantity * item.Product.cost_price
          : 0;

        totalRevenue += revenue;
        totalCost += cost;

        if (!profitByProduct[item.Product.name]) {
          profitByProduct[item.Product.name] = {
            product: item.Product.name,
            revenue: 0,
            cost: 0,
            profit: 0,
          };
        }

        profitByProduct[item.Product.name].revenue += revenue;
        profitByProduct[item.Product.name].cost += cost;
        profitByProduct[item.Product.name].profit += revenue - cost;
      });
    });

    res.json({
      summary: {
        totalRevenue,
        totalCost,
        totalProfit: totalRevenue - totalCost,
        profitMargin:
          totalRevenue > 0
            ? ((totalRevenue - totalCost) / totalRevenue) * 100
            : 0,
      },
      byProduct: Object.values(profitByProduct),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /reports/credit - Relatório de dívidas
router.get("/credit", async (req, res) => {
  try {
    const { status = "pending" } = req.query;

    let whereClause = {
      is_active: true,
      payment_method: "credit",
    };

    if (status === "pending") {
      whereClause.payment_status = { [Op.in]: ["pending", "partial"] };
    }

    const creditSales = await Sale.findAll({
      where: whereClause,
      include: [
        { model: Client, attributes: ["name", "contact"] },
        {
          model: CreditPayment,
          attributes: ["amountPaid", "created_at"],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    // Calcular saldo pendente para cada venda
    const salesWithBalance = creditSales.map((sale) => {
      const totalPaid = sale.CreditPayments.reduce(
        (sum, payment) => sum + payment.amountPaid,
        0
      );
      const balance = sale.total_amount - totalPaid;

      return {
        ...sale.toJSON(),
        totalPaid,
        balance,
        isOverdue: sale.due_date && new Date() > new Date(sale.due_date),
      };
    });

    res.json(salesWithBalance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /reports/dashboard - Dashboard com resumo geral
router.get("/dashboard", async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    // Vendas do dia
    const todaySales = await Sale.findAll({
      where: {
        is_active: true,
        created_at: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
    });

    // Vendas pendentes
    const pendingSales = await Sale.findAll({
      where: {
        is_active: true,
        payment_status: { [Op.in]: ["pending", "partial"] },
      },
    });

    // Produtos com Stock baixo
    const lowStockProducts = await Product.findAll({
      where: {
        is_active: true,
        stock: {
          [Op.lte]: 5,
        },
      },
    });

    const totalTodayRevenue = todaySales.reduce(
      (sum, sale) => sum + sale.total_amount,
      0
    );
    const totalPendingAmount = pendingSales.reduce(
      (sum, sale) => sum + sale.total_amount,
      0
    );

    res.json({
      today: {
        sales: todaySales.length,
        revenue: totalTodayRevenue,
      },
      pending: {
        sales: pendingSales.length,
        amount: totalPendingAmount,
      },
      lowStock: {
        products: lowStockProducts.length,
        items: lowStockProducts.map((p) => ({
          name: p.name,
          stock: p.stock,
          min_stock: 5,
        })),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

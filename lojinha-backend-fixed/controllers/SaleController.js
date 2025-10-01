const {
  Sale,
  SaleItem,
  Product,
  Client,
  CreditPayment,
} = require("../models/associations");
const sequelize = require("../config/database");
const { Op } = require("sequelize");
const codeGenerator = require("../utils/codeGenerator");

const createSale = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const {
      products,
      clientId,
      payment_method,
      discount = 0,
      tax = 0,
      due_date,
      notes,
    } = req.body;

    // Gerar código único para a venda
    const sale_number = await codeGenerator.generateSaleCode(Sale);

    // Calcular subtotal
    let subtotal = 0;
    for (const item of products) {
      const product = await Product.findByPk(item.productId, { transaction });
      if (!product) {
        throw new Error(`Produto com ID ${item.productId} não encontrado`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Stock insuficiente para o produto ${product.name}`);
      }
      subtotal += product.price * item.quantity;
    }

    // Calcular total com desconto e imposto
    const total_amount = subtotal - discount + tax;

    // Criar venda
    const sale = await Sale.create(
      {
        saleNumber: sale_number,
        subtotal,
        discount,
        tax,
        totalAmount: total_amount,
        paymentMethod: payment_method,
        paymentStatus: payment_method === "credit" ? "pending" : "paid",
        dueDate: payment_method === "credit" ? due_date : null,
        notes,
        ClientId: clientId,
      },
      { transaction }
    );

    // Criar itens da venda e atualizar Stock
    for (const item of products) {
      const product = await Product.findByPk(item.productId, { transaction });

      await SaleItem.create(
        {
          quantity: item.quantity,
          unitPrice: product.price,
          SaleId: sale.id,
          ProductId: item.productId,
        },
        { transaction }
      );

      // Atualizar Stock
      await Product.decrement("stock", {
        by: item.quantity,
        where: { id: item.productId },
        transaction,
      });
    }

    // Se for fiado, atualizar saldo do cliente
    if (payment_method === "credit" && clientId) {
      await Client.increment("credit_balance", {
        by: total_amount,
        where: { id: clientId },
        transaction,
      });
    }

    await transaction.commit();

    // Retornar venda completa com itens
    const saleWithItems = await Sale.findByPk(sale.id, {
      include: [
        {
          model: SaleItem,
          include: [{ model: Product, attributes: ["name", "code", "price"] }],
        },
        { model: Client, attributes: ["name", "phone"] },
      ],
    });

    res.status(201).json(saleWithItems);
  } catch (error) {
    await transaction.rollback();
    res.status(400).json({ error: error.message });
  }
};

const getSales = async (req, res) => {
  try {
    const {
      startDate,
      endDate,
      clientId,
      payment_status,
      payment_method,
      search,
    } = req.query;

    let whereClause = { is_active: true };

    if (startDate && endDate) {
      whereClause.created_at = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    }

    if (clientId) {
      whereClause.ClientId = clientId;
    }

    if (payment_status) {
      whereClause.payment_status = payment_status;
    }

    if (payment_method) {
      whereClause.payment_method = payment_method;
    }

    if (search) {
      whereClause[Op.or] = [
        { sale_number: { [Op.like]: `%${search}%` } },
        { notes: { [Op.like]: `%${search}%` } },
      ];
    }

    const sales = await Sale.findAll({
      where: whereClause,
      include: [
        {
          model: SaleItem,
          include: [{ model: Product, attributes: ["name", "code"] }],
        },
        { model: Client, attributes: ["name", "phone"] },
      ],
      order: [["created_at", "DESC"]],
    });

    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.id, {
      include: [
        {
          model: SaleItem,
          include: [{ model: Product }],
        },
        { model: Client },
        { model: CreditPayment },
      ],
    });

    if (!sale) {
      return res.status(404).json({ error: "Venda não encontrada" });
    }

    res.json(sale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSale = async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.id);
    if (!sale) {
      return res.status(404).json({ error: "Venda não encontrada" });
    }

    await sale.update(req.body);
    res.json(sale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteSale = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const sale = await Sale.findByPk(req.params.id, {
      include: [SaleItem, Client],
    });

    if (!sale) {
      return res.status(404).json({ error: "Venda não encontrada" });
    }

    // Reverter Stock
    for (const item of sale.SaleItems) {
      await Product.increment("stock", {
        by: item.quantity,
        where: { id: item.ProductId },
        transaction,
      });
    }

    // Reverter saldo do cliente se for fiado
    if (sale.payment_method === "credit" && sale.ClientId) {
      await Client.decrement("credit_balance", {
        by: sale.total_amount,
        where: { id: sale.ClientId },
        transaction,
      });
    }

    // Desativar venda (soft delete)
    await sale.update({ is_active: false }, { transaction });

    await transaction.commit();
    res.json({ message: "Venda cancelada com sucesso" });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
};

const generateReceipt = async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.id, {
      include: [
        {
          model: SaleItem,
          include: [{ model: Product }],
        },
        { model: Client },
      ],
    });

    if (!sale) {
      return res.status(404).json({ error: "Venda não encontrada" });
    }

    // Aqui você pode implementar a geração de PDF
    // Por enquanto, retornamos os dados formatados
    const receipt = {
      sale_number: sale.sale_number,
      date: sale.created_at,
      client: sale.Client ? sale.Client.name : "Cliente Avulso",
      items: sale.SaleItems.map((item) => ({
        product: item.Product.name,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total: item.quantity * item.unit_price,
      })),
      subtotal: sale.subtotal,
      discount: sale.discount,
      tax: sale.tax,
      total: sale.total_amount,
      payment_method: sale.payment_method,
      payment_status: sale.payment_status,
    };

    res.json(receipt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSalesByClient = async (req, res) => {
  try {
    const { clientId } = req.params;
    const { status } = req.query;

    let whereClause = {
      ClientId: clientId,
      is_active: true,
    };

    if (status) {
      whereClause.payment_status = status;
    }

    const sales = await Sale.findAll({
      where: whereClause,
      include: [
        {
          model: SaleItem,
          include: [{ model: Product, attributes: ["name", "code"] }],
        },
        { model: CreditPayment },
      ],
      order: [["created_at", "DESC"]],
    });

    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSale,
  getSales,
  getSaleById,
  updateSale,
  deleteSale,
  generateReceipt,
  getSalesByClient,
};

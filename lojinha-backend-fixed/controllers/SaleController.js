const {
  Sale,
  SaleItem,
  Product,
  Client,
  CreditPayment,
} = require("../models/associations");
const sequelize = require("../config/database");
const { Op } = require("sequelize");

const createSale = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const {
      products,
      clientId,
      paymentMethod,
      discount = 0,
      tax = 0,
      dueDate,
      notes,
    } = req.body;

    // Gerar número da venda
    const saleNumber = `V${Date.now()}`;

    // Calcular subtotal
    let subtotal = 0;
    for (const item of products) {
      const product = await Product.findByPk(item.productId, { transaction });
      if (!product) {
        throw new Error(`Produto com ID ${item.productId} não encontrado`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Estoque insuficiente para o produto ${product.name}`);
      }
      subtotal += product.price * item.quantity;
    }

    // Calcular total com desconto e imposto
    const totalAmount = subtotal - discount + tax;

    // Criar venda
    const sale = await Sale.create(
      {
        saleNumber,
        subtotal,
        discount,
        tax,
        totalAmount,
        paymentMethod,
        paymentStatus: paymentMethod === "credit" ? "pending" : "paid",
        dueDate: paymentMethod === "credit" ? dueDate : null,
        notes,
        ClientId: clientId,
      },
      { transaction }
    );

    // Criar itens da venda e atualizar estoque
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

      // Atualizar estoque
      await Product.decrement("stock", {
        by: item.quantity,
        where: { id: item.productId },
        transaction,
      });
    }

    // Se for fiado, atualizar saldo do cliente
    if (paymentMethod === "credit" && clientId) {
      await Client.increment("creditBalance", {
        by: totalAmount,
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
        { model: Client, attributes: ["name", "contact"] },
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
      paymentStatus,
      paymentMethod,
      search,
    } = req.query;

    let whereClause = { isActive: true };

    if (startDate && endDate) {
      whereClause.createdAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    }

    if (clientId) {
      whereClause.ClientId = clientId;
    }

    if (paymentStatus) {
      whereClause.paymentStatus = paymentStatus;
    }

    if (paymentMethod) {
      whereClause.paymentMethod = paymentMethod;
    }

    if (search) {
      whereClause[Op.or] = [
        { saleNumber: { [Op.like]: `%${search}%` } },
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
        { model: Client, attributes: ["name", "contact"] },
      ],
      order: [["createdAt", "DESC"]],
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

    // Reverter estoque
    for (const item of sale.SaleItems) {
      await Product.increment("stock", {
        by: item.quantity,
        where: { id: item.ProductId },
        transaction,
      });
    }

    // Reverter saldo do cliente se for fiado
    if (sale.paymentMethod === "credit" && sale.ClientId) {
      await Client.decrement("creditBalance", {
        by: sale.totalAmount,
        where: { id: sale.ClientId },
        transaction,
      });
    }

    // Desativar venda (soft delete)
    await sale.update({ isActive: false }, { transaction });

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
      saleNumber: sale.saleNumber,
      date: sale.createdAt,
      client: sale.Client ? sale.Client.name : "Cliente Avulso",
      items: sale.SaleItems.map((item) => ({
        product: item.Product.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total: item.quantity * item.unitPrice,
      })),
      subtotal: sale.subtotal,
      discount: sale.discount,
      tax: sale.tax,
      total: sale.totalAmount,
      paymentMethod: sale.paymentMethod,
      paymentStatus: sale.paymentStatus,
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
      isActive: true,
    };

    if (status) {
      whereClause.paymentStatus = status;
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
      order: [["createdAt", "DESC"]],
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

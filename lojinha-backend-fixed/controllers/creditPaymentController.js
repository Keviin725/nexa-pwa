const { CreditPayment, Sale, Client } = require("../models/associations");
const sequelize = require("../config/database");

const createCreditPayment = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const {
      saleId,
      clientId,
      amountPaid,
      paymentMethod = "cash",
      notes,
    } = req.body;

    // Verificar se a venda existe e é fiada
    const sale = await Sale.findByPk(saleId, { transaction });
    if (!sale) {
      throw new Error("Venda não encontrada");
    }
    if (sale.paymentMethod !== "credit") {
      throw new Error("Esta venda não é fiada");
    }

    // Calcular total já pago
    const totalPaid =
      (await CreditPayment.sum("amountPaid", {
        where: { SaleId: saleId },
        transaction,
      })) || 0;

    // Verificar se o pagamento não excede o valor restante
    const remainingAmount = sale.totalAmount - totalPaid;
    if (amountPaid > remainingAmount) {
      throw new Error(
        `Valor do pagamento (${amountPaid}) excede o valor restante (${remainingAmount})`
      );
    }

    // Criar pagamento
    const payment = await CreditPayment.create(
      {
        amountPaid,
        paymentMethod,
        notes,
        SaleId: saleId,
        ClientId: clientId,
      },
      { transaction }
    );

    // Atualizar saldo do cliente
    await Client.decrement("creditBalance", {
      by: amountPaid,
      where: { id: clientId },
      transaction,
    });

    // Verificar se a dívida foi totalmente paga
    const newTotalPaid = totalPaid + amountPaid;
    if (newTotalPaid >= sale.totalAmount) {
      await Sale.update(
        { paymentStatus: "paid" },
        { where: { id: saleId }, transaction }
      );
    } else {
      await Sale.update(
        { paymentStatus: "partial" },
        { where: { id: saleId }, transaction }
      );
    }

    await transaction.commit();

    // Retornar pagamento com dados relacionados
    const paymentWithDetails = await CreditPayment.findByPk(payment.id, {
      include: [
        { model: Sale, attributes: ["saleNumber", "totalAmount"] },
        { model: Client, attributes: ["name", "contact"] },
      ],
    });

    res.status(201).json(paymentWithDetails);
  } catch (error) {
    await transaction.rollback();
    res.status(400).json({ error: error.message });
  }
};

const getCreditPayments = async (req, res) => {
  try {
    const { clientId, saleId, startDate, endDate, paymentMethod } = req.query;

    let whereClause = { isActive: true };

    if (clientId) {
      whereClause.ClientId = clientId;
    }

    if (saleId) {
      whereClause.SaleId = saleId;
    }

    if (startDate && endDate) {
      whereClause.createdAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    }

    if (paymentMethod) {
      whereClause.paymentMethod = paymentMethod;
    }

    const payments = await CreditPayment.findAll({
      where: whereClause,
      include: [
        {
          model: Sale,
          attributes: ["saleNumber", "totalAmount", "createdAt"],
          include: [{ model: Client, attributes: ["name"] }],
        },
        { model: Client, attributes: ["name", "contact"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCreditPaymentById = async (req, res) => {
  try {
    const payment = await CreditPayment.findByPk(req.params.id, {
      include: [
        {
          model: Sale,
          include: [{ model: Client, attributes: ["name", "contact"] }],
        },
        { model: Client, attributes: ["name", "contact"] },
      ],
    });

    if (!payment) {
      return res.status(404).json({ error: "Pagamento não encontrado" });
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCreditPayment = async (req, res) => {
  try {
    const payment = await CreditPayment.findByPk(req.params.id);
    if (!payment) {
      return res.status(404).json({ error: "Pagamento não encontrado" });
    }

    await payment.update(req.body);
    res.json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCreditPayment = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const payment = await CreditPayment.findByPk(req.params.id, {
      include: [{ model: Sale }],
    });

    if (!payment) {
      return res.status(404).json({ error: "Pagamento não encontrado" });
    }

    // Reverter saldo do cliente
    await Client.increment("creditBalance", {
      by: payment.amountPaid,
      where: { id: payment.ClientId },
      transaction,
    });

    // Recalcular status da venda
    const sale = payment.Sale;
    const remainingPayments =
      (await CreditPayment.sum("amountPaid", {
        where: {
          SaleId: sale.id,
          id: { [Op.ne]: payment.id },
        },
        transaction,
      })) || 0;

    let newStatus = "pending";
    if (remainingPayments > 0) {
      newStatus = remainingPayments >= sale.totalAmount ? "paid" : "partial";
    }

    await Sale.update(
      { paymentStatus: newStatus },
      { where: { id: sale.id }, transaction }
    );

    // Desativar pagamento (soft delete)
    await payment.update({ isActive: false }, { transaction });

    await transaction.commit();
    res.json({ message: "Pagamento cancelado com sucesso" });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
};

const getPaymentsBySale = async (req, res) => {
  try {
    const { saleId } = req.params;

    const payments = await CreditPayment.findAll({
      where: {
        SaleId: saleId,
        isActive: true,
      },
      include: [{ model: Client, attributes: ["name", "contact"] }],
      order: [["createdAt", "ASC"]],
    });

    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPaymentsByClient = async (req, res) => {
  try {
    const { clientId } = req.params;
    const { startDate, endDate } = req.query;

    let whereClause = {
      ClientId: clientId,
      isActive: true,
    };

    if (startDate && endDate) {
      whereClause.createdAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    }

    const payments = await CreditPayment.findAll({
      where: whereClause,
      include: [
        {
          model: Sale,
          attributes: ["saleNumber", "totalAmount", "createdAt"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCreditPayment,
  getCreditPayments,
  getCreditPaymentById,
  updateCreditPayment,
  deleteCreditPayment,
  getPaymentsBySale,
  getPaymentsByClient,
};

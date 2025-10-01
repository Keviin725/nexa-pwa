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

    console.log("💳 Dados recebidos no backend:", req.body);

    // Verificar se a venda existe e é fiada
    const sale = await Sale.findByPk(saleId, { transaction });
    console.log("💳 Venda encontrada:", sale ? "Sim" : "Não");
    if (!sale) {
      throw new Error("Venda não encontrada");
    }
    console.log("💳 Método de pagamento da venda:", sale.paymentMethod);
    console.log("💳 Venda completa:", sale.toJSON());
    if (sale.paymentMethod !== "credit") {
      throw new Error("Esta venda não é fiada");
    }

    // Verificar se clientId é válido
    if (!clientId) {
      throw new Error("ClientId é obrigatório");
    }

    // Verificar se amountPaid é válido
    if (!amountPaid || amountPaid <= 0) {
      throw new Error("Valor do pagamento deve ser maior que zero");
    }

    // Verificar se paymentMethod é válido
    const validPaymentMethods = ["cash", "card", "pix", "transfer"];
    if (!validPaymentMethods.includes(paymentMethod)) {
      throw new Error(`Método de pagamento inválido: ${paymentMethod}`);
    }

    // Verificar se o cliente existe
    const client = await Client.findByPk(clientId, { transaction });
    if (!client) {
      throw new Error("Cliente não encontrado");
    }

    console.log("💳 Cliente encontrado:", client ? "Sim" : "Não");
    console.log(
      "💳 Dados do cliente:",
      client ? { id: client.id, name: client.name } : "N/A"
    );

    // Calcular total já pago (excluindo pagamentos inativos)
    const totalPaid =
      (await CreditPayment.sum("amountPaid", {
        where: {
          SaleId: saleId,
          is_active: true,
        },
        transaction,
      })) || 0;

    // Verificar se o pagamento não excede o valor restante
    const remainingAmount = sale.totalAmount - totalPaid;
    console.log("💳 Total já pago:", totalPaid);
    console.log("💳 Valor restante:", remainingAmount);
    console.log("💳 Valor do pagamento:", amountPaid);

    if (amountPaid > remainingAmount) {
      throw new Error(
        `Valor do pagamento (${amountPaid}) excede o valor restante (${remainingAmount})`
      );
    }

    // Criar pagamento
    console.log("💳 Criando pagamento com dados:", {
      amountPaid,
      paymentMethod,
      notes,
      SaleId: saleId,
      ClientId: clientId,
    });

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
    await Client.decrement("credit_balance", {
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
        { model: Client, attributes: ["name", "phone"] },
      ],
    });

    res.status(201).json(paymentWithDetails);
  } catch (error) {
    await transaction.rollback();
    console.error("💳 Erro ao criar pagamento:", error);
    res.status(400).json({ error: error.message });
  }
};

const getCreditPayments = async (req, res) => {
  try {
    const { clientId, saleId, startDate, endDate, paymentMethod } = req.query;

    let whereClause = { is_active: true };

    if (clientId) {
      whereClause.ClientId = clientId;
    }

    if (saleId) {
      whereClause.SaleId = saleId;
    }

    if (startDate && endDate) {
      whereClause.created_at = {
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
        { model: Client, attributes: ["name", "phone"] },
      ],
      order: [["created_at", "DESC"]],
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
        { model: Client, attributes: ["name", "phone"] },
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
    await Client.increment("credit_balance", {
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
          is_active: true,
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
    await payment.update({ is_active: false }, { transaction });

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
        is_active: true,
      },
      include: [{ model: Client, attributes: ["name", "phone"] }],
      order: [["created_at", "ASC"]],
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
      is_active: true,
    };

    if (startDate && endDate) {
      whereClause.created_at = {
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
      order: [["created_at", "DESC"]],
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

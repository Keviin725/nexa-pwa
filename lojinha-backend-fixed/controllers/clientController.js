const { Client, Sale, CreditPayment } = require("../models/associations");
const { Op } = require("sequelize");
const codeGenerator = require("../utils/codeGenerator");

const getClients = async (req, res) => {
  try {
    const { search, hasDebt } = req.query;

    let whereClause = { is_active: true };

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { phone: { [Op.like]: `%${search}%` } },
      ];
    }

    const clients = await Client.findAll({
      where: whereClause,
      order: [["createdAt", "DESC"]],
    });

    // Calcular dívidas reais baseadas nas vendas a crédito
    const clientsWithDebts = await Promise.all(
      clients.map(async (client) => {
        // Buscar vendas a crédito pendentes do cliente
        const pendingSales = await Sale.findAll({
          where: {
            ClientId: client.id,
            paymentMethod: "credit",
            paymentStatus: "pending",
          },
          attributes: ["id", "totalAmount"],
        });

        // Buscar vendas a crédito parciais do cliente
        const partialSales = await Sale.findAll({
          where: {
            ClientId: client.id,
            paymentMethod: "credit",
            paymentStatus: "partial",
          },
          attributes: ["id", "totalAmount"],
        });

        // Calcular dívidas reais considerando pagamentos já feitos
        let totalDebt = 0;
        let partialDebt = 0;

        // Para vendas pendentes - calcular saldo restante
        for (const sale of pendingSales) {
          // Buscar pagamentos já feitos para esta venda (apenas ativos)
          const payments =
            (await CreditPayment.sum("amountPaid", {
              where: {
                SaleId: sale.id,
                is_active: true,
              },
            })) || 0;

          const remainingAmount = sale.totalAmount - payments;
          if (remainingAmount > 0) {
            totalDebt += remainingAmount;
          }
        }

        // Para vendas parciais - calcular saldo restante
        for (const sale of partialSales) {
          // Buscar pagamentos já feitos para esta venda (apenas ativos)
          const payments =
            (await CreditPayment.sum("amountPaid", {
              where: {
                SaleId: sale.id,
                is_active: true,
              },
            })) || 0;

          const remainingAmount = sale.totalAmount - payments;
          if (remainingAmount > 0) {
            partialDebt += remainingAmount;
          }
        }

        // Total de dívidas (pendentes + saldos parciais)
        const creditBalance = totalDebt + partialDebt;

        return {
          ...client.toJSON(),
          creditBalance,
          hasDebt: creditBalance > 0,
          totalDebt,
          partialDebt,
        };
      })
    );

    // Filtrar por dívidas se solicitado
    let result = clientsWithDebts;
    if (hasDebt === "true") {
      result = clientsWithDebts.filter((client) => client.creditBalance > 0);
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createClient = async (req, res) => {
  try {
    // Gerar código único para o cliente
    const clientCode = await codeGenerator.generateClientCode(Client);

    const clientData = {
      ...req.body,
      code: clientCode,
    };

    const client = await Client.create(clientData);
    res.status(201).json(client);
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    res.status(400).json({ error: error.message });
  }
};

const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Client.update(req.body, {
      where: { id },
    });

    if (updated) {
      const updatedClient = await Client.findByPk(id);
      res.json(updatedClient);
    } else {
      res.status(404).json({ error: "Cliente não encontrado" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getClientById = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    // Verificar se tem dívidas pendentes
    if (client.credit_balance > 0) {
      return res.status(400).json({
        error: "Não é possível excluir cliente com dívidas pendentes",
      });
    }

    await client.update({ is_active: false });
    res.json({ message: "Cliente desativado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getClientDebts = async (req, res) => {
  try {
    const { clientId } = req.params;
    const { status } = req.query;

    let whereClause = {
      ClientId: clientId,
      paymentMethod: "credit",
      is_active: true,
    };

    if (status) {
      whereClause.paymentStatus = status;
    }

    const sales = await Sale.findAll({
      where: whereClause,
      include: [
        {
          model: CreditPayment,
          order: [["created_at", "DESC"]],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    // Calcular saldo pendente para cada venda
    const salesWithBalance = sales.map((sale) => {
      const totalPaid = sale.CreditPayments.reduce(
        (sum, payment) => sum + payment.amountPaid,
        0
      );
      const balance = sale.totalAmount - totalPaid;

      return {
        ...sale.toJSON(),
        totalPaid,
        balance,
        isOverdue: sale.dueDate && new Date() > new Date(sale.dueDate),
      };
    });

    res.json(salesWithBalance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getClientHistory = async (req, res) => {
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

    const sales = await Sale.findAll({
      where: whereClause,
      include: [
        {
          model: CreditPayment,
          order: [["created_at", "DESC"]],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getClientsWithDebts = async (req, res) => {
  try {
    const clients = await Client.findAll({
      where: {
        is_active: true,
        credit_balance: {
          [Op.gt]: 0,
        },
      },
      order: [["createdAt", "DESC"]],
    });

    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getClientDebts,
  getClientHistory,
  getClientsWithDebts,
};

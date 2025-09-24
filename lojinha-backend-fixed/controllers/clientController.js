const { Client, Sale, CreditPayment } = require("../models/associations");
const { Op } = require("sequelize");

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

    if (hasDebt === "true") {
      whereClause.creditBalance = {
        [Op.gt]: 0,
      };
    }

    const clients = await Client.findAll({
      where: whereClause,
      order: [["name", "ASC"]],
    });

    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createClient = async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json(client);
  } catch (error) {
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
    if (client.creditBalance > 0) {
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
      payment_method: "credit",
      is_active: true,
    };

    if (status) {
      whereClause.payment_status = status;
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
        creditBalance: {
          [Op.gt]: 0,
        },
      },
      order: [["creditBalance", "DESC"]],
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

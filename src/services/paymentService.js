// Serviço de Pagamentos
export class PaymentService {
  constructor() {
    this.apiBase = "http://localhost:3000/api";
    this.paymentMethods = {
      mpesa: {
        name: "M-Pesa",
        icon: "mobile",
        color: "green",
        description: "Pagamento móvel via M-Pesa",
      },
      emola: {
        name: "Emola",
        icon: "digital",
        color: "blue",
        description: "Pagamento digital via Emola",
      },
      visa: {
        name: "Visa",
        icon: "card",
        color: "purple",
        description: "Cartão de crédito Visa",
      },
    };
  }

  // Processar pagamento M-Pesa
  async processMpesaPayment(paymentData) {
    try {
      const response = await fetch(`${this.apiBase}/payments/mpesa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.getToken()}`,
        },
        body: JSON.stringify({
          amount: paymentData.amount,
          phoneNumber: paymentData.phoneNumber,
          description: paymentData.description,
          reference: this.generateReference(),
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao processar pagamento M-Pesa");
      }

      const result = await response.json();
      return {
        success: true,
        transactionId: result.transactionId,
        status: result.status,
        message: "Pagamento M-Pesa processado com sucesso",
      };
    } catch (error) {
      console.error("Erro no pagamento M-Pesa:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Processar pagamento Emola
  async processEmolaPayment(paymentData) {
    try {
      const response = await fetch(`${this.apiBase}/payments/emola`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.getToken()}`,
        },
        body: JSON.stringify({
          amount: paymentData.amount,
          description: paymentData.description,
          reference: this.generateReference(),
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao processar pagamento Emola");
      }

      const result = await response.json();
      return {
        success: true,
        transactionId: result.transactionId,
        status: result.status,
        message: "Pagamento Emola processado com sucesso",
      };
    } catch (error) {
      console.error("Erro no pagamento Emola:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Processar pagamento Visa
  async processVisaPayment(paymentData) {
    try {
      const response = await fetch(`${this.apiBase}/payments/visa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.getToken()}`,
        },
        body: JSON.stringify({
          amount: paymentData.amount,
          cardNumber: paymentData.cardNumber,
          cvv: paymentData.cvv,
          description: paymentData.description,
          reference: this.generateReference(),
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao processar pagamento Visa");
      }

      const result = await response.json();
      return {
        success: true,
        transactionId: result.transactionId,
        status: result.status,
        message: "Pagamento Visa processado com sucesso",
      };
    } catch (error) {
      console.error("Erro no pagamento Visa:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Processar pagamento genérico
  async processPayment(paymentData) {
    const { method } = paymentData;

    switch (method) {
      case "mpesa":
        return await this.processMpesaPayment(paymentData);
      case "emola":
        return await this.processEmolaPayment(paymentData);
      case "visa":
        return await this.processVisaPayment(paymentData);
      default:
        throw new Error("Método de pagamento não suportado");
    }
  }

  // Obter transações
  async getTransactions(filters = {}) {
    try {
      const queryParams = new URLSearchParams(filters);
      const response = await fetch(`${this.apiBase}/payments?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao carregar transações");
      }

      const result = await response.json();
      return {
        success: true,
        transactions: result.transactions,
        pagination: result.pagination,
      };
    } catch (error) {
      console.error("Erro ao carregar transações:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Obter resumo financeiro
  async getFinancialSummary(period = "month") {
    try {
      const response = await fetch(
        `${this.apiBase}/payments/summary?period=${period}`,
        {
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao carregar resumo financeiro");
      }

      const result = await response.json();
      return {
        success: true,
        summary: result.summary,
      };
    } catch (error) {
      console.error("Erro ao carregar resumo:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Obter estatísticas por método de pagamento
  async getPaymentMethodStats(period = "month") {
    try {
      const response = await fetch(
        `${this.apiBase}/payments/stats?period=${period}`,
        {
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao carregar estatísticas");
      }

      const result = await response.json();
      return {
        success: true,
        stats: result.stats,
      };
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Verificar status de uma transação
  async checkTransactionStatus(transactionId) {
    try {
      const response = await fetch(
        `${this.apiBase}/payments/${transactionId}/status`,
        {
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao verificar status da transação");
      }

      const result = await response.json();
      return {
        success: true,
        status: result.status,
        transaction: result.transaction,
      };
    } catch (error) {
      console.error("Erro ao verificar status:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Cancelar transação
  async cancelTransaction(transactionId) {
    try {
      const response = await fetch(
        `${this.apiBase}/payments/${transactionId}/cancel`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao cancelar transação");
      }

      const result = await response.json();
      return {
        success: true,
        message: "Transação cancelada com sucesso",
      };
    } catch (error) {
      console.error("Erro ao cancelar transação:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Reembolsar transação
  async refundTransaction(transactionId, amount = null) {
    try {
      const response = await fetch(
        `${this.apiBase}/payments/${transactionId}/refund`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getToken()}`,
          },
          body: JSON.stringify({
            amount: amount,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao processar reembolso");
      }

      const result = await response.json();
      return {
        success: true,
        refundId: result.refundId,
        message: "Reembolso processado com sucesso",
      };
    } catch (error) {
      console.error("Erro ao processar reembolso:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Obter métodos de pagamento disponíveis
  getAvailablePaymentMethods() {
    return Object.keys(this.paymentMethods).map((key) => ({
      value: key,
      ...this.paymentMethods[key],
    }));
  }

  // Validar dados de pagamento
  validatePaymentData(paymentData) {
    const errors = [];

    if (!paymentData.amount || paymentData.amount <= 0) {
      errors.push("Valor deve ser maior que zero");
    }

    if (!paymentData.method) {
      errors.push("Método de pagamento é obrigatório");
    }

    if (paymentData.method === "mpesa" && !paymentData.phoneNumber) {
      errors.push("Número de telefone é obrigatório para M-Pesa");
    }

    if (paymentData.method === "visa") {
      if (!paymentData.cardNumber) {
        errors.push("Número do cartão é obrigatório");
      }
      if (!paymentData.cvv) {
        errors.push("CVV é obrigatório");
      }
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  // Gerar referência única
  generateReference() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    return `PAY_${timestamp}_${random}`.toUpperCase();
  }

  // Obter token de autenticação
  getToken() {
    return localStorage.getItem("auth_token") || "";
  }

  // Formatar valor monetário
  formatCurrency(amount, currency = "MZN") {
    return new Intl.NumberFormat("pt-PT", {
      style: "currency",
      currency: currency,
    }).format(amount);
  }

  // Formatar data
  formatDate(date) {
    return new Date(date).toLocaleDateString("pt-PT", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // Obter status em português
  getStatusText(status) {
    const statusMap = {
      pending: "Pendente",
      completed: "Concluído",
      failed: "Falhou",
      cancelled: "Cancelado",
      refunded: "Reembolsado",
    };
    return statusMap[status] || status;
  }

  // Obter cor do status
  getStatusColor(status) {
    const colors = {
      pending: "yellow",
      completed: "green",
      failed: "red",
      cancelled: "gray",
      refunded: "blue",
    };
    return colors[status] || "gray";
  }
}

// Instância global do serviço de pagamentos
export const paymentService = new PaymentService();

// Funções auxiliares para integração
export const mpesaIntegration = {
  // Configurar M-Pesa
  async setup(config) {
    try {
      const response = await fetch(
        `${paymentService.apiBase}/payments/mpesa/setup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${paymentService.getToken()}`,
          },
          body: JSON.stringify(config),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao configurar M-Pesa");
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Verificar saldo
  async checkBalance() {
    try {
      const response = await fetch(
        `${paymentService.apiBase}/payments/mpesa/balance`,
        {
          headers: {
            Authorization: `Bearer ${paymentService.getToken()}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao verificar saldo");
      }

      const result = await response.json();
      return { success: true, balance: result.balance };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};

export const emolaIntegration = {
  // Configurar Emola
  async setup(config) {
    try {
      const response = await fetch(
        `${paymentService.apiBase}/payments/emola/setup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${paymentService.getToken()}`,
          },
          body: JSON.stringify(config),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao configurar Emola");
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};

export const visaIntegration = {
  // Configurar Visa
  async setup(config) {
    try {
      const response = await fetch(
        `${paymentService.apiBase}/payments/visa/setup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${paymentService.getToken()}`,
          },
          body: JSON.stringify(config),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao configurar Visa");
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Validar cartão
  validateCard(cardNumber) {
    // Algoritmo de Luhn para validação de cartão
    const digits = cardNumber.replace(/\D/g, "");
    let sum = 0;
    let isEven = false;

    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i]);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  },
};

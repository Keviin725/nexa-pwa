// Serviço de Dados Mock para Simular Backend
export class MockDataService {
  constructor() {
    this.products = [
      {
        id: 1,
        name: "Coca-Cola 350ml",
        price: 25.0,
        stock: 50,
        minStock: 10,
        category: "Bebidas",
        description: "Refrigerante Coca-Cola lata 350ml",
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-15"),
      },
      {
        id: 2,
        name: "Pão de Açúcar",
        price: 2.5,
        stock: 5,
        minStock: 20,
        category: "Padaria",
        description: "Pão de açúcar tradicional",
        createdAt: new Date("2024-01-14"),
        updatedAt: new Date("2024-01-14"),
      },
      {
        id: 3,
        name: "Leite UHT 1L",
        price: 8.5,
        stock: 15,
        minStock: 5,
        category: "Laticínios",
        description: "Leite UHT integral 1 litro",
        createdAt: new Date("2024-01-13"),
        updatedAt: new Date("2024-01-13"),
      },
      {
        id: 4,
        name: "Arroz 5kg",
        price: 45.0,
        stock: 8,
        minStock: 3,
        category: "Cereais",
        description: "Arroz branco tipo 1, 5kg",
        createdAt: new Date("2024-01-12"),
        updatedAt: new Date("2024-01-12"),
      },
    ];

    this.clients = [
      {
        id: 1,
        name: "João Silva",
        phone: "+258 84 123 4567",
        email: "joao@email.com",
        address: "Maputo, Moçambique",
        creditBalance: 150.0,
        totalPurchases: 1250.0,
        lastPurchase: new Date("2024-01-20"),
        createdAt: new Date("2024-01-01"),
        notes: "Cliente fiel, sempre paga em dia",
      },
      {
        id: 2,
        name: "Maria Santos",
        phone: "+258 82 987 6543",
        email: "maria@email.com",
        address: "Beira, Moçambique",
        creditBalance: 0.0,
        totalPurchases: 890.0,
        lastPurchase: new Date("2024-01-18"),
        createdAt: new Date("2024-01-05"),
        notes: "Prefere pagamento à vista",
      },
      {
        id: 3,
        name: "Carlos Mendes",
        phone: "+258 85 456 7890",
        email: "carlos@email.com",
        address: "Nampula, Moçambique",
        creditBalance: 75.5,
        totalPurchases: 2100.0,
        lastPurchase: new Date("2024-01-19"),
        createdAt: new Date("2024-01-10"),
        notes: "Cliente com histórico de atraso",
      },
    ];

    this.sales = [
      {
        id: 1,
        clientId: 1,
        clientName: "João Silva",
        items: [
          {
            productId: 1,
            productName: "Coca-Cola 350ml",
            quantity: 2,
            price: 25.0,
          },
          {
            productId: 2,
            productName: "Pão de Açúcar",
            quantity: 3,
            price: 2.5,
          },
        ],
        subtotal: 57.5,
        discount: 0.0,
        total: 57.5,
        paymentStatus: "completed",
        paymentMethod: "cash",
        createdAt: new Date("2024-01-20T10:30:00"),
        notes: "Pagamento à vista",
      },
      {
        id: 2,
        clientId: 2,
        clientName: "Maria Santos",
        items: [
          {
            productId: 3,
            productName: "Leite UHT 1L",
            quantity: 1,
            price: 8.5,
          },
          { productId: 4, productName: "Arroz 5kg", quantity: 1, price: 45.0 },
        ],
        subtotal: 53.5,
        discount: 5.0,
        total: 48.5,
        paymentStatus: "completed",
        paymentMethod: "cash",
        createdAt: new Date("2024-01-19T14:15:00"),
        notes: "Desconto de cliente fiel",
      },
      {
        id: 3,
        clientId: 3,
        clientName: "Carlos Mendes",
        items: [
          {
            productId: 1,
            productName: "Coca-Cola 350ml",
            quantity: 4,
            price: 25.0,
          },
          {
            productId: 2,
            productName: "Pão de Açúcar",
            quantity: 2,
            price: 2.5,
          },
        ],
        subtotal: 105.0,
        discount: 0.0,
        total: 105.0,
        paymentStatus: "pending",
        paymentMethod: "credit",
        createdAt: new Date("2024-01-18T16:45:00"),
        notes: "Venda a crédito",
      },
    ];

    this.categories = [
      "Bebidas",
      "Padaria",
      "Laticínios",
      "Cereais",
      "Carnes",
      "Vegetais",
    ];
  }

  // Métodos para Produtos
  async getProducts() {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.products]), 300);
    });
  }

  async createProduct(product) {
    const newProduct = {
      id: Date.now(),
      ...product,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.products.push(newProduct);
    return new Promise((resolve) => {
      setTimeout(() => resolve(newProduct), 200);
    });
  }

  async updateProduct(id, product) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products[index] = {
        ...this.products[index],
        ...product,
        updatedAt: new Date(),
      };
      return new Promise((resolve) => {
        setTimeout(() => resolve(this.products[index]), 200);
      });
    }
    throw new Error("Produto não encontrado");
  }

  async deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      return new Promise((resolve) => {
        setTimeout(() => resolve(true), 200);
      });
    }
    throw new Error("Produto não encontrado");
  }

  // Métodos para Clientes
  async getClients() {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.clients]), 300);
    });
  }

  async createClient(client) {
    const newClient = {
      id: Date.now(),
      ...client,
      creditBalance: 0.0,
      totalPurchases: 0.0,
      createdAt: new Date(),
    };
    this.clients.push(newClient);
    return new Promise((resolve) => {
      setTimeout(() => resolve(newClient), 200);
    });
  }

  async updateClient(id, client) {
    const index = this.clients.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.clients[index] = { ...this.clients[index], ...client };
      return new Promise((resolve) => {
        setTimeout(() => resolve(this.clients[index]), 200);
      });
    }
    throw new Error("Cliente não encontrado");
  }

  async deleteClient(id) {
    const index = this.clients.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.clients.splice(index, 1);
      return new Promise((resolve) => {
        setTimeout(() => resolve(true), 200);
      });
    }
    throw new Error("Cliente não encontrado");
  }

  // Métodos para Vendas
  async getSales() {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.sales]), 300);
    });
  }

  async createSale(sale) {
    const newSale = {
      id: Date.now(),
      ...sale,
      createdAt: new Date(),
    };
    this.sales.push(newSale);
    return new Promise((resolve) => {
      setTimeout(() => resolve(newSale), 200);
    });
  }

  async updateSale(id, sale) {
    const index = this.sales.findIndex((s) => s.id === id);
    if (index !== -1) {
      this.sales[index] = { ...this.sales[index], ...sale };
      return new Promise((resolve) => {
        setTimeout(() => resolve(this.sales[index]), 200);
      });
    }
    throw new Error("Venda não encontrada");
  }

  async deleteSale(id) {
    const index = this.sales.findIndex((s) => s.id === id);
    if (index !== -1) {
      this.sales.splice(index, 1);
      return new Promise((resolve) => {
        setTimeout(() => resolve(true), 200);
      });
    }
    throw new Error("Venda não encontrada");
  }

  // Métodos para Categorias
  async getCategories() {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.categories]), 200);
    });
  }

  // Métodos para Relatórios
  async getDashboardData() {
    const totalRevenue = this.sales
      .filter((sale) => sale.paymentStatus === "completed")
      .reduce((sum, sale) => sum + sale.total, 0);

    const totalSales = this.sales.length;
    const pendingSales = this.sales.filter(
      (sale) => sale.paymentStatus === "pending"
    ).length;
    const totalProducts = this.products.length;
    const lowStockProducts = this.products.filter(
      (p) => p.stock <= p.minStock
    ).length;
    const totalClients = this.clients.length;
    const clientsWithDebts = this.clients.filter(
      (c) => c.creditBalance > 0
    ).length;

    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            totalRevenue,
            totalSales,
            pendingSales,
            totalProducts,
            lowStockProducts,
            totalClients,
            clientsWithDebts,
          }),
        300
      );
    });
  }

  // Métodos para Pagamentos
  async processPayment(saleId, paymentData) {
    const sale = this.sales.find((s) => s.id === saleId);
    if (sale) {
      sale.paymentStatus = "completed";
      sale.paymentMethod = paymentData.method;
      sale.paidAt = new Date();
      return new Promise((resolve) => {
        setTimeout(() => resolve(sale), 500);
      });
    }
    throw new Error("Venda não encontrada");
  }
}

// Instância global do serviço
export const mockDataService = new MockDataService();

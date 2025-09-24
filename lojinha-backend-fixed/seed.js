const {
  Product,
  Client,
  Sale,
  SaleItem,
  Category,
  User,
} = require("./models/associations");
const bcrypt = require("bcryptjs");

const seedDatabase = async () => {
  try {
    console.log("🌱 Starting database seeding...");

    // Criar categorias
    const categories = await Category.bulkCreate([
      {
        name: "Bebidas",
        description: "Refrigerantes, sucos e bebidas em geral",
        color: "#3B82F6",
      },
      {
        name: "Padaria",
        description: "Pães, bolos e produtos de padaria",
        color: "#F59E0B",
      },
      {
        name: "Laticínios",
        description: "Leite, queijo, iogurte e derivados",
        color: "#10B981",
      },
      {
        name: "Cereais",
        description: "Arroz, feijão, milho e cereais",
        color: "#8B5CF6",
      },
      {
        name: "Carnes",
        description: "Carne bovina, suína, frango e peixe",
        color: "#EF4444",
      },
      {
        name: "Vegetais",
        description: "Frutas, verduras e legumes",
        color: "#22C55E",
      },
    ]);

    console.log("✅ Categories created");

    // Criar produtos
    const products = await Product.bulkCreate([
      {
        name: "Coca-Cola 350ml",
        price: 25.0,
        costPrice: 18.0,
        stock: 50,
        minStock: 10,
        category: "Bebidas",
        code: "COC001",
        description: "Refrigerante Coca-Cola lata 350ml",
        supplier: "Coca-Cola Company",
        location: "Prateleira A1",
        weight: 0.35,
        volume: 0.35,
        notes: "Produto de alta rotatividade",
      },
      {
        name: "Pão de Açúcar",
        price: 2.5,
        costPrice: 1.2,
        stock: 5,
        minStock: 20,
        category: "Padaria",
        code: "PAO001",
        description: "Pão de açúcar tradicional",
        supplier: "Padaria Central",
        location: "Prateleira B2",
        weight: 0.5,
        notes: "Produto fresco, verificar validade",
      },
      {
        name: "Leite UHT 1L",
        price: 8.5,
        costPrice: 6.0,
        stock: 15,
        minStock: 5,
        category: "Laticínios",
        code: "LEI001",
        description: "Leite UHT integral 1 litro",
        supplier: "Laticínios Unidos",
        location: "Geladeira C1",
        weight: 1.0,
        volume: 1.0,
        notes: "Manter refrigerado",
      },
      {
        name: "Arroz 5kg",
        price: 45.0,
        costPrice: 35.0,
        stock: 8,
        minStock: 3,
        category: "Cereais",
        code: "ARR001",
        description: "Arroz branco tipo 1, 5kg",
        supplier: "Cereais do Sul",
        location: "Estoque D1",
        weight: 5.0,
        notes: "Produto básico, sempre em estoque",
      },
      {
        name: "Frango Inteiro",
        price: 35.0,
        costPrice: 28.0,
        stock: 12,
        minStock: 5,
        category: "Carnes",
        code: "CAR001",
        description: "Frango inteiro fresco",
        supplier: "Aves do Campo",
        location: "Freezer E1",
        weight: 1.5,
        notes: "Manter congelado",
      },
      {
        name: "Tomate",
        price: 4.5,
        costPrice: 3.0,
        stock: 25,
        minStock: 10,
        category: "Vegetais",
        code: "TOM001",
        description: "Tomate vermelho fresco",
        supplier: "Hortifruti Verde",
        location: "Geladeira F1",
        weight: 0.2,
        notes: "Produto perecível",
      },
    ]);

    console.log("✅ Products created");

    // Criar clientes
    const clients = await Client.bulkCreate([
      {
        name: "João Silva",
        phone: "+258 84 123 4567",
        email: "joao@email.com",
        address: "Maputo, Moçambique",
        creditBalance: 150.0,
        totalPurchases: 1250.0,
        lastPurchase: new Date("2024-01-20"),
        notes: "Cliente fiel, sempre paga em dia",
      },
      {
        name: "Maria Santos",
        phone: "+258 82 987 6543",
        email: "maria@email.com",
        address: "Beira, Moçambique",
        creditBalance: 0.0,
        totalPurchases: 890.0,
        lastPurchase: new Date("2024-01-18"),
        notes: "Prefere pagamento à vista",
      },
      {
        name: "Carlos Mendes",
        phone: "+258 85 456 7890",
        email: "carlos@email.com",
        address: "Nampula, Moçambique",
        creditBalance: 75.5,
        totalPurchases: 2100.0,
        lastPurchase: new Date("2024-01-19"),
        notes: "Cliente com histórico de atraso",
      },
      {
        name: "Ana Costa",
        phone: "+258 86 321 9876",
        email: "ana@email.com",
        address: "Pemba, Moçambique",
        creditBalance: 0.0,
        totalPurchases: 450.0,
        lastPurchase: new Date("2024-01-15"),
        notes: "Nova cliente, pagamento pontual",
      },
    ]);

    console.log("✅ Clients created");

    // Criar usuários adicionais
    const additionalUsers = await User.bulkCreate([
      {
        name: "Pedro Vendedor",
        email: "pedro@lojinha.com",
        phone: "+258 87 654 3210",
        password: await bcrypt.hash("pedro123", 10),
        role: "seller",
        status: "active",
        permissions: ["view_products", "view_sales", "create_sales"],
      },
      {
        name: "Sofia Gerente",
        email: "sofia@lojinha.com",
        phone: "+258 88 111 2222",
        password: await bcrypt.hash("sofia123", 10),
        role: "manager",
        status: "active",
        permissions: [
          "view_products",
          "view_sales",
          "create_sales",
          "view_reports",
          "manage_products",
        ],
      },
    ]);

    console.log("✅ Additional users created");

    // Criar vendas de exemplo
    const sales = await Sale.bulkCreate([
      {
        saleNumber: "V001",
        subtotal: 57.5,
        discount: 0.0,
        tax: 0.0,
        totalAmount: 57.5,
        paymentMethod: "cash",
        paymentStatus: "paid",
        notes: "Pagamento à vista",
        ClientId: clients[0].id,
        UserId: 1, // Admin
      },
      {
        saleNumber: "V002",
        subtotal: 53.5,
        discount: 5.0,
        tax: 0.0,
        totalAmount: 48.5,
        paymentMethod: "card",
        paymentStatus: "paid",
        notes: "Desconto de cliente fiel",
        ClientId: clients[1].id,
        UserId: 2, // Gerente
      },
      {
        saleNumber: "V003",
        subtotal: 105.0,
        discount: 0.0,
        tax: 0.0,
        totalAmount: 105.0,
        paymentMethod: "credit",
        paymentStatus: "pending",
        notes: "Venda a crédito",
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
        ClientId: clients[2].id,
        UserId: 3, // Vendedor
      },
    ]);

    console.log("✅ Sales created");

    // Criar itens das vendas
    await SaleItem.bulkCreate([
      {
        quantity: 2,
        unitPrice: 25.0,
        SaleId: sales[0].id,
        ProductId: products[0].id, // Coca-Cola
      },
      {
        quantity: 3,
        unitPrice: 2.5,
        SaleId: sales[0].id,
        ProductId: products[1].id, // Pão
      },
      {
        quantity: 1,
        unitPrice: 8.5,
        SaleId: sales[1].id,
        ProductId: products[2].id, // Leite
      },
      {
        quantity: 1,
        unitPrice: 45.0,
        SaleId: sales[1].id,
        ProductId: products[3].id, // Arroz
      },
      {
        quantity: 4,
        unitPrice: 25.0,
        SaleId: sales[2].id,
        ProductId: products[0].id, // Coca-Cola
      },
      {
        quantity: 2,
        unitPrice: 2.5,
        SaleId: sales[2].id,
        ProductId: products[1].id, // Pão
      },
    ]);

    console.log("✅ Sale items created");

    console.log("🎉 Database seeding completed successfully!");
    console.log(`📊 Created:`);
    console.log(`   - ${categories.length} categories`);
    console.log(`   - ${products.length} products`);
    console.log(`   - ${clients.length} clients`);
    console.log(`   - ${additionalUsers.length} additional users`);
    console.log(`   - ${sales.length} sales`);
    console.log(`   - 6 sale items`);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
};

module.exports = { seedDatabase };

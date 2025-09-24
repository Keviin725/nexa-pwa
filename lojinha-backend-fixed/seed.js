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

    // Verificar se já existem categorias
    const existingCategories = await Category.count();
    if (existingCategories > 0) {
      console.log(`✅ Categories already exist (${existingCategories} found)`);
    } else {
      // Criar categorias apenas se não existirem
      const categories = await Category.bulkCreate([
        {
          name: "Bebidas",
          description: "Refrigerantes, sucos e bebidas em geral",
          color: "#3B82F6",
          is_active: true,
        },
        {
          name: "Padaria",
          description: "Pães, bolos e produtos de padaria",
          color: "#F59E0B",
          is_active: true,
        },
        {
          name: "Laticínios",
          description: "Leite, queijo, iogurte e derivados",
          color: "#10B981",
          is_active: true,
        },
        {
          name: "Cereais",
          description: "Arroz, feijão, milho e cereais",
          color: "#8B5CF6",
          is_active: true,
        },
        {
          name: "Carnes",
          description: "Carne bovina, suína, frango e peixe",
          color: "#EF4444",
          is_active: true,
        },
        {
          name: "Vegetais",
          description: "Frutas, verduras e legumes",
          color: "#22C55E",
          is_active: true,
        },
      ]);
      console.log("✅ Categories created");
    }

    // Verificar se já existem produtos
    const existingProducts = await Product.count();
    if (existingProducts > 0) {
      console.log(`✅ Products already exist (${existingProducts} found)`);
    } else {
      // Criar produtos apenas se não existirem
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
          notes: "Produto de alta rotatividade",
          is_active: true,
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
          notes: "Produto fresco, verificar validade",
          is_active: true,
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
          notes: "Manter refrigerado",
          is_active: true,
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
          notes: "Produto básico, sempre em estoque",
          is_active: true,
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
          notes: "Manter congelado",
          is_active: true,
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
          notes: "Produto perecível",
          is_active: true,
        },
      ]);

      console.log("✅ Products created");
    }

    // Verificar se já existem clientes
    const existingClients = await Client.count();
    if (existingClients > 0) {
      console.log(`✅ Clients already exist (${existingClients} found)`);
    } else {
      // Criar clientes apenas se não existirem
      const clients = await Client.bulkCreate([
        {
          name: "João Silva",
          phone: "+258 84 123 4567",
          email: "joao@email.com",
          address: "Maputo, Moçambique",
          credit_balance: 150.0,
          total_purchases: 1250.0,
          last_purchase: new Date("2024-01-20"),
          notes: "Cliente fiel, sempre paga em dia",
          is_active: true,
        },
        {
          name: "Maria Santos",
          phone: "+258 82 987 6543",
          email: "maria@email.com",
          address: "Beira, Moçambique",
          credit_balance: 0.0,
          total_purchases: 890.0,
          last_purchase: new Date("2024-01-18"),
          notes: "Prefere pagamento à vista",
          is_active: true,
        },
        {
          name: "Carlos Mendes",
          phone: "+258 85 456 7890",
          email: "carlos@email.com",
          address: "Nampula, Moçambique",
          credit_balance: 75.5,
          total_purchases: 2100.0,
          last_purchase: new Date("2024-01-19"),
          notes: "Cliente com histórico de atraso",
          is_active: true,
        },
        {
          name: "Ana Costa",
          phone: "+258 86 321 9876",
          email: "ana@email.com",
          address: "Pemba, Moçambique",
          credit_balance: 0.0,
          total_purchases: 450.0,
          last_purchase: new Date("2024-01-15"),
          notes: "Nova cliente, pagamento pontual",
          is_active: true,
        },
      ]);

      console.log("✅ Clients created");
    }

    // Verificar se já existem usuários adicionais
    const existingUsers = await User.count();
    if (existingUsers > 3) {
      // Mais que os usuários essenciais
      console.log(`✅ Additional users already exist (${existingUsers} found)`);
    } else {
      // Criar usuários adicionais apenas se não existirem
      const additionalUsers = await User.bulkCreate([
        {
          name: "Pedro Vendedor",
          email: "pedro@lojinha.com",
          phone: "+258 87 654 3210",
          password: await bcrypt.hash("pedro123", 10),
          role: "seller",
          status: "active",
          is_active: true,
          permissions: ["view_products", "view_sales", "create_sales"],
        },
        {
          name: "Sofia Gerente",
          email: "sofia@lojinha.com",
          phone: "+258 88 111 2222",
          password: await bcrypt.hash("sofia123", 10),
          role: "manager",
          status: "active",
          is_active: true,
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
    }

    // Verificar se já existem vendas
    const existingSales = await Sale.count();
    if (existingSales > 0) {
      console.log(`✅ Sales already exist (${existingSales} found)`);
    } else {
      // Criar vendas apenas se não existirem
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
          ClientId: 1, // João Silva
          UserId: 1, // Admin
          is_active: true,
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
          ClientId: 2, // Maria Santos
          UserId: 2, // Gerente
          is_active: true,
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
          ClientId: 3, // Carlos Mendes
          UserId: 3, // Vendedor
          is_active: true,
        },
      ]);

      console.log("✅ Sales created");
    }

    // Verificar se já existem itens de venda
    const existingSaleItems = await SaleItem.count();
    if (existingSaleItems > 0) {
      console.log(`✅ Sale items already exist (${existingSaleItems} found)`);
    } else {
      // Criar itens das vendas apenas se não existirem
      await SaleItem.bulkCreate([
        {
          quantity: 2,
          unitPrice: 25.0,
          SaleId: 1, // Venda V001
          ProductId: 1, // Coca-Cola
        },
        {
          quantity: 3,
          unitPrice: 2.5,
          SaleId: 1, // Venda V001
          ProductId: 2, // Pão
        },
        {
          quantity: 1,
          unitPrice: 8.5,
          SaleId: 2, // Venda V002
          ProductId: 3, // Leite
        },
        {
          quantity: 1,
          unitPrice: 45.0,
          SaleId: 2, // Venda V002
          ProductId: 4, // Arroz
        },
        {
          quantity: 4,
          unitPrice: 25.0,
          SaleId: 3, // Venda V003
          ProductId: 1, // Coca-Cola
        },
        {
          quantity: 2,
          unitPrice: 2.5,
          SaleId: 3, // Venda V003
          ProductId: 2, // Pão
        },
      ]);

      console.log("✅ Sale items created");
    }

    console.log("🎉 Database seeding completed successfully!");
    console.log(`📊 Created:`);
    console.log(`   - 6 categories`);
    console.log(`   - 6 products`);
    console.log(`   - 4 clients`);
    console.log(`   - 2 additional users`);
    console.log(`   - 3 sales`);
    console.log(`   - 6 sale items`);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
};

module.exports = { seedDatabase };

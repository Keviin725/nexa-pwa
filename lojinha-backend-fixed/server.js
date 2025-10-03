/**
 * Servidor principal do NEXA Backend
 * Configuração e inicialização do servidor Express
 */

const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Importar configuração da base de dados
const sequelize = require("./config/database");

// Importar modelos
const { User } = require("./models/associations");

// Importar seed
const { seedDatabase } = require("./seed");

// Importar rotas
const routes = {
  auth: require("./routes/auth"),
  products: require("./routes/products"),
  clients: require("./routes/clients"),
  sales: require("./routes/sales"),
  creditPayments: require("./routes/creditPayments"),
  users: require("./routes/users"),
  systemConfig: require("./routes/systemConfig"),
  reports: require("./routes/reports"),
  dashboard: require("./routes/dashboard"),
  categories: require("./routes/categories"),
  subscription: require("./routes/subscription"),
};

/**
 * Configuração do servidor Express
 */
const app = express();

// Middleware global
app.use(cors());
app.use(express.json());

/**
 * Inicialização do servidor
 */
async function initializeServer() {
  try {
    // Sincronizar base de dados
    await sequelize.sync();
    console.log("✅ Database synced successfully!");

    // Criar utilizadores essenciais
    await createEssentialUsers();

    // Executar seed se necessário
    await seedIfNeeded();

    // Configurar rotas
    setupRoutes();

    // Iniciar servidor
    startServer();
  } catch (error) {
    console.error("❌ Error initializing server:", error);
    process.exit(1);
  }
}

/**
 * Cria utilizadores essenciais se não existirem
 */
async function createEssentialUsers() {
  const bcrypt = require("bcryptjs");
  const userCount = await User.count();

  if (userCount === 0) {
    console.log("👥 Creating essential users...");

    const essentialUsers = [
      {
        name: "Administrador",
        email: "admin@lojinha.com",
        phone: "(11) 99999-9999",
        role: "admin",
        status: "active",
        password: await bcrypt.hash("admin123", 10),
      },
      {
        name: "Gerente Principal",
        email: "gerente@lojinha.com",
        phone: "(11) 88888-8888",
        role: "manager",
        status: "active",
        password: await bcrypt.hash("gerente123", 10),
      },
      {
        name: "Vendedor 1",
        email: "vendedor1@lojinha.com",
        phone: "(11) 77777-7777",
        role: "seller",
        status: "active",
        password: await bcrypt.hash("vendedor123", 10),
      },
    ];

    await User.bulkCreate(essentialUsers);
    console.log("✅ Essential users created!");
  } else {
    console.log(`✅ Database ready (${userCount} users)`);
  }
}

/**
 * Executa seed se a base de dados estiver vazia
 */
async function seedIfNeeded() {
  const { Product } = require("./models/associations");
  const productCount = await Product.count();

  if (productCount === 0) {
    console.log("🌱 Database empty, running seeder...");
    await seedDatabase();
    console.log("✅ Seeder executed successfully!");
  } else {
    console.log(`✅ Database has data (${productCount} products found)`);
  }
}

/**
 * Configura as rotas da API
 */
function setupRoutes() {
  app.use("/auth", routes.auth);
  app.use("/products", routes.products);
  app.use("/clients", routes.clients);
  app.use("/sales", routes.sales);
  app.use("/credit-payments", routes.creditPayments);
  app.use("/users", routes.users);
  app.use("/system-config", routes.systemConfig);
  app.use("/reports", routes.reports);
  app.use("/dashboard", routes.dashboard);
  app.use("/categories", routes.categories);
  app.use("/subscription", routes.subscription);
}

/**
 * Inicia o servidor
 */
function startServer() {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port: ${PORT}`);
  });
}

// Inicializar servidor
initializeServer();

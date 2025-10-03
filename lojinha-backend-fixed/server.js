/**
 * Servidor principal do NEXA Backend
 * Configuração e inicialização do servidor Express
 */

const express = require("express");
require("dotenv").config();

// Importar middlewares de segurança
const {
  cors,
  helmet,
  securityHeaders,
  sanitizeInput,
  logSecurityEvents,
  securityErrorHandler,
  generalRateLimit,
  authRateLimit,
  apiRateLimit,
} = require("./middleware/security");

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

// ===========================================
// MIDDLEWARES DE SEGURANÇA (ORDEM IMPORTANTE!)
// ===========================================

// 1. Helmet - Headers de segurança
app.use(helmet);

// 2. CORS - Controle de origem
app.use(cors);

// 3. Rate Limiting - Proteção contra spam
app.use(generalRateLimit);

// 4. Security Headers - Headers adicionais
app.use(securityHeaders);

// 5. Logging - Monitoramento de segurança
app.use(logSecurityEvents);

// 6. Input Sanitization - Limpeza de dados
app.use(sanitizeInput);

// 7. Body Parser - Parse JSON
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

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
 * Configura as rotas da API com proteções específicas
 */
function setupRoutes() {
  // Rotas de autenticação com rate limiting específico
  app.use("/auth", authRateLimit, routes.auth);

  // Rotas da API com rate limiting geral
  app.use("/products", apiRateLimit, routes.products);
  app.use("/clients", apiRateLimit, routes.clients);
  app.use("/sales", apiRateLimit, routes.sales);
  app.use("/credit-payments", apiRateLimit, routes.creditPayments);
  app.use("/users", apiRateLimit, routes.users);
  app.use("/system-config", apiRateLimit, routes.systemConfig);
  app.use("/reports", apiRateLimit, routes.reports);
  app.use("/dashboard", apiRateLimit, routes.dashboard);
  app.use("/categories", apiRateLimit, routes.categories);
  app.use("/subscription", apiRateLimit, routes.subscription);
}

/**
 * Inicia o servidor
 */
function startServer() {
  const PORT = process.env.PORT || 3000;

  // Middleware de tratamento de erros de segurança (DEVE SER O ÚLTIMO!)
  app.use(securityErrorHandler);

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port: ${PORT}`);
    console.log(`🔒 Security middleware enabled`);
    console.log(`🛡️ Rate limiting active`);
    console.log(`🌐 CORS configured`);
  });
}

// Inicializar servidor
initializeServer();

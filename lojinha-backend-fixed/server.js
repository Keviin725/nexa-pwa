const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Importar rotas
const authRoutes = require("./routes/auth");
const productsRoutes = require("./routes/products");
const clientsRoutes = require("./routes/clients");
const salesRoutes = require("./routes/sales");
const creditPaymentsRoutes = require("./routes/creditPayments");
const usersRoutes = require("./routes/users");
const systemConfigRoutes = require("./routes/systemConfig");
const reportsRoutes = require("./routes/reports");

// Importar modelos
const sequelize = require("./config/database");
const {
  Product,
  Client,
  Sale,
  SaleItem,
  CreditPayment,
  User,
  SystemConfig,
} = require("./models/associations");

const app = express();
app.use(cors());
app.use(express.json());

// Sincronizar banco de dados antes de iniciar o servidor
sequelize
  .sync()
  .then(async () => {
    console.log("✅ Database synced successfully!");

    // Criar usuários essenciais se não existirem
    const bcrypt = require("bcryptjs");
    const userCount = await User.count();

    if (userCount === 0) {
      console.log("👥 Creating essential users...");
      await User.bulkCreate([
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
      ]);
      console.log("✅ Essential users created!");
    } else {
      console.log(`✅ Database ready (${userCount} users)`);
    }

    // Registrar rotas após sincronização
    app.use("/auth", authRoutes);
    app.use("/products", productsRoutes);
    app.use("/clients", clientsRoutes);
    app.use("/sales", salesRoutes);
    app.use("/credit-payments", creditPaymentsRoutes);
    app.use("/users", usersRoutes);
    app.use("/system-config", systemConfigRoutes);
    app.use("/reports", reportsRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error syncing database:", err);
  });

const { seedDatabase } = require("./seed");
const { Product } = require("./models/associations");

async function startWithSeed() {
  try {
    console.log("🚀 Iniciando servidor com seeder...");

    // Verificar se há produtos no banco
    const productCount = await Product.count();
    console.log(`📊 Produtos no banco: ${productCount}`);

    if (productCount === 0) {
      console.log("🌱 Banco vazio, executando seeder...");
      await seedDatabase();
      console.log("✅ Seeder executado com sucesso!");
    } else {
      console.log("✅ Banco já tem dados, pulando seeder");
    }

    // Iniciar o servidor
    console.log("🚀 Iniciando servidor...");
    require("./server.js");
  } catch (error) {
    console.error("❌ Erro:", error.message);
    console.error("Stack trace:", error.stack);
    process.exit(1);
  }
}

startWithSeed();

const { seedDatabase } = require("./seed");

async function runSeed() {
  try {
    console.log("🚀 Iniciando o seeder...");
    await seedDatabase();
    console.log("✅ Seeder executado com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao executar seeder:", error.message);
    console.error("Stack trace:", error.stack);
    process.exit(1);
  }
}

runSeed();

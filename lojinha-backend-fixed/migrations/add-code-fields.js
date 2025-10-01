const sequelize = require("../config/database");

async function addCodeFields() {
  try {
    console.log("🔄 Adicionando campos de código aos modelos...");

    // Verificar se as colunas já existem
    const tables = ["users", "clients", "credit_payments"];

    for (const table of tables) {
      try {
        // Tentar adicionar coluna sem UNIQUE primeiro
        await sequelize.query(`
          ALTER TABLE ${table} ADD COLUMN code VARCHAR(255);
        `);
        console.log(`✅ Campo 'code' adicionado à tabela '${table}'`);

        // Depois criar índice único
        await sequelize.query(`
          CREATE UNIQUE INDEX idx_${table}_code ON ${table}(code);
        `);
        console.log(`✅ Índice único criado para '${table}.code'`);
      } catch (error) {
        if (
          error.message.includes("duplicate column name") ||
          error.message.includes("column already exists")
        ) {
          console.log(`ℹ️  Campo 'code' já existe na tabela '${table}'`);
        } else if (error.message.includes("index already exists")) {
          console.log(`ℹ️  Índice único já existe para '${table}.code'`);
        } else {
          console.log(
            `⚠️  Erro ao processar tabela '${table}':`,
            error.message
          );
        }
      }
    }

    console.log("🎉 Migração concluída com sucesso!");
  } catch (error) {
    console.error("❌ Erro na migração:", error.message);
    throw error;
  }
}

// Executar migração se chamado diretamente
if (require.main === module) {
  addCodeFields()
    .then(() => {
      console.log("✅ Migração finalizada");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Erro na migração:", error);
      process.exit(1);
    });
}

module.exports = addCodeFields;

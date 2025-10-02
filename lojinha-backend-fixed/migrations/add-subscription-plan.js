const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Verificar se a coluna já existe
      const tableDescription = await queryInterface.describeTable("Users");

      if (!tableDescription.subscription_plan) {
        await queryInterface.addColumn("Users", "subscription_plan", {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "teste",
          validate: {
            isIn: [["teste", "starter", "pro", "enterprise"]],
          },
        });

        console.log("✅ Coluna subscription_plan adicionada à tabela Users");
      } else {
        console.log("⚠️ Coluna subscription_plan já existe na tabela Users");
      }
    } catch (error) {
      console.error("❌ Erro ao adicionar coluna subscription_plan:", error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn("Users", "subscription_plan");
      console.log("✅ Coluna subscription_plan removida da tabela Users");
    } catch (error) {
      console.error("❌ Erro ao remover coluna subscription_plan:", error);
      throw error;
    }
  },
};

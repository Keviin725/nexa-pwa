const axios = require("axios");

async function testDashboard() {
  try {
    console.log("🔍 Testando endpoint /dashboard...");

    const response = await axios.get("http://localhost:3000/dashboard");

    console.log("✅ Status:", response.status);
    console.log("📊 Dados recebidos:", JSON.stringify(response.data, null, 2));

    // Verificar se totalRevenue existe
    if (response.data.totalRevenue !== undefined) {
      console.log("💰 Total Revenue encontrado:", response.data.totalRevenue);
    } else {
      console.log("❌ Total Revenue NÃO encontrado");
    }
  } catch (error) {
    console.error("❌ Erro ao testar endpoint:", error.message);
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    }
  }
}

testDashboard();

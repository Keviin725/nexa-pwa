const { Op } = require("sequelize");

/**
 * Gerador de códigos únicos para o sistema
 * Padrões implementados:
 * - PROD: Produtos (PROD-YYYY-XXXXXX)
 * - VEND: Vendas (VEND-YYYY-XXXXXX)
 * - CLIE: Clientes (CLIE-YYYY-XXXXXX)
 * - USER: Usuários (USER-YYYY-XXXXXX)
 * - PAYM: Pagamentos (PAYM-YYYY-XXXXXX)
 */

class CodeGenerator {
  constructor() {
    this.prefixes = {
      PRODUCT: "PROD",
      SALE: "VEND",
      CLIENT: "CLIE",
      USER: "USER",
      PAYMENT: "PAYM",
      CATEGORY: "CATE",
      SUPPLIER: "SUPP",
    };
  }

  /**
   * Gera um código único baseado no tipo e ano
   * @param {string} type - Tipo do código (PRODUCT, SALE, CLIENT, etc.)
   * @param {string} model - Modelo Sequelize para verificar unicidade
   * @param {string} field - Campo do modelo onde o código é armazenado
   * @returns {Promise<string>} Código único gerado
   */
  async generateCode(type, model, field = "code") {
    const prefix = this.prefixes[type.toUpperCase()];
    if (!prefix) {
      throw new Error(`Tipo de código inválido: ${type}`);
    }

    const year = new Date().getFullYear();
    const baseCode = `${prefix}-${year}`;

    try {
      // Buscar o último código do tipo e ano
      const lastRecord = await model.findOne({
        where: {
          [field]: {
            [Op.like]: `${baseCode}-%`,
          },
        },
        order: [[field, "DESC"]],
        attributes: [field],
      });

      let sequence = 1;
      if (lastRecord && lastRecord[field]) {
        // Extrair o número sequencial do último código
        const lastSequence = parseInt(lastRecord[field].split("-").pop());
        sequence = lastSequence + 1;
      }

      // Gerar código com padding de 6 dígitos
      const code = `${baseCode}-${sequence.toString().padStart(6, "0")}`;

      // Verificar se o código já existe (dupla verificação)
      const exists = await model.findOne({
        where: { [field]: code },
      });

      if (exists) {
        // Se existe, tentar novamente com próximo número
        return await this.generateCode(type, model, field);
      }

      return code;
    } catch (error) {
      console.error(`Erro ao gerar código ${type}:`, error);
      throw error;
    }
  }

  /**
   * Gera código para produto
   * @param {Object} Product - Modelo Product
   * @returns {Promise<string>} Código do produto
   */
  async generateProductCode(Product) {
    return await this.generateCode("PRODUCT", Product, "code");
  }

  /**
   * Gera código para venda
   * @param {Object} Sale - Modelo Sale
   * @returns {Promise<string>} Código da venda
   */
  async generateSaleCode(Sale) {
    return await this.generateCode("SALE", Sale, "saleNumber");
  }

  /**
   * Gera código para cliente
   * @param {Object} Client - Modelo Client
   * @returns {Promise<string>} Código do cliente
   */
  async generateClientCode(Client) {
    return await this.generateCode("CLIENT", Client, "code");
  }

  /**
   * Gera código para usuário
   * @param {Object} User - Modelo User
   * @returns {Promise<string>} Código do usuário
   */
  async generateUserCode(User) {
    return await this.generateCode("USER", User, "code");
  }

  /**
   * Gera código para pagamento
   * @param {Object} CreditPayment - Modelo CreditPayment
   * @returns {Promise<string>} Código do pagamento
   */
  async generatePaymentCode(CreditPayment) {
    return await this.generateCode("PAYMENT", CreditPayment, "code");
  }

  /**
   * Gera código para categoria
   * @param {Object} Category - Modelo Category
   * @returns {Promise<string>} Código da categoria
   */
  async generateCategoryCode(Category) {
    return await this.generateCode("CATEGORY", Category, "code");
  }

  /**
   * Valida se um código segue o padrão correto
   * @param {string} code - Código a ser validado
   * @param {string} type - Tipo esperado do código
   * @returns {boolean} True se válido
   */
  validateCode(code, type) {
    const prefix = this.prefixes[type.toUpperCase()];
    if (!prefix) return false;

    const pattern = new RegExp(`^${prefix}-\\d{4}-\\d{6}$`);
    return pattern.test(code);
  }

  /**
   * Extrai informações do código
   * @param {string} code - Código a ser analisado
   * @returns {Object} Informações extraídas
   */
  parseCode(code) {
    const parts = code.split("-");
    if (parts.length !== 3) {
      return null;
    }

    return {
      prefix: parts[0],
      year: parseInt(parts[1]),
      sequence: parseInt(parts[2]),
      type: this.getTypeByPrefix(parts[0]),
    };
  }

  /**
   * Obtém o tipo baseado no prefixo
   * @param {string} prefix - Prefixo do código
   * @returns {string} Tipo do código
   */
  getTypeByPrefix(prefix) {
    for (const [type, typePrefix] of Object.entries(this.prefixes)) {
      if (typePrefix === prefix) {
        return type;
      }
    }
    return "UNKNOWN";
  }

  /**
   * Gera código com timestamp para casos especiais
   * @param {string} type - Tipo do código
   * @returns {string} Código com timestamp
   */
  generateTimestampCode(type) {
    const prefix = this.prefixes[type.toUpperCase()];
    const timestamp = Date.now();
    return `${prefix}-${timestamp}`;
  }
}

// Instância singleton
const codeGenerator = new CodeGenerator();

module.exports = codeGenerator;

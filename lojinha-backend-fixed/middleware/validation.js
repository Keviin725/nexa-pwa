/**
 * Middleware de Validação - Lojinha PWA
 * Validação de entrada para todos os endpoints
 */

const { body, param, query, validationResult } = require("express-validator");

/**
 * Middleware para verificar resultados da validação
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: "Dados inválidos",
      details: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
        value: err.value,
      })),
    });
  }
  next();
};

/**
 * Validações para Autenticação
 */
const authValidation = {
  login: [
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Email deve ser válido"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Senha deve ter pelo menos 6 caracteres"),
    handleValidationErrors,
  ],

  register: [
    body("name")
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage("Nome deve ter entre 2 e 100 caracteres"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Email deve ser válido"),
    body("phone")
      .optional()
      .isMobilePhone("pt-BR")
      .withMessage("Telefone deve ser válido"),
    body("password")
      .isLength({ min: 8 })
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
      )
      .withMessage(
        "Senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula, número e símbolo"
      ),
    body("role")
      .isIn(["admin", "manager", "seller"])
      .withMessage("Role deve ser admin, manager ou seller"),
    handleValidationErrors,
  ],

  changePassword: [
    body("currentPassword").notEmpty().withMessage("Senha atual é obrigatória"),
    body("newPassword")
      .isLength({ min: 8 })
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
      )
      .withMessage(
        "Nova senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula, número e símbolo"
      ),
    handleValidationErrors,
  ],
};

/**
 * Validações para Produtos
 */
const productValidation = {
  create: [
    body("name")
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage("Nome deve ter entre 2 e 100 caracteres"),
    body("description")
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage("Descrição deve ter no máximo 500 caracteres"),
    body("price")
      .isFloat({ min: 0 })
      .withMessage("Preço deve ser um número positivo"),
    body("stock")
      .isInt({ min: 0 })
      .withMessage("Estoque deve ser um número inteiro não negativo"),
    body("categoryId")
      .isInt({ min: 1 })
      .withMessage("ID da categoria deve ser válido"),
    handleValidationErrors,
  ],

  update: [
    param("id")
      .isInt({ min: 1 })
      .withMessage("ID deve ser um número inteiro positivo"),
    body("name")
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage("Nome deve ter entre 2 e 100 caracteres"),
    body("price")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Preço deve ser um número positivo"),
    body("stock")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Estoque deve ser um número inteiro não negativo"),
    handleValidationErrors,
  ],

  getById: [
    param("id")
      .isInt({ min: 1 })
      .withMessage("ID deve ser um número inteiro positivo"),
    handleValidationErrors,
  ],
};

/**
 * Validações para Clientes
 */
const clientValidation = {
  create: [
    body("name")
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage("Nome deve ter entre 2 e 100 caracteres"),
    body("email")
      .optional()
      .isEmail()
      .normalizeEmail()
      .withMessage("Email deve ser válido"),
    body("phone")
      .optional()
      .isMobilePhone("pt-BR")
      .withMessage("Telefone deve ser válido"),
    body("address")
      .optional()
      .trim()
      .isLength({ max: 200 })
      .withMessage("Endereço deve ter no máximo 200 caracteres"),
    handleValidationErrors,
  ],

  update: [
    param("id")
      .isInt({ min: 1 })
      .withMessage("ID deve ser um número inteiro positivo"),
    body("name")
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage("Nome deve ter entre 2 e 100 caracteres"),
    body("email")
      .optional()
      .isEmail()
      .normalizeEmail()
      .withMessage("Email deve ser válido"),
    handleValidationErrors,
  ],
};

/**
 * Validações para Vendas
 */
const saleValidation = {
  create: [
    body("clientId")
      .isInt({ min: 1 })
      .withMessage("ID do cliente deve ser válido"),
    body("items")
      .isArray({ min: 1 })
      .withMessage("Venda deve ter pelo menos um item"),
    body("items.*.productId")
      .isInt({ min: 1 })
      .withMessage("ID do produto deve ser válido"),
    body("items.*.quantity")
      .isInt({ min: 1 })
      .withMessage("Quantidade deve ser um número inteiro positivo"),
    body("items.*.price")
      .isFloat({ min: 0 })
      .withMessage("Preço deve ser um número positivo"),
    body("paymentMethod")
      .isIn(["cash", "credit", "debit", "pix"])
      .withMessage("Método de pagamento deve ser cash, credit, debit ou pix"),
    body("totalAmount")
      .isFloat({ min: 0 })
      .withMessage("Valor total deve ser um número positivo"),
    handleValidationErrors,
  ],
};

/**
 * Validações para Usuários
 */
const userValidation = {
  create: [
    body("name")
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage("Nome deve ter entre 2 e 100 caracteres"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Email deve ser válido"),
    body("phone")
      .optional()
      .isMobilePhone("pt-BR")
      .withMessage("Telefone deve ser válido"),
    body("role")
      .isIn(["admin", "manager", "seller"])
      .withMessage("Role deve ser admin, manager ou seller"),
    body("password")
      .isLength({ min: 8 })
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
      )
      .withMessage(
        "Senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula, número e símbolo"
      ),
    handleValidationErrors,
  ],

  update: [
    param("id")
      .isInt({ min: 1 })
      .withMessage("ID deve ser um número inteiro positivo"),
    body("name")
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage("Nome deve ter entre 2 e 100 caracteres"),
    body("email")
      .optional()
      .isEmail()
      .normalizeEmail()
      .withMessage("Email deve ser válido"),
    body("role")
      .optional()
      .isIn(["admin", "manager", "seller"])
      .withMessage("Role deve ser admin, manager ou seller"),
    handleValidationErrors,
  ],
};

/**
 * Validações para Relatórios
 */
const reportValidation = {
  getSales: [
    query("startDate")
      .optional()
      .isISO8601()
      .withMessage("Data inicial deve ser válida (YYYY-MM-DD)"),
    query("endDate")
      .optional()
      .isISO8601()
      .withMessage("Data final deve ser válida (YYYY-MM-DD)"),
    query("period")
      .optional()
      .isIn(["day", "week", "month", "year"])
      .withMessage("Período deve ser day, week, month ou year"),
    handleValidationErrors,
  ],
};

/**
 * Validações para Categorias
 */
const categoryValidation = {
  create: [
    body("name")
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage("Nome deve ter entre 2 e 50 caracteres"),
    body("description")
      .optional()
      .trim()
      .isLength({ max: 200 })
      .withMessage("Descrição deve ter no máximo 200 caracteres"),
    handleValidationErrors,
  ],

  update: [
    param("id")
      .isInt({ min: 1 })
      .withMessage("ID deve ser um número inteiro positivo"),
    body("name")
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage("Nome deve ter entre 2 e 50 caracteres"),
    handleValidationErrors,
  ],
};

module.exports = {
  authValidation,
  productValidation,
  clientValidation,
  saleValidation,
  userValidation,
  reportValidation,
  categoryValidation,
  handleValidationErrors,
};

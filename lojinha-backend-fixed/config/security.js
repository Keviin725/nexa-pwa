/**
 * Configurações de Segurança - Lojinha PWA
 * Centraliza todas as configurações de segurança do sistema
 */

require("dotenv").config();

const securityConfig = {
  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || "24h",
    algorithm: "HS256",
  },

  // CORS Configuration
  cors: {
    origin: process.env.CORS_ORIGINS?.split(",") || ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  },

  // Rate Limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) || 60000, // 1 minuto
    max: parseInt(process.env.RATE_LIMIT_MAX) || 100, // 100 requests por minuto
    message: {
      error: "Muitas requisições. Tente novamente em alguns minutos.",
      retryAfter: 60,
    },
  },

  // Password Requirements
  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
  },

  // Session Security
  session: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 24 horas
  },

  // Input Validation
  validation: {
    maxStringLength: 255,
    maxTextLength: 1000,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedImageTypes: ["image/jpeg", "image/png", "image/webp"],
    allowedFileTypes: ["application/pdf", "text/plain"],
  },

  // Security Headers
  headers: {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Strict-Transport-Security":
      process.env.NODE_ENV === "production"
        ? "max-age=31536000; includeSubDomains"
        : undefined,
    "Content-Security-Policy":
      "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'",
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || "info",
    logDir: process.env.LOG_DIR || "./logs",
    logSecurityEvents: true,
    logFailedAttempts: true,
  },

  // Environment
  environment: {
    isProduction: process.env.NODE_ENV === "production",
    isDevelopment: process.env.NODE_ENV === "development",
    isTest: process.env.NODE_ENV === "test",
  },
};

// Validação de configurações críticas
function validateSecurityConfig() {
  const errors = [];

  if (!securityConfig.jwt.secret) {
    errors.push("JWT_SECRET é obrigatório");
  }

  if (securityConfig.jwt.secret && securityConfig.jwt.secret.length < 32) {
    errors.push("JWT_SECRET deve ter pelo menos 32 caracteres");
  }

  if (
    securityConfig.environment.isProduction &&
    !securityConfig.session.secure
  ) {
    errors.push("Session deve ser secure em produção");
  }

  if (errors.length > 0) {
    console.error("❌ Erros de configuração de segurança:");
    errors.forEach((error) => console.error(`  - ${error}`));
    process.exit(1);
  }
}

// Executar validação
validateSecurityConfig();

module.exports = securityConfig;

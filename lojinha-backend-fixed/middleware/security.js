/**
 * Middleware de Segurança - Lojinha PWA
 * Implementa várias camadas de proteção
 */

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const securityConfig = require("../config/security");

/**
 * Rate Limiting Middleware
 */
const createRateLimit = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    message: { error: message },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      console.warn(`🚨 Rate limit exceeded for IP: ${req.ip}`);
      res.status(429).json({
        error: message,
        retryAfter: Math.ceil(windowMs / 1000),
      });
    },
  });
};

// Rate limiters específicos
const generalRateLimit = createRateLimit(
  securityConfig.rateLimit.windowMs,
  securityConfig.rateLimit.max,
  securityConfig.rateLimit.message.error
);

const authRateLimit = createRateLimit(
  15 * 60 * 1000, // 15 minutos
  5, // 5 tentativas de login
  "Muitas tentativas de login. Tente novamente em 15 minutos."
);

const apiRateLimit = createRateLimit(
  60 * 1000, // 1 minuto
  50, // 50 requests por minuto
  "Muitas requisições à API. Tente novamente em alguns minutos."
);

/**
 * CORS Middleware
 */
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = securityConfig.cors.origin;

    // Permitir requisições sem origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`🚨 CORS blocked origin: ${origin}`);
      callback(new Error("Não permitido pelo CORS"));
    }
  },
  credentials: securityConfig.cors.credentials,
  methods: securityConfig.cors.methods,
  allowedHeaders: securityConfig.cors.allowedHeaders,
};

/**
 * Security Headers Middleware
 */
const securityHeaders = (req, res, next) => {
  // Aplicar headers de segurança
  Object.entries(securityConfig.headers).forEach(([key, value]) => {
    if (value !== undefined) {
      res.setHeader(key, value);
    }
  });

  next();
};

/**
 * Input Sanitization Middleware
 */
const sanitizeInput = (req, res, next) => {
  const sanitize = (obj) => {
    if (typeof obj !== "object" || obj === null) return obj;

    for (const key in obj) {
      if (typeof obj[key] === "string") {
        // Remover caracteres perigosos
        obj[key] = obj[key]
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
          .replace(/javascript:/gi, "")
          .replace(/on\w+\s*=/gi, "")
          .trim();
      } else if (typeof obj[key] === "object") {
        sanitize(obj[key]);
      }
    }
  };

  if (req.body) sanitize(req.body);
  if (req.query) sanitize(req.query);
  if (req.params) sanitize(req.params);

  next();
};

/**
 * Request Logging Middleware
 */
const logSecurityEvents = (req, res, next) => {
  const startTime = Date.now();

  // Log da requisição
  console.log(
    `📥 ${req.method} ${req.path} - IP: ${req.ip} - User-Agent: ${req.get(
      "User-Agent"
    )}`
  );

  // Log de resposta
  res.on("finish", () => {
    const duration = Date.now() - startTime;
    const status = res.statusCode;

    if (status >= 400) {
      console.warn(
        `⚠️ ${req.method} ${req.path} - Status: ${status} - Duration: ${duration}ms - IP: ${req.ip}`
      );
    } else {
      console.log(
        `✅ ${req.method} ${req.path} - Status: ${status} - Duration: ${duration}ms`
      );
    }
  });

  next();
};

/**
 * Error Handling Middleware
 */
const securityErrorHandler = (err, req, res, next) => {
  console.error("🚨 Security Error:", err.message);

  // Não expor detalhes do erro em produção
  if (securityConfig.environment.isProduction) {
    res.status(500).json({
      error: "Erro interno do servidor",
      timestamp: new Date().toISOString(),
    });
  } else {
    res.status(500).json({
      error: err.message,
      stack: err.stack,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Helmet Configuration
 */
const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false,
});

module.exports = {
  // Rate Limiters
  generalRateLimit,
  authRateLimit,
  apiRateLimit,

  // Middlewares
  cors: cors(corsOptions),
  securityHeaders,
  sanitizeInput,
  logSecurityEvents,
  securityErrorHandler,
  helmet: helmetConfig,

  // Configurações
  securityConfig,
};

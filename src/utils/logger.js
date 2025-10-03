/**
 * Sistema de Logging Seguro - Lojinha PWA
 * Centraliza todos os logs com níveis apropriados
 */

// Níveis de log
const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
};

// Configuração baseada no ambiente
const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;
const logLevel = isDevelopment ? LOG_LEVELS.DEBUG : LOG_LEVELS.ERROR;

/**
 * Logger principal
 */
class Logger {
  constructor() {
    this.isDevelopment = isDevelopment;
    this.isProduction = isProduction;
  }

  /**
   * Log de erro (sempre visível)
   */
  error(message, error = null, context = {}) {
    if (logLevel >= LOG_LEVELS.ERROR) {
      console.error(`🚨 [ERROR] ${message}`, error, context);

      // Em produção, enviar para serviço de monitoramento
      if (this.isProduction) {
        this.sendToMonitoring("error", message, error, context);
      }
    }
  }

  /**
   * Log de aviso
   */
  warn(message, context = {}) {
    if (logLevel >= LOG_LEVELS.WARN) {
      console.warn(`⚠️ [WARN] ${message}`, context);
    }
  }

  /**
   * Log de informação
   */
  info(message, context = {}) {
    if (logLevel >= LOG_LEVELS.INFO) {
      console.info(`ℹ️ [INFO] ${message}`, context);
    }
  }

  /**
   * Log de debug (apenas desenvolvimento)
   */
  debug(message, context = {}) {
    if (this.isDevelopment && logLevel >= LOG_LEVELS.DEBUG) {
      console.log(`🐛 [DEBUG] ${message}`, context);
    }
  }

  /**
   * Log de API (chamadas HTTP)
   */
  api(method, url, status, duration, context = {}) {
    const level = status >= 400 ? "error" : "info";
    const message = `${method} ${url} - ${status} (${duration}ms)`;

    if (level === "error") {
      this.error(`API Error: ${message}`, null, context);
    } else {
      this.info(`API Call: ${message}`, context);
    }
  }

  /**
   * Log de performance
   */
  performance(operation, duration, context = {}) {
    if (duration > 1000) {
      // Log apenas operações lentas
      this.warn(`Slow operation: ${operation} took ${duration}ms`, context);
    } else {
      this.debug(`Performance: ${operation} took ${duration}ms`, context);
    }
  }

  /**
   * Log de segurança
   */
  security(event, details = {}) {
    this.warn(`Security Event: ${event}`, details);

    // Em produção, sempre reportar eventos de segurança
    if (this.isProduction) {
      this.sendToMonitoring("security", event, null, details);
    }
  }

  /**
   * Enviar para serviço de monitoramento (Sentry, etc.)
   */
  sendToMonitoring(level, message, error, context) {
    // Implementar integração com Sentry ou outro serviço
    // Por enquanto, apenas log estruturado
    const logData = {
      timestamp: new Date().toISOString(),
      level,
      message,
      error: error
        ? {
            message: error.message,
            stack: error.stack,
            name: error.name,
          }
        : null,
      context,
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    // Em produção, enviar para endpoint de monitoramento
    if (this.isProduction) {
      // fetch('/api/logs', { method: 'POST', body: JSON.stringify(logData) })
    }
  }
}

// Instância global do logger
export const logger = new Logger();

// Funções de conveniência
export const logError = (message, error, context) =>
  logger.error(message, error, context);
export const logWarn = (message, context) => logger.warn(message, context);
export const logInfo = (message, context) => logger.info(message, context);
export const logDebug = (message, context) => logger.debug(message, context);
export const logApi = (method, url, status, duration, context) =>
  logger.api(method, url, status, duration, context);
export const logPerformance = (operation, duration, context) =>
  logger.performance(operation, duration, context);
export const logSecurity = (event, details) => logger.security(event, details);

export default logger;

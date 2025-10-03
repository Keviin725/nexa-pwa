/**
 * Sistema de Monitoramento de Performance - Lojinha PWA
 * Monitora e otimiza performance da aplicação
 */

import { logger } from "./logger";

/**
 * Monitor de Performance
 */
class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.observers = new Map();
    this.isEnabled = import.meta.env.DEV || import.meta.env.PROD;
  }

  /**
   * Iniciar medição de performance
   */
  start(operation) {
    if (!this.isEnabled) return null;

    const startTime = performance.now();
    const id = `${operation}_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    this.metrics.set(id, {
      operation,
      startTime,
      endTime: null,
      duration: null,
      context: {},
    });

    return id;
  }

  /**
   * Finalizar medição de performance
   */
  end(id, context = {}) {
    if (!this.isEnabled || !this.metrics.has(id)) return;

    const metric = this.metrics.get(id);
    const endTime = performance.now();
    const duration = endTime - metric.startTime;

    metric.endTime = endTime;
    metric.duration = duration;
    metric.context = { ...metric.context, ...context };

    // Log da performance
    logger.performance(metric.operation, duration, metric.context);

    // Verificar se é uma operação lenta
    if (duration > 1000) {
      logger.warn(`Slow operation detected: ${metric.operation}`, {
        duration,
        context: metric.context,
      });
    }

    // Limpar métrica após 5 minutos
    setTimeout(() => {
      this.metrics.delete(id);
    }, 5 * 60 * 1000);

    return metric;
  }

  /**
   * Medir operação assíncrona
   */
  async measureAsync(operation, fn, context = {}) {
    const id = this.start(operation);
    try {
      const result = await fn();
      this.end(id, { ...context, success: true });
      return result;
    } catch (error) {
      this.end(id, { ...context, success: false, error: error.message });
      throw error;
    }
  }

  /**
   * Medir operação síncrona
   */
  measureSync(operation, fn, context = {}) {
    const id = this.start(operation);
    try {
      const result = fn();
      this.end(id, { ...context, success: true });
      return result;
    } catch (error) {
      this.end(id, { ...context, success: false, error: error.message });
      throw error;
    }
  }

  /**
   * Monitorar uso de memória
   */
  monitorMemory() {
    if (!this.isEnabled || !performance.memory) return;

    const memory = performance.memory;
    const usage = {
      used: Math.round(memory.usedJSHeapSize / 1024 / 1024), // MB
      total: Math.round(memory.totalJSHeapSize / 1024 / 1024), // MB
      limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024), // MB
    };

    // Alertar se uso de memória for alto
    if (usage.used > usage.limit * 0.8) {
      logger.warn("High memory usage detected", usage);
    }

    return usage;
  }

  /**
   * Monitorar Core Web Vitals
   */
  monitorWebVitals() {
    if (!this.isEnabled) return;

    // Largest Contentful Paint (LCP)
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      logger.performance("LCP", lastEntry.startTime, {
        element: lastEntry.element?.tagName,
        url: lastEntry.url,
      });
    }).observe({ entryTypes: ["largest-contentful-paint"] });

    // First Input Delay (FID)
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        logger.performance("FID", entry.processingStart - entry.startTime, {
          eventType: entry.name,
          target: entry.target?.tagName,
        });
      });
    }).observe({ entryTypes: ["first-input"] });

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      logger.performance("CLS", clsValue);
    }).observe({ entryTypes: ["layout-shift"] });
  }

  /**
   * Monitorar requisições de rede
   */
  monitorNetwork() {
    if (!this.isEnabled) return;

    // Interceptar fetch
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const startTime = performance.now();
      const url = args[0];
      const method = args[1]?.method || "GET";

      try {
        const response = await originalFetch(...args);
        const duration = performance.now() - startTime;
        logger.api(method, url, response.status, duration);
        return response;
      } catch (error) {
        const duration = performance.now() - startTime;
        logger.api(method, url, 0, duration, { error: error.message });
        throw error;
      }
    };
  }

  /**
   * Inicializar monitoramento
   */
  init() {
    if (!this.isEnabled) return;

    // Monitorar memória a cada 30 segundos
    setInterval(() => {
      this.monitorMemory();
    }, 30000);

    // Monitorar Web Vitals
    this.monitorWebVitals();

    // Monitorar rede
    this.monitorNetwork();

    logger.info("Performance monitoring initialized");
  }

  /**
   * Obter métricas atuais
   */
  getMetrics() {
    return Array.from(this.metrics.values());
  }

  /**
   * Limpar métricas antigas
   */
  cleanup() {
    const now = Date.now();
    const fiveMinutesAgo = now - 5 * 60 * 1000;

    for (const [id, metric] of this.metrics.entries()) {
      if (metric.startTime < fiveMinutesAgo) {
        this.metrics.delete(id);
      }
    }
  }
}

// Instância global do monitor
export const performanceMonitor = new PerformanceMonitor();

// Funções de conveniência
export const measureAsync = (operation, fn, context) =>
  performanceMonitor.measureAsync(operation, fn, context);

export const measureSync = (operation, fn, context) =>
  performanceMonitor.measureSync(operation, fn, context);

export const startMeasurement = (operation) =>
  performanceMonitor.start(operation);

export const endMeasurement = (id, context) =>
  performanceMonitor.end(id, context);

export default performanceMonitor;

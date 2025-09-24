// Configurações de ambiente
export const config = {
  // API
  API_URL: import.meta.env.VITE_API_URL || "http://localhost:3000",

  // App
  APP_NAME: import.meta.env.VITE_APP_NAME || "NEXA",
  APP_VERSION: import.meta.env.VITE_APP_VERSION || "1.0.0",

  // Development
  DEBUG: import.meta.env.VITE_DEBUG === "true" || false,

  // Timeouts
  API_TIMEOUT: 10000,

  // Pagination
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
};

export default config;

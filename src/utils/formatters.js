/**
 * Formatters utilitários para o sistema NEXA
 * Centraliza todas as funções de formatação de dados
 */

// Constantes
const DEFAULT_LOCALE = "pt-PT";
const DEFAULT_CURRENCY = "MZN";
const DEFAULT_DECIMALS = 2;

/**
 * Formata um preço para exibição com moeda
 * @param {number|string} price - O preço a ser formatado
 * @returns {string} - Preço formatado com MZN
 */
export const formatPrice = (price) => {
  if (price === null || price === undefined || price === "") {
    return `${DEFAULT_CURRENCY} 0,00`;
  }

  const numericPrice = Number(price);
  if (Number.isNaN(numericPrice)) {
    return `${DEFAULT_CURRENCY} 0,00`;
  }

  return `${DEFAULT_CURRENCY} ${numericPrice
    .toFixed(DEFAULT_DECIMALS)
    .replace(".", ",")}`;
};

/**
 * Formata uma data para exibição
 * @param {string|Date} date - A data a ser formatada
 * @param {string} locale - Locale para formatação
 * @returns {string} - Data formatada
 */
export const formatDate = (date, locale = DEFAULT_LOCALE) => {
  if (!date) return "";

  const dateObj = new Date(date);
  if (Number.isNaN(dateObj.getTime())) return "";

  return dateObj.toLocaleDateString(locale);
};

/**
 * Formata uma data e hora para exibição
 * @param {string|Date} date - A data a ser formatada
 * @param {string} locale - Locale para formatação
 * @returns {string} - Data e hora formatadas
 */
export const formatDateTime = (date, locale = DEFAULT_LOCALE) => {
  if (!date) return "";

  const dateObj = new Date(date);
  if (Number.isNaN(dateObj.getTime())) return "";

  return dateObj.toLocaleString(locale);
};

/**
 * Formata um número para exibição com separadores
 * @param {number|string} number - O número a ser formatado
 * @param {number} decimals - Número de casas decimais
 * @returns {string} - Número formatado
 */
export const formatNumber = (number, decimals = 0) => {
  if (number === null || number === undefined || number === "") {
    return "0";
  }

  const numericNumber = Number(number);
  if (Number.isNaN(numericNumber)) {
    return "0";
  }

  return numericNumber.toLocaleString(DEFAULT_LOCALE, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

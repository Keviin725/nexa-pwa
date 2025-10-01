/**
 * Utilitários de formatação centralizados
 */

/**
 * Formata um preço para exibição
 * @param {number|string} price - O preço a ser formatado
 * @returns {string} - Preço formatado com MZN
 */
export const formatPrice = (price) => {
  if (!price && price !== 0) return "MZN 0,00";

  const numericPrice = parseFloat(price);
  if (isNaN(numericPrice)) return "MZN 0,00";

  return `MZN ${numericPrice.toFixed(2).replace(".", ",")}`;
};

/**
 * Formata uma data para exibição
 * @param {string|Date} date - A data a ser formatada
 * @param {string} locale - Locale para formatação (padrão: 'pt-PT')
 * @returns {string} - Data formatada
 */
export const formatDate = (date, locale = "pt-PT") => {
  if (!date) return "";

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return "";

  return dateObj.toLocaleDateString(locale);
};

/**
 * Formata uma data e hora para exibição
 * @param {string|Date} date - A data a ser formatada
 * @param {string} locale - Locale para formatação (padrão: 'pt-PT')
 * @returns {string} - Data e hora formatadas
 */
export const formatDateTime = (date, locale = "pt-PT") => {
  if (!date) return "";

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return "";

  return dateObj.toLocaleString(locale);
};

/**
 * Formata um número para exibição com separadores
 * @param {number|string} number - O número a ser formatado
 * @param {number} decimals - Número de casas decimais (padrão: 0)
 * @returns {string} - Número formatado
 */
export const formatNumber = (number, decimals = 0) => {
  if (!number && number !== 0) return "0";

  const numericNumber = parseFloat(number);
  if (isNaN(numericNumber)) return "0";

  return numericNumber.toLocaleString("pt-PT", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

/**
 * Formata um percentual para exibição
 * @param {number|string} value - O valor a ser formatado
 * @param {number} decimals - Número de casas decimais (padrão: 1)
 * @returns {string} - Percentual formatado
 */
export const formatPercentage = (value, decimals = 1) => {
  if (!value && value !== 0) return "0%";

  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) return "0%";

  return `${numericValue.toFixed(decimals)}%`;
};

/**
 * Formata um telefone para exibição
 * @param {string} phone - O telefone a ser formatado
 * @returns {string} - Telefone formatado
 */
export const formatPhone = (phone) => {
  if (!phone) return "";

  // Remove todos os caracteres não numéricos
  const cleaned = phone.replace(/\D/g, "");

  // Formata baseado no tamanho
  if (cleaned.length === 9) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
  } else if (cleaned.length === 12) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, "+$1 $2 $3 $4");
  }

  return phone;
};

/**
 * Formata um texto para capitalização
 * @param {string} text - O texto a ser formatado
 * @returns {string} - Texto capitalizado
 */
export const formatCapitalize = (text) => {
  if (!text) return "";

  return text.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
};

/**
 * Formata um texto para truncar
 * @param {string} text - O texto a ser truncado
 * @param {number} maxLength - Tamanho máximo (padrão: 50)
 * @returns {string} - Texto truncado
 */
export const formatTruncate = (text, maxLength = 50) => {
  if (!text) return "";

  if (text.length <= maxLength) return text;

  return text.substring(0, maxLength) + "...";
};

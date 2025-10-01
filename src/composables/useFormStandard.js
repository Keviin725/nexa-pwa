import { reactive, computed } from "vue";

export function useFormStandard() {
  // Estados padrão
  const state = reactive({
    loading: false,
    errors: {},
    touched: {},
    isValid: true,
  });

  // Regras de validação padrão
  const validationRules = {
    required: (value) => {
      if (typeof value === "string") return value.trim().length > 0;
      if (typeof value === "number")
        return value !== null && value !== undefined;
      return value !== null && value !== undefined;
    },

    email: (value) => {
      if (!value) return true; // Se vazio, não valida (use required para obrigatório)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    },

    phone: (value) => {
      if (!value) return true;
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      return phoneRegex.test(value.replace(/\s/g, ""));
    },

    minLength: (min) => (value) => {
      if (!value) return true;
      return value.length >= min;
    },

    maxLength: (max) => (value) => {
      if (!value) return true;
      return value.length <= max;
    },

    min: (min) => (value) => {
      if (!value) return true;
      return parseFloat(value) >= min;
    },

    max: (max) => (value) => {
      if (!value) return true;
      return parseFloat(value) <= max;
    },

    positive: (value) => {
      if (!value) return true;
      return parseFloat(value) > 0;
    },

    integer: (value) => {
      if (!value) return true;
      return Number.isInteger(parseFloat(value));
    },
  };

  // Mensagens de erro padrão
  const errorMessages = {
    required: "Este campo é obrigatório",
    email: "Digite um email válido",
    phone: "Digite um telefone válido",
    minLength: (min) => `Mínimo de ${min} caracteres`,
    maxLength: (max) => `Máximo de ${max} caracteres`,
    min: (min) => `Valor mínimo: ${min}`,
    max: (max) => `Valor máximo: ${max}`,
    positive: "Valor deve ser positivo",
    integer: "Valor deve ser um número inteiro",
  };

  // Validar campo individual
  const validateField = (fieldName, value, rules = {}) => {
    const errors = [];

    for (const [ruleName, ruleValue] of Object.entries(rules)) {
      let rule = validationRules[ruleName];
      let message = errorMessages[ruleName];

      // Aplicar parâmetros para regras que os aceitam
      if (
        (typeof rule === "function" && ruleName.includes("Length")) ||
        ruleName.includes("min") ||
        ruleName.includes("max")
      ) {
        rule = rule(ruleValue);
        message = typeof message === "function" ? message(ruleValue) : message;
      }

      if (rule && !rule(value)) {
        errors.push(message);
      }
    }

    if (errors.length > 0) {
      state.errors[fieldName] = errors[0]; // Primeiro erro
      state.touched[fieldName] = true;
    } else {
      delete state.errors[fieldName];
    }

    return errors.length === 0;
  };

  // Validar formulário completo
  const validateForm = (formData, schema) => {
    let isValid = true;
    state.errors = {};

    for (const [fieldName, rules] of Object.entries(schema)) {
      const value = formData[fieldName];
      const fieldValid = validateField(fieldName, value, rules);
      if (!fieldValid) isValid = false;
    }

    state.isValid = isValid;
    return isValid;
  };

  // Limpar erros
  const clearErrors = (fieldName = null) => {
    if (fieldName) {
      delete state.errors[fieldName];
      delete state.touched[fieldName];
    } else {
      state.errors = {};
      state.touched = {};
    }
  };

  // Marcar campo como tocado
  const touchField = (fieldName) => {
    state.touched[fieldName] = true;
  };

  // Verificar se campo tem erro
  const hasError = (fieldName) => {
    return !!state.errors[fieldName];
  };

  // Obter erro do campo
  const getError = (fieldName) => {
    return state.errors[fieldName] || "";
  };

  // Verificar se campo foi tocado
  const isTouched = (fieldName) => {
    return !!state.touched[fieldName];
  };

  // Verificar se deve mostrar erro
  const shouldShowError = (fieldName) => {
    return isTouched(fieldName) && hasError(fieldName);
  };

  // Esquemas de validação padrão
  const schemas = {
    // Cliente
    client: {
      name: { required: true, minLength: 2 },
      contact: { phone: true },
      creditLimit: { positive: true },
    },

    // Produto
    product: {
      name: { required: true, minLength: 2 },
      price: { required: true, positive: true },
      costPrice: { positive: true },
      stock: { integer: true, min: 0 },
    },

    // Usuário
    user: {
      name: { required: true, minLength: 2 },
      email: { required: true, email: true },
      phone: { phone: true },
      password: { required: true, minLength: 6 },
    },

    // Venda
    sale: {
      clientId: { required: true },
      paymentMethod: { required: true },
      dueDate: { required: true },
    },
  };

  return {
    // Estado
    state: computed(() => state),
    loading: computed(() => state.loading),
    errors: computed(() => state.errors),
    isValid: computed(() => state.isValid),

    // Métodos
    validateField,
    validateForm,
    clearErrors,
    touchField,
    hasError,
    getError,
    isTouched,
    shouldShowError,

    // Esquemas
    schemas,

    // Utilitários
    setLoading: (loading) => {
      state.loading = loading;
    },
    setError: (fieldName, message) => {
      state.errors[fieldName] = message;
    },
    clearFieldError: (fieldName) => {
      delete state.errors[fieldName];
    },
  };
}

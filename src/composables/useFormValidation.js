import { reactive, computed } from "vue";

export function useFormValidation() {
  const errors = reactive({});

  const setError = (field, message) => {
    errors[field] = message;
  };

  const clearError = (field) => {
    delete errors[field];
  };

  const clearAllErrors = () => {
    Object.keys(errors).forEach((key) => delete errors[key]);
  };

  const hasError = (field) => {
    return !!errors[field];
  };

  const getError = (field) => {
    return errors[field];
  };

  const hasAnyErrors = computed(() => {
    return Object.keys(errors).length > 0;
  });

  // Validações específicas
  const validateRequired = (value, fieldName) => {
    if (!value || (typeof value === "string" && !value.trim())) {
      setError(fieldName, `${fieldName} é obrigatório`);
      return false;
    }
    clearError(fieldName);
    return true;
  };

  const validateEmail = (email, fieldName = "Email") => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(fieldName, "Email inválido");
      return false;
    }
    clearError(fieldName);
    return true;
  };

  const validateMinLength = (value, minLength, fieldName) => {
    if (value && value.length < minLength) {
      setError(fieldName, `Deve ter pelo menos ${minLength} caracteres`);
      return false;
    }
    clearError(fieldName);
    return true;
  };

  const validateNumber = (value, fieldName, min = null, max = null) => {
    const num = parseFloat(value);
    if (isNaN(num)) {
      setError(fieldName, "Deve ser um número válido");
      return false;
    }
    if (min !== null && num < min) {
      setError(fieldName, `Deve ser maior ou igual a ${min}`);
      return false;
    }
    if (max !== null && num > max) {
      setError(fieldName, `Deve ser menor ou igual a ${max}`);
      return false;
    }
    clearError(fieldName);
    return true;
  };

  const validatePositiveNumber = (value, fieldName) => {
    return validateNumber(value, fieldName, 0);
  };

  const validateSaleForm = (saleForm) => {
    clearAllErrors();
    let isValid = true;

    // Validar produtos
    if (!saleForm.products || saleForm.products.length === 0) {
      setError("products", "Adicione pelo menos um produto à venda");
      isValid = false;
    }

    // Validar cliente para vendas a crédito
    if (saleForm.paymentMethod === "credit" && !saleForm.clientId) {
      setError(
        "clientId",
        "Seleção de cliente é obrigatória para vendas a crédito"
      );
      isValid = false;
    }

    // Validar data de vencimento para vendas a crédito
    if (saleForm.paymentMethod === "credit" && !saleForm.dueDate) {
      setError(
        "dueDate",
        "Data de vencimento é obrigatória para vendas a crédito"
      );
      isValid = false;
    }

    // Validar valores
    if (saleForm.subtotal <= 0) {
      setError("subtotal", "Subtotal deve ser maior que zero");
      isValid = false;
    }

    if (saleForm.discount < 0) {
      setError("discount", "Desconto não pode ser negativo");
      isValid = false;
    }

    if (saleForm.tax < 0) {
      setError("tax", "Imposto não pode ser negativo");
      isValid = false;
    }

    if (saleForm.totalAmount <= 0) {
      setError("totalAmount", "Total deve ser maior que zero");
      isValid = false;
    }

    return isValid;
  };

  const validatePaymentForm = (paymentForm, saleAmount = null) => {
    clearAllErrors();
    let isValid = true;

    // Validar valor do pagamento
    if (!paymentForm.amountPaid || paymentForm.amountPaid <= 0) {
      setError("amountPaid", "Valor do pagamento deve ser maior que zero");
      isValid = false;
    }

    // Validar se não excede o valor da venda
    if (saleAmount && paymentForm.amountPaid > saleAmount) {
      setError(
        "amountPaid",
        "Valor do pagamento não pode exceder o valor da venda"
      );
      isValid = false;
    }

    return isValid;
  };

  return {
    errors,
    setError,
    clearError,
    clearAllErrors,
    hasError,
    getError,
    hasAnyErrors,
    validateRequired,
    validateEmail,
    validateMinLength,
    validateNumber,
    validatePositiveNumber,
    validateSaleForm,
    validatePaymentForm,
  };
}

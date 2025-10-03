import { useSubscription } from "./useSubscription";
import { useNotifications } from "./useNotifications";

export function useOperationGuard() {
  const { hasNoPlan, isProOffer, canPerformOperations } = useSubscription();
  const { handleApiError } = useNotifications();

  // Verificar se pode realizar operação
  const canPerformOperation = (operationName = "esta operação") => {
    if (canPerformOperations.value) {
      return true;
    }

    // Mostrar aviso de subscription
    showSubscriptionWarning(operationName);
    return false;
  };

  // Mostrar aviso de subscription
  const showSubscriptionWarning = (operationName) => {
    const message = hasNoPlan.value
      ? `Você precisa de um plano para ${operationName}. Escolha um plano para continuar.`
      : `Você está na oferta Pro! Aproveite ${operationName} gratuitamente por 30 dias.`;

    handleApiError({
      message,
      type: "subscription_required",
      action: "upgrade",
    });
  };

  // Wrapper para operações que requerem plano
  const guardOperation = (operation, operationName) => {
    return (...args) => {
      if (canPerformOperation(operationName)) {
        return operation(...args);
      }
      return Promise.reject(new Error("Operação bloqueada - plano necessário"));
    };
  };

  // Verificar se botão deve estar desabilitado
  const isButtonDisabled = (requiresPlan = true) => {
    if (!requiresPlan) return false;
    return !canPerformOperations.value;
  };

  // Obter classe CSS para botões desabilitados
  const getDisabledButtonClass = (baseClass = "") => {
    return isButtonDisabled()
      ? `${baseClass} opacity-50 cursor-not-allowed pointer-events-none`
      : baseClass;
  };

  // Obter texto do botão baseado no estado
  const getButtonText = (defaultText, operationName = "esta operação") => {
    if (canPerformOperations.value) {
      return defaultText;
    }

    if (hasNoPlan.value) {
      return "Plano Necessário";
    }

    if (isProOffer.value) {
      return "Continuar Gratuito";
    }

    return defaultText;
  };

  return {
    canPerformOperation,
    showSubscriptionWarning,
    guardOperation,
    isButtonDisabled,
    getDisabledButtonClass,
    getButtonText,
    canPerformOperations,
    hasNoPlan,
    isProOffer,
  };
}

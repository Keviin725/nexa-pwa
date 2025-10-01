import { ref, reactive } from "vue";

const notifications = ref([]);
let notificationId = 0;

export function useNotifications() {
  const addNotification = (notification) => {
    const id = ++notificationId;
    const newNotification = {
      id,
      type: notification.type || "info",
      title: notification.title,
      message: notification.message,
      duration: notification.duration || 5000,
      persistent: notification.persistent || false,
      ...notification,
    };

    notifications.value.push(newNotification);
    return id;
  };

  const removeNotification = (id) => {
    const index = notifications.value.findIndex((n) => n.id === id);
    if (index > -1) {
      notifications.value.splice(index, 1);
    }
  };

  const clearAll = () => {
    notifications.value = [];
  };

  // Métodos de conveniência
  const success = (title, message = "", options = {}) => {
    return addNotification({
      type: "success",
      title,
      message,
      ...options,
    });
  };

  const error = (title, message = "", options = {}) => {
    return addNotification({
      type: "error",
      title,
      message,
      duration: 8000, // Erros ficam mais tempo
      ...options,
    });
  };

  const warning = (title, message = "", options = {}) => {
    return addNotification({
      type: "warning",
      title,
      message,
      ...options,
    });
  };

  const info = (title, message = "", options = {}) => {
    return addNotification({
      type: "info",
      title,
      message,
      ...options,
    });
  };

  // Função para tratar erros de API de forma mais amigável
  const handleApiError = (apiError, context = "") => {
    console.error("API Error:", apiError);

    let title = "Erro";
    let message = "Ocorreu um erro inesperado";

    if (apiError.response?.data?.error) {
      // Erro específico do backend
      const backendError = apiError.response.data.error;

      if (backendError.includes("notNull Violation")) {
        title = "Dados Incompletos";
        message =
          "Alguns campos obrigatórios não foram preenchidos corretamente";
      } else if (backendError.includes("Validation error")) {
        title = "Dados Inválidos";
        message = "Os dados fornecidos não são válidos";
      } else if (backendError.includes("Stock insuficiente")) {
        title = "Estoque Insuficiente";
        message = "Não há produtos suficientes em estoque para esta venda";
      } else if (backendError.includes("não encontrado")) {
        title = "Item Não Encontrado";
        message = "Um dos itens selecionados não foi encontrado";
      } else {
        title = "Erro no Servidor";
        message = backendError;
      }
    } else if (apiError.response?.status === 400) {
      title = "Dados Inválidos";
      message = "Verifique os dados informados e tente novamente";
    } else if (apiError.response?.status === 401) {
      title = "Não Autorizado";
      message = "Sua sessão expirou. Faça login novamente";
    } else if (apiError.response?.status === 403) {
      title = "Acesso Negado";
      message = "Você não tem permissão para realizar esta ação";
    } else if (apiError.response?.status === 404) {
      title = "Não Encontrado";
      message = "O recurso solicitado não foi encontrado";
    } else if (apiError.response?.status === 500) {
      title = "Erro do Servidor";
      message = "Ocorreu um erro interno no servidor";
    } else if (apiError.code === "NETWORK_ERROR" || !navigator.onLine) {
      title = "Sem Conexão";
      message = "Verifique sua conexão com a internet";
    } else if (apiError.message) {
      title = "Erro";
      message = apiError.message;
    }

    if (context) {
      title = `${title} - ${context}`;
    }

    return addNotification({
      type: "error",
      title,
      message,
      persistent: true,
    });
  };

  // Função para tratar sucessos de forma padronizada
  const handleApiSuccess = (message, context = "") => {
    const title = context ? `${context} - Sucesso` : "Sucesso";
    return success(title, message);
  };

  return {
    notifications: notifications.value,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info,
    handleApiError,
    handleApiSuccess,
  };
}

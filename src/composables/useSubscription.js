import { computed } from "vue";
import { useSubscriptionStore } from "@/stores/subscription";

export function useSubscription() {
  const subscriptionStore = useSubscriptionStore();

  // Verificar se tem acesso a funcionalidade
  const hasFeature = (feature) => {
    return subscriptionStore.hasFeature(feature);
  };

  // Verificar se tem acesso a funcionalidade de IA
  const hasAIFeature = (aiFeature) => {
    return subscriptionStore.hasAIFeature(aiFeature);
  };

  // Verificar se pode criar usuário
  const canCreateUser = computed(() => {
    return subscriptionStore.canCreateUser;
  });

  // Verificar se pode criar produto
  const canCreateProduct = computed(() => {
    return subscriptionStore.canCreateProduct;
  });

  // Verificar se pode criar venda
  const canCreateSale = computed(() => {
    return subscriptionStore.canCreateSale;
  });

  // Verificar se é plano de teste
  const isTestPlan = computed(() => {
    return subscriptionStore.isTestPlan;
  });

  // Verificar se é plano Starter
  const isStarterPlan = computed(() => {
    return subscriptionStore.isStarterPlan;
  });

  // Verificar se é plano Pro
  const isProPlan = computed(() => {
    return subscriptionStore.isProPlan;
  });

  // Verificar se é plano Enterprise
  const isEnterprisePlan = computed(() => {
    return subscriptionStore.isEnterprisePlan;
  });

  // Obter informações do plano atual
  const currentPlanInfo = computed(() => {
    return subscriptionStore.currentPlanInfo;
  });

  // Obter cor do plano
  const planColor = computed(() => {
    return subscriptionStore.currentPlanInfo?.color || "gray";
  });

  // Obter nome do plano
  const planName = computed(() => {
    return (
      subscriptionStore.currentPlanInfo?.name || subscriptionStore.currentPlan
    );
  });

  // Verificar se precisa de upgrade
  const needsUpgrade = (requiredPlan) => {
    const planHierarchy = { teste: 1, starter: 2, pro: 3, enterprise: 4 };
    const currentLevel = planHierarchy[subscriptionStore.currentPlan];
    const requiredLevel = planHierarchy[requiredPlan];
    return currentLevel < requiredLevel;
  };

  // Obter funcionalidades disponíveis
  const availableFeatures = computed(() => {
    return subscriptionStore.currentPlanInfo?.features || [];
  });

  // Obter funcionalidades de IA disponíveis
  const availableAIFeatures = computed(() => {
    return subscriptionStore.currentPlanInfo?.aiFeatures || [];
  });

  // Obter informações de uso
  const usage = computed(() => {
    return subscriptionStore.usage;
  });

  // Obter limites
  const limits = computed(() => {
    return subscriptionStore.limits;
  });

  // Obter percentual de uso
  const usagePercentage = (resource) => {
    return subscriptionStore.usagePercentage(resource);
  };

  // Carregar informações de subscription
  const loadSubscriptionInfo = async () => {
    return await subscriptionStore.loadSubscriptionInfo();
  };

  // Atualizar plano
  const updatePlan = async (plan) => {
    return await subscriptionStore.setPlan(plan);
  };

  // Verificar limites
  const checkLimits = async () => {
    return await subscriptionStore.checkLimits();
  };

  // Estado de loading
  const loading = computed(() => {
    return subscriptionStore.loading;
  });

  // Erro
  const error = computed(() => {
    return subscriptionStore.error;
  });

  return {
    hasFeature,
    hasAIFeature,
    canCreateUser,
    canCreateProduct,
    canCreateSale,
    isTestPlan,
    isStarterPlan,
    isProPlan,
    isEnterprisePlan,
    currentPlanInfo,
    planColor,
    planName,
    needsUpgrade,
    availableFeatures,
    availableAIFeatures,
    usage,
    limits,
    usagePercentage,
    loadSubscriptionInfo,
    updatePlan,
    checkLimits,
    loading,
    error,
  };
}

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
    return subscriptionStore.currentPlanInfo.color;
  });

  // Obter nome do plano
  const planName = computed(() => {
    return subscriptionStore.currentPlanInfo.name;
  });

  // Verificar se precisa de upgrade
  const needsUpgrade = (requiredPlan) => {
    const planHierarchy = { teste: 1, pro: 2, enterprise: 3 };
    const currentLevel = planHierarchy[subscriptionStore.currentPlan];
    const requiredLevel = planHierarchy[requiredPlan];
    return currentLevel < requiredLevel;
  };

  // Obter funcionalidades disponíveis
  const availableFeatures = computed(() => {
    return subscriptionStore.currentPlanInfo.features;
  });

  // Obter funcionalidades de IA disponíveis
  const availableAIFeatures = computed(() => {
    return subscriptionStore.currentPlanInfo.aiFeatures;
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
  };
}

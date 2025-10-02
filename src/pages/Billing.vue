<template>
    <div class="min-h-screen bg-slate-50">
        <!-- Header Mobile -->
        <div class="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 shadow-xl">
            <div class="px-4 py-4">
                <div class="flex items-center justify-between">
                    <!-- Back Button e Título -->
                    <div class="flex items-center gap-4">
                        <button @click="goBack"
                            class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors">
                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 19l-7-7 7-7"></path>
                            </svg>
                        </button>
                        <div class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z">
                                </path>
                            </svg>
                        </div>
                        <div>
                            <h1 class="text-xl font-bold text-white">Assinaturas</h1>
                            <p class="text-purple-100 text-sm">Gerencie seu plano</p>
                        </div>
                    </div>

                    <!-- Status da Subscription -->
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full"
                            :class="subscriptionStatus === 'active' ? 'bg-green-400' : 'bg-yellow-400'"></div>
                        <span class="text-white text-sm font-medium">{{ subscriptionStatus === 'active' ? 'Ativo' :
                            'Pendente' }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="p-4 space-y-4">
            <!-- Plano Atual -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-lg font-bold text-slate-800">Plano Atual</h2>
                    <div class="px-3 py-1 rounded-full text-xs font-semibold"
                        :class="currentPlanInfo?.color || 'bg-gray-100 text-gray-600'">
                        {{ currentPlanInfo?.name || 'Teste' }}
                    </div>
                </div>

                <div class="space-y-3">
                    <div class="flex justify-between items-center">
                        <span class="text-slate-600">Plano:</span>
                        <span class="font-semibold text-slate-800">{{ currentPlanInfo?.name || 'Teste' }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-slate-600">Preço:</span>
                        <span class="font-semibold text-slate-800">
                            <span v-if="subscriptionLoading">Carregando...</span>
                            <span v-else>MT {{ currentPlanInfo?.price || 0 }}</span>
                        </span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-slate-600">Status:</span>
                        <span class="font-semibold text-green-600">Ativo</span>
                    </div>
                </div>
            </div>

            <!-- Planos Disponíveis -->
            <div class="space-y-4">
                <h2 class="text-lg font-bold text-slate-800">Planos Disponíveis</h2>

                <!-- Plano Starter -->
                <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <div class="flex items-center justify-between mb-4">
                        <div>
                            <h3 class="text-lg font-bold text-slate-800">Starter</h3>
                            <p class="text-slate-600 text-sm">Ideal para pequenos negócios</p>
                        </div>
                        <div class="text-right">
                            <div class="text-2xl font-bold text-slate-800">MT 499</div>
                            <div class="text-slate-600 text-sm">/ mês</div>
                        </div>
                    </div>

                    <div class="space-y-2 mb-6">
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <span class="text-slate-600 text-sm">Até 100 produtos</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <span class="text-slate-600 text-sm">Até 50 vendas/mês</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <span class="text-slate-600 text-sm">Suporte por email</span>
                        </div>
                    </div>

                    <button v-if="!isStarterPlan" @click="openPaymentModal('starter', 'Starter', 499)"
                        class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all">
                        Assinar Plano
                    </button>
                    <div v-else
                        class="w-full bg-green-100 text-green-800 py-3 px-6 rounded-xl font-semibold text-center">
                        Plano Atual
                    </div>
                </div>

                <!-- Plano Pro -->
                <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <div class="flex items-center justify-between mb-4">
                        <div>
                            <h3 class="text-lg font-bold text-slate-800">Pro</h3>
                            <p class="text-slate-600 text-sm">Para negócios em crescimento</p>
                        </div>
                        <div class="text-right">
                            <div class="text-2xl font-bold text-slate-800">MT 999</div>
                            <div class="text-slate-600 text-sm">/ mês</div>
                        </div>
                    </div>

                    <div class="space-y-2 mb-6">
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <span class="text-slate-600 text-sm">Produtos ilimitados</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <span class="text-slate-600 text-sm">Vendas ilimitadas</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <span class="text-slate-600 text-sm">IA para análise de vendas</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <span class="text-slate-600 text-sm">Suporte prioritário</span>
                        </div>
                    </div>

                    <button v-if="!isProPlan" @click="openPaymentModal('pro', 'Pro', 999)"
                        class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all">
                        Assinar Plano
                    </button>
                    <div v-else
                        class="w-full bg-green-100 text-green-800 py-3 px-6 rounded-xl font-semibold text-center">
                        Plano Atual
                    </div>
                </div>

                <!-- Plano Enterprise -->
                <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <div class="flex items-center justify-between mb-4">
                        <div>
                            <h3 class="text-lg font-bold text-slate-800">Enterprise</h3>
                            <p class="text-slate-600 text-sm">Para grandes empresas</p>
                        </div>
                        <div class="text-right">
                            <div class="text-2xl font-bold text-slate-800">MT 1999</div>
                            <div class="text-slate-600 text-sm">/ mês</div>
                        </div>
                    </div>

                    <div class="space-y-2 mb-6">
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <span class="text-slate-600 text-sm">Tudo do Pro</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <span class="text-slate-600 text-sm">IA para previsão de demanda</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <span class="text-slate-600 text-sm">Múltiplos usuários</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <span class="text-slate-600 text-sm">Suporte 24/7</span>
                        </div>
                    </div>

                    <button v-if="!isEnterprisePlan" @click="openPaymentModal('enterprise', 'Enterprise', 1999)"
                        class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all">
                        Assinar Plano
                    </button>
                    <div v-else
                        class="w-full bg-green-100 text-green-800 py-3 px-6 rounded-xl font-semibold text-center">
                        Plano Atual
                    </div>
                </div>
            </div>

        </div>
    </div>

    <!-- Payment Bottom Sheet -->
    <PaymentBottomSheet v-if="showPaymentModal && selectedPlan" :planId="selectedPlan.id" :planName="selectedPlan.name"
        :amount="selectedPlan.price" :isOpen="showPaymentModal" @close="closePaymentModal" />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSubscription } from '@/composables/useSubscription'
import { useNotifications } from '@/composables/useNotifications'
import PaymentBottomSheet from '@/components/Payment/PaymentBottomSheet.vue'

// Subscription system
const {
    isTestPlan,
    isStarterPlan,
    isProPlan,
    isEnterprisePlan,
    currentPlanInfo,
    usage,
    limits,
    usagePercentage,
    loading: subscriptionLoading,
    updatePlan,
    loadSubscriptionInfo
} = useSubscription()

const { handleApiSuccess, handleApiError } = useNotifications()
const router = useRouter()

// Navigation
const goBack = () => {
    router.go(-1)
}

// Payment modal
const showPaymentModal = ref(false)
const selectedPlan = ref(null)

// Open payment modal
const openPaymentModal = (planId, planName, planPrice) => {
    selectedPlan.value = {
        id: planId,
        name: planName,
        price: planPrice
    }
    showPaymentModal.value = true
}

// Close payment modal
const closePaymentModal = () => {
    showPaymentModal.value = false
    selectedPlan.value = null
}

// Computed properties
const subscriptionStatus = computed(() => {
    return currentPlanInfo.value ? 'active' : 'pending'
})

// Lifecycle
onMounted(async () => {
    try {
        await loadSubscriptionInfo()
    } catch (error) {
        console.error('Erro ao carregar informações de subscription:', error)
    }
})
</script>

<style scoped>
/* Estilos específicos para a página de assinaturas */
</style>
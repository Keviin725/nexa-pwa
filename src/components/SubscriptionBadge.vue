<template>
    <div class="flex items-center gap-2">
        <!-- Loading State -->
        <div v-if="loading" class="text-xs text-gray-500">
            Carregando...
        </div>

        <!-- Badge do Plano -->
        <div v-else :class="[
            'px-3 py-1 rounded-full text-xs font-bold',
            planColorClasses
        ]">
            {{ planName || 'Teste' }}
        </div>

        <!-- Indicador de Status -->
        <div v-if="!loading" :class="[
            'w-2 h-2 rounded-full',
            statusColorClasses
        ]"></div>

        <!-- Informações de Uso (se disponível) -->
        <div v-if="!loading && usage && limits" class="flex items-center gap-1 text-xs text-slate-500">
            <span v-if="limits.maxUsers !== -1" class="px-1">
                👥 {{ usage.users }}/{{ limits.maxUsers }}
            </span>
            <span v-if="limits.maxProducts !== -1" class="px-1">
                📦 {{ usage.products }}/{{ limits.maxProducts }}
            </span>
            <span v-if="limits.maxSales !== -1" class="px-1">
                🛒 {{ usage.sales }}/{{ limits.maxSales }}
            </span>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useSubscription } from '@/composables/useSubscription';

const {
    planName,
    planColor,
    hasNoPlan,
    isProOffer,
    isStarterPlan,
    isProPlan,
    isEnterprisePlan,
    usage,
    limits,
    usagePercentage,
    loading
} = useSubscription();

// Componente funcionando com dados do store

const planColorClasses = computed(() => {
    switch (planColor.value) {
        case 'gray':
            return 'bg-gray-100 text-gray-800';
        case 'green':
            return 'bg-green-100 text-green-800';
        case 'blue':
            return 'bg-blue-100 text-blue-800';
        case 'purple':
            return 'bg-purple-100 text-purple-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
});

const statusColorClasses = computed(() => {
    if (hasNoPlan.value) return 'bg-red-500';
    if (isProOffer.value) return 'bg-yellow-500';
    if (isStarterPlan.value) return 'bg-green-500';
    if (isProPlan.value) return 'bg-blue-500';
    if (isEnterprisePlan.value) return 'bg-purple-500';
    return 'bg-gray-500';
});
</script>

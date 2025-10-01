<template>
    <div class="flex items-center gap-2">
        <!-- Badge do Plano -->
        <div :class="[
            'px-3 py-1 rounded-full text-xs font-bold',
            planColorClasses
        ]">
            {{ planName }}
        </div>

        <!-- Indicador de Status -->
        <div :class="[
            'w-2 h-2 rounded-full',
            statusColorClasses
        ]"></div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useSubscription } from '@/composables/useSubscription';

const { planName, planColor, isTestPlan, isStarterPlan, isProPlan, isEnterprisePlan } = useSubscription();

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
    if (isTestPlan.value) return 'bg-yellow-500';
    if (isStarterPlan.value) return 'bg-green-500';
    if (isProPlan.value) return 'bg-blue-500';
    if (isEnterprisePlan.value) return 'bg-purple-500';
    return 'bg-gray-500';
});
</script>

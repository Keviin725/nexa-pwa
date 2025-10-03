<template>
    <div v-if="showPrompt"
        class="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-4">
        <div class="flex items-start gap-3">
            <div class="flex-shrink-0">
                <div
                    class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
            </div>

            <div class="flex-1">
                <h3 class="text-sm font-semibold text-gray-800 mb-1">
                    {{ title }}
                </h3>
                <p class="text-xs text-gray-600 mb-3">
                    {{ description }}
                </p>

                <div class="flex gap-2">
                    <button @click="upgrade"
                        class="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200">
                        {{ upgradeButtonText }}
                    </button>

                    <button @click="dismiss"
                        class="px-3 py-1 text-gray-500 text-xs font-medium hover:text-gray-700 transition-colors">
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useSubscription } from '@/composables/useSubscription';

const props = defineProps({
    requiredPlan: {
        type: String,
        required: true,
        validator: (value) => ['pro', 'enterprise'].includes(value)
    },
    feature: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['upgrade', 'dismiss']);

const { needsUpgrade, hasNoPlan, isProOffer, isProPlan } = useSubscription();

const showPrompt = computed(() => {
    return needsUpgrade(props.requiredPlan);
});

const title = computed(() => {
    if (hasNoPlan.value) {
        return 'Upgrade para Pro';
    }
    if (isProOffer.value) {
        return 'Continuar com Pro';
    }
    if (isProPlan.value && props.requiredPlan === 'enterprise') {
        return 'Upgrade para Enterprise';
    }
    return 'Upgrade Necessário';
});

const description = computed(() => {
    if (hasNoPlan.value) {
        return `Esta funcionalidade está disponível no plano Pro. Upgrade para acessar ${props.feature}.`;
    }
    if (isProOffer.value) {
        return `Você está na oferta Pro! Aproveite ${props.feature} gratuitamente por 30 dias.`;
    }
    if (isProPlan.value && props.requiredPlan === 'enterprise') {
        return `Esta funcionalidade está disponível no plano Enterprise. Upgrade para acessar ${props.feature}.`;
    }
    return `Esta funcionalidade requer o plano ${props.requiredPlan}.`;
});

const upgradeButtonText = computed(() => {
    if (hasNoPlan.value) {
        return 'Upgrade para Pro';
    }
    if (isProOffer.value) {
        return 'Continuar Gratuito';
    }
    if (isProPlan.value && props.requiredPlan === 'enterprise') {
        return 'Upgrade para Enterprise';
    }
    return 'Fazer Upgrade';
});

const upgrade = () => {
    emit('upgrade', props.requiredPlan);
};

const dismiss = () => {
    emit('dismiss');
};
</script>

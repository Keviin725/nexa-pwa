<template>
    <div class="flex gap-3" :class="containerClass">
        <!-- Botão Cancelar -->
        <button v-if="showCancel" type="button" @click="$emit('cancel')" :class="cancelButtonClasses"
            :disabled="loading">
            <svg v-if="!loading" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            {{ cancelText }}
        </button>

        <!-- Botão Secundário -->
        <button v-if="showSecondary && secondaryText" type="button" @click="$emit('secondary')"
            :class="secondaryButtonClasses" :disabled="loading">
            <component :is="secondaryIcon" v-if="secondaryIcon" class="w-4 h-4 mr-2" />
            {{ secondaryText }}
        </button>

        <!-- Botão Principal -->
        <button type="submit" @click="$emit('submit')" :class="submitButtonClasses" :disabled="disabled || loading">
            <svg v-if="loading" class="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                </path>
            </svg>
            <component :is="submitIcon" v-else-if="submitIcon" class="w-4 h-4 mr-2" />
            {{ loading ? loadingText : submitText }}
        </button>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    // Layout
    layout: {
        type: String,
        default: 'horizontal',
        validator: (value) => ['horizontal', 'vertical', 'centered'].includes(value)
    },

    // Botão Cancelar
    showCancel: {
        type: Boolean,
        default: true
    },
    cancelText: {
        type: String,
        default: 'Cancelar'
    },

    // Botão Secundário
    showSecondary: {
        type: Boolean,
        default: false
    },
    secondaryText: {
        type: String,
        default: ''
    },
    secondaryIcon: {
        type: [String, Object],
        default: null
    },

    // Botão Principal
    submitText: {
        type: String,
        default: 'Salvar'
    },
    submitIcon: {
        type: [String, Object],
        default: null
    },

    // Estados
    loading: {
        type: Boolean,
        default: false
    },
    loadingText: {
        type: String,
        default: 'Processando...'
    },
    disabled: {
        type: Boolean,
        default: false
    },

    // Variantes
    variant: {
        type: String,
        default: 'default',
        validator: (value) => ['default', 'success', 'warning', 'danger'].includes(value)
    },

    // Tamanhos
    size: {
        type: String,
        default: 'md',
        validator: (value) => ['sm', 'md', 'lg'].includes(value)
    }
})

const emit = defineEmits(['cancel', 'submit', 'secondary'])

const containerClass = computed(() => {
    const baseClasses = 'w-full'

    const layoutClasses = {
        horizontal: 'flex-row',
        vertical: 'flex-col',
        centered: 'flex-row justify-center'
    }

    return [baseClasses, layoutClasses[props.layout]].join(' ')
})

const baseButtonClasses = computed(() => {
    const sizeClasses = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3 text-sm',
        lg: 'px-6 py-4 text-base'
    }

    return [
        'flex items-center justify-center font-medium rounded-lg transition-all duration-200',
        sizeClasses[props.size]
    ].join(' ')
})

const cancelButtonClasses = computed(() => {
    return [
        baseButtonClasses.value,
        'flex-1 border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400',
        props.loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
    ].join(' ')
})

const secondaryButtonClasses = computed(() => {
    return [
        baseButtonClasses.value,
        'flex-1 border border-blue-300 text-blue-700 bg-blue-50 hover:bg-blue-100 hover:border-blue-400',
        props.loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
    ].join(' ')
})

const submitButtonClasses = computed(() => {
    const variantClasses = {
        default: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl',
        success: 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl',
        warning: 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl',
        danger: 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl'
    }

    return [
        baseButtonClasses.value,
        'flex-1 font-bold',
        variantClasses[props.variant],
        (props.disabled || props.loading) ? 'opacity-50 cursor-not-allowed hover:scale-100' : 'hover:scale-105 transform'
    ].join(' ')
})
</script>

<style scoped>
/* Animações suaves para os botões */
.hover\:scale-105:hover {
    transform: scale(1.05);
}

.hover\:scale-100:hover {
    transform: scale(1);
}
</style>

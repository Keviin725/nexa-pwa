<template>
    <div class="w-full">
        <!-- Label e Percentual -->
        <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-medium text-slate-600">{{ label }}</span>
            <span class="text-sm font-bold" :class="textColorClass">{{ Math.round(animatedValue) }}%</span>
        </div>

        <!-- Barra de Progresso -->
        <div class="w-full bg-slate-200 rounded-full overflow-hidden" :class="heightClass">
            <div class="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                :class="progressColorClass" :style="{ width: animatedValue + '%' }">
                <!-- Efeito de brilho animado -->
                <div v-if="showShine"
                    class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shine">
                </div>
            </div>
        </div>

        <!-- Informações adicionais -->
        <div v-if="showDetails" class="flex justify-between items-center mt-2 text-xs text-slate-500">
            <span>{{ currentLabel }}: {{ formatValue(currentValue) }}</span>
            <span>{{ targetLabel }}: {{ formatValue(maxValue) }}</span>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'

const props = defineProps({
    // Valores
    currentValue: {
        type: Number,
        default: 0
    },
    maxValue: {
        type: Number,
        default: 100
    },

    // Aparência
    label: {
        type: String,
        default: 'Progresso'
    },
    currentLabel: {
        type: String,
        default: 'Atual'
    },
    targetLabel: {
        type: String,
        default: 'Meta'
    },

    // Cores
    color: {
        type: String,
        default: 'blue',
        validator: (value) => ['blue', 'green', 'red', 'yellow', 'purple', 'indigo'].includes(value)
    },

    // Tamanho
    size: {
        type: String,
        default: 'md',
        validator: (value) => ['sm', 'md', 'lg'].includes(value)
    },

    // Opções
    showDetails: {
        type: Boolean,
        default: false
    },
    showShine: {
        type: Boolean,
        default: true
    },
    animated: {
        type: Boolean,
        default: true
    }
})

// Valores computados
const percentage = computed(() => {
    if (props.maxValue <= 0) return 0
    return Math.min((props.currentValue / props.maxValue) * 100, 100)
})

// Valor animado
const animatedValue = ref(0)

// Animar quando o valor mudar
watch(() => percentage.value, (newValue) => {
    if (props.animated) {
        nextTick(() => {
            animatedValue.value = newValue
        })
    } else {
        animatedValue.value = newValue
    }
}, { immediate: true })

// Classes de cor
const colorClasses = {
    blue: {
        progress: 'bg-gradient-to-r from-blue-500 to-blue-600',
        text: 'text-blue-600'
    },
    green: {
        progress: 'bg-gradient-to-r from-green-500 to-green-600',
        text: 'text-green-600'
    },
    red: {
        progress: 'bg-gradient-to-r from-red-500 to-red-600',
        text: 'text-red-600'
    },
    yellow: {
        progress: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
        text: 'text-yellow-600'
    },
    purple: {
        progress: 'bg-gradient-to-r from-purple-500 to-purple-600',
        text: 'text-purple-600'
    },
    indigo: {
        progress: 'bg-gradient-to-r from-indigo-500 to-indigo-600',
        text: 'text-indigo-600'
    }
}

const progressColorClass = computed(() => colorClasses[props.color].progress)
const textColorClass = computed(() => colorClasses[props.color].text)

// Classes de tamanho
const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3'
}

const heightClass = computed(() => sizeClasses[props.size])

// Formatar valores
const formatValue = (value) => {
    if (typeof value === 'number') {
        return value.toLocaleString('pt-PT')
    }
    return value
}
</script>

<style scoped>
@keyframes shine {
    0% {
        transform: translateX(-100%);
    }

    100% {
        transform: translateX(100%);
    }
}

.animate-shine {
    animation: shine 2s ease-in-out infinite;
}
</style>

<template>
    <div @click="$emit('select', method)" :class="[
        'flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md',
        selected
            ? `${colorClasses.border} ${colorClasses.bg}`
            : 'border-gray-200 hover:border-gray-300'
    ]">
        <div
            class="w-12 h-12 rounded-lg flex items-center justify-center mr-4 overflow-hidden bg-white border border-gray-200">
            <img :src="getMethodImage(method)" :alt="name" class="w-full h-full object-contain p-1" />
        </div>
        <div class="flex-1">
            <h5 class="font-semibold text-gray-900">{{ name }}</h5>
            <p class="text-sm text-gray-600">{{ description }}</p>
        </div>
        <div v-if="selected" :class="`w-6 h-6 ${colorClasses.checkBg} rounded-full flex items-center justify-center`">
            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    method: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    selected: {
        type: Boolean,
        default: false
    },
    color: {
        type: String,
        default: 'blue'
    }
})

const emit = defineEmits(['select'])

const getMethodImage = (method) => {
    const images = {
        'mpesa': new URL('@/assets/mpesa.png', import.meta.url).href,
        'emola': new URL('@/assets/emola.png', import.meta.url).href,
        'visa': new URL('@/assets/visa.png', import.meta.url).href
    }
    return images[method] || ''
}

const colorClasses = computed(() => {
    const colors = {
        green: {
            border: 'border-green-500',
            bg: 'bg-green-50',
            iconBg: 'bg-green-100',
            iconColor: 'text-green-600',
            checkBg: 'bg-green-500'
        },
        blue: {
            border: 'border-blue-500',
            bg: 'bg-blue-50',
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600',
            checkBg: 'bg-blue-500'
        },
        purple: {
            border: 'border-purple-500',
            bg: 'bg-purple-50',
            iconBg: 'bg-purple-100',
            iconColor: 'text-purple-600',
            checkBg: 'bg-purple-500'
        }
    }

    return colors[props.color] || colors.blue
})
</script>

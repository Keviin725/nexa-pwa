<template>
    <Transition name="toast" appear>
        <div v-if="visible" class="fixed top-4 right-4 z-50 max-w-sm w-full">
            <div class="bg-white rounded-lg shadow-lg border-l-4 p-4" :class="toastClasses">
                <div class="flex items-start">
                    <div class="flex-shrink-0">
                        <component :is="iconComponent" class="h-5 w-5" :class="iconClasses" />
                    </div>
                    <div class="ml-3 flex-1">
                        <h3 class="text-sm font-medium" :class="titleClasses">
                            {{ title }}
                        </h3>
                        <p v-if="message" class="mt-1 text-sm" :class="messageClasses">
                            {{ message }}
                        </p>
                    </div>
                    <div class="ml-4 flex-shrink-0">
                        <button @click="close"
                            class="inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                            :class="closeButtonClasses">
                            <span class="sr-only">Fechar</span>
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
    type: {
        type: String,
        default: 'info',
        validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        default: ''
    },
    duration: {
        type: Number,
        default: 5000
    },
    persistent: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['close'])

const visible = ref(false)

const toastClasses = computed(() => {
    const baseClasses = 'border-l-4'
    const typeClasses = {
        success: 'border-green-400 bg-green-50',
        error: 'border-red-400 bg-red-50',
        warning: 'border-yellow-400 bg-yellow-50',
        info: 'border-blue-400 bg-blue-50'
    }
    return `${baseClasses} ${typeClasses[props.type]}`
})

const titleClasses = computed(() => {
    const typeClasses = {
        success: 'text-green-800',
        error: 'text-red-800',
        warning: 'text-yellow-800',
        info: 'text-blue-800'
    }
    return typeClasses[props.type]
})

const messageClasses = computed(() => {
    const typeClasses = {
        success: 'text-green-700',
        error: 'text-red-700',
        warning: 'text-yellow-700',
        info: 'text-blue-700'
    }
    return typeClasses[props.type]
})

const iconClasses = computed(() => {
    const typeClasses = {
        success: 'text-green-400',
        error: 'text-red-400',
        warning: 'text-yellow-400',
        info: 'text-blue-400'
    }
    return typeClasses[props.type]
})

const closeButtonClasses = computed(() => {
    const typeClasses = {
        success: 'text-green-400 hover:text-green-600 focus:ring-green-500',
        error: 'text-red-400 hover:text-red-600 focus:ring-red-500',
        warning: 'text-yellow-400 hover:text-yellow-600 focus:ring-yellow-500',
        info: 'text-blue-400 hover:text-blue-600 focus:ring-blue-500'
    }
    return typeClasses[props.type]
})

const iconComponent = computed(() => {
    const icons = {
        success: 'CheckCircleIcon',
        error: 'XCircleIcon',
        warning: 'ExclamationTriangleIcon',
        info: 'InformationCircleIcon'
    }
    return icons[props.type]
})

const close = () => {
    visible.value = false
    setTimeout(() => {
        emit('close')
    }, 300)
}

onMounted(() => {
    visible.value = true

    if (!props.persistent && props.duration > 0) {
        setTimeout(() => {
            close()
        }, props.duration)
    }
})
</script>

<style scoped>
.toast-enter-active {
    transition: all 0.3s ease-out;
}

.toast-leave-active {
    transition: all 0.3s ease-in;
}

.toast-enter-from {
    transform: translateX(100%);
    opacity: 0;
}

.toast-leave-to {
    transform: translateX(100%);
    opacity: 0;
}
</style>

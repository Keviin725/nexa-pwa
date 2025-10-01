<template>
    <div v-if="visible" class="flex items-center justify-center" :class="containerClass">
        <div class="flex flex-col items-center space-y-3">
            <div class="relative">
                <div class="w-8 h-8 border-4 border-gray-200 rounded-full animate-spin"></div>
                <div
                    class="absolute top-0 left-0 w-8 h-8 border-4 border-transparent border-t-blue-600 rounded-full animate-spin">
                </div>
            </div>
            <p v-if="message" class="text-sm text-gray-600 font-medium">{{ message }}</p>
        </div>
    </div>
</template>

<script setup>
defineProps({
    visible: {
        type: Boolean,
        default: true
    },
    message: {
        type: String,
        default: ''
    },
    containerClass: {
        type: String,
        default: 'py-8'
    }
})
</script>

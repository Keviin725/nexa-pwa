<template>
    <div class="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div class="w-16 h-16 mb-4 rounded-full bg-slate-100 flex items-center justify-center">
            <svg v-if="icon === 'box'" class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
            </svg>
            <svg v-else-if="icon === 'users'" class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z">
                </path>
            </svg>
            <svg v-else-if="icon === 'chart'" class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                </path>
            </svg>
            <svg v-else-if="icon === 'shopping'" class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01">
                </path>
            </svg>
            <svg v-else class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z">
                </path>
            </svg>
        </div>

        <h3 class="text-lg font-semibold text-slate-800 mb-2">{{ title }}</h3>
        <p class="text-slate-600 mb-6 max-w-md">{{ description }}</p>

        <div v-if="actionText && actionHandler" class="space-y-3">
            <button @click="actionHandler"
                class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                {{ actionText }}
            </button>

            <div v-if="secondaryActionText && secondaryActionHandler" class="text-center">
                <button @click="secondaryActionHandler"
                    class="text-sm text-slate-500 hover:text-slate-700 transition-colors">
                    {{ secondaryActionText }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    icon: {
        type: String,
        default: 'default',
        validator: (value) => ['default', 'box', 'users', 'chart', 'shopping'].includes(value)
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    actionText: {
        type: String,
        default: null
    },
    actionHandler: {
        type: Function,
        default: null
    },
    secondaryActionText: {
        type: String,
        default: null
    },
    secondaryActionHandler: {
        type: Function,
        default: null
    }
})
</script>

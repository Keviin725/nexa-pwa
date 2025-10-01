<template>
    <div class="animate-pulse">
        <!-- Card Skeleton -->
        <div v-if="type === 'card'" class="bg-white rounded-xl border border-slate-200 p-6">
            <div class="flex items-center space-x-4 mb-4">
                <div class="w-12 h-12 bg-slate-200 rounded-lg"></div>
                <div class="flex-1">
                    <div class="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                    <div class="h-3 bg-slate-200 rounded w-1/2"></div>
                </div>
            </div>
            <div class="space-y-3">
                <div class="h-3 bg-slate-200 rounded w-full"></div>
                <div class="h-3 bg-slate-200 rounded w-5/6"></div>
                <div class="h-3 bg-slate-200 rounded w-4/6"></div>
            </div>
        </div>

        <!-- List Skeleton -->
        <div v-else-if="type === 'list'" class="space-y-4">
            <div v-for="n in count" :key="n" class="bg-white rounded-lg border border-slate-200 p-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-slate-200 rounded-full"></div>
                        <div class="space-y-2">
                            <div class="h-4 bg-slate-200 rounded w-32"></div>
                            <div class="h-3 bg-slate-200 rounded w-24"></div>
                        </div>
                    </div>
                    <div class="h-4 bg-slate-200 rounded w-16"></div>
                </div>
            </div>
        </div>

        <!-- Table Skeleton -->
        <div v-else-if="type === 'table'" class="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <div class="px-6 py-4 border-b border-slate-200">
                <div class="h-4 bg-slate-200 rounded w-1/4"></div>
            </div>
            <div class="divide-y divide-slate-200">
                <div v-for="n in count" :key="n" class="px-6 py-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <div class="w-8 h-8 bg-slate-200 rounded"></div>
                            <div class="space-y-2">
                                <div class="h-4 bg-slate-200 rounded w-24"></div>
                                <div class="h-3 bg-slate-200 rounded w-16"></div>
                            </div>
                        </div>
                        <div class="flex space-x-4">
                            <div class="h-4 bg-slate-200 rounded w-12"></div>
                            <div class="h-4 bg-slate-200 rounded w-12"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Chart Skeleton -->
        <div v-else-if="type === 'chart'" class="bg-white rounded-xl border border-slate-200 p-6">
            <div class="flex items-center justify-between mb-6">
                <div class="h-5 bg-slate-200 rounded w-1/3"></div>
                <div class="h-4 bg-slate-200 rounded w-20"></div>
            </div>
            <div class="h-64 bg-slate-100 rounded-lg flex items-end justify-center space-x-2 p-4">
                <div v-for="n in 7" :key="n" class="bg-slate-200 rounded-t"
                    :style="{ height: `${Math.random() * 60 + 20}%`, width: '32px' }">
                </div>
            </div>
        </div>

        <!-- Metric Card Skeleton -->
        <div v-else-if="type === 'metric'" class="text-center p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div class="h-8 bg-slate-200 rounded w-20 mx-auto mb-2"></div>
            <div class="h-4 bg-slate-200 rounded w-24 mx-auto mb-1"></div>
            <div class="h-3 bg-slate-200 rounded w-16 mx-auto"></div>
        </div>

        <!-- Default Skeleton -->
        <div v-else class="space-y-3">
            <div class="h-4 bg-slate-200 rounded w-full"></div>
            <div class="h-4 bg-slate-200 rounded w-5/6"></div>
            <div class="h-4 bg-slate-200 rounded w-4/6"></div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    type: {
        type: String,
        default: 'default',
        validator: (value) => ['default', 'card', 'list', 'table', 'chart', 'metric'].includes(value)
    },
    count: {
        type: Number,
        default: 3
    }
})
</script>

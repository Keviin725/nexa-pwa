<template>
    <div
        class="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-xl border border-slate-200 p-6 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-5">
            <div class="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200"></div>
        </div>

        <div class="relative z-10">
            <!-- Header -->
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" :class="iconBgClass">
                        <svg class="w-6 h-6" :class="iconColorClass" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="iconPath"></path>
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-sm font-semibold text-slate-700">{{ title }}</h3>
                        <p class="text-xs text-slate-500">{{ subtitle }}</p>
                    </div>
                </div>
                <div class="flex items-center gap-1" :class="trendColorClass">
                    <svg v-if="trend === 'up'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                    </svg>
                    <svg v-else-if="trend === 'down'" class="w-4 h-4" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                    <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                    </svg>
                    <span class="text-sm font-medium">{{ trendPercentage }}%</span>
                </div>
            </div>

            <!-- Main Value -->
            <div class="mb-4">
                <div :class="isMobile ? 'text-2xl' : 'text-3xl'" class="font-bold text-slate-800 mb-1">{{ formattedValue
                    }}</div>
                <div :class="isMobile ? 'text-xs' : 'text-sm'" class="text-slate-600">{{ description }}</div>
            </div>

            <!-- Progress Bar -->
            <div class="mb-4">
                <div class="flex justify-between text-xs text-slate-500 mb-2">
                    <span>Progresso</span>
                    <span>{{ progressPercentage }}%</span>
                </div>
                <div class="w-full bg-slate-200 rounded-full overflow-hidden" :class="isMobile ? 'h-1.5' : 'h-2'">
                    <div class="h-full rounded-full transition-all duration-1000 ease-out" :class="progressColorClass"
                        :style="{ width: progressPercentage + '%' }"></div>
                </div>
            </div>

            <!-- Footer Stats -->
            <div class="flex justify-between items-center text-xs text-slate-500">
                <div class="flex items-center gap-1">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>{{ period }}</span>
                </div>
                <div class="flex items-center gap-1">
                    <div class="w-2 h-2 rounded-full animate-pulse" :class="statusColorClass"></div>
                    <span>{{ status }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useResponsive } from '../../hooks/useResponsive.js'

const props = defineProps({
    title: {
        type: String,
        default: 'Métrica'
    },
    subtitle: {
        type: String,
        default: 'Descrição'
    },
    value: {
        type: [Number, String],
        default: 0
    },
    description: {
        type: String,
        default: ''
    },
    trend: {
        type: String,
        default: 'up', // 'up', 'down', 'stable'
        validator: (value) => ['up', 'down', 'stable'].includes(value)
    },
    trendPercentage: {
        type: Number,
        default: 0
    },
    progressPercentage: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 'Ativo'
    },
    period: {
        type: String,
        default: 'Últimos 30 dias'
    },
    icon: {
        type: String,
        default: 'chart'
    },
    color: {
        type: String,
        default: 'blue'
    }
})

const iconPaths = {
    chart: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    money: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1',
    users: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z',
    box: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
    shopping: 'M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01'
}

const colorClasses = {
    blue: {
        iconBg: 'bg-gradient-to-br from-blue-100 to-blue-200',
        iconColor: 'text-blue-600',
        trend: 'text-blue-600',
        progress: 'bg-gradient-to-r from-blue-500 to-blue-600',
        status: 'bg-blue-500'
    },
    green: {
        iconBg: 'bg-gradient-to-br from-green-100 to-green-200',
        iconColor: 'text-green-600',
        trend: 'text-green-600',
        progress: 'bg-gradient-to-r from-green-500 to-green-600',
        status: 'bg-green-500'
    },
    purple: {
        iconBg: 'bg-gradient-to-br from-purple-100 to-purple-200',
        iconColor: 'text-purple-600',
        trend: 'text-purple-600',
        progress: 'bg-gradient-to-r from-purple-500 to-purple-600',
        status: 'bg-purple-500'
    },
    red: {
        iconBg: 'bg-gradient-to-br from-red-100 to-red-200',
        iconColor: 'text-red-600',
        trend: 'text-red-600',
        progress: 'bg-gradient-to-r from-red-500 to-red-600',
        status: 'bg-red-500'
    },
    yellow: {
        iconBg: 'bg-gradient-to-br from-yellow-100 to-yellow-200',
        iconColor: 'text-yellow-600',
        trend: 'text-yellow-600',
        progress: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
        status: 'bg-yellow-500'
    }
}

const iconPath = computed(() => iconPaths[props.icon] || iconPaths.chart)
const colorClass = computed(() => colorClasses[props.color] || colorClasses.blue)

const iconBgClass = computed(() => colorClass.value.iconBg)
const iconColorClass = computed(() => colorClass.value.iconColor)
const trendColorClass = computed(() => colorClass.value.trend)
const progressColorClass = computed(() => colorClass.value.progress)
const statusColorClass = computed(() => colorClass.value.status)

// Hook responsivo
const { isMobile } = useResponsive()

const formattedValue = computed(() => {
    if (typeof props.value === 'number') {
        return props.value.toLocaleString('pt-PT')
    }
    return props.value
})
</script>

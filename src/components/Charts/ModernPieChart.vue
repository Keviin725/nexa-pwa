<template>
    <div
        class="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-xl border border-slate-200 p-6 relative overflow-hidden">
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-5">
            <div class="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200"></div>
        </div>

        <div class="relative z-10">
            <!-- Header -->
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h3 class="text-xl font-bold text-slate-800">{{ title }}</h3>
                    <p class="text-sm text-slate-600 mt-1">{{ subtitle }}</p>
                </div>
                <div class="flex items-center gap-2">
                    <div class="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                    <span class="text-sm text-slate-600">{{ period }}</span>
                </div>
            </div>

            <div class="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
                <!-- SVG Chart -->
                <div class="relative flex-shrink-0">
                    <svg :width="chartSize" :height="chartSize" :class="isMobile ? 'w-48 h-48' : 'w-64 h-64'">
                        <g :transform="`translate(${chartSize / 2}, ${chartSize / 2})`">
                            <!-- Animated Pie Slices -->
                            <path v-for="(slice, index) in slices" :key="index" :d="slice.path" :fill="slice.color"
                                :stroke="'white'" :stroke-width="3"
                                class="hover:opacity-80 transition-all duration-300 cursor-pointer animate-slice-in"
                                :style="`animation-delay: ${index * 0.2}s`" @mouseover="showTooltip($event, slice)"
                                @mouseout="hideTooltip" />

                            <!-- Center Circle -->
                            <circle cx="0" cy="0" :r="centerRadius" fill="white" stroke="#e2e8f0" stroke-width="2" />
                        </g>
                    </svg>

                    <!-- Center Text -->
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="text-center">
                            <div :class="isMobile ? 'text-2xl' : 'text-3xl'" class="font-bold text-slate-800">{{
                                totalValue }}</div>
                            <div :class="isMobile ? 'text-xs' : 'text-sm'" class="text-slate-600">{{ totalLabel }}</div>
                        </div>
                    </div>
                </div>

                <!-- Interactive Legend -->
                <div class="flex-1 space-y-2 lg:space-y-3 w-full lg:w-auto">
                    <div v-for="(slice, index) in slices" :key="index"
                        class="flex items-center justify-between p-2 lg:p-3 rounded-xl hover:bg-slate-50 transition-all duration-300 cursor-pointer group"
                        @mouseover="highlightSlice(index)" @mouseout="unhighlightSlice">
                        <div class="flex items-center gap-2 lg:gap-3">
                            <div class="transition-all duration-300 w-4 h-4 lg:w-5 lg:h-5 rounded-full shadow-sm"
                                :style="{ backgroundColor: slice.color }"
                                :class="highlightedIndex === index ? 'scale-110 shadow-lg' : ''"></div>
                            <div class="flex-1 min-w-0">
                                <span :class="isMobile ? 'text-xs' : 'text-sm'"
                                    class="font-semibold text-slate-700 truncate">{{ slice.label }}</span>
                                <div :class="isMobile ? 'text-[10px]' : 'text-xs'" class="text-slate-500">{{
                                    slice.percentage }}%</div>
                            </div>
                        </div>
                        <div class="text-right flex-shrink-0">
                            <div :class="isMobile ? 'text-sm' : 'text-lg'" class="font-bold text-slate-800">MT {{
                                slice.value.toFixed(0) }}</div>
                            <div :class="isMobile ? 'text-[10px]' : 'text-xs'" class="text-slate-500">{{
                                slice.percentage }}%</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Interactive Tooltip -->
            <div v-if="tooltip.visible"
                class="absolute bg-slate-900 text-white text-sm rounded-xl px-4 py-3 shadow-2xl z-20 pointer-events-none transform -translate-x-1/2 -translate-y-full"
                :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }">
                <div class="font-semibold text-white">{{ tooltip.label }}</div>
                <div class="text-purple-300 mt-1">{{ tooltip.value }}</div>
                <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                    <div class="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useResponsive } from '../../hooks/useResponsive.js'

const props = defineProps({
    title: {
        type: String,
        default: 'Gráfico de Pizza Moderno'
    },
    subtitle: {
        type: String,
        default: 'Distribuição de dados'
    },
    data: {
        type: Array,
        default: () => []
    },
    totalLabel: {
        type: String,
        default: 'Total'
    },
    period: {
        type: String,
        default: 'Período atual'
    },
    size: {
        type: Number,
        default: 250
    }
})

const tooltip = ref({
    visible: false,
    x: 0,
    y: 0,
    label: '',
    value: ''
})

const highlightedIndex = ref(-1)

// Hook responsivo
const { isMobile } = useResponsive()

// Computed properties para responsividade
const chartSize = computed(() => isMobile.value ? 200 : props.size)
const centerRadius = computed(() => isMobile.value ? 40 : 60)

const colors = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316',
    '#ec4899', '#6366f1', '#14b8a6', '#f97316', '#84cc16', '#eab308', '#ef4444', '#8b5cf6'
]

const chartData = computed(() => {
    if (!props.data || props.data.length === 0) return []
    return props.data.map((item, index) => ({
        label: item.label || item.name || `Item ${index + 1}`,
        value: item.value || item.amount || item.sales || 0,
        color: colors[index % colors.length]
    }))
})

const totalValue = computed(() => {
    return chartData.value.reduce((sum, item) => sum + item.value, 0).toFixed(0)
})

const slices = computed(() => {
    if (chartData.value.length === 0) return []

    const total = chartData.value.reduce((sum, item) => sum + item.value, 0)
    if (total === 0) return []

    let currentAngle = 0
    const radius = chartSize.value / 2 - (isMobile.value ? 15 : 20)

    return chartData.value.map((item, index) => {
        const percentage = (item.value / total) * 100
        const angle = (item.value / total) * 2 * Math.PI

        const startAngle = currentAngle
        const endAngle = currentAngle + angle

        const x1 = Math.cos(startAngle) * radius
        const y1 = Math.sin(startAngle) * radius
        const x2 = Math.cos(endAngle) * radius
        const y2 = Math.sin(endAngle) * radius

        const largeArcFlag = angle > Math.PI ? 1 : 0

        const path = [
            `M 0 0`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            `Z`
        ].join(' ')

        currentAngle += angle

        return {
            path,
            label: item.label,
            value: item.value,
            percentage: percentage.toFixed(1),
            color: item.color
        }
    })
})

const showTooltip = (event, slice) => {
    tooltip.value = {
        visible: true,
        x: event.clientX - event.target.closest('svg').getBoundingClientRect().left,
        y: event.clientY - event.target.closest('svg').getBoundingClientRect().top,
        label: slice.label,
        value: `MT ${slice.value.toFixed(2).replace('.', ',')} (${slice.percentage}%)`
    }
}

const hideTooltip = () => {
    tooltip.value.visible = false
}

const highlightSlice = (index) => {
    highlightedIndex.value = index
}

const unhighlightSlice = () => {
    highlightedIndex.value = -1
}
</script>

<style scoped>
@keyframes slice-in {
    from {
        opacity: 0;
        transform: scale(0.8);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

.animate-slice-in {
    animation: slice-in 0.6s ease-out forwards;
}

/* Responsividade para mobile */
@media (max-width: 768px) {
    .text-[10px] {
        font-size: 10px;
        line-height: 1.2;
    }

    /* Melhorar legibilidade em mobile */
    .font-semibold {
        font-weight: 600;
    }

    /* Ajustar espaçamento em mobile */
    .space-y-2>*+* {
        margin-top: 0.5rem;
    }
}

/* Melhorar touch targets em mobile */
@media (max-width: 768px) {
    path {
        stroke-width: 2;
    }

    /* Aumentar área de toque para legendas */
    .cursor-pointer {
        min-height: 44px;
        display: flex;
        align-items: center;
    }
}
</style>

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
                    <div class="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse">
                    </div>
                    <span class="text-sm text-slate-600">{{ period }}</span>
                </div>
            </div>

            <!-- Chart Container -->
            <div class="relative">
                <svg :width="chartWidth" :height="chartHeight" class="w-full" :style="{ height: mobileHeight }">
                    <!-- Gradient Definitions -->
                    <defs>
                        <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
                            <stop offset="50%" style="stop-color:#059669;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#047857;stop-opacity:1" />
                        </linearGradient>
                        <filter id="barGlow">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    <!-- Grid Lines -->
                    <g v-for="i in 5" :key="'grid-' + i" class="opacity-30">
                        <line :x1="isMobile ? 20 : 40"
                            :y1="(isMobile ? 20 : 40) + (i - 1) * (chartHeight - (isMobile ? 40 : 80)) / 4"
                            :x2="chartWidth - (isMobile ? 20 : 40)"
                            :y2="(isMobile ? 20 : 40) + (i - 1) * (chartHeight - (isMobile ? 40 : 80)) / 4"
                            stroke="#e2e8f0" stroke-width="1" stroke-dasharray="2,2" />
                    </g>

                    <!-- Bars with Animation -->
                    <g v-if="chartData.length > 0">
                        <rect v-for="(bar, index) in bars" :key="index" :x="bar.x" :y="bar.y" :width="bar.width"
                            :height="bar.height" fill="url(#barGradient)" filter="url(#barGlow)"
                            class="hover:opacity-90 transition-all duration-300 cursor-pointer animate-grow-up"
                            :style="`animation-delay: ${index * 0.1}s`" @mouseover="showTooltip($event, bar)"
                            @mouseout="hideTooltip" />

                        <!-- Bar Labels -->
                        <text v-for="(bar, index) in bars" :key="'label-' + index" :x="bar.x + bar.width / 2"
                            :y="chartHeight - (isMobile ? 8 : 15)" text-anchor="middle"
                            :class="isMobile ? 'text-[10px]' : 'text-xs'" class="fill-slate-600 font-medium">
                            {{ isMobile.value && bar.label.length > 8 ? bar.label.substring(0, 6) + '...' : bar.label }}
                        </text>

                        <!-- Value Labels on Top -->
                        <text v-for="(bar, index) in bars" :key="'value-' + index" :x="bar.x + bar.width / 2"
                            :y="bar.y - (isMobile ? 4 : 8)" text-anchor="middle"
                            :class="isMobile ? 'text-[10px]' : 'text-xs'" class="fill-slate-700 font-semibold">
                            {{ bar.value }}
                        </text>
                    </g>

                    <!-- Loading Animation -->
                    <g v-else class="animate-pulse">
                        <rect :x="isMobile ? 20 : 40" :y="isMobile ? 20 : 40" :width="chartWidth - (isMobile ? 40 : 80)"
                            :height="chartHeight - (isMobile ? 40 : 80)" fill="#f1f5f9" rx="8" />
                    </g>
                </svg>

                <!-- Interactive Tooltip -->
                <div v-if="tooltip.visible"
                    class="absolute bg-slate-900 text-white text-sm rounded-xl px-4 py-3 shadow-2xl z-20 pointer-events-none transform -translate-x-1/2 -translate-y-full"
                    :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }">
                    <div class="font-semibold text-white">{{ tooltip.label }}</div>
                    <div class="text-green-300 mt-1">{{ tooltip.value }}</div>
                    <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                        <div class="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900">
                        </div>
                    </div>
                </div>
            </div>

            <!-- Stats Footer -->
            <div class="mt-6 grid grid-cols-3 gap-4">
                <div class="text-center">
                    <div class="text-2xl font-bold text-slate-800">{{ totalValue }}</div>
                    <div class="text-xs text-slate-500">Total</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl font-bold text-slate-800">{{ avgValue }}</div>
                    <div class="text-xs text-slate-500">Média</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl font-bold text-slate-800">{{ maxValue }}</div>
                    <div class="text-xs text-slate-500">Maior</div>
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
        default: 'Gráfico de Barras Moderno'
    },
    subtitle: {
        type: String,
        default: 'Dados comparativos'
    },
    data: {
        type: Array,
        default: () => []
    },
    period: {
        type: String,
        default: 'Últimos 7 dias'
    },
    width: {
        type: Number,
        default: 400
    },
    height: {
        type: Number,
        default: 300
    }
})

// Hook responsivo
const { isMobile, screenWidth } = useResponsive()

// Computed properties para responsividade
const chartWidth = computed(() => isMobile.value ? Math.min(screenWidth.value - 32, 400) : props.width)
const chartHeight = computed(() => isMobile.value ? 250 : props.height)
const mobileHeight = computed(() => isMobile.value ? '250px' : '320px')

const tooltip = ref({
    visible: false,
    x: 0,
    y: 0,
    label: '',
    value: ''
})

const chartData = computed(() => {
    if (!props.data || props.data.length === 0) return []
    return props.data.map((item, index) => ({
        x: index,
        y: item.value || item.amount || item.sales || 0,
        label: item.label || item.name || `Item ${index + 1}`
    }))
})

const bars = computed(() => {
    if (chartData.value.length === 0) return []

    const padding = isMobile.value ? 20 : 40
    const chartWidthValue = chartWidth.value - (padding * 2)
    const chartHeightValue = chartHeight.value - (padding * 2)
    const barWidth = Math.max(chartWidthValue / chartData.value.length * 0.6, isMobile.value ? 20 : 30)
    const barSpacing = chartWidthValue / chartData.value.length

    const maxValue = Math.max(...chartData.value.map(d => d.y))
    const minValue = Math.min(...chartData.value.map(d => d.y))
    const valueRange = maxValue - minValue || 1

    return chartData.value.map((point, index) => ({
        x: padding + (index * barSpacing) + (barSpacing - barWidth) / 2,
        y: padding + chartHeightValue - ((point.y - minValue) / valueRange) * chartHeightValue,
        width: barWidth,
        height: ((point.y - minValue) / valueRange) * chartHeightValue,
        label: point.label,
        value: point.y
    }))
})

const totalValue = computed(() => {
    if (chartData.value.length === 0) return 0
    return chartData.value.reduce((sum, item) => sum + item.y, 0).toFixed(0)
})

const maxValue = computed(() => {
    if (chartData.value.length === 0) return 0
    return Math.max(...chartData.value.map(d => d.y)).toFixed(0)
})

const avgValue = computed(() => {
    if (chartData.value.length === 0) return 0
    const sum = chartData.value.reduce((acc, d) => acc + d.y, 0)
    return (sum / chartData.value.length).toFixed(0)
})

const showTooltip = (event, bar) => {
    tooltip.value = {
        visible: true,
        x: event.clientX - event.target.closest('svg').getBoundingClientRect().left,
        y: event.clientY - event.target.closest('svg').getBoundingClientRect().top,
        label: bar.label,
        value: `${bar.value} unidades`
    }
}

const hideTooltip = () => {
    tooltip.value.visible = false
}
</script>

<style scoped>
@keyframes grow-up {
    from {
        height: 0;
        y: 100%;
    }

    to {
        height: var(--final-height);
        y: var(--final-y);
    }
}

.animate-grow-up {
    animation: grow-up 0.8s ease-out forwards;
}

/* Responsividade para mobile */
@media (max-width: 768px) {
    .text-[10px] {
        font-size: 10px;
        line-height: 1.2;
    }

    /* Melhorar legibilidade em mobile */
    .fill-slate-600 {
        fill: #475569;
    }

    .fill-slate-700 {
        fill: #334155;
    }
}

/* Melhorar touch targets em mobile */
@media (max-width: 768px) {
    rect {
        min-width: 20px;
        min-height: 20px;
    }
}
</style>

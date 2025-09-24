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
                    <div class="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                    <span class="text-sm text-slate-600">{{ period }}</span>
                </div>
            </div>

            <!-- Chart Container -->
            <div class="relative">
                <svg :width="width" :height="height" class="w-full h-80">
                    <!-- Gradient Definitions -->
                    <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
                            <stop offset="50%" style="stop-color:#8b5cf6;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:1" />
                        </linearGradient>
                        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.3" />
                            <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    <!-- Grid Lines -->
                    <g v-for="i in 5" :key="'grid-' + i" class="opacity-30">
                        <line :x1="40" :y1="40 + (i - 1) * (height - 80) / 4" :x2="width - 40"
                            :y2="40 + (i - 1) * (height - 80) / 4" stroke="#e2e8f0" stroke-width="1"
                            stroke-dasharray="2,2" />
                    </g>

                    <!-- Chart Area -->
                    <g v-if="chartData.length > 0">
                        <!-- Area Fill with Animation -->
                        <path :d="areaPath" fill="url(#areaGradient)" class="animate-fade-in"
                            style="animation-delay: 0.5s" />

                        <!-- Animated Line -->
                        <path :d="linePath" fill="none" stroke="url(#lineGradient)" stroke-width="3" filter="url(#glow)"
                            class="animate-draw-line" style="animation-delay: 1s" />

                        <!-- Data Points with Hover Effects -->
                        <g v-for="(point, index) in chartPoints" :key="index">
                            <circle :cx="point.x" :cy="point.y" r="6" fill="white" stroke="url(#lineGradient)"
                                stroke-width="3"
                                class="hover:r-8 transition-all duration-300 cursor-pointer animate-bounce-in"
                                :style="`animation-delay: ${1.5 + index * 0.1}s`"
                                @mouseover="showTooltip($event, point)" @mouseout="hideTooltip" />
                        </g>
                    </g>

                    <!-- Loading Animation -->
                    <g v-else class="animate-pulse">
                        <rect x="40" y="40" :width="width - 80" :height="height - 80" fill="#f1f5f9" rx="8" />
                    </g>
                </svg>

                <!-- Interactive Tooltip -->
                <div v-if="tooltip.visible"
                    class="absolute bg-slate-900 text-white text-sm rounded-xl px-4 py-3 shadow-2xl z-20 pointer-events-none transform -translate-x-1/2 -translate-y-full"
                    :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }">
                    <div class="font-semibold text-white">{{ tooltip.label }}</div>
                    <div class="text-blue-300 mt-1">{{ tooltip.value }}</div>
                    <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                        <div class="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900">
                        </div>
                    </div>
                </div>
            </div>

            <!-- Stats Footer -->
            <div class="mt-6 grid grid-cols-3 gap-4">
                <div class="text-center">
                    <div class="text-2xl font-bold text-slate-800">{{ maxValue }}</div>
                    <div class="text-xs text-slate-500">Máximo</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl font-bold text-slate-800">{{ avgValue }}</div>
                    <div class="text-xs text-slate-500">Média</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl font-bold text-slate-800">{{ minValue }}</div>
                    <div class="text-xs text-slate-500">Mínimo</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
    title: {
        type: String,
        default: 'Gráfico de Linha Moderno'
    },
    subtitle: {
        type: String,
        default: 'Dados em tempo real'
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
        label: item.label || item.period || `Ponto ${index + 1}`
    }))
})

const chartPoints = computed(() => {
    if (chartData.value.length === 0) return []

    const padding = 40
    const chartWidth = props.width - (padding * 2)
    const chartHeight = props.height - (padding * 2)

    const maxValue = Math.max(...chartData.value.map(d => d.y))
    const minValue = Math.min(...chartData.value.map(d => d.y))
    const valueRange = maxValue - minValue || 1

    return chartData.value.map((point, index) => ({
        x: padding + (index * chartWidth) / (chartData.value.length - 1),
        y: padding + chartHeight - ((point.y - minValue) / valueRange) * chartHeight,
        label: point.label,
        value: point.y
    }))
})

const linePath = computed(() => {
    if (chartPoints.value.length === 0) return ''

    let path = `M ${chartPoints.value[0].x} ${chartPoints.value[0].y}`

    for (let i = 1; i < chartPoints.value.length; i++) {
        path += ` L ${chartPoints.value[i].x} ${chartPoints.value[i].y}`
    }

    return path
})

const areaPath = computed(() => {
    if (chartPoints.value.length === 0) return ''

    const firstPoint = chartPoints.value[0]
    const lastPoint = chartPoints.value[chartPoints.value.length - 1]

    let path = `M ${firstPoint.x} ${props.height - 40}`
    path += ` L ${firstPoint.x} ${firstPoint.y}`

    for (let i = 1; i < chartPoints.value.length; i++) {
        path += ` L ${chartPoints.value[i].x} ${chartPoints.value[i].y}`
    }

    path += ` L ${lastPoint.x} ${props.height - 40} Z`

    return path
})

const maxValue = computed(() => {
    if (chartData.value.length === 0) return 0
    return Math.max(...chartData.value.map(d => d.y)).toFixed(0)
})

const minValue = computed(() => {
    if (chartData.value.length === 0) return 0
    return Math.min(...chartData.value.map(d => d.y)).toFixed(0)
})

const avgValue = computed(() => {
    if (chartData.value.length === 0) return 0
    const sum = chartData.value.reduce((acc, d) => acc + d.y, 0)
    return (sum / chartData.value.length).toFixed(0)
})

const showTooltip = (event, point) => {
    tooltip.value = {
        visible: true,
        x: event.clientX - event.target.closest('svg').getBoundingClientRect().left,
        y: event.clientY - event.target.closest('svg').getBoundingClientRect().top,
        label: point.label,
        value: `MT ${point.value.toFixed(2).replace('.', ',')}`
    }
}

const hideTooltip = () => {
    tooltip.value.visible = false
}
</script>

<style scoped>
@keyframes fade-in {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes draw-line {
    from {
        stroke-dasharray: 1000;
        stroke-dashoffset: 1000;
    }

    to {
        stroke-dasharray: 1000;
        stroke-dashoffset: 0;
    }
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1.2);
    }

    100% {
        transform: scale(1);
    }
}

.animate-fade-in {
    animation: fade-in 1s ease-out forwards;
}

.animate-draw-line {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: draw-line 2s ease-out forwards;
}

.animate-bounce-in {
    animation: bounce-in 0.6s ease-out forwards;
}
</style>

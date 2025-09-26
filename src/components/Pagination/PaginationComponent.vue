<template>
    <div v-if="totalPages > 1"
        class="flex items-center justify-between bg-white/95 backdrop-blur-sm rounded-xl border border-slate-200 shadow-sm p-4">
        <!-- Informações da paginação -->
        <div class="flex items-center gap-4">
            <div class="text-sm text-slate-600">
                Mostrando <span class="font-semibold text-slate-800">{{ startItem }}</span> a
                <span class="font-semibold text-slate-800">{{ endItem }}</span> de
                <span class="font-semibold text-slate-800">{{ totalItems }}</span> itens
            </div>
        </div>

        <!-- Controles de paginação -->
        <div class="flex items-center gap-2">
            <!-- Botão Anterior -->
            <button @click="goToPage(currentPage - 1)" :disabled="currentPage <= 1"
                class="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200"
                :class="currentPage <= 1
                    ? 'text-slate-400 cursor-not-allowed bg-slate-100'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Anterior
            </button>

            <!-- Números das páginas -->
            <div class="flex items-center gap-1">
                <!-- Primeira página -->
                <button v-if="showFirstPage" @click="goToPage(1)"
                    class="w-8 h-8 flex items-center justify-center text-sm font-medium rounded-lg transition-all duration-200"
                    :class="currentPage === 1
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                        : 'text-slate-700 hover:bg-slate-100'">
                    1
                </button>

                <!-- Separador se necessário -->
                <span v-if="showFirstEllipsis" class="px-2 text-slate-400">...</span>

                <!-- Páginas do meio -->
                <button v-for="page in visiblePages" :key="page" @click="goToPage(page)"
                    class="w-8 h-8 flex items-center justify-center text-sm font-medium rounded-lg transition-all duration-200"
                    :class="currentPage === page
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                        : 'text-slate-700 hover:bg-slate-100'">
                    {{ page }}
                </button>

                <!-- Separador se necessário -->
                <span v-if="showLastEllipsis" class="px-2 text-slate-400">...</span>

                <!-- Última página -->
                <button v-if="showLastPage" @click="goToPage(totalPages)"
                    class="w-8 h-8 flex items-center justify-center text-sm font-medium rounded-lg transition-all duration-200"
                    :class="currentPage === totalPages
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                        : 'text-slate-700 hover:bg-slate-100'">
                    {{ totalPages }}
                </button>
            </div>

            <!-- Botão Próximo -->
            <button @click="goToPage(currentPage + 1)" :disabled="currentPage >= totalPages"
                class="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200"
                :class="currentPage >= totalPages
                    ? 'text-slate-400 cursor-not-allowed bg-slate-100'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'">
                Próximo
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </button>
        </div>

        <!-- Seletor de itens por página -->
        <div class="flex items-center gap-2">
            <span class="text-sm text-slate-600">Itens por página:</span>
            <select :value="itemsPerPage" @change="changeItemsPerPage"
                class="px-3 py-1 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
    currentPage: {
        type: Number,
        required: true
    },
    totalItems: {
        type: Number,
        required: true
    },
    itemsPerPage: {
        type: Number,
        default: 10
    },
    maxVisiblePages: {
        type: Number,
        default: 5
    }
})

// Emits
const emit = defineEmits(['page-change', 'items-per-page-change'])

// Computed properties
const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage))

const startItem = computed(() => {
    return (props.currentPage - 1) * props.itemsPerPage + 1
})

const endItem = computed(() => {
    return Math.min(props.currentPage * props.itemsPerPage, props.totalItems)
})

const visiblePages = computed(() => {
    const pages = []
    const start = Math.max(1, props.currentPage - Math.floor(props.maxVisiblePages / 2))
    const end = Math.min(props.totalPages, start + props.maxVisiblePages - 1)

    for (let i = start; i <= end; i++) {
        pages.push(i)
    }

    return pages
})

const showFirstPage = computed(() => {
    return props.currentPage > Math.floor(props.maxVisiblePages / 2) + 1
})

const showLastPage = computed(() => {
    return props.currentPage < props.totalPages - Math.floor(props.maxVisiblePages / 2)
})

const showFirstEllipsis = computed(() => {
    return props.currentPage > Math.floor(props.maxVisiblePages / 2) + 2
})

const showLastEllipsis = computed(() => {
    return props.currentPage < props.totalPages - Math.floor(props.maxVisiblePages / 2) - 1
})

// Methods
const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value && page !== props.currentPage) {
        emit('page-change', page)
    }
}

const changeItemsPerPage = (event) => {
    const newItemsPerPage = parseInt(event.target.value)
    emit('items-per-page-change', newItemsPerPage)
}
</script>

<template>
    <div class="min-h-screen bg-slate-50">
        <!-- Header Mobile -->
        <div class="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 shadow-xl">
            <div class="px-4 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div
                            class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg">
                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                                </path>
                            </svg>
                        </div>
                        <div>
                            <h1 class="text-xl font-bold text-white">Relatórios</h1>
                            <p class="text-blue-100 text-sm">
                                {{ isAdmin ? 'Análise do sistema' : isManager ? 'Análise da equipe' : 'Acesso limitado'
                                }}
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <button v-if="canExportReports" @click="exportReport"
                            class="p-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                                </path>
                            </svg>
                        </button>
                        <button @click="refreshData" :disabled="loading"
                            class="p-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors disabled:opacity-50">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="p-4 space-y-4">
            <!-- Loading State -->
            <div v-if="loading" class="flex items-center justify-center py-12">
                <div class="flex items-center gap-3">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span class="text-slate-600">Carregando relatórios...</span>
                </div>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-xl p-4">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                        <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-sm font-semibold text-red-800">Erro ao carregar relatórios</h3>
                        <p class="text-sm text-red-600">{{ error }}</p>
                    </div>
                </div>
                <button @click="refreshData"
                    class="mt-3 px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors">
                    Tentar novamente
                </button>
            </div>

            <!-- 1. KPIs PRINCIPAIS - Mais importantes -->
            <div v-else class="bg-white rounded-xl border border-slate-200 shadow-sm">
                <div class="p-4">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-slate-800"> KPIs Principais</h3>
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            <span class="text-xs text-blue-600 font-medium">Atualizado</span>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                            <div class="text-2xl font-bold text-green-600 mb-1">{{ formatPrice(metrics.totalRevenue)
                                }}MT
                            </div>
                            <div class="text-sm font-medium text-slate-700">Receita Total</div>
                        </div>
                        <div class="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div class="text-2xl font-bold text-blue-600 mb-1">{{ metrics.totalSales }}</div>
                            <div class="text-sm font-medium text-slate-700">Total Vendas</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 2. FILTROS - Segunda prioridade -->
            <div class="bg-white rounded-xl border border-slate-200 shadow-sm">
                <div class="p-4">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z">
                                </path>
                            </svg>
                            <h2 class="text-sm font-semibold text-slate-700"> Filtros de Período</h2>
                        </div>
                        <button @click="clearFilters" class="text-xs text-blue-600 hover:text-blue-800 font-medium">
                            Limpar
                        </button>
                    </div>

                    <div class="space-y-4">
                        <!-- Datas -->
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block text-xs font-medium text-slate-700 mb-2">Data Inicial</label>
                                <input v-model="filters.startDate" type="date"
                                    class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            </div>
                            <div>
                                <label class="block text-xs font-medium text-slate-700 mb-2">Data Final</label>
                                <input v-model="filters.endDate" type="date"
                                    class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            </div>
                        </div>

                        <!-- Tipo de Relatório -->
                        <div>
                            <label class="block text-xs font-medium text-slate-700 mb-2">Tipo de Relatório</label>
                            <select v-model="filters.reportType"
                                class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                <option value="sales">Vendas</option>
                                <option value="products">Produtos</option>
                                <option value="clients">Clientes a Fiado</option>
                                <option value="financial">Financeiro</option>
                            </select>
                        </div>

                        <!-- Botão Aplicar -->
                        <button @click="applyFilters"
                            class="w-full px-4 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                            Aplicar Filtros
                        </button>
                    </div>
                </div>
            </div>

            <!-- KPIs Modernos -->
            <div class="grid grid-cols-1 gap-4">
                <ModernKPICard title="Vendas Totais" subtitle="Período selecionado" :value="metrics.totalSales"
                    description="vendas realizadas" trend="up" :trend-percentage="metrics.salesTrendPercentage"
                    :auto-calculate="true" :current-value="metrics.totalSales" :max-value="100" status="Crescendo"
                    period="Últimos 30 dias" icon="chart" color="green" />

                <ModernKPICard title="Receita Total" subtitle="Faturamento" :value="formatPrice(metrics.totalRevenue)"
                    description="faturamento total" trend="up" :trend-percentage="metrics.revenueTrendPercentage"
                    :auto-calculate="true" :current-value="metrics.totalRevenue" :max-value="1000" status="Excelente"
                    period="Últimos 30 dias" icon="money" color="blue" />

                <ModernKPICard title="Produtos Vendidos" subtitle="Quantidade" :value="metrics.productsSold"
                    description="unidades vendidas" trend="up" :trend-percentage="metrics.productsTrendPercentage"
                    :auto-calculate="true" :current-value="metrics.productsSold" :max-value="500" status="Ativo"
                    period="Últimos 30 dias" icon="box" color="purple" />

                <ModernKPICard title="Novos Clientes a Fiado" subtitle="Cadastros" :value="metrics.newClients"
                    description="clientes a fiado registados" trend="up"
                    :trend-percentage="metrics.clientsTrendPercentage" :auto-calculate="true"
                    :current-value="metrics.newClients" :max-value="50" status="Crescendo" period="Últimos 30 dias"
                    icon="users" color="yellow" />
            </div>

            <!-- Gráficos Modernos -->
            <div class="space-y-6">
                <!-- Vendas por Período -->
                <ModernLineChart title="Vendas por Período" subtitle="Evolução das vendas - Últimos 30 dias"
                    :data="salesData" period="Últimos 30 dias" />

                <!-- Produtos Mais Vendidos -->
                <ModernBarChart title="Produtos Mais Vendidos" subtitle="Top 10 produtos - Período selecionado"
                    :data="topProductsData" period="Período selecionado" />
            </div>

            <!-- Análise Financeira Moderna -->
            <div class="space-y-6">
                <!-- Distribuição de Vendas -->
                <ModernPieChart title="Distribuição de Vendas" subtitle="Por categoria" :data="salesDistributionData"
                    total-label="Total" period="Período atual" />

                <!-- Métricas Financeiras Modernas -->
                <div class="grid grid-cols-1 gap-4">
                    <ModernKPICard title="Ticket Médio" subtitle="Por venda" :value="formatPrice(metrics.averageTicket)"
                        description="valor médio por venda" trend="up" :trend-percentage="12" :auto-calculate="true"
                        :current-value="metrics.averageTicket" :max-value="150" status="Bom" period="Últimos 30 dias"
                        icon="money" color="blue" />

                    <ModernKPICard title="Margem de Lucro" subtitle="Percentual" :value="metrics.profitMargin + '%'"
                        description="margem de lucro" trend="up" :trend-percentage="8" :auto-calculate="true"
                        :current-value="metrics.profitMargin" :max-value="100" status="Excelente"
                        period="Últimos 30 dias" icon="chart" color="green" />

                    <ModernKPICard title="Vendas por Dia" subtitle="Média diária" :value="metrics.salesPerDay"
                        description="vendas por dia" trend="up" :trend-percentage="15" :auto-calculate="true"
                        :current-value="metrics.salesPerDay" :max-value="10" status="Crescendo" period="Últimos 30 dias"
                        icon="shopping" color="purple" />

                    <ModernKPICard title="Crescimento" subtitle="Percentual"
                        :value="(metrics.growth >= 0 ? '+' : '') + metrics.growth + '%'"
                        description="crescimento do negócio" :trend="metrics.growth >= 0 ? 'up' : 'down'"
                        :trend-percentage="Math.abs(metrics.growth)" :auto-calculate="true"
                        :current-value="Math.abs(metrics.growth)" :max-value="100"
                        :status="metrics.growth >= 0 ? 'Crescendo' : 'Declinando'" period="Últimos 30 dias" icon="chart"
                        :color="metrics.growth >= 0 ? 'green' : 'red'" />
                </div>
            </div>

            <!-- Vendas Detalhadas Modernas -->
            <div
                class="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-xl border border-slate-200 p-6 relative overflow-hidden">
                <!-- Background Pattern -->
                <div class="absolute inset-0 opacity-5">
                    <div class="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200"></div>
                </div>

                <div class="relative z-10">
                    <div class="flex items-center justify-between mb-6">
                        <div>
                            <h3 class="text-xl font-bold text-slate-800">Vendas Detalhadas</h3>
                            <p class="text-sm text-slate-600 mt-1">Histórico de vendas do período</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <div
                                class="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse">
                            </div>
                            <span class="text-sm text-slate-600">{{ detailedSales.length }} vendas</span>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div v-for="sale in detailedSales" :key="sale.id"
                            class="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group">
                            <div class="flex justify-between items-start mb-3">
                                <div class="flex items-center gap-3">
                                    <div
                                        class="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                                        <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                                            </path>
                                        </svg>
                                    </div>
                                    <div>
                                        <div class="flex items-center gap-2">
                                            <span class="text-sm font-semibold text-slate-900">#{{ sale.number }}</span>
                                            <span class="text-xs text-slate-500">{{ formatDate(sale.date) }}</span>
                                        </div>
                                        <div class="text-sm text-slate-600">{{ sale.client }}</div>
                                    </div>
                                </div>
                                <span class="px-3 py-1 text-xs font-medium rounded-full"
                                    :class="getStatusClass(sale.status)">
                                    {{ sale.status }}
                                </span>
                            </div>

                            <div class="grid grid-cols-2 gap-4 mb-3">
                                <div class="bg-slate-50 rounded-lg p-3">
                                    <div class="text-xs text-slate-500 mb-1">Produtos</div>
                                    <div class="text-sm font-semibold text-slate-800">{{ sale.products }} itens</div>
                                </div>
                                <div class="bg-slate-50 rounded-lg p-3">
                                    <div class="text-xs text-slate-500 mb-1">Total</div>
                                    <div class="text-lg font-bold text-green-600">MT {{ formatPrice(sale.total) }}</div>
                                </div>
                            </div>

                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2 text-xs text-slate-500">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <span>{{ formatDate(sale.date) }}</span>
                                </div>
                                <button
                                    class="text-xs text-blue-600 hover:text-blue-800 font-medium group-hover:underline">
                                    Ver detalhes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useReportsStore } from '@/stores/reports'
import { useAuthStore } from '@/stores/auth'
import { permissionManager, PERMISSIONS } from '@/utils/permissions'
import ModernLineChart from '../components/Charts/ModernLineChart.vue'
import ModernBarChart from '../components/Charts/ModernBarChart.vue'
import ModernPieChart from '../components/Charts/ModernPieChart.vue'
import ModernKPICard from '../components/Metrics/ModernKPICard.vue'

// Store
const authStore = useAuthStore()
const reportsStore = useReportsStore()

// Controle de acesso baseado em roles
const userRole = computed(() => authStore.user?.role || 'seller')
const isAdmin = computed(() => userRole.value === 'admin')
const isManager = computed(() => userRole.value === 'manager')
const isSeller = computed(() => userRole.value === 'seller')

// Permissões específicas
const canViewReports = computed(() => permissionManager.hasPermission(PERMISSIONS.REPORTS_VIEW))
const canExportReports = computed(() => permissionManager.hasPermission(PERMISSIONS.REPORTS_EXPORT))

// Computed properties
const loading = computed(() => reportsStore.loading)
const error = computed(() => reportsStore.error)
const filters = computed(() => reportsStore.filters)
const metrics = computed(() => reportsStore.metrics)
const salesData = computed(() => reportsStore.salesData)
const topProductsData = computed(() => reportsStore.topProductsData)
const salesDistributionData = computed(() => reportsStore.salesDistributionData)
const detailedSales = computed(() => reportsStore.detailedSales)

// Métodos
const formatPrice = (price) => {
    return parseFloat(price).toFixed(2).replace('.', ',')
}

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-PT')
}

const getStatusClass = (status) => {
    const classes = {
        'Pago': 'bg-green-100 text-green-800',
        'Pendente': 'bg-yellow-100 text-yellow-800',
        'Cancelado': 'bg-red-100 text-red-800'
    }
    return classes[status] || 'bg-slate-100 text-slate-800'
}

const applyFilters = async () => {
    await reportsStore.applyFilters(filters.value)
}

const clearFilters = async () => {
    await reportsStore.clearFilters()
}

const refreshData = async () => {
    // Limpar erro antes de recarregar
    reportsStore.clearError()
    await reportsStore.loadReportData()
}

const exportReport = async () => {
    await reportsStore.exportReport()
}

// Lifecycle
onMounted(async () => {
    // Configurar permissionManager com o usuário atual
    if (authStore.user) {
        permissionManager.setCurrentUser(authStore.user)
    }

    // Carregar dados iniciais
    await reportsStore.loadReportData()
})
</script>

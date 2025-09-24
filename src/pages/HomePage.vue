<template>
    <div class="min-h-screen bg-slate-50">
        <!-- Header Limpo -->
        <div class="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 shadow-xl">
            <div class="px-4 py-4">
                <div class="flex items-center justify-between">
                    <!-- Logo e Título -->
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                                </path>
                            </svg>
                        </div>
                        <div>
                            <h1 class="text-xl font-bold text-white">Dashboard</h1>
                            <p class="text-blue-100 text-sm">Visão geral do negócio</p>
                        </div>
                    </div>

                    <!-- Ações Mobile -->
                    <div class="flex items-center gap-3">
                        <!-- Nova Venda -->
                        <button @click="openSaleSheet"
                            class="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors font-medium text-sm">
                            Nova Venda
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="p-4 space-y-4 -mt-2">
            <!-- 1. MÉTRICAS CRÍTICAS - Mais importantes primeiro -->
            <div
                class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/30 pointer-events-none">
                </div>
                <div class="relative z-10">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-lg font-semibold text-slate-800"> Receita de Hoje</h2>
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span class="text-xs text-green-600 font-medium">Atualizado</span>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <!-- Receita Total - MAIS IMPORTANTE -->
                        <div
                            class="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                            <div class="text-3xl font-bold text-green-600 mb-1">MT {{
                                formatPrice(dashboard.today.revenue) }}</div>
                            <div class="text-sm font-medium text-slate-700">Receita Total</div>
                            <div class="text-xs text-green-600 mt-1">{{ dashboard.today.sales }} vendas</div>
                        </div>
                        <!-- Vendas Pendentes - CRÍTICO -->
                        <div
                            class="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                            <div class="text-3xl font-bold text-yellow-600 mb-1">MT {{
                                formatPrice(dashboard.pending.amount) }}</div>
                            <div class="text-sm font-medium text-slate-700">Pendente</div>
                            <div class="text-xs text-yellow-600 mt-1">{{ dashboard.pending.sales }} vendas</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 2. ALERTAS URGENTES - Segunda prioridade -->
            <div
                class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-red-50/50 to-pink-50/30 pointer-events-none">
                </div>
                <div class="relative z-10">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-lg font-semibold text-slate-800"> Alertas Urgentes</h2>
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            <span class="text-xs text-red-600 font-medium">Atenção</span>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <!-- Stock Baixo - CRÍTICO -->
                        <div
                            class="text-center p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border border-red-200">
                            <div class="text-3xl font-bold text-red-600 mb-1">{{ dashboard.lowStock.products }}</div>
                            <div class="text-sm font-medium text-slate-700">Stock Baixo</div>
                            <div class="text-xs text-red-600 mt-1">Produtos críticos</div>
                        </div>
                        <!-- Total Produtos - INFORMATIVO -->
                        <div
                            class="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                            <div class="text-3xl font-bold text-blue-600 mb-1">{{ dashboard.totalProducts }}</div>
                            <div class="text-sm font-medium text-slate-700">Total Produtos</div>
                            <div class="text-xs text-blue-600 mt-1">Em estoque</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 3. NOTIFICAÇÕES PRIORITÁRIAS - Terceira prioridade -->
            <div
                class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-50/20 pointer-events-none">
                </div>
                <div class="relative z-10">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-lg font-semibold text-slate-800">Notificações Prioritárias</h2>
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            <span class="text-xs text-blue-600 font-medium">Tempo real</span>
                        </div>
                    </div>
                    <div class="space-y-3">
                        <!-- ALERTA CRÍTICO - Stock baixo -->
                        <div
                            class="flex items-center gap-3 p-4 bg-red-50 rounded-xl border-l-4 border-red-400 shadow-sm">
                            <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <div class="flex-1">
                                <p class="text-sm font-bold text-red-800"> Stock baixo detectado</p>
                                <p class="text-xs text-red-600">2 produtos precisam de reposição urgente</p>
                            </div>
                            <div class="text-xs text-red-500 font-medium">CRÍTICO</div>
                        </div>

                        <!-- SUCESSO - Nova venda -->
                        <div
                            class="flex items-center gap-3 p-4 bg-green-50 rounded-xl border-l-4 border-green-400 shadow-sm">
                            <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <div class="flex-1">
                                <p class="text-sm font-bold text-green-800"> Nova venda realizada</p>
                                <p class="text-xs text-green-600">Venda #004 por MT 150,00 - há 2 minutos</p>
                            </div>
                            <div class="text-xs text-green-500 font-medium">SUCESSO</div>
                        </div>

                        <!-- INFO - Meta mensal -->
                        <div
                            class="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border-l-4 border-blue-400 shadow-sm">
                            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <div class="flex-1">
                                <p class="text-sm font-bold text-blue-800"> Meta mensal atingida</p>
                                <p class="text-xs text-blue-600">68% da meta de vendas alcançada</p>
                            </div>
                            <div class="text-xs text-blue-500 font-medium">INFO</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Ações Principais Melhoradas -->
            <div
                class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-gray-50/30 pointer-events-none">
                </div>
                <div class="relative z-10">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-lg font-semibold text-slate-800"> Ações Principais</h2>
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 bg-slate-500 rounded-full"></div>
                            <span class="text-xs text-slate-500">Acesso rápido</span>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <!-- 1. NOVA VENDA - Mais importante -->
                        <button @click="openSaleSheet" class="group w-full">
                            <div
                                class="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg hover:from-green-100 hover:to-emerald-100 transition-all duration-200 text-center border-2 border-green-200 hover:border-green-300 hover:shadow-lg">
                                <div
                                    class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-lg">
                                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6">
                                        </path>
                                    </svg>
                                </div>
                                <h3 class="font-bold text-slate-800 mb-1">Vendas</h3>
                                <p class="text-sm text-green-600 font-medium">Gerir vendas</p>
                            </div>
                        </button>

                        <!-- 2. PRODUTOS - Segundo mais importante -->
                        <router-link to="/app/products" class="group">
                            <div
                                class="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg hover:from-blue-100 hover:to-cyan-100 transition-all duration-200 text-center border-2 border-blue-200 hover:border-blue-300 hover:shadow-lg">
                                <div
                                    class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-lg">
                                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                                    </svg>
                                </div>
                                <h3 class="font-bold text-slate-800 mb-1"> Produtos</h3>
                                <p class="text-sm text-blue-600 font-medium">Gerir stock</p>
                            </div>
                        </router-link>

                        <!-- 3. CLIENTES - Terceiro mais importante -->
                        <router-link to="/app/clients" class="group">
                            <div
                                class="p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg hover:from-orange-100 hover:to-red-100 transition-all duration-200 text-center border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg">
                                <div
                                    class="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-lg">
                                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z">
                                        </path>
                                    </svg>
                                </div>
                                <h3 class="font-bold text-slate-800 mb-1"> Clientes</h3>
                                <p class="text-sm text-orange-600 font-medium">Gerir clientes</p>
                            </div>
                        </router-link>

                        <!-- 4. RELATÓRIOS - Menos usado -->
                        <router-link to="/app/reports" class="group">
                            <div
                                class="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg hover:from-purple-100 hover:to-pink-100 transition-all duration-200 text-center border-2 border-purple-200 hover:border-purple-300 hover:shadow-lg">
                                <div
                                    class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-lg">
                                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                                        </path>
                                    </svg>
                                </div>
                                <h3 class="font-bold text-slate-800 mb-1">Relatórios</h3>
                                <p class="text-sm text-purple-600 font-medium">Ver análises</p>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>

            <!-- Alertas Importantes -->
            <div v-if="dashboard.lowStock.products > 0"
                class="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl shadow-xl border border-red-200/50 p-6 relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-red-50/30 to-orange-50/20 pointer-events-none">
                </div>
                <div class="relative z-10">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                            <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z">
                                </path>
                            </svg>
                        </div>
                        <div>
                            <h3 class="font-semibold text-red-800">Atenção: Stock Baixo</h3>
                            <p class="text-sm text-red-600">{{ dashboard.lowStock.products }} produtos precisam de
                                reposição
                            </p>
                        </div>
                    </div>
                    <div class="space-y-2">
                        <div v-for="product in dashboard.lowStock.items" :key="product.id"
                            class="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                            <div>
                                <span class="font-medium text-slate-800">{{ product.name }}</span>
                                <span class="text-sm text-slate-600 ml-2">Stock: {{ product.stock }}</span>
                            </div>
                            <span
                                class="px-2 py-1 bg-red-200 text-red-800 text-xs font-medium rounded-full">Baixo</span>
                        </div>
                    </div>
                    <div class="mt-4">
                        <router-link to="/app/products"
                            class="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                            </svg>
                            Gerir Stock
                        </router-link>
                    </div>
                </div>
            </div>

            <!-- Vendas Recentes -->
            <div
                class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-green-50/30 to-emerald-50/20 pointer-events-none">
                </div>
                <div class="relative z-10">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-lg font-semibold text-slate-800">Vendas Recentes</h2>
                        <router-link to="/sales" class="text-sm text-blue-600 hover:text-blue-800 font-medium">Ver
                            todas</router-link>
                    </div>
                    <div class="space-y-3">
                        <div v-for="sale in dashboard.recentSales" :key="sale.id"
                            class="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                            <div>
                                <span class="font-medium text-slate-800">Venda #{{ sale.number }}</span>
                                <span class="text-sm text-slate-600 ml-2">{{ sale.client }}</span>
                            </div>
                            <div class="text-right">
                                <div class="font-semibold text-green-600">MT {{ formatPrice(sale.total) }}</div>
                                <div class="text-xs text-slate-500">{{ sale.time }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Gráficos e Visualizações Mobile -->
            <div class="space-y-4">
                <!-- Gráfico de Vendas -->
                <div
                    class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-50/20 pointer-events-none">
                    </div>
                    <div class="relative z-10">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="font-semibold text-slate-800">Vendas por Período</h3>
                            <div class="text-xs text-slate-500">Últimos 30 dias</div>
                        </div>

                        <!-- Gráfico Simples de Barras -->
                        <div class="space-y-4">
                            <div v-for="period in dashboard.salesByPeriod" :key="period.period" class="space-y-2">
                                <div class="flex justify-between items-center">
                                    <span class="text-sm text-slate-600">{{ period.period }}</span>
                                    <div class="text-right">
                                        <div class="font-semibold text-slate-800">{{ period.sales }} vendas</div>
                                        <div class="text-sm text-green-600">MT {{ formatPrice(period.amount) }}</div>
                                    </div>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                                        :style="{ width: `${(period.amount / Math.max(...dashboard.salesByPeriod.map(p => p.amount))) * 100}%` }">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Gráfico de Produtos -->
                <div
                    class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-pink-50/20 pointer-events-none">
                    </div>
                    <div class="relative z-10">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="font-semibold text-slate-800">Produtos Mais Vendidos</h3>
                            <router-link to="/products" class="text-xs text-blue-600 hover:text-blue-800">Ver
                                todos</router-link>
                        </div>

                        <div class="space-y-4">
                            <div v-for="(product, index) in dashboard.topProducts" :key="product.id" class="space-y-2">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-3">
                                        <div
                                            class="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                            {{ index + 1 }}
                                        </div>
                                        <span class="text-sm text-slate-600 font-medium">{{ product.name }}</span>
                                    </div>
                                    <div class="text-right">
                                        <div class="font-semibold text-slate-800">{{ product.quantity }} vendidos</div>
                                        <div class="text-sm text-green-600">MT {{ formatPrice(product.revenue) }}</div>
                                    </div>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                                        :style="{ width: `${(product.quantity / Math.max(...dashboard.topProducts.map(p => p.quantity))) * 100}%` }">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Métricas Avançadas Mobile -->
            <div class="space-y-4">
                <!-- Comparação com Período Anterior -->
                <div
                    class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 relative overflow-hidden">
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-green-50/30 to-emerald-50/20 pointer-events-none">
                    </div>
                    <div class="relative z-10">
                        <div class="flex items-center gap-3 mb-4">
                            <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 class="font-semibold text-slate-800">Crescimento</h3>
                                <p class="text-xs text-slate-500">vs. mês anterior</p>
                            </div>
                        </div>
                        <div class="space-y-3">
                            <div class="flex justify-between items-center">
                                <span class="text-sm text-slate-600">Vendas</span>
                                <div class="flex items-center gap-2">
                                    <span class="text-lg font-bold text-green-600">+15%</span>
                                    <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-sm text-slate-600">Receita</span>
                                <div class="flex items-center gap-2">
                                    <span class="text-lg font-bold text-green-600">+22%</span>
                                    <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Meta do Mês -->
                <div
                    class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-50/20 pointer-events-none">
                    </div>
                    <div class="relative z-10">
                        <div class="flex items-center gap-3 mb-4">
                            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 class="font-semibold text-slate-800">Meta do Mês</h3>
                                <p class="text-xs text-slate-500">Vendas mensais</p>
                            </div>
                        </div>
                        <div class="space-y-3">
                            <div class="flex justify-between items-center">
                                <span class="text-sm text-slate-600">Progresso</span>
                                <span class="text-lg font-bold text-blue-600">68%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-3">
                                <div class="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500"
                                    style="width: 68%"></div>
                            </div>
                            <div class="text-center">
                                <span class="text-xs text-slate-500">MT 15.600 / MT 23.000</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Clientes Ativos -->
                <div
                    class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-pink-50/20 pointer-events-none">
                    </div>
                    <div class="relative z-10">
                        <div class="flex items-center gap-3 mb-4">
                            <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z">
                                    </path>
                                </svg>
                            </div>
                            <div>
                                <h3 class="font-semibold text-slate-800">Clientes Ativos</h3>
                                <p class="text-xs text-slate-500">Últimos 30 dias</p>
                            </div>
                        </div>
                        <div class="space-y-3">
                            <div class="text-center">
                                <div class="text-3xl font-bold text-purple-600 mb-1">127</div>
                                <div class="text-sm text-slate-600">clientes únicos</div>
                            </div>
                            <div class="flex justify-between items-center text-xs">
                                <span class="text-slate-500">Novos: 23</span>
                                <span class="text-slate-500">Retornaram: 89</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Bottom Sheet de Nova Venda -->
    <CustomBottomSheet :visible="showSaleSheet" @close="closeSaleSheet">
        <template #header>
            <div class="flex items-center gap-3">
                <div class="p-2 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6">
                        </path>
                    </svg>
                </div>
                <div>
                    <h3
                        class="text-xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        Nova Venda
                    </h3>
                    <p class="text-sm text-slate-600">Registre uma nova venda rapidamente</p>
                </div>
            </div>
        </template>

        <form @submit.prevent="saveSale" class="space-y-6">
            <!-- Informações da Venda -->
            <div class="bg-gradient-to-r from-slate-50 to-green-50 rounded-xl p-4">
                <h4 class="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                    <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                        </path>
                    </svg>
                    Informações da Venda
                </h4>

                <div class="grid grid-cols-1 gap-4">
                    <!-- Cliente -->
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-2">Cliente</label>
                        <input v-model="saleForm.client" type="text" placeholder="Nome do cliente (opcional)"
                            class="w-full px-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" />
                    </div>

                    <!-- Método de Pagamento -->
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-2">Método de Pagamento</label>
                        <select v-model="saleForm.paymentMethod"
                            class="w-full px-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors">
                            <option value="cash">Dinheiro</option>
                            <option value="card">Cartão</option>
                            <option value="transfer">Transferência</option>
                            <option value="credit">Fiado</option>
                        </select>
                    </div>

                    <!-- Observações -->
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-2">Observações</label>
                        <textarea v-model="saleForm.notes" placeholder="Observações adicionais (opcional)"
                            class="w-full px-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                            rows="3"></textarea>
                    </div>
                </div>
            </div>

            <!-- Produtos -->
            <div class="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4">
                <h4 class="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4">
                        </path>
                    </svg>
                    Produtos
                </h4>

                <div class="text-center py-8">
                    <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6">
                            </path>
                        </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-slate-800 mb-2">Adicionar Produtos</h3>
                    <p class="text-sm text-slate-600 mb-4">Selecione os produtos para esta venda</p>
                    <button type="button"
                        class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                        Escolher Produtos
                    </button>
                </div>
            </div>

            <!-- Resumo da Venda -->
            <div class="bg-gradient-to-r from-slate-50 to-purple-50 rounded-xl p-4">
                <h4 class="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                    <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z">
                        </path>
                    </svg>
                    Resumo da Venda
                </h4>

                <div class="space-y-3">
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-slate-600">Subtotal</span>
                        <span class="font-semibold text-slate-800">MT 0,00</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-slate-600">Desconto</span>
                        <span class="font-semibold text-slate-800">MT 0,00</span>
                    </div>
                    <div class="border-t border-slate-200 pt-3">
                        <div class="flex justify-between items-center">
                            <span class="text-lg font-bold text-slate-800">Total</span>
                            <span class="text-xl font-bold text-green-600">MT 0,00</span>
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <template #footer>
            <div class="flex gap-3">
                <button type="button" @click="closeSaleSheet"
                    class="flex-1 px-4 py-3 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">
                    Cancelar
                </button>
                <button type="submit" @click="saveSale"
                    class="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg"
                    :disabled="saleForm.products.length === 0">
                    <div class="flex items-center justify-center">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7">
                            </path>
                        </svg>
                        Finalizar Venda
                    </div>
                </button>
            </div>
        </template>
    </CustomBottomSheet>

</template>

<script setup>
import { ref, onMounted, reactive, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { mockDataService } from '../services/mockDataService.js'
import CustomBottomSheet from '@/components/CustomBottomSheet.vue'

const router = useRouter()

// Estado reativo
const dashboard = reactive({
    today: {
        sales: 0,
        revenue: 0
    },
    pending: {
        sales: 0,
        amount: 0
    },
    lowStock: {
        products: 0,
        items: []
    },
    totalProducts: 0,
    salesByPeriod: [],
    topProducts: [],
    recentSales: []
})

// Estado para bottom sheet de venda
const showSaleSheet = ref(false)
const saleForm = reactive({
    client: '',
    products: [],
    total: 0,
    paymentMethod: 'cash',
    notes: ''
})

// Estado para notificações
const notifications = reactive({
    unread: 3,
    items: [
        {
            id: 1,
            type: 'success',
            title: 'Nova venda realizada',
            message: 'Venda #004 por MT 150,00 - há 2 minutos',
            timestamp: new Date(Date.now() - 2 * 60 * 1000)
        },
        {
            id: 2,
            type: 'warning',
            title: 'Stock baixo detectado',
            message: '2 produtos precisam de reposição',
            timestamp: new Date(Date.now() - 15 * 60 * 1000)
        },
        {
            id: 3,
            type: 'info',
            title: 'Meta mensal atingida',
            message: '68% da meta de vendas alcançada',
            timestamp: new Date(Date.now() - 30 * 60 * 1000)
        }
    ]
})

// API Base URL
const API_BASE = 'http://localhost:3000'

// Métodos
const formatPrice = (price) => {
    return parseFloat(price).toFixed(2).replace('.', ',')
}

// Funções para bottom sheet de venda
const openSaleSheet = () => {
    showSaleSheet.value = true
}

const closeSaleSheet = () => {
    showSaleSheet.value = false
    // Reset form
    Object.assign(saleForm, {
        client: '',
        products: [],
        total: 0,
        paymentMethod: 'cash',
        notes: ''
    })
}

const saveSale = async () => {
    try {
        // Simular salvamento da venda
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Atualizar dashboard
        await loadDashboard()

        closeSaleSheet()
        alert('Venda registrada com sucesso!')
    } catch (error) {
        console.error('Erro ao salvar venda:', error)
        alert('Erro ao salvar venda')
    }
}

const formatTimeAgo = (timestamp) => {
    const now = new Date()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 60) return `há ${minutes} min`
    if (hours < 24) return `há ${hours}h`
    return `há ${days}d`
}

// Funcionalidades Mobile
const refreshData = async () => {
    // Simular pull-to-refresh
    await loadDashboard()
}

// Haptic feedback (se disponível)
const hapticFeedback = () => {
    if ('vibrate' in navigator) {
        navigator.vibrate(50) // 50ms vibration
    }
}

const loadDashboard = async () => {
    try {
        // Carregar dados do dashboard usando mockDataService
        const data = await mockDataService.getDashboardData()

        // Atualizar dados reativos
        dashboard.today = {
            sales: data.totalSales,
            revenue: data.totalRevenue
        }
        dashboard.pending = {
            sales: data.pendingSales,
            amount: 450.00 // Mock amount for pending sales
        }
        dashboard.lowStock = {
            products: data.lowStockProducts,
            items: [
                { id: 1, name: 'Produto A', stock: 5 },
                { id: 2, name: 'Produto B', stock: 2 }
            ]
        }
        dashboard.totalProducts = 45
        dashboard.salesByPeriod = [
            { period: 'Hoje', sales: 12, amount: 1250.50 },
            { period: 'Esta Semana', sales: 45, amount: 4200.00 },
            { period: 'Este Mês', sales: 180, amount: 15600.00 }
        ]
        dashboard.topProducts = [
            { id: 1, name: 'Produto A', quantity: 25, revenue: 1250.00 },
            { id: 2, name: 'Produto B', quantity: 18, revenue: 900.00 },
            { id: 3, name: 'Produto C', quantity: 15, revenue: 750.00 }
        ]
        dashboard.recentSales = [
            { id: 1, number: '001', client: 'João Silva', total: 150.00, time: '10:30' },
            { id: 2, number: '002', client: 'Maria Santos', total: 75.50, time: '09:45' },
            { id: 3, number: '003', client: 'Pedro Costa', total: 200.00, time: '09:15' }
        ]
    } catch (error) {
        console.error('Erro ao carregar dashboard:', error)
    }
}

// Lifecycle
onMounted(() => {
    loadDashboard()
})

// Expor funções para uso no template
defineExpose({
    refreshData,
    hapticFeedback
})
</script>
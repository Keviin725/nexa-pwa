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
            <!-- 1. ALERTAS CRÍTICOS - Máxima prioridade -->
            <div v-if="dashboardStore.data.lowStockProducts > 0"
                class="bg-gradient-to-r from-red-50 via-red-100/50 to-orange-50 rounded-2xl shadow-xl border border-red-200/50 p-6 relative overflow-hidden transform transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl animate-pulse-border">
                <!-- Background animado -->
                <div class="absolute inset-0 bg-gradient-to-br from-red-50/30 to-orange-50/20 pointer-events-none">
                </div>
                <!-- Padrão de fundo sutil -->
                <div class="absolute top-0 right-0 w-32 h-32 bg-red-100/20 rounded-full -translate-y-16 translate-x-16">
                </div>
                <div
                    class="absolute bottom-0 left-0 w-24 h-24 bg-orange-100/20 rounded-full translate-y-12 -translate-x-12">
                </div>

                <div class="relative z-10">
                    <!-- Header com animação -->
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                            <div
                                class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center animate-bounce">
                                <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z">
                                    </path>
                                </svg>
                            </div>
                            <div>
                                <h3 class="font-bold text-red-800 text-lg">⚠️ ALERTA CRÍTICO</h3>
                                <p class="text-sm text-red-600 font-medium">{{ dashboardStore.data.lowStockProducts }}
                                    produtos precisam de reposição URGENTE</p>
                            </div>
                        </div>
                        <!-- Indicador de urgência -->
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                            <span class="text-xs text-red-600 font-semibold">URGENTE</span>
                        </div>
                    </div>

                    <!-- Lista de produtos com melhor design -->
                    <div class="space-y-3"
                        :class="{ 'max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-red-300 scrollbar-track-red-100': productsStore.lowStockProducts.length > 5 }">
                        <div v-for="(product, index) in productsStore.lowStockProducts" :key="product.id"
                            class="flex justify-between items-center p-4 bg-red-50/80 rounded-xl border border-red-200/50 hover:bg-red-100/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
                            :style="{ animationDelay: `${index * 100}ms` }">
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 bg-red-200 rounded-full flex items-center justify-center">
                                    <span class="text-xs font-bold text-red-800">{{ index + 1 }}</span>
                                </div>
                                <div>
                                    <div class="font-semibold text-slate-800">{{ product.name }}</div>
                                    <div class="text-sm text-slate-600">
                                        Stock: <span class="font-bold text-red-600">{{ product.stock }}</span>
                                        <span v-if="product.minStock" class="ml-2 text-xs text-slate-500">
                                            (Mín: {{ product.minStock }})
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center gap-2">
                                <span
                                    class="px-3 py-1 bg-red-200 text-red-800 text-xs font-bold rounded-full animate-pulse">
                                    CRÍTICO
                                </span>
                                <div class="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Ações melhoradas -->
                    <div class="mt-6 flex flex-col sm:flex-row gap-3">
                        <router-link to="/app/products"
                            class="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white text-sm font-bold rounded-xl hover:bg-red-700 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                            </svg>
                            Repor Stock Agora
                        </router-link>
                        <button @click="refreshData"
                            class="inline-flex items-center justify-center px-4 py-3 bg-white text-red-600 text-sm font-medium rounded-xl border border-red-200 hover:bg-red-50 transition-all duration-300 hover:scale-105">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                                </path>
                            </svg>
                            Atualizar
                        </button>
                    </div>

                    <!-- Informação adicional -->
                    <div class="mt-4 p-3 bg-red-100/50 rounded-lg border border-red-200/50">
                        <div class="flex items-center gap-2 text-xs text-red-700">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span class="font-medium">Dica:</span> Configure alertas automáticos para receber
                            notificações quando o stock estiver baixo.
                        </div>
                    </div>
                </div>
            </div>

            <!-- 2. MÉTRICAS FINANCEIRAS - Segunda prioridade -->
            <div
                class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 relative overflow-hidden transform transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl">
                <div class="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/30 pointer-events-none">
                </div>
                <div class="relative z-10">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-lg font-semibold text-slate-800"> Receita de Hoje</h2>
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span class="text-xs text-green-600 font-medium">Tempo Real</span>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <!-- Receita Total - MAIS IMPORTANTE -->
                        <div
                            class="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 min-h-[120px] flex flex-col justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                            <div v-if="dashboardStore.loading" class="animate-pulse">
                                <div class="h-8 bg-green-200 rounded w-24 mx-auto mb-2"></div>
                                <div class="h-4 bg-green-200 rounded w-20 mx-auto mb-1"></div>
                                <div class="h-3 bg-green-200 rounded w-16 mx-auto"></div>
                            </div>
                            <div v-else>
                                <div class="text-2xl font-bold text-green-600 mb-1 break-words">
                                    {{ formatPrice(dashboardStore.formattedMetrics.totalRevenue) }}
                                </div>
                                <div class="text-sm font-medium text-slate-700">Receita Total</div>
                                <div class="text-xs text-green-600 mt-1">{{ dashboardStore.data.totalSales }} vendas
                                </div>
                            </div>
                        </div>
                        <!-- Vendas Pendentes - CRÍTICO -->
                        <div
                            class="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200 min-h-[120px] flex flex-col justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                            <div v-if="salesStore.loading" class="animate-pulse">
                                <div class="h-8 bg-yellow-200 rounded w-20 mx-auto mb-2"></div>
                                <div class="h-4 bg-yellow-200 rounded w-16 mx-auto mb-1"></div>
                                <div class="h-3 bg-yellow-200 rounded w-20 mx-auto"></div>
                            </div>
                            <div v-else>
                                <div class="text-2xl font-bold text-yellow-600 mb-1 break-words">
                                    {{ formatPrice(salesStore.stats.pendingRevenue) }}
                                </div>
                                <div class="text-sm font-medium text-slate-700">Pendente</div>
                                <div class="text-xs text-yellow-600 mt-1">{{ dashboardStore.data.pendingSales }} vendas
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 3. DASHBOARD POR ROLE - Terceira prioridade -->

            <!-- Admin: Visão completa -->
            <div v-if="isAdmin" class="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h2 class="text-lg font-semibold text-slate-800 mb-4">Visão Administrativa</h2>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div
                        class="text-center p-4 bg-red-50 rounded-lg border border-red-200 min-h-[100px] flex flex-col justify-center">
                        <div class="text-2xl font-bold text-red-600 mb-1 break-words">{{ dashboardStore.data.totalUsers
                            || 0 }}
                        </div>
                        <div class="text-sm font-medium text-slate-700">Usuários</div>
                    </div>
                    <div
                        class="text-center p-4 bg-blue-50 rounded-lg border border-blue-200 min-h-[100px] flex flex-col justify-center">
                        <div class="text-2xl font-bold text-blue-600 mb-1 break-words">MZN {{
                            dashboardStore.data.totalRevenue || 0 }}
                        </div>
                        <div class="text-sm font-medium text-slate-700">Receita Total</div>
                    </div>
                    <div
                        class="text-center p-4 bg-green-50 rounded-lg border border-green-200 min-h-[100px] flex flex-col justify-center">
                        <div class="text-2xl font-bold text-green-600 mb-1 break-words">{{
                            dashboardStore.data.totalSales || 0 }}
                        </div>
                        <div class="text-sm font-medium text-slate-700">Vendas</div>
                    </div>
                    <!-- Vendas Parciais - ATENÇÃO -->
                    <div
                        class="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 min-h-[120px] flex flex-col justify-center">
                        <div class="text-2xl font-bold text-blue-600 mb-1 break-words">
                            {{ dashboardStore.data.partialSales || 0 }}
                        </div>
                        <div class="text-sm font-medium text-slate-700">Parciais</div>
                        <div class="text-xs text-blue-600 mt-1">Pagamentos em andamento</div>
                    </div>
                </div>
            </div>

            <!-- Gerente: Visão de gestão -->
            <div v-else-if="isManager" class="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h2 class="text-lg font-semibold text-slate-800 mb-4">Gestão da Equipe</h2>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div
                        class="text-center p-4 bg-blue-50 rounded-lg border border-blue-200 min-h-[100px] flex flex-col justify-center">
                        <div class="text-2xl font-bold text-blue-600 mb-1 break-words">{{ dashboardStore.data.totalUsers
                            || 0 }}
                        </div>
                        <div class="text-sm font-medium text-slate-700">Equipe Ativa</div>
                    </div>
                    <div
                        class="text-center p-4 bg-green-50 rounded-lg border border-green-200 min-h-[100px] flex flex-col justify-center">
                        <div class="text-2xl font-bold text-green-600 mb-1 break-words">MZN {{
                            dashboardStore.data.totalRevenue || 0
                        }}</div>
                        <div class="text-sm font-medium text-slate-700">Receita</div>
                    </div>
                    <div
                        class="text-center p-4 bg-purple-50 rounded-lg border border-purple-200 min-h-[100px] flex flex-col justify-center">
                        <div class="text-2xl font-bold text-purple-600 mb-1 break-words">85%</div>
                        <div class="text-sm font-medium text-slate-700">Performance</div>
                    </div>
                </div>
            </div>

            <!-- Vendedor: Visão de vendas -->
            <div v-else-if="isSeller" class="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h2 class="text-lg font-semibold text-slate-800 mb-4">Minhas Vendas</h2>
                <div class="grid grid-cols-2 gap-4">
                    <div
                        class="text-center p-4 bg-green-50 rounded-lg border border-green-200 min-h-[100px] flex flex-col justify-center">
                        <div class="text-2xl font-bold text-green-600 mb-1 break-words">{{ dashboardStore.data.mySales
                            || 0 }}</div>
                        <div class="text-sm font-medium text-slate-700">Minhas Vendas</div>
                    </div>
                    <div
                        class="text-center p-4 bg-blue-50 rounded-lg border border-blue-200 min-h-[100px] flex flex-col justify-center">
                        <div class="text-2xl font-bold text-blue-600 mb-1 break-words">{{
                            dashboardStore.data.monthlyTarget || 0 }}
                        </div>
                        <div class="text-sm font-medium text-slate-700">Meta Mensal</div>
                    </div>
                </div>
            </div>

            <!-- 4. AÇÕES PRINCIPAIS - Quarta prioridade -->
            <div
                class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-gray-50/30 pointer-events-none">
                </div>
                <div class="relative z-10">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-lg font-semibold text-slate-800">⚡ Ações Principais</h2>
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
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                    </svg>
                                </div>
                                <h3 class="font-bold text-slate-800 mb-1">Nova Venda</h3>
                                <p class="text-sm text-green-600 font-medium">Registrar venda</p>
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

                        <!-- 3. CLIENTES A FIADO - Gestão de vendas a crédito -->
                        <router-link to="/app/clients" class="group">
                            <div
                                class="p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg hover:from-orange-100 hover:to-red-100 transition-all duration-200 text-center border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg">
                                <div
                                    class="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-lg">
                                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1">
                                        </path>
                                    </svg>
                                </div>
                                <h3 class="font-bold text-slate-800 mb-1">Dividendos</h3>
                                <p class="text-sm text-orange-600 font-medium">Vendas a crédito</p>
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
                                <h3 class="font-bold text-slate-800 mb-1"> Relatórios</h3>
                                <p class="text-sm text-purple-600 font-medium">Ver análises</p>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>

            <!-- 5. VENDAS RECENTES - Quinta prioridade -->
            <div
                class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-green-50/30 to-emerald-50/20 pointer-events-none">
                </div>
                <div class="relative z-10">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-lg font-semibold text-slate-800"> Vendas Recentes</h2>
                        <router-link to="/app/sales" class="text-sm text-blue-600 hover:text-blue-800 font-medium">Ver
                            todas</router-link>
                    </div>
                    <div v-if="salesStore.loading" class="space-y-3">
                        <SkeletonLoader type="list" :count="3" />
                    </div>
                    <div v-else-if="salesStore.recentSales.length === 0" class="py-8">
                        <EmptyState icon="shopping" title="Nenhuma venda recente"
                            description="Ainda não há vendas registradas hoje. Comece criando sua primeira venda!"
                            action-text="Nova Venda" :action-handler="openSaleSheet" />
                    </div>
                    <div v-else class="space-y-3">
                        <div v-for="sale in salesStore.recentSales" :key="sale.id"
                            class="flex justify-between items-center p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                            <div>
                                <span class="font-medium text-slate-800">#{{ sale.saleNumber }}</span>
                                <span class="text-sm text-slate-600 ml-2">{{ sale.Client?.name || 'nao informado'
                                    }}</span>
                            </div>
                            <div class="text-right">
                                <div class="font-semibold text-green-600">{{ formatPrice(sale.totalAmount) }}</div>
                                <div class="text-xs text-slate-500">{{ formatDate(sale.createdAt) }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 6. GRÁFICOS E ANÁLISES - Sexta prioridade -->
            <div class="space-y-4">
                <!-- Gráfico de Vendas - Mais importante -->
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
                        <div v-if="dashboardStore.loading" class="space-y-4">
                            <SkeletonLoader type="chart" />
                        </div>
                        <div v-else-if="!dashboardStore.chartData.salesByDay || dashboardStore.chartData.salesByDay.length === 0"
                            class="py-8">
                            <EmptyState icon="chart" title="Nenhum dado de vendas"
                                description="Ainda não há dados suficientes para mostrar o gráfico de vendas por período."
                                secondary-action-text="Ver Relatórios"
                                :secondary-action-handler="() => router.push('/app/reports')" />
                        </div>
                        <div v-else class="space-y-4"
                            :class="{ 'max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100': dashboardStore.chartData.salesByDay.length > 5 }">
                            <div v-for="period in sortedSalesByDay" :key="period.date" class="space-y-2">
                                <div class="flex justify-between items-center">
                                    <span class="text-sm text-slate-600">{{ period.date }}</span>
                                    <div class="text-right">
                                        <div class="font-semibold text-slate-800">{{ period.count }} vendas</div>
                                        <div class="text-sm text-green-600">{{ formatPrice(period.total) }}</div>
                                    </div>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                                        :style="{ width: `${(period.total / Math.max(...dashboardStore.chartData.salesByDay.map(p => p.total))) * 100}%` }">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Gráfico de Produtos - Menos importante -->
                <div
                    class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-pink-50/20 pointer-events-none">
                    </div>
                    <div class="relative z-10">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="font-semibold text-slate-800">Produtos Mais Vendidos</h3>
                            <router-link to="/app/products" class="text-xs text-blue-600 hover:text-blue-800">Ver
                                todos</router-link>
                        </div>

                        <div v-if="dashboardStore.loading" class="space-y-4">
                            <SkeletonLoader type="list" :count="3" />
                        </div>
                        <div v-else-if="!dashboardStore.chartData.topProducts || dashboardStore.chartData.topProducts.length === 0"
                            class="py-8">
                            <EmptyState icon="box" title="Nenhum produto vendido"
                                description="Ainda não há dados de vendas de produtos para mostrar o ranking."
                                secondary-action-text="Ver Produtos"
                                :secondary-action-handler="() => router.push('/app/products')" />
                        </div>
                        <div v-else class="space-y-4">
                            <div v-for="(product, index) in dashboardStore.chartData.topProducts" :key="product.name"
                                class="space-y-2">
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
                                        <div class="text-sm text-green-600">{{ formatPrice(product.revenue) }}</div>
                                    </div>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                                        :style="{ width: `${(product.quantity / Math.max(...dashboardStore.chartData.topProducts.map(p => p.quantity))) * 100}%` }">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 7. MÉTRICAS AVANÇADAS - Menor prioridade -->
            <div class="space-y-4">
                <!-- Meta do Mês - Mais importante -->
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
                                <h3 class="font-semibold text-slate-800"> Meta do Mês</h3>
                                <p class="text-xs text-slate-500">Vendas mensais</p>
                            </div>
                        </div>
                        <div class="space-y-3">
                            <AnimatedProgressBar :current-value="dashboardStore.data.totalRevenue || 0"
                                :max-value="monthlyTarget" label="Progresso da Meta" current-label="Atual"
                                target-label="Meta" color="blue" size="lg" :show-details="true" :show-shine="true" />

                            <!-- Botão para definir metas -->
                            <div class="flex justify-end">
                                <router-link to="/app/settings"
                                    class="inline-flex items-center gap-2 px-3 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z">
                                        </path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                    Definir Metas
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Crescimento - Menos importante -->
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
                                <h3 class="font-semibold text-slate-800"> Crescimento</h3>
                                <p class="text-xs text-slate-500">vs. mês anterior</p>
                            </div>
                        </div>
                        <div class="space-y-3">
                            <div class="flex justify-between items-center">
                                <span class="text-sm text-slate-600">Vendas</span>
                                <div class="flex items-center gap-2">
                                    <span class="text-lg font-bold"
                                        :class="growthData.salesGrowth >= 0 ? 'text-green-600' : 'text-red-600'">
                                        {{ growthData.salesGrowth >= 0 ? '+' : '' }}{{ growthData.salesGrowth }}%
                                    </span>
                                    <svg v-if="growthData.salesGrowth >= 0" class="w-4 h-4 text-green-500"
                                        fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <svg v-else class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-sm text-slate-600">Receita</span>
                                <div class="flex items-center gap-2">
                                    <span class="text-lg font-bold"
                                        :class="growthData.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'">
                                        {{ growthData.revenueGrowth >= 0 ? '+' : '' }}{{ growthData.revenueGrowth }}%
                                    </span>
                                    <svg v-if="growthData.revenueGrowth >= 0" class="w-4 h-4 text-green-500"
                                        fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <svg v-else class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Clientes a Fiado - Gestão de crédito -->
                <div
                    class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-br from-orange-50/30 to-red-50/20 pointer-events-none">
                    </div>
                    <div class="relative z-10">
                        <div class="flex items-center gap-3 mb-4">
                            <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1">
                                    </path>
                                </svg>
                            </div>
                            <div>
                                <h3 class="font-semibold text-slate-800">Clientes a Fiado</h3>
                                <p class="text-xs text-slate-500">Gestão de crédito</p>
                            </div>
                        </div>
                        <div class="space-y-3">
                            <div class="text-center">
                                <div class="text-2xl font-bold text-orange-600 mb-1 break-words">{{
                                    dashboardStore.data.totalClients
                                    || 0 }}</div>
                                <div class="text-sm text-slate-600">clientes com fiado</div>
                            </div>
                            <div class="flex justify-between items-center text-xs">
                                <span class="text-slate-500">Novos: {{ clientStats.newClients }}</span>
                                <span class="text-slate-500">Retornaram: {{ clientStats.returningClients }}</span>
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
                <h4 class="text-sm font-semibold text-slate-700 mb-4 flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                            </path>
                        </svg>
                        Informações da Venda
                    </div>
                    <div v-if="saving" class="flex items-center gap-2 text-xs text-blue-600">
                        <svg class="w-3 h-3 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                            </path>
                        </svg>
                        Salvando...
                    </div>
                </h4>

                <div class="grid grid-cols-1 gap-4">
                    <!-- Cliente a Fiado - Apenas para vendas a crédito -->
                    <FormField v-if="saleForm.paymentMethod === 'credit'" v-model="saleForm.clientId" type="select"
                        label="Cliente a Fiado" placeholder="Selecione um cliente" :options="clientOptions" required
                        help="Selecione um cliente para controle de dívidas"
                        :error="formValidation.getError('clientId')" @blur="formValidation.touchField('clientId')" />

                    <!-- Método de Pagamento -->
                    <FormField v-model="saleForm.paymentMethod" type="select" label="Método de Pagamento"
                        :options="paymentMethodOptions" help="Escolha 'A Fiado' para vendas a crédito" />

                    <!-- Data de Vencimento (se fiado) -->
                    <FormField v-if="saleForm.paymentMethod === 'credit'" v-model="saleForm.dueDate" type="date"
                        label="Data de Vencimento" help="Data limite para pagamento" required
                        :error="formValidation.getError('dueDate')" @blur="formValidation.touchField('dueDate')" />

                    <!-- Desconto e Imposto -->
                    <div class="grid grid-cols-2 gap-4">
                        <FormField v-model="saleForm.discount" type="number" label="Desconto (MZN)" placeholder="0.00"
                            step="0.01" @input="updateTotal" />
                        <FormField v-model="saleForm.tax" type="number" label="Imposto (MZN)" placeholder="0.00"
                            step="0.01" @input="updateTotal" />
                    </div>

                    <!-- Observações -->
                    <FormField v-model="saleForm.notes" type="textarea" label="Observações"
                        placeholder="Observações adicionais (opcional)" :rows="3" />
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

                <div class="space-y-4">
                    <!-- Seleção de Produto -->
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-2">Adicionar Produto</label>
                        <select v-model="selectedProduct" @change="addProductToSale"
                            class="w-full px-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                            <option value="">Selecione um produto</option>
                            <option v-for="product in availableProducts" :key="product.id" :value="product.id">
                                {{ product.name }} - {{ formatPrice(product.price) }} (Stock: {{ product.stock }})
                            </option>
                        </select>
                    </div>

                    <!-- Lista de produtos adicionados -->
                    <div v-if="saleForm.products.length > 0" class="space-y-3"
                        :class="{ 'max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100': saleForm.products.length > 5 }">
                        <div v-for="(product, index) in saleForm.products" :key="index"
                            class="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div class="flex-1">
                                <div class="font-medium text-slate-800">{{ product.name }}</div>
                                <div class="text-sm text-slate-600">{{ formatPrice(product.price) }} x {{
                                    product.quantity }}
                                </div>
                            </div>
                            <div class="flex items-center gap-2">
                                <input v-model.number="product.quantity" type="number" min="1" :max="product.maxStock"
                                    class="w-16 px-2 py-1 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors text-center"
                                    @change="updateTotal" />
                                <span class="font-semibold text-green-600">{{ formatPrice(product.price *
                                    product.quantity) }}</span>
                                <button type="button" @click="removeProduct(index)"
                                    class="p-1 text-red-500 hover:bg-red-50 rounded">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
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
                        <span class="font-semibold text-slate-800">{{ formatPrice(saleForm.subtotal) }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-slate-600">Desconto</span>
                        <span class="font-semibold text-slate-800">{{ formatPrice(saleForm.discount) }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-slate-600">Imposto</span>
                        <span class="font-semibold text-slate-800">{{ formatPrice(saleForm.tax) }}</span>
                    </div>
                    <div v-if="saleForm.paymentMethod === 'credit'" class="flex justify-between items-center">
                        <span class="text-sm text-orange-600">Status</span>
                        <span class="font-semibold text-orange-600">A Fiado</span>
                    </div>
                    <div class="border-t border-slate-200 pt-3">
                        <div class="flex justify-between items-center">
                            <span class="text-lg font-bold text-slate-800">Total</span>
                            <span class="text-xl font-bold"
                                :class="saleForm.paymentMethod === 'credit' ? 'text-orange-600' : 'text-green-600'">
                                {{ formatPrice(saleForm.totalAmount) }}
                            </span>
                        </div>
                        <div v-if="saleForm.paymentMethod === 'credit'" class="text-xs text-orange-600 mt-1">
                            Venda a crédito - Cliente: {{ getClientName(saleForm.clientId) || 'Não selecionado' }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Botão de teste visível -->
            <div class="mt-6 p-4 bg-yellow-100 border-2 border-yellow-400 rounded-xl">
                <div class="text-center">
                    <p class="text-sm text-yellow-800 mb-3">🔧 Botão de Teste - Deve estar visível</p>
                    <button type="button" @click="saveSale"
                        class="w-full px-6 py-4 bg-yellow-500 text-white font-bold rounded-xl hover:bg-yellow-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                        :disabled="saleForm.products.length === 0 || (saleForm.paymentMethod === 'credit' && !saleForm.clientId) || saving">
                        <div class="flex items-center justify-center">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 13l4 4L19 7">
                                </path>
                            </svg>
                            Finalizar Venda
                        </div>
                    </button>
                </div>
            </div>
        </form>

        <template #footer>
            <div class="p-6 bg-white border-t-2 border-slate-300 shadow-lg">
                <FormButtons :loading="saving"
                    :disabled="saleForm.products.length === 0 || (saleForm.paymentMethod === 'credit' && !saleForm.clientId)"
                    :submit-text="saleForm.paymentMethod === 'credit' ? 'Finalizar Venda a Fiado' : 'Finalizar Venda'"
                    :variant="saleForm.paymentMethod === 'credit' ? 'warning' : 'success'" size="lg"
                    @cancel="closeSaleSheet" @submit="saveSale" />
            </div>
        </template>
    </CustomBottomSheet>

</template>

<script setup>
/**
 * HomePage - Dashboard principal do NEXA
 * Página principal com métricas, alertas e ações rápidas
 */

// Vue imports
import { ref, onMounted, onUnmounted, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

// Store imports
import { useAuthStore } from '@/stores/auth'
import { useDashboardStore } from '@/stores/dashboard'
import { useSalesStore } from '@/stores/sales'
import { useProductsStore } from '@/stores/products'
import { useClientsStore } from '@/stores/clients'

// Utils imports
import { permissionManager, PERMISSIONS } from '@/utils/permissions'
import { formatPrice, formatDate } from '@/utils/formatters'
import { apiService } from '@/services/api'

// Component imports
import CustomBottomSheet from '@/components/CustomBottomSheet.vue'
import AnimatedProgressBar from '@/components/Progress/AnimatedProgressBar.vue'
import EmptyState from '@/components/EmptyState.vue'
import SkeletonLoader from '@/components/SkeletonLoader.vue'
import FormField from '@/components/Form/FormField.vue'
import FormSection from '@/components/Form/FormSection.vue'
import FormButtons from '@/components/Form/FormButtons.vue'

// Composable imports
import { useFormStandard } from '@/composables/useFormStandard'
import { useNotifications } from '@/composables/useNotifications'

// Router
const router = useRouter()

// Stores
const authStore = useAuthStore()
const dashboardStore = useDashboardStore()
const salesStore = useSalesStore()
const productsStore = useProductsStore()
const clientsStore = useClientsStore()

// Composables
const formValidation = useFormStandard()
const { handleApiError, handleApiSuccess } = useNotifications()

// Computed properties - User roles
const userRole = computed(() => authStore.user?.role || 'seller')
const isAdmin = computed(() => userRole.value === 'admin')
const isManager = computed(() => userRole.value === 'manager')
const isSeller = computed(() => userRole.value === 'seller')

// Computed properties - Permissions
const canViewReports = computed(() => permissionManager.hasPermission(PERMISSIONS.REPORTS_VIEW))
const canManageUsers = computed(() => permissionManager.hasPermission(PERMISSIONS.USERS_MANAGE))
const canManageSettings = computed(() => permissionManager.hasPermission(PERMISSIONS.SETTINGS_MANAGE))
const canViewProducts = computed(() => permissionManager.hasPermission(PERMISSIONS.PRODUCTS_VIEW))
const canViewClients = computed(() => permissionManager.hasPermission(PERMISSIONS.CLIENTS_VIEW))
const canViewSales = computed(() => permissionManager.hasPermission(PERMISSIONS.SALES_VIEW))

// Computed properties - Dashboard data
const dashboard = computed(() => dashboardStore.data)
const loading = computed(() => dashboardStore.loading)

// Estado para bottom sheet de venda
const showSaleSheet = ref(false)
const clients = ref([])
const availableProducts = ref([])
const selectedProduct = ref('')
const saving = ref(false)

// Validação de formulário
const formValidation = useFormStandard()

// Notificações
const { handleApiError, handleApiSuccess } = useNotifications()

// Opções para selects
const clientOptions = computed(() =>
    clients.value.map(client => ({
        value: client.id,
        label: client.name
    }))
)

const paymentMethodOptions = [
    { value: 'cash', label: 'Dinheiro (À vista)' },
    { value: 'card', label: 'Cartão (À vista)' },
    { value: 'transfer', label: 'Transferência (À vista)' },
    { value: 'credit', label: 'A Fiado (Crédito)' }
]
const saleForm = reactive({
    clientId: '',
    paymentMethod: 'cash',
    dueDate: '',
    products: [],
    subtotal: 0,
    discount: 0,
    tax: 0,
    totalAmount: 0,
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
            message: 'Venda #004 por MZN 150,00 - há 2 minutos',
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

// Dados de crescimento (calculados dinamicamente)
const growthData = reactive({
    salesGrowth: 0,
    revenueGrowth: 0
})

// Estatísticas de clientes
const clientStats = reactive({
    newClients: 0,
    returningClients: 0
})

// Métodos

// Funções para bottom sheet de venda
const openSaleSheet = async () => {
    await Promise.all([loadClients(), loadProducts()])
    showSaleSheet.value = true
}

const closeSaleSheet = () => {
    showSaleSheet.value = false
    // Reset form
    Object.assign(saleForm, {
        clientId: '',
        paymentMethod: 'cash',
        dueDate: '',
        products: [],
        subtotal: 0,
        discount: 0,
        tax: 0,
        totalAmount: 0,
        notes: ''
    })
}

// Métodos para gerenciar produtos no carrinho

const addProduct = (product) => {
    saleForm.products.push(product)
    updateTotal()
}

// Adicionar produto selecionado à venda
const addProductToSale = () => {
    if (!selectedProduct.value) return

    const product = availableProducts.value.find(p => p.id == selectedProduct.value)
    if (!product) return

    // Verificar se produto já existe
    const existingIndex = saleForm.products.findIndex(p => p.id === product.id)
    if (existingIndex >= 0) {
        saleForm.products[existingIndex].quantity += 1
    } else {
        saleForm.products.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            maxStock: product.stock
        })
    }

    updateTotal()
    selectedProduct.value = '' // Reset selection
}

const removeProduct = (index) => {
    saleForm.products.splice(index, 1)
    updateTotal()
}

const updateTotal = () => {
    saleForm.subtotal = saleForm.products.reduce((total, product) => {
        return total + (product.price * product.quantity)
    }, 0)
    saleForm.totalAmount = saleForm.subtotal - saleForm.discount + saleForm.tax
}

// Método auxiliar para obter nome do cliente
const getClientName = (clientId) => {
    const client = clients.value.find(c => c.id == clientId)
    return client ? client.name : null
}

// Carregar clientes
const loadClients = async () => {
    try {
        const response = await apiService.clients.getAll()
        clients.value = response.data.clients || response.data
    } catch (error) {
        console.error('Erro ao carregar clientes:', error)
    }
}

// Carregar produtos
const loadProducts = async () => {
    try {
        const response = await apiService.products.getAll({ limit: 100 })
        availableProducts.value = response.data.products || response.data
    } catch (error) {
        console.error('Erro ao carregar produtos:', error)
    }
}

const saveSale = async () => {
    // Validações básicas
    if (saleForm.products.length === 0) {
        handleApiError('Adicione pelo menos um produto à venda')
        return
    }

    // Validação usando o sistema padronizado
    const validationSchema = {
        clientId: saleForm.paymentMethod === 'credit' ? { required: true } : {},
        dueDate: saleForm.paymentMethod === 'credit' ? { required: true } : {}
    }

    if (!formValidation.validateForm(saleForm, validationSchema)) {
        return
    }

    saving.value = true
    formValidation.setLoading(true)

    try {
        // Criar venda usando a estrutura correta do backend
        const saleData = {
            products: saleForm.products.map(product => ({
                productId: product.id,
                quantity: product.quantity
            })),
            clientId: saleForm.paymentMethod === 'credit' ? saleForm.clientId : null,
            payment_method: saleForm.paymentMethod,
            due_date: saleForm.paymentMethod === 'credit' ? saleForm.dueDate : null,
            subtotal: saleForm.subtotal,
            discount: saleForm.discount,
            tax: saleForm.tax,
            totalAmount: saleForm.totalAmount,
            notes: saleForm.notes
        }

        console.log('💾 Salvando venda:', saleData)

        const result = await salesStore.createSale(saleData)

        if (result.success) {
            // Atualizar dashboard
            await loadDashboard()

            closeSaleSheet()

            // Feedback visual melhorado
            const message = saleForm.paymentMethod === 'credit'
                ? `Venda a fiado registrada com sucesso! Cliente: ${getClientName(saleForm.clientId)} - Total: ${formatPrice(saleForm.totalAmount)}`
                : `Venda registrada com sucesso! Total: ${formatPrice(saleForm.totalAmount)}`

            handleApiSuccess(message)
        } else {
            console.error('❌ Erro ao salvar venda:', result.error)
            handleApiError(`Erro ao salvar venda: ${result.error}`)
        }
    } catch (error) {
        console.error('❌ Erro ao salvar venda:', error)
        handleApiError(`Erro ao salvar venda: ${error.message || 'Erro desconhecido'}`)
    } finally {
        saving.value = false
        formValidation.setLoading(false)
    }
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

// Progresso da meta de receita
const monthlyProgress = computed(() => dashboardStore.revenueProgress)
const monthlyTarget = computed(() => dashboardStore.targets.monthlyRevenue || 25000)

// Vendas por período ordenadas por valor (maiores primeiro)
const sortedSalesByDay = computed(() => {
    if (!dashboardStore.chartData.salesByDay || dashboardStore.chartData.salesByDay.length === 0) {
        return []
    }

    return [...dashboardStore.chartData.salesByDay].sort((a, b) => {
        const totalA = parseFloat(a.total) || 0
        const totalB = parseFloat(b.total) || 0
        return totalB - totalA // Ordem decrescente (maiores primeiro)
    })
})

// Calcular dados de crescimento
const calculateGrowthData = () => {
    // Usar dados reais do backend
    if (dashboardStore.data.growth) {
        growthData.salesGrowth = dashboardStore.data.growth.salesGrowth || 0
        growthData.revenueGrowth = dashboardStore.data.growth.revenueGrowth || 0
    } else {
        // Fallback para dados simulados se não houver dados do backend
        const currentMonth = new Date().getMonth()
        const monthMultiplier = (currentMonth + 1) * 0.1
        growthData.salesGrowth = Math.round((Math.random() * 30 + 5) * monthMultiplier)
        growthData.revenueGrowth = Math.round((Math.random() * 25 + 8) * monthMultiplier)
    }
}

// Calcular estatísticas de clientes
const calculateClientStats = () => {
    const totalClients = dashboardStore.data.totalClients || 0

    // Simular distribuição de clientes
    clientStats.newClients = Math.round(totalClients * 0.2) // 20% novos
    clientStats.returningClients = Math.round(totalClients * 0.8) // 80% retornaram
}

const loadDashboard = async () => {
    try {
        // Carregar dados do dashboard
        await dashboardStore.loadDashboardData()

        // Carregar produtos com Stock baixo
        await productsStore.loadLowStockProducts()

        // Carregar vendas pendentes
        await salesStore.loadPendingSales()

        // Carregar vendas recentes
        await salesStore.loadSales({ limit: 5 })

        // Calcular dados derivados
        calculateGrowthData()
        calculateClientStats()
    } catch (error) {
        console.error('Erro ao carregar dashboard:', error)
    }
}

// Lifecycle
onMounted(() => {
    // Configurar permissionManager com o usuário atual
    if (authStore.user) {
        permissionManager.setCurrentUser(authStore.user)
    }

    loadDashboard()

    // Escutar eventos de venda criada/deletada para atualizar dashboard
    window.addEventListener('sale-created', loadDashboard)
    window.addEventListener('sale-deleted', loadDashboard)
})

onUnmounted(() => {
    // Remover listener ao sair da página
    window.removeEventListener('sale-created', loadDashboard)
    window.removeEventListener('sale-deleted', loadDashboard)
})

// Expor funções para uso no template
defineExpose({
    refreshData,
    hapticFeedback
})
</script>

<style scoped>
/* Scrollbar personalizada */
.scrollbar-thin {
    scrollbar-width: thin;
}

.scrollbar-thin::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
}

/* Animações suaves para scroll */
.overflow-y-auto {
    scroll-behavior: smooth;
}

/* Hover effects para listas com scroll */
.space-y-3:hover .scrollbar-thumb {
    background: #94a3b8;
}

/* Animação de borda pulsante para alertas críticos */
@keyframes pulse-border {

    0%,
    100% {
        border-color: rgba(239, 68, 68, 0.3);
        box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4);
    }

    50% {
        border-color: rgba(239, 68, 68, 0.6);
        box-shadow: 0 0 0 8px rgba(239, 68, 68, 0.1);
    }
}

.animate-pulse-border {
    animation: pulse-border 2s ease-in-out infinite;
}

/* Animação de entrada escalonada */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out;
}

/* Scrollbar personalizada para alertas */
.scrollbar-thumb-red-300::-webkit-scrollbar-thumb {
    background: #fca5a5;
}

.scrollbar-track-red-100::-webkit-scrollbar-track {
    background: #fee2e2;
}
</style>
<template>
    <div class="min-h-screen bg-slate-50">
        <!-- Header da Página -->
        <div class="bg-white border-b border-slate-200">
            <div class="px-4 py-4">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z">
                            </path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                    </div>
                    <div>
                        <h1 class="text-2xl font-bold text-slate-900">Configurações</h1>
                        <p class="text-slate-600">Gerencie as configurações do sistema</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="p-6 space-y-6">
            <!-- 1. META DE RECEITA MENSAL - Nova seção -->
            <GoalsManagement />

            <!-- 2. FUNCIONALIDADES DE IA - Nova seção -->
            <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div class="flex items-center gap-3 mb-6">
                    <div class="p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
                        <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <div>
                        <h2 class="text-lg font-semibold text-slate-800">Funcionalidades de IA</h2>
                        <p class="text-sm text-slate-600">Inteligência Artificial que otimiza sua gestão</p>
                    </div>
                </div>

                <!-- Features Pro -->
                <div class="mb-8">
                    <div class="flex items-center gap-2 mb-4">
                        <div class="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                            PRO
                        </div>
                        <h3 class="text-md font-semibold text-slate-700">Funcionalidades Avançadas</h3>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <!-- AI Stock Predictor -->
                        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                            <div class="flex items-center gap-3 mb-3">
                                <div
                                    class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z">
                                        </path>
                                    </svg>
                                </div>
                                <h4 class="font-semibold text-slate-800 text-sm">AI Stock Predictor</h4>
                            </div>
                            <p class="text-xs text-slate-600">Preveem demanda e otimizam estoque automaticamente</p>
                        </div>

                        <!-- AI Sales Optimizer -->
                        <div
                            class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-4 border border-emerald-100">
                            <div class="flex items-center gap-3 mb-3">
                                <div
                                    class="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                    </svg>
                                </div>
                                <h4 class="font-semibold text-slate-800 text-sm">AI Sales Optimizer</h4>
                            </div>
                            <p class="text-xs text-slate-600">Analisa padrões e sugere estratégias de venda</p>
                        </div>

                        <!-- AI Customer Insights -->
                        <div
                            class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
                            <div class="flex items-center gap-3 mb-3">
                                <div
                                    class="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                                        </path>
                                    </svg>
                                </div>
                                <h4 class="font-semibold text-slate-800 text-sm">AI Customer Insights</h4>
                            </div>
                            <p class="text-xs text-slate-600">Analisa comportamento dos clientes</p>
                        </div>
                    </div>
                </div>

                <!-- Features Enterprise -->
                <div class="mb-6">
                    <div class="flex items-center gap-2 mb-4">
                        <div class="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                            ENTERPRISE
                        </div>
                        <h3 class="text-md font-semibold text-slate-700">Funcionalidades Empresariais</h3>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <!-- AI Analytics Dashboard -->
                        <div
                            class="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-100">
                            <div class="flex items-center gap-3 mb-3">
                                <div
                                    class="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                                        </path>
                                    </svg>
                                </div>
                                <h4 class="font-semibold text-slate-800 text-sm">AI Analytics Dashboard</h4>
                            </div>
                            <p class="text-xs text-slate-600">Relatórios inteligentes gerados por IA</p>
                        </div>

                        <!-- AI Mobile Assistant -->
                        <div class="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-4 border border-red-100">
                            <div class="flex items-center gap-3 mb-3">
                                <div
                                    class="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z">
                                        </path>
                                    </svg>
                                </div>
                                <h4 class="font-semibold text-slate-800 text-sm">AI Mobile Assistant</h4>
                            </div>
                            <p class="text-xs text-slate-600">Assistente inteligente para dispositivos móveis</p>
                        </div>

                        <!-- AI Security & Permissions -->
                        <div
                            class="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-4 border border-indigo-100">
                            <div class="flex items-center gap-3 mb-3">
                                <div
                                    class="w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center">
                                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z">
                                        </path>
                                    </svg>
                                </div>
                                <h4 class="font-semibold text-slate-800 text-sm">AI Security & Permissions</h4>
                            </div>
                            <p class="text-xs text-slate-600">Sistema inteligente de segurança com IA</p>
                        </div>
                    </div>
                </div>

                <!-- Status das Funcionalidades -->
                <div class="bg-slate-50 rounded-lg p-4">
                    <div class="flex items-center gap-3 mb-3">
                        <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                        <h4 class="font-semibold text-slate-800 text-sm">Status das Funcionalidades</h4>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div class="flex items-center justify-between">
                            <span class="text-slate-600">Funcionalidades Pro Ativas:</span>
                            <span class="font-semibold text-green-600">3/3</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-slate-600">Funcionalidades Enterprise:</span>
                            <span class="font-semibold text-purple-600">3/3</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 3. AÇÕES PRINCIPAIS - Mais usadas -->
            <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div class="flex items-center gap-3 mb-4">
                    <div class="p-2 bg-green-100 rounded-lg">
                        <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z">
                            </path>
                        </svg>
                    </div>
                    <h2 class="text-lg font-semibold text-slate-800">Ações Principais</h2>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- Gestão de Usuários (Admin) -->
                    <div v-if="canManageUsers"
                        class="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:shadow-md transition-shadow">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z">
                                        </path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="font-semibold text-slate-800">Gestão de Usuários</h3>
                                    <p class="text-sm text-slate-600">Gerir utilizadores e permissões</p>
                                </div>
                            </div>
                            <router-link to="/app/users"
                                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                                Acessar
                            </router-link>
                        </div>
                    </div>

                    <!-- Pagamentos -->
                    <div
                        class="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:shadow-md transition-shadow">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z">
                                        </path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="font-semibold text-slate-800">Pagamentos</h3>
                                    <p class="text-sm text-slate-600">Gerir assinaturas e pagamentos</p>
                                </div>
                            </div>
                            <router-link to="/app/billing"
                                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                                Acessar
                            </router-link>
                        </div>
                    </div>

                    <!-- Relatórios -->
                    <div v-if="canViewReports"
                        class="p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-200 hover:shadow-md transition-shadow">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                                        </path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="font-semibold text-slate-800">Relatórios</h3>
                                    <p class="text-sm text-slate-600">Vendas, produtos e análises</p>
                                </div>
                            </div>
                            <router-link to="/app/reports"
                                class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                                Acessar
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 2. CONFIGURAÇÕES DA LOJA - Segunda prioridade -->
            <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div class="flex items-center gap-3 mb-4">
                    <div class="p-2 bg-blue-100 rounded-lg">
                        <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                            </path>
                        </svg>
                    </div>
                    <h2 class="text-lg font-semibold text-slate-800"> Configurações da Loja</h2>
                </div>

                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Nome da Loja</label>
                        <input v-model="systemConfig.storeName" type="text" placeholder="Nome da sua loja"
                            class="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-colors" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Telefone de Contato</label>
                        <input v-model="systemConfig.contactPhone" type="text" placeholder="(11) 99999-9999"
                            class="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-colors" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Endereço</label>
                        <textarea v-model="systemConfig.address" placeholder="Endereço da loja"
                            class="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                            rows="3"></textarea>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Observações Gerais</label>
                        <textarea v-model="systemConfig.notes" placeholder="Observações sobre a loja"
                            class="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                            rows="3"></textarea>
                    </div>

                    <div class="flex justify-end">
                        <button @click="saveSystemConfig"
                            class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            :disabled="loading">
                            <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none"
                                viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 13l4 4L19 7"></path>
                            </svg>
                            Salvar Configurações
                        </button>
                    </div>
                </div>
            </div>




            <!-- Informações do Sistema -->
            <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div class="flex items-center gap-3 mb-4">
                    <div class="p-2 bg-slate-100 rounded-lg">
                        <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h2 class="text-lg font-semibold text-slate-800">Informações do Sistema</h2>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-3">
                        <div class="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                            <span class="text-sm text-slate-600">Versão:</span>
                            <span class="text-sm font-medium text-slate-800">1.0.0</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                            <span class="text-sm text-slate-600">Última Atualização:</span>
                            <span class="text-sm font-medium text-slate-800">{{ formatDate(new Date()) }}</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                            <span class="text-sm text-slate-600">Tipo:</span>
                            <span class="text-sm font-medium text-slate-800">PWA</span>
                        </div>
                    </div>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                            <span class="text-sm text-slate-600">Status:</span>
                            <span class="text-sm font-medium text-green-600">Funcionando</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                            <span class="text-sm text-slate-600">Usuário Atual:</span>
                            <span class="text-sm font-medium text-slate-800">{{ authStore.user?.name || 'N/A' }}</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                            <span class="text-sm text-slate-600">Permissões:</span>
                            <span class="text-sm font-medium text-slate-800">{{ authStore.user?.role || 'N/A' }}</span>
                        </div>
                    </div>
                </div>

                <!-- Ações do Sistema -->
                <div class="mt-6 pt-4 border-t border-slate-200">
                    <h3 class="text-sm font-medium text-slate-700 mb-3">Ações do Sistema</h3>
                    <div class="flex flex-wrap gap-2">
                        <button @click="clearCache"
                            class="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm">
                            Limpar Cache
                        </button>
                        <button @click="exportData"
                            class="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm">
                            Exportar Dados
                        </button>
                        <button @click="refreshSystem"
                            class="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm">
                            Atualizar Sistema
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from 'vue'
import { permissionManager, PERMISSIONS } from '../utils/permissions.js'
import { useAuthStore } from '@/stores/auth'
import { useNotifications } from '@/composables/useNotifications'
import GoalsManagement from '@/components/GoalsManagement.vue'

// Store
const authStore = useAuthStore()
const { handleApiSuccess, handleApiError } = useNotifications()

// Estado reativo
const loading = ref(false)

// Configurações do sistema
const systemConfig = reactive({
    storeName: '',
    contactPhone: '',
    address: '',
    notes: ''
})

// Computed
const canManageUsers = computed(() => {
    return permissionManager.hasPermission(PERMISSIONS.USERS_MANAGE)
})

const canViewReports = computed(() => {
    return permissionManager.hasPermission(PERMISSIONS.REPORTS_VIEW)
})

// Métodos
const formatDate = (date) => {
    return new Date(date).toLocaleString('pt-PT')
}

const saveSystemConfig = async () => {
    try {
        loading.value = true

        // Salvar no localStorage
        localStorage.setItem('lojinha-system-config', JSON.stringify(systemConfig))

        handleApiSuccess('Configurações salvas com sucesso!')
    } catch (error) {
        console.error('Erro ao salvar configurações:', error)
        handleApiError(error)
    } finally {
        loading.value = false
    }
}

const loadSystemConfig = () => {
    try {
        const saved = localStorage.getItem('lojinha-system-config')
        if (saved) {
            const config = JSON.parse(saved)
            Object.assign(systemConfig, config)
        }
    } catch (error) {
        console.error('Erro ao carregar configurações:', error)
    }
}

// Ações do Sistema
const clearCache = () => {
    try {
        // Limpar cache do localStorage
        const keysToKeep = ['lojinha-system-config', 'auth-token']
        const allKeys = Object.keys(localStorage)

        allKeys.forEach(key => {
            if (!keysToKeep.includes(key)) {
                localStorage.removeItem(key)
            }
        })

        handleApiSuccess('Cache limpo com sucesso!')
    } catch (error) {
        console.error('Erro ao limpar cache:', error)
        handleApiError(error)
    }
}

const exportData = () => {
    try {
        // Exportar configurações do sistema
        const data = {
            systemConfig,
            exportDate: new Date().toISOString(),
            version: '1.0.0'
        }

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `lojinha-config-${new Date().toISOString().split('T')[0]}.json`
        a.click()
        URL.revokeObjectURL(url)

        handleApiSuccess('Dados exportados com sucesso!')
    } catch (error) {
        console.error('Erro ao exportar dados:', error)
        handleApiError(error)
    }
}

const refreshSystem = () => {
    try {
        // Recarregar a página para atualizar o sistema
        window.location.reload()
    } catch (error) {
        console.error('Erro ao atualizar sistema:', error)
        handleApiError(error)
    }
}

// Lifecycle
onMounted(() => {
    loadSystemConfig()
})
</script>
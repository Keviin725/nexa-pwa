<template>
    <div class="min-h-screen bg-slate-50">
        <!-- Header Mobile -->
        <div class="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 shadow-xl">
            <div class="px-4 py-4">
                <div class="flex items-center justify-between">
                    <!-- Logo e Título -->
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1">
                                </path>
                            </svg>
                        </div>
                        <div>
                            <h1 class="text-xl font-bold text-white">Clientes a Fiado</h1>
                            <p class="text-blue-100 text-sm">
                                Créditos e dívidas
                            </p>
                        </div>
                    </div>

                    <!-- Ações Mobile -->
                    <div class="flex items-center gap-3">
                        <!-- Novo Cliente -->
                        <button v-if="canCreateClients" @click="openModal('create')"
                            class="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors font-medium text-sm">
                            Novo Cliente
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="p-4 space-y-4">
            <!-- Estatísticas dos Clientes a Fiado -->
            <div class="bg-white rounded-xl border border-slate-200 shadow-sm">
                <div class="p-4">
                    <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1">
                            </path>
                        </svg>
                        Resumo de Vendas a Crédito
                    </h2>

                    <div class="grid grid-cols-2 gap-4">
                        <!-- Total de Clientes -->
                        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                            <div class="flex items-center justify-between">
                                <div>
                                    <div class="text-2xl font-bold text-blue-600">{{ clients.length }}</div>
                                    <div class="text-sm text-blue-700 font-medium">Clientes a Fiado</div>
                                </div>
                                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <!-- Clientes com Dívidas -->
                        <div class="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-4 border border-red-200">
                            <div class="flex items-center justify-between">
                                <div>
                                    <div class="text-2xl font-bold text-red-600">{{ clientsWithDebts }}</div>
                                    <div class="text-sm text-red-700 font-medium">Com Dívidas</div>
                                </div>
                                <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                    <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <!-- Valor Total em Dívidas -->
                        <div
                            class="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-4 border border-orange-200">
                            <div class="flex items-center justify-between">
                                <div>
                                    <div class="text-2xl font-bold text-orange-600">MT {{ totalDebts }}</div>
                                    <div class="text-sm text-orange-700 font-medium">Total em Dívidas</div>
                                </div>
                                <div class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                    <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <!-- Vendas a Crédito Hoje -->
                        <div
                            class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                            <div class="flex items-center justify-between">
                                <div>
                                    <div class="text-2xl font-bold text-green-600">{{ creditSalesToday }}</div>
                                    <div class="text-sm text-green-700 font-medium">Vendas a Crédito Hoje</div>
                                </div>
                                <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Filtros Mobile -->
            <div class="bg-white rounded-xl border border-slate-200 shadow-sm">
                <div class="p-4">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z">
                                </path>
                            </svg>
                            <h2 class="text-sm font-semibold text-slate-700">Filtros</h2>
                        </div>
                        <div class="flex items-center gap-2">
                            <button @click="selectAllClients"
                                class="text-xs text-blue-600 hover:text-blue-800 font-medium">
                                Selecionar Todos
                            </button>
                            <button @click="clearFilters" class="text-xs text-blue-600 hover:text-blue-800 font-medium">
                                Limpar
                            </button>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <!-- Busca -->
                        <div>
                            <input v-model="filters.search" type="text" placeholder="Buscar clientes a fiado..."
                                class="w-full px-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        </div>

                        <!-- Filtros -->
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block text-xs font-medium text-slate-700 mb-2">Status da Dívida</label>
                                <select v-model="filters.debtStatus"
                                    class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                    <option value="">Todos</option>
                                    <option value="hasDebt">Com Dívidas</option>
                                    <option value="noDebt">Sem Dívidas</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-xs font-medium text-slate-700 mb-2">Valor da Dívida</label>
                                <select v-model="filters.debtAmount"
                                    class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                    <option value="">Todos</option>
                                    <option value="high">Alta (> MT 1000)</option>
                                    <option value="medium">Média (MT 100-1000)</option>
                                    <option value="low">Baixa (< MT 100)</option>
                                </select>
                            </div>
                        </div>

                        <!-- Botão Aplicar -->
                        <button @click="applyFilters"
                            class="w-full px-4 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                            Aplicar Filtros
                        </button>
                    </div>
                </div>
            </div>

            <!-- Lista de Clientes -->
            <div v-if="loading" class="flex justify-center py-8">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>

            <div v-else-if="filteredClients.length === 0" class="text-center py-8">
                <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z">
                        </path>
                    </svg>
                </div>
                <h3 class="text-lg font-medium text-slate-800 mb-2">Nenhum cliente a fiado encontrado</h3>
                <p class="text-slate-600 mb-4">Comece adicionando um novo cliente a fiado</p>
                <button @click="openModal('create')"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Adicionar Cliente a Fiado
                </button>
            </div>

            <div v-else class="space-y-3">
                <div v-for="client in filteredClients" :key="client.id"
                    class="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
                    <div class="p-4">
                        <!-- Header Mobile -->
                        <div class="flex items-start justify-between mb-3">
                            <div class="flex items-center gap-3">
                                <div
                                    class="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z">
                                        </path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-slate-800">{{ client.name }}</h3>
                                    <p class="text-sm text-slate-600">{{ client.contact }}</p>
                                </div>
                            </div>
                            <!-- Status da Dívida -->
                            <div class="flex flex-col items-end gap-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                                    :class="client.hasDebt ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'">
                                    <div class="w-2 h-2 rounded-full mr-2"
                                        :class="client.hasDebt ? 'bg-red-500' : 'bg-green-500'"></div>
                                    {{ client.hasDebt ? 'Com Dívida' : 'Sem Dívida' }}
                                </span>
                                <div class="text-sm font-semibold text-slate-800">
                                    MT {{ formatPrice(client.creditBalance || 0) }}
                                </div>
                            </div>
                        </div>

                        <!-- Informações da Dívida -->
                        <div class="grid grid-cols-2 gap-4 mb-3">
                            <div class="bg-slate-50 rounded-lg p-3">
                                <div class="text-xs text-slate-500 mb-1">Última Compra a Fiado</div>
                                <div class="text-sm font-medium text-slate-800">{{ formatDate(client.lastCreditSale) }}
                                </div>
                            </div>
                            <div class="bg-slate-50 rounded-lg p-3">
                                <div class="text-xs text-slate-500 mb-1">Total de Vendas a Crédito</div>
                                <div class="text-sm font-medium text-slate-800">{{ client.creditSalesCount || 0 }}
                                    vendas</div>
                            </div>
                        </div>

                        <!-- Ações Mobile -->
                        <div class="flex gap-2">
                            <!-- Seleção -->
                            <button @click="toggleClientSelection(client.id)"
                                class="px-3 py-2 rounded-lg transition-colors"
                                :class="selectedClients.includes(client.id) ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path v-if="selectedClients.includes(client.id)" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7">
                                    </path>
                                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6">
                                    </path>
                                </svg>
                            </button>

                            <button @click="openModal('edit', client)"
                                class="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                                    </path>
                                </svg>
                                Editar
                            </button>
                            <button @click="viewClientHistory(client)"
                                class="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z">
                                    </path>
                                </svg>
                                Histórico
                            </button>
                            <button @click="viewClientDebts(client)"
                                class="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1">
                                    </path>
                                </svg>
                            </button>
                            <button @click="deleteClient(client.id)"
                                class="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                    </path>
                                </svg>
                            </button>
                        </div>

                        <!-- Observações (se existir) -->
                        <div v-if="client.observations" class="mt-3 p-3 bg-slate-50 rounded-lg">
                            <div class="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Observações
                            </div>
                            <p class="text-sm text-slate-700">{{ client.observations }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Barra de Ações em Lote -->
        <div v-if="showBulkActions" class="fixed bottom-4 left-4 right-4 z-50">
            <div class="bg-white rounded-xl shadow-2xl border border-slate-200 p-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z">
                                </path>
                            </svg>
                        </div>
                        <div>
                            <div class="text-sm font-semibold text-slate-800">{{ selectedClients.length }} clientes
                                selecionados</div>
                            <div class="text-xs text-slate-600">Escolha uma ação para aplicar</div>
                        </div>
                    </div>

                    <div class="flex items-center gap-2">
                        <button @click="bulkMarkAsPaid"
                            class="px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
                            Marcar como Pago
                        </button>
                        <button @click="bulkSendReminder"
                            class="px-3 py-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors text-sm font-medium">
                            Enviar Lembrete
                        </button>
                        <button @click="bulkDeleteClients"
                            class="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium">
                            Excluir
                        </button>
                        <button @click="clearSelection"
                            class="px-3 py-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom Sheet de Cliente -->
        <CustomBottomSheet :visible="showModal" @close="closeModal" @update:visible="showModal = $event"
            :title="modalMode === 'create' ? 'Novo Cliente a Fiado' : 'Editar Cliente a Fiado'" height="85vh">

            <form @submit.prevent="saveClient">
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-2">Nome do Cliente *</label>
                        <input v-model="form.name" type="text" placeholder="Digite o nome do cliente"
                            class="w-full px-4 py-3 text-sm text-black placeholder-gray-500 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            required />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-2">Contato</label>
                        <input v-model="form.contact" type="text" placeholder="Telefone, email, etc."
                            class="w-full px-4 py-3 text-sm text-black placeholder-gray-500 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-2">Endereço</label>
                        <input v-model="form.address" type="text" placeholder="Endereço completo"
                            class="w-full px-4 py-3 text-sm text-black placeholder-gray-500 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-2">Limite de Crédito (MT)</label>
                        <input v-model="form.creditLimit" type="number" step="0.01" placeholder="0.00"
                            class="w-full px-4 py-3 text-sm text-black placeholder-gray-500 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-2">Observações</label>
                        <textarea v-model="form.observations" rows="3" placeholder="Observações sobre o cliente..."
                            class="w-full px-4 py-3 text-sm text-black placeholder-gray-500 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"></textarea>
                    </div>
                </div>

                <!-- Botões de Ação -->
                <div class="flex gap-3 pt-6">
                    <button type="button" @click="closeModal"
                        class="flex-1 px-4 py-3 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">
                        Cancelar
                    </button>
                    <button type="submit" @click="saveClient"
                        class="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg"
                        :disabled="formLoading">
                        <div v-if="formLoading" class="flex items-center justify-center">
                            <div
                                class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2">
                            </div>
                            Salvando...
                        </div>
                        <div v-else>
                            {{ modalMode === 'create' ? 'Criar Cliente a Fiado' : 'Salvar Alterações' }}
                        </div>
                    </button>
                </div>
            </form>
        </CustomBottomSheet>

        <!-- Bottom Sheet de Histórico -->
        <CustomBottomSheet :visible="showHistoryModal" title="Histórico de Vendas a Crédito" height="85vh"
            @close="closeHistoryModal" @update:visible="showHistoryModal = $event">

            <div>
                <div class="space-y-3">
                    <div v-for="sale in clientHistory" :key="sale.id" class="bg-slate-50 rounded p-3">
                        <div class="flex justify-between items-start">
                            <div>
                                <h4 class="font-semibold text-slate-800">Venda #{{ sale.saleNumber }}</h4>
                                <p class="text-xs text-slate-600 mt-1">{{ formatDate(sale.createdAt) }}</p>
                                <p class="text-sm font-medium text-slate-800 mt-1">Total: MT {{
                                    formatPrice(sale.totalAmount) }}</p>
                            </div>
                            <div class="text-right">
                                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                                    :class="{
                                        'bg-green-100 text-green-800': sale.paymentStatus === 'paid',
                                        'bg-yellow-100 text-yellow-800': sale.paymentStatus === 'partial',
                                        'bg-red-100 text-red-800': sale.paymentStatus === 'pending'
                                    }">
                                    {{ getStatusText(sale.paymentStatus) }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex justify-end pt-3 border-t border-slate-200 mt-4">
                    <button @click="closeHistoryModal"
                        class="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-md hover:bg-slate-50 transition-colors">
                        Fechar
                    </button>
                </div>
            </div>
        </CustomBottomSheet>

        <!-- Bottom Sheet de Dívidas -->
        <CustomBottomSheet :visible="showDebtsModal" title="Dívidas do Cliente" height="85vh" @close="closeDebtsModal"
            @update:visible="showDebtsModal = $event">

            <div>
                <div class="space-y-3">
                    <div v-for="debt in clientDebts" :key="debt.id" class="bg-red-50 rounded p-3">
                        <div class="flex justify-between items-start">
                            <div>
                                <h4 class="font-semibold text-slate-800">Venda #{{ debt.saleNumber }}</h4>
                                <p class="text-xs text-slate-600 mt-1">{{ formatDate(debt.createdAt) }}</p>
                                <p class="text-sm font-medium text-slate-800 mt-1">Total: MT {{
                                    formatPrice(debt.totalAmount) }}</p>
                            </div>
                            <div class="text-right">
                                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                                    :class="{
                                        'bg-green-100 text-green-800': debt.paymentStatus === 'paid',
                                        'bg-yellow-100 text-yellow-800': debt.paymentStatus === 'partial',
                                        'bg-red-100 text-red-800': debt.paymentStatus === 'pending'
                                    }">
                                    {{ getStatusText(debt.paymentStatus) }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex justify-end pt-3 border-t border-slate-200 mt-4">
                    <button @click="closeDebtsModal"
                        class="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-md hover:bg-slate-50 transition-colors">
                        Fechar
                    </button>
                </div>
            </div>
        </CustomBottomSheet>

        <!-- Paginação -->
        <PaginationComponent :current-page="clientsStore.pagination.page" :total-items="clientsStore.pagination.total"
            :items-per-page="clientsStore.pagination.limit" @page-change="handlePageChange"
            @items-per-page-change="handleItemsPerPageChange" />
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive, computed } from 'vue'
import { useClientsStore } from '@/stores/clients'
import { useAuthStore } from '@/stores/auth'
import { permissionManager, PERMISSIONS } from '@/utils/permissions'
import { apiService } from '@/services/api'
import { useNotifications } from '@/composables/useNotifications'
import CustomBottomSheet from '../components/CustomBottomSheet.vue'
import PaginationComponent from '@/components/Pagination/PaginationComponent.vue'

// Store
const clientsStore = useClientsStore()
const authStore = useAuthStore()

// Notifications
const { handleApiError, handleApiSuccess } = useNotifications()

// Controle de acesso baseado em roles
const userRole = computed(() => authStore.user?.role || 'seller')
const isAdmin = computed(() => userRole.value === 'admin')
const isManager = computed(() => userRole.value === 'manager')
const isSeller = computed(() => userRole.value === 'seller')

// Permissões específicas
const canCreateClients = computed(() => permissionManager.hasPermission(PERMISSIONS.CLIENTS_CREATE))
const canEditClients = computed(() => permissionManager.hasPermission(PERMISSIONS.CLIENTS_EDIT))
const canDeleteClients = computed(() => permissionManager.hasPermission(PERMISSIONS.CLIENTS_DELETE))
const canViewClients = computed(() => permissionManager.hasPermission(PERMISSIONS.CLIENTS_VIEW))

// Estado reativo
const showModal = ref(false)
const showHistoryModal = ref(false)
const showDebtsModal = ref(false)
const modalMode = ref('create')
const selectedClients = ref([])
const showBulkActions = ref(false)
const formLoading = ref(false)

const filters = reactive({
    search: '',
    debtStatus: '',
    debtAmount: ''
})

const form = reactive({
    id: null,
    name: '',
    contact: '',
    address: '',
    creditLimit: '',
    observations: ''
})

// Dados para modais
const selectedClient = ref(null)
const clientHistory = ref([])
const clientDebts = ref([])

// Computed
const clients = computed(() => clientsStore.clients)
const loading = computed(() => clientsStore.loading)
const filteredClients = computed(() => clientsStore.filteredClients)

// Estatísticas dos clientes a fiado
const clientsWithDebts = computed(() => {
    // Cálculo direto dos clientes com dívidas
    return clientsStore.clients.filter(client => (client.creditBalance || 0) > 0).length
})
const totalDebts = computed(() => {
    // Cálculo direto do total de dívidas
    return clientsStore.clients.reduce((sum, client) => sum + (client.creditBalance || 0), 0)
})
const creditSalesToday = computed(() => 0) // Placeholder por enquanto

// Métodos
const formatPrice = (price) => {
    return parseFloat(price).toFixed(2).replace('.', ',')
}

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-PT')
}

const getStatusText = (status) => {
    const statusMap = {
        paid: 'Pago',
        partial: 'Parcial',
        pending: 'Pendente'
    }
    return statusMap[status] || status
}

const openModal = (mode, client = null) => {
    modalMode.value = mode
    showModal.value = true

    if (mode === 'create') {
        Object.assign(form, {
            id: null,
            name: '',
            contact: '',
            address: '',
            creditLimit: '',
            observations: ''
        })
    } else if (mode === 'edit' && client) {
        Object.assign(form, {
            id: client.id,
            name: client.name,
            contact: client.contact,
            address: client.address,
            creditLimit: client.creditLimit,
            observations: client.observations
        })
    }
}

const closeModal = () => {
    showModal.value = false
    modalMode.value = 'create'
    resetForm()
}

const resetForm = () => {
    form.id = null
    form.name = ''
    form.contact = ''
    form.address = ''
    form.creditLimit = ''
    form.observations = ''
}

const saveClient = async () => {
    try {
        formLoading.value = true

        // Validação de formulário
        if (!form.name.trim()) {
            handleApiError(new Error('Nome é obrigatório'), 'Validação')
            return
        }

        const clientData = { ...form }

        let result
        if (modalMode.value === 'create') {
            result = await clientsStore.createClient(clientData)
        } else {
            result = await clientsStore.updateClient(form.id, clientData)
        }

        if (result.success) {
            closeModal()
            loadClients()
            handleApiSuccess('Cliente a fiado salvo com sucesso!', 'Salvar Cliente')
        } else {
            handleApiError(new Error(result.error), 'Salvar Cliente')
        }
    } catch (error) {
        console.error('Erro ao salvar cliente:', error)
        handleApiError(error, 'Salvar Cliente')
    } finally {
        formLoading.value = false
    }
}

const deleteClient = async (clientId) => {
    if (!confirm('Tem a certeza que deseja excluir este cliente a fiado?')) {
        return
    }

    try {
        const result = await clientsStore.deleteClient(clientId)

        if (result.success) {
            loadClients()
            handleApiSuccess('Cliente a fiado excluído com sucesso!', 'Excluir Cliente')
        } else {
            handleApiError(new Error(result.error), 'Excluir Cliente')
        }
    } catch (error) {
        console.error('Erro ao excluir cliente:', error)
        handleApiError(error, 'Excluir Cliente')
    }
}

const viewClientHistory = async (client) => {
    selectedClient.value = client
    try {
        const response = await apiService.clients.getHistory(client.id)
        clientHistory.value = response.data
        showHistoryModal.value = true
    } catch (error) {
        console.error('Erro ao carregar histórico:', error)
        handleApiError(error, 'Carregar Histórico')
    }
}

const closeHistoryModal = () => {
    showHistoryModal.value = false
    selectedClient.value = null
    clientHistory.value = []
}

const viewClientDebts = async (client) => {
    selectedClient.value = client
    try {
        const response = await apiService.clients.getDebts(client.id)
        clientDebts.value = response.data
        showDebtsModal.value = true
    } catch (error) {
        console.error('Erro ao carregar dívidas:', error)
        handleApiError(error, 'Carregar Dívidas')
    }
}

const closeDebtsModal = () => {
    showDebtsModal.value = false
    selectedClient.value = null
    clientDebts.value = []
}

// Métodos de paginação
const handlePageChange = (page) => {
    clientsStore.setPage(page)
    loadClients()
}

const handleItemsPerPageChange = (itemsPerPage) => {
    clientsStore.setLimit(itemsPerPage)
    clientsStore.setPage(1) // Reset para primeira página
    loadClients()
}

// Funções para seleção múltipla
const toggleClientSelection = (clientId) => {
    const index = selectedClients.value.indexOf(clientId)
    if (index > -1) {
        selectedClients.value.splice(index, 1)
    } else {
        selectedClients.value.push(clientId)
    }
    showBulkActions.value = selectedClients.value.length > 0
}

const selectAllClients = () => {
    selectedClients.value = filteredClients.value.map(client => client.id)
    showBulkActions.value = true
}

const clearSelection = () => {
    selectedClients.value = []
    showBulkActions.value = false
}

// Ações em lote
const bulkMarkAsPaid = async () => {
    try {
        loading.value = true
        await new Promise(resolve => setTimeout(resolve, 1000))

        clearSelection()
        handleApiSuccess(`${selectedClients.value.length} clientes marcados como pagos!`, 'Ação em Lote')
    } catch (error) {
        console.error('Erro ao marcar como pago:', error)
        handleApiError(error, 'Ação em Lote')
    } finally {
        loading.value = false
    }
}

const bulkSendReminder = async () => {
    try {
        loading.value = true
        await new Promise(resolve => setTimeout(resolve, 1000))

        clearSelection()
        handleApiSuccess(`Lembretes enviados para ${selectedClients.value.length} clientes!`, 'Ação em Lote')
    } catch (error) {
        console.error('Erro ao enviar lembretes:', error)
        handleApiError(error, 'Ação em Lote')
    } finally {
        loading.value = false
    }
}

const bulkDeleteClients = async () => {
    if (!confirm(`Tem certeza que deseja excluir ${selectedClients.value.length} clientes a fiado?`)) {
        return
    }

    try {
        loading.value = true
        await new Promise(resolve => setTimeout(resolve, 1000))

        clients.value = clients.value.filter(client => !selectedClients.value.includes(client.id))
        clearSelection()
        handleApiSuccess(`${selectedClients.value.length} clientes excluídos com sucesso!`, 'Ação em Lote')
    } catch (error) {
        console.error('Erro ao excluir clientes:', error)
        handleApiError(error, 'Ação em Lote')
    } finally {
        loading.value = false
    }
}

const applyFilters = () => {
    clientsStore.setFilters(filters)
    loadClients()
}

const clearFilters = () => {
    Object.assign(filters, {
        search: '',
        debtStatus: '',
        debtAmount: ''
    })
    clientsStore.clearFilters()
    loadClients()
}

const loadClients = async () => {
    try {
        clientsStore.setFilters(filters)
        const result = await clientsStore.loadClients()

        if (!result.success) {
            console.error('Erro ao carregar clientes:', result.error)
        }
    } catch (error) {
        console.error('Erro ao carregar clientes:', error)
    }
}

// Lifecycle
onMounted(() => {
    // Configurar permissionManager com o usuário atual
    if (authStore.user) {
        permissionManager.setCurrentUser(authStore.user)
    }

    loadClients()

    // Escutar eventos de pagamento para atualizar dados
    window.addEventListener('payment-created', loadClients)
})

onUnmounted(() => {
    // Remover listener ao sair da página
    window.removeEventListener('payment-created', loadClients)
})
</script>
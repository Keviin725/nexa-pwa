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
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z">
                                </path>
                            </svg>
                        </div>
                        <div>
                            <h1 class="text-xl font-bold text-white">Clientes</h1>
                            <p class="text-blue-100 text-sm">
                                {{ isAdmin ? 'Gerencie todos os clientes' : isManager ? 'Gerencie clientes da equipe' :
                                    'Gerencie seus clientes' }}
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

        <div class="p-4">
            <!-- 1. RESUMO DE CLIENTES - Mais importante -->
            <div class="bg-white rounded-xl border border-slate-200 mb-4 shadow-sm">
                <div class="p-4">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-slate-800"> Resumo de Clientes</h3>
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            <span class="text-xs text-blue-600 font-medium">Atualizado</span>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div class="text-2xl font-bold text-blue-600 mb-1">{{ clients.length }}</div>
                            <div class="text-sm font-medium text-slate-700">Total Clientes</div>
                        </div>
                        <div class="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                            <div class="text-2xl font-bold text-red-600 mb-1">{{ clientsWithDebts.length }}</div>
                            <div class="text-sm font-medium text-slate-700">Com Dívidas</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 2. FILTROS - Segunda prioridade -->
            <div class="bg-white rounded-xl border border-slate-200 mb-4 shadow-sm">
                <div class="p-4">
                    <!-- Header dos Filtros -->
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z">
                                </path>
                            </svg>
                            <h3 class="text-sm font-semibold text-slate-700"> Filtros</h3>
                        </div>
                        <button @click="clearFilters" class="text-xs text-blue-600 hover:text-blue-800 font-medium">
                            Limpar todos
                        </button>
                    </div>

                    <!-- Busca Principal -->
                    <div class="mb-4">
                        <div class="relative">
                            <input v-model="filters.search" type="text" placeholder="Buscar clientes..."
                                class="w-full pl-10 pr-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                @input="searchClients" />
                            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                    </div>

                    <!-- Filtros Secundários -->
                    <div class="grid grid-cols-2 gap-3">
                        <div class="flex items-center space-x-2">
                            <input type="checkbox" v-model="filters.hasDebt" id="hasDebt"
                                class="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                                @change="searchClients" />
                            <label for="hasDebt" class="text-sm font-medium text-slate-700 cursor-pointer">
                                Com dívidas
                            </label>
                        </div>
                        <div>
                            <button @click="loadClientsWithDebts"
                                class="w-full px-3 py-2 text-sm bg-red-100 text-red-700 font-medium rounded-lg hover:bg-red-200 transition-colors">
                                Ver Dívidas
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="flex justify-center py-8">
                <div class="flex flex-col items-center space-y-3">
                    <div class="w-6 h-6 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    <p class="text-sm text-slate-600">Carregando...</p>
                </div>
            </div>

            <!-- Empty State -->
            <div v-else-if="clients.length === 0" class="text-center py-8">
                <div class="max-w-sm mx-auto">
                    <div class="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3">
                        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z">
                            </path>
                        </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-slate-800 mb-1">Nenhum cliente encontrado</h3>
                    <p class="text-sm text-slate-600 mb-4">Comece adicionando seu primeiro cliente</p>
                    <button @click="openModal('create')"
                        class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4">
                            </path>
                        </svg>
                        Adicionar Cliente
                    </button>
                </div>
            </div>

            <!-- Lista de Clientes Mobile -->
            <div v-else class="space-y-3">
                <div v-for="client in clients" :key="client.id"
                    class="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
                    <div class="p-4">
                        <!-- Header Mobile -->
                        <div class="flex items-start justify-between mb-3">
                            <div class="flex-1">
                                <h3 class="text-lg font-semibold text-slate-800 mb-1">{{ client.name }}</h3>
                                <div class="flex items-center gap-2 mb-2">
                                    <div class="w-2 h-2 rounded-full"
                                        :class="client.creditBalance > 0 ? 'bg-red-500' : 'bg-green-500'"></div>
                                    <span class="text-sm text-slate-600">{{ client.creditBalance > 0 ? 'Com dívidas' :
                                        'Em dia' }}</span>
                                </div>
                            </div>
                            <!-- Status Badge -->
                            <div class="flex flex-col items-end gap-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                                    :class="client.creditBalance > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'">
                                    <div class="w-2 h-2 rounded-full mr-2"
                                        :class="client.creditBalance > 0 ? 'bg-red-500' : 'bg-green-500'"></div>
                                    {{ client.creditBalance > 0 ? 'Devendo' : 'Em dia' }}
                                </span>
                            </div>
                        </div>

                        <!-- Informações Principais -->
                        <div class="grid grid-cols-2 gap-4 mb-3">
                            <div class="bg-slate-50 rounded-lg p-3">
                                <div class="text-xs text-slate-500 mb-1">Contato</div>
                                <div class="text-sm font-medium text-slate-800">{{ client.contact || 'N/A' }}</div>
                            </div>
                            <div class="bg-slate-50 rounded-lg p-3">
                                <div class="text-xs text-slate-500 mb-1">Saldo</div>
                                <div class="text-sm font-bold"
                                    :class="client.creditBalance > 0 ? 'text-red-600' : 'text-green-600'">
                                    MT {{ formatPrice(client.creditBalance) }}
                                </div>
                            </div>
                        </div>

                        <!-- Ações Mobile -->
                        <div class="flex gap-2">
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
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
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

            <!-- Bottom Sheet de Cliente -->
            <CustomBottomSheet v-model:visible="showModal"
                :title="modalMode === 'create' ? 'Novo Cliente' : 'Editar Cliente'" height="85vh" @close="closeModal">

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
                            <label class="block text-sm font-medium text-slate-700 mb-2">Observações</label>
                            <textarea v-model="form.observations" placeholder="Observações sobre o cliente"
                                class="w-full px-4 py-3 text-sm text-black placeholder-gray-500 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                rows="3"></textarea>
                        </div>
                    </div>

                    <div class="flex gap-3 pt-4 border-t border-slate-200 mt-6">
                        <button type="button" @click="closeModal"
                            class="flex-1 px-4 py-3 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">
                            Cancelar
                        </button>
                        <button type="submit"
                            class="flex-1 px-4 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            :disabled="loading">
                            <div v-if="loading" class="flex items-center justify-center">
                                <div
                                    class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2">
                                </div>
                                Salvando...
                            </div>
                            <div v-else>
                                {{ modalMode === 'create' ? 'Criar Cliente' : 'Salvar Alterações' }}
                            </div>
                        </button>
                    </div>
                </form>
            </CustomBottomSheet>

            <!-- Bottom Sheet de Histórico -->
            <CustomBottomSheet v-model:visible="showHistoryModal" title="Histórico do Cliente" height="85vh"
                @close="closeHistoryModal">

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

                    <div class="flex justify-end pt-3 border-t border-slate-200 mt-4">
                        <button @click="closeHistoryModal"
                            class="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-md hover:bg-slate-50 transition-colors">
                            Fechar
                        </button>
                    </div>
                </div>
            </CustomBottomSheet>

            <!-- Bottom Sheet de Dívidas -->
            <CustomBottomSheet v-model:visible="showDebtsModal" title="Dívidas do Cliente" height="85vh"
                @close="closeDebtsModal">

                <div>
                    <div class="space-y-3">
                        <div v-for="debt in clientDebts" :key="debt.id" class="bg-red-50 rounded p-3">
                            <div class="flex justify-between items-start">
                                <div>
                                    <h4 class="font-semibold text-slate-800">Venda #{{ debt.saleNumber }}</h4>
                                    <p class="text-xs text-slate-600 mt-1">{{ formatDate(debt.createdAt) }}</p>
                                    <p class="text-sm font-medium text-slate-800 mt-1">Total: R$ {{
                                        formatPrice(debt.totalAmount) }}</p>
                                    <p class="text-xs text-green-600 mt-1">Pago: MT {{ formatPrice(debt.totalPaid)
                                    }}</p>
                                    <p class="text-sm font-bold text-red-600 mt-1">Restante: MT {{
                                        formatPrice(debt.balance) }}</p>
                                </div>
                                <div class="flex flex-col gap-1">
                                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                                        :class="{
                                            'bg-green-100 text-green-800': debt.paymentStatus === 'paid',
                                            'bg-yellow-100 text-yellow-800': debt.paymentStatus === 'partial',
                                            'bg-red-100 text-red-800': debt.paymentStatus === 'pending'
                                        }">
                                        {{ getStatusText(debt.paymentStatus) }}
                                    </span>
                                    <span v-if="debt.isOverdue"
                                        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                        Vencido
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
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from 'vue'
import { useClientsStore } from '@/stores/clients'
import { useAuthStore } from '@/stores/auth'
import { permissionManager, PERMISSIONS } from '@/utils/permissions'
import CustomBottomSheet from '../components/CustomBottomSheet.vue'

// Store
const clientsStore = useClientsStore()
const authStore = useAuthStore()

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
const clientHistory = ref([])
const clientDebts = ref([])
const showModal = ref(false)
const showHistoryModal = ref(false)
const showDebtsModal = ref(false)
const modalMode = ref('create')
const selectedClient = ref(null)

// Computed properties
const clients = computed(() => clientsStore.clients)
const loading = computed(() => clientsStore.loading)
const clientsWithDebts = computed(() => clientsStore.clientsWithDebts)

// Filtros
const filters = reactive({
    search: '',
    hasDebt: false
})

// Formulário de cliente
const form = reactive({
    name: '',
    contact: '',
    observations: ''
})

// API Base URL
const API_BASE = 'http://localhost:3000'

// Métodos
const formatPrice = (price) => {
    return parseFloat(price).toFixed(2).replace('.', ',')
}

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-PT')
}

const getStatusText = (status) => {
    const statusMap = {
        'paid': 'Pago',
        'pending': 'Pendente',
        'partial': 'Parcial'
    }
    return statusMap[status] || status
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

const loadClientsWithDebts = async () => {
    try {
        const result = await clientsStore.loadClientsWithDebts()

        if (!result.success) {
            console.error('Erro ao carregar clientes com dívidas:', result.error)
        }
    } catch (error) {
        console.error('Erro ao carregar clientes com dívidas:', error)
    }
}

const searchClients = () => {
    clientsStore.setFilters(filters)
    loadClients()
}

const clearFilters = () => {
    Object.assign(filters, {
        search: '',
        hasDebt: false
    })
    clientsStore.clearFilters()
    loadClients()
}

const openModal = (mode, client = null) => {
    modalMode.value = mode
    if (mode === 'edit' && client) {
        Object.assign(form, {
            id: client.id,
            name: client.name,
            contact: client.contact || '',
            observations: client.observations || ''
        })
    } else {
        Object.assign(form, {
            id: null,
            name: '',
            contact: '',
            observations: ''
        })
    }
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
    Object.assign(form, {
        id: null,
        name: '',
        contact: '',
        observations: ''
    })
}

const saveClient = async () => {
    try {
        loading.value = true

        const url = modalMode.value === 'create'
            ? `${API_BASE}/clients`
            : `${API_BASE}/clients/${form.id}`

        const method = modalMode.value === 'create' ? 'POST' : 'PUT'

        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })

        if (response.ok) {
            closeModal()
            loadClients()
        } else {
            const error = await response.json()
            alert('Erro: ' + error.error)
        }
    } catch (error) {
        console.error('Erro ao salvar cliente:', error)
        alert('Erro ao salvar cliente')
    } finally {
        loading.value = false
    }
}

const deleteClient = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este cliente?')) return

    try {
        loading.value = true
        const response = await fetch(`${API_BASE}/clients/${id}`, {
            method: 'DELETE'
        })

        if (response.ok) {
            loadClients()
        } else {
            const error = await response.json()
            alert('Erro: ' + error.error)
        }
    } catch (error) {
        console.error('Erro ao excluir cliente:', error)
        alert('Erro ao excluir cliente')
    } finally {
        loading.value = false
    }
}

const viewClientHistory = async (client) => {
    selectedClient.value = client
    try {
        const response = await fetch(`${API_BASE}/clients/${client.id}/history`)
        clientHistory.value = await response.json()
        showHistoryModal.value = true
    } catch (error) {
        console.error('Erro ao carregar histórico:', error)
        alert('Erro ao carregar histórico do cliente')
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
        const response = await fetch(`${API_BASE}/clients/${client.id}/debts`)
        clientDebts.value = await response.json()
        showDebtsModal.value = true
    } catch (error) {
        console.error('Erro ao carregar dívidas:', error)
        alert('Erro ao carregar dívidas do cliente')
    }
}

const closeDebtsModal = () => {
    showDebtsModal.value = false
    selectedClient.value = null
    clientDebts.value = []
}

// Lifecycle
onMounted(() => {
    // Configurar permissionManager com o usuário atual
    if (authStore.user) {
        permissionManager.setCurrentUser(authStore.user)
    }

    loadClients()
})
</script>
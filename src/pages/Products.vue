<template>
    <div class="min-h-screen bg-slate-50">
        <!-- Header Mobile -->
        <div class="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 shadow-xl">
            <div class="px-4 py-4">
                <div class="flex items-center justify-between">
                    <!-- Logo e Título -->
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4">
                                </path>
                            </svg>
                        </div>
                        <div>
                            <h1 class="text-xl font-bold text-white">Produtos</h1>
                            <p class="text-purple-100 text-sm">
                                {{ isAdmin ? 'Gerencie todo o Stock' : isManager ? 'Gerencie Stock da equipe' :
                                    'Visualize produtos disponíveis' }}
                            </p>
                        </div>
                    </div>

                    <!-- Ações Mobile -->
                    <div class="flex items-center gap-3">
                        <!-- Novo Produto (apenas se tiver permissão) -->
                        <button v-if="canCreateProducts" @click="openModal('create')"
                            class="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors font-medium text-sm">
                            Novo Produto
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="p-4">
            <!-- 1. RESUMO DO STOCK - Mais importante -->
            <div class="bg-white rounded-xl border border-slate-200 mb-4 shadow-sm">
                <div class="p-4">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-slate-800">Resumo do Stock</h3>
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            <span class="text-xs text-blue-600 font-medium">Atualizado</span>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div class="text-2xl font-bold text-blue-600 mb-1">{{ products.length }}</div>
                            <div class="text-sm font-medium text-slate-700">Total Produtos</div>
                        </div>
                        <div class="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                            <div class="text-2xl font-bold text-red-600 mb-1">{{ lowStockProducts.length }}</div>
                            <div class="text-sm font-medium text-slate-700">Stock Baixo</div>
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
                            <h3 class="text-sm font-semibold text-slate-700">Filtros</h3>
                        </div>
                        <button @click="clearFilters" class="text-xs text-blue-600 hover:text-blue-800 font-medium">
                            Limpar todos
                        </button>
                    </div>

                    <!-- Busca Principal -->
                    <div class="mb-4">
                        <div class="relative">
                            <input v-model="filters.search" type="text" placeholder="Buscar produtos..."
                                class="w-full pl-10 pr-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                @input="searchProducts" />
                            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                    </div>

                    <!-- Filtros Secundários -->
                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="block text-xs font-medium text-slate-600 mb-2">Categoria</label>
                            <select v-model="filters.category"
                                class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                @change="searchProducts">
                                <option value="">Todas as categorias</option>
                                <option v-for="category in categories" :key="category" :value="category">
                                    {{ category }}
                                </option>
                            </select>
                        </div>
                        <div class="flex items-end">
                            <label
                                class="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors">
                                <input type="checkbox" v-model="filters.lowStock"
                                    class="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                                    @change="searchProducts" />
                                <span class="text-sm font-medium text-slate-700">Stock Baixo</span>
                            </label>
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
            <div v-else-if="products.length === 0" class="text-center py-8">
                <div class="max-w-sm mx-auto">
                    <div class="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3">
                        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                        </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-slate-800 mb-1">Nenhum produto encontrado</h3>
                    <p class="text-sm text-slate-600 mb-4">Comece adicionando seu primeiro produto</p>
                    <button @click="openModal('create')"
                        class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4">
                            </path>
                        </svg>
                        Adicionar Produto
                    </button>
                </div>
            </div>

            <!-- Lista de Produtos Mobile -->
            <div v-else class="space-y-3">
                <div v-for="product in products" :key="product.id"
                    class="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
                    <div class="p-4">
                        <!-- Header Mobile -->
                        <div class="flex items-start justify-between mb-3">
                            <div class="flex-1">
                                <h3 class="text-lg font-semibold text-slate-800 mb-1">{{ product.name }}</h3>
                                <div class="flex items-center gap-2 mb-2">
                                    <div v-if="product.category"
                                        class="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                        {{ product.category }}
                                    </div>
                                    <div v-if="product.code"
                                        class="inline-flex items-center px-2 py-1 bg-slate-100 text-slate-700 text-xs font-mono rounded-full">
                                        {{ product.code }}
                                    </div>
                                </div>
                            </div>
                            <!-- Status Badge -->
                            <div class="flex flex-col items-end gap-2">
                                <div v-if="product.stock <= product.minStock"
                                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                    <div class="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                                    Stock Baixo
                                </div>
                                <div v-else-if="product.stock > product.minStock"
                                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    <div class="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                                    Em Stock
                                </div>
                            </div>
                        </div>

                        <!-- Informações Principais -->
                        <div class="grid grid-cols-2 gap-4 mb-3">
                            <div class="bg-slate-50 rounded-lg p-3">
                                <div class="text-xs text-slate-500 mb-1">Preço de Venda</div>
                                <div class="text-lg font-bold text-green-600">MT {{ formatPrice(product.price) }}</div>
                            </div>
                            <div class="bg-slate-50 rounded-lg p-3">
                                <div class="text-xs text-slate-500 mb-1">Stock Atual</div>
                                <div class="text-lg font-bold"
                                    :class="product.stock <= product.minStock ? 'text-red-600' : 'text-blue-600'">
                                    {{ product.stock }} unidades
                                </div>
                            </div>
                        </div>

                        <!-- Ações Mobile -->
                        <div class="flex gap-2">
                            <button @click="openModal('edit', product)"
                                class="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                                    </path>
                                </svg>
                                Editar
                            </button>
                            <button @click="openStockModal(product)"
                                class="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4">
                                    </path>
                                </svg>
                                Stock
                            </button>
                            <button @click="deleteProduct(product.id)"
                                class="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                    </path>
                                </svg>
                            </button>
                        </div>

                        <!-- Descrição (se existir) -->
                        <div v-if="product.description" class="mt-3 p-3 bg-slate-50 rounded-lg">
                            <div class="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Descrição</div>
                            <p class="text-sm text-slate-700">{{ product.description }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bottom Sheet de Produto -->
            <CustomBottomSheet v-model:visible="showModal"
                :title="modalMode === 'create' ? 'Novo Produto' : 'Editar Produto'" height="90vh" @close="closeModal">

                <form @submit.prevent="saveProduct">
                    <div class="space-y-6">
                        <!-- Nome do Produto -->
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-2">Nome do Produto *</label>
                            <input v-model="form.name" type="text" placeholder="Digite o nome do produto"
                                class="w-full px-4 py-3 text-black placeholder-gray-500 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                required />
                        </div>

                        <!-- Preços -->
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block text-sm font-medium text-slate-700 mb-2">Preço de Venda
                                    *</label>
                                <input v-model="form.price" type="number" step="0.01" placeholder="0.00"
                                    class="w-full px-4 py-3 text-black placeholder-gray-500 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    required />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-slate-700 mb-2">Preço de Custo</label>
                                <input v-model="form.costPrice" type="number" step="0.01" placeholder="0.00"
                                    class="w-full px-4 py-3 text-black placeholder-gray-500 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
                            </div>
                        </div>

                        <!-- Código e Categoria -->
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block text-sm font-medium text-slate-700 mb-2">Código</label>
                                <input v-model="form.code" type="text" placeholder="Código do produto"
                                    class="w-full px-4 py-3 text-black placeholder-gray-500 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-slate-700 mb-2">Categoria</label>
                                <input v-model="form.category" type="text" placeholder="Categoria"
                                    class="w-full px-4 py-3 text-black placeholder-gray-500 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
                            </div>
                        </div>

                        <!-- Stock -->
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block text-sm font-medium text-slate-700 mb-2">Stock Inicial</label>
                                <input v-model="form.stock" type="number" placeholder="0"
                                    class="w-full px-4 py-3 text-black placeholder-gray-500 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-slate-700 mb-2">Stock Mínimo</label>
                                <input v-model="form.minStock" type="number" placeholder="0"
                                    class="w-full px-4 py-3 text-black placeholder-gray-500 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
                            </div>
                        </div>

                        <!-- Descrição -->
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-slate-700 mb-2">Peso (kg)</label>
                                <input v-model="form.weight" type="number" step="0.01" placeholder="0.00"
                                    class="w-full px-4 py-3 text-black placeholder-gray-500 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-slate-700 mb-2">Volume (L)</label>
                                <input v-model="form.volume" type="number" step="0.01" placeholder="0.00"
                                    class="w-full px-4 py-3 text-black placeholder-gray-500 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-2">Descrição</label>
                            <textarea v-model="form.description" placeholder="Descrição do produto"
                                class="w-full px-4 py-3 text-black placeholder-gray-500 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                rows="4"></textarea>
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
                                {{ modalMode === 'create' ? 'Criar Produto' : 'Salvar Alterações' }}
                            </div>
                        </button>
                    </div>
                </form>
            </CustomBottomSheet>

            <!-- Bottom Sheet de Stock -->
            <CustomBottomSheet v-model:visible="showStockModal" title="Atualizar Stock" height="70vh"
                @close="closeStockModal">

                <div class="bg-slate-50 rounded-lg p-3 mb-4">
                    <div class="flex justify-between items-center mb-1">
                        <span class="text-sm font-medium text-slate-600">Produto:</span>
                        <span class="font-semibold text-slate-800">{{ selectedProduct?.name }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-sm font-medium text-slate-600">Stock atual:</span>
                        <span class="text-lg font-bold text-blue-600">{{ selectedProduct?.stock }}</span>
                    </div>
                </div>

                <form @submit.prevent="updateStock" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-2">Operação</label>
                        <select v-model="stockForm.operation"
                            class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors">
                            <option value="add">Adicionar ao stock</option>
                            <option value="subtract">Subtrair do stock</option>
                            <option value="set">Definir stock</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-2">Quantidade</label>
                        <input v-model="stockForm.quantity" type="number" placeholder="0"
                            class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                            required />
                    </div>

                    <div class="flex gap-3 pt-4 border-t border-slate-200 mt-6">
                        <button type="button" @click="closeStockModal"
                            class="flex-1 px-4 py-3 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">
                            Cancelar
                        </button>
                        <button type="submit"
                            class="flex-1 px-4 py-3 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                            :disabled="loading">
                            <div v-if="loading" class="flex items-center justify-center">
                                <div
                                    class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2">
                                </div>
                                Atualizando...
                            </div>
                            <div v-else>Atualizar Stock</div>
                        </button>
                    </div>
                </form>
            </CustomBottomSheet>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive, computed, nextTick } from 'vue'
import { useProductsStore } from '@/stores/products'
import { useAuthStore } from '@/stores/auth'
import { permissionManager, PERMISSIONS } from '@/utils/permissions'
import CustomBottomSheet from '../components/CustomBottomSheet.vue'

// Store
const authStore = useAuthStore()
const productsStore = useProductsStore()

// Controle de acesso baseado em roles
const userRole = computed(() => authStore.user?.role || 'seller')
const isAdmin = computed(() => userRole.value === 'admin')
const isManager = computed(() => userRole.value === 'manager')
const isSeller = computed(() => userRole.value === 'seller')

// Permissões específicas
const canCreateProducts = computed(() => permissionManager.hasPermission(PERMISSIONS.PRODUCTS_CREATE))
const canEditProducts = computed(() => permissionManager.hasPermission(PERMISSIONS.PRODUCTS_EDIT))
const canDeleteProducts = computed(() => permissionManager.hasPermission(PERMISSIONS.PRODUCTS_DELETE))
const canViewProducts = computed(() => permissionManager.hasPermission(PERMISSIONS.PRODUCTS_VIEW))

// Estado local
const showModal = ref(false)
const showStockModal = ref(false)
const modalMode = ref('create')
const selectedProduct = ref(null)

// Computed properties
const products = computed(() => productsStore.products)
const categories = computed(() => productsStore.categories)
const loading = computed(() => productsStore.loading)
const lowStockProducts = computed(() => productsStore.lowStockProducts)

// Filtros
const filters = reactive({
    search: '',
    category: '',
    lowStock: false
})

// Formulário de produto
const form = reactive({
    id: null,
    name: '',
    price: '',
    costPrice: '',
    code: '',
    category: '',
    stock: '',
    minStock: '',
    description: '',
    location: '',
    weight: '',
    volume: '',
    notes: ''
})

// Formulário de Stock
const stockForm = reactive({
    operation: 'add',
    quantity: ''
})

// API Base URL
const API_BASE = 'http://localhost:3000'

// Métodos
const formatPrice = (price) => {
    return parseFloat(price).toFixed(2).replace('.', ',')
}

const loadProducts = async () => {
    try {
        console.log('🔄 Carregando produtos...')
        console.log('🔍 Filtros atuais:', filters)

        // Aplicar filtros na store
        productsStore.setFilters(filters)

        // Carregar produtos usando a store
        const result = await productsStore.loadProducts()
        console.log('✅ Produtos carregados:', result)
        console.log('📦 Produtos na store:', productsStore.products)
        console.log('📦 Produtos computados:', products.value)

        // Verificar se os produtos foram atualizados
        if (products.value && products.value.length > 0) {
            console.log('📊 Primeiro produto:', products.value[0])
            console.log('📊 Stock do primeiro produto:', products.value[0].stock)
        }

        // Forçar reatividade
        await nextTick()
        console.log('🔄 Reatividade forçada')
    } catch (error) {
        console.error('❌ Erro ao carregar produtos:', error)
    }
}

const checkLowStockProducts = () => {
    products.value.forEach(product => {
        if (product.stock <= product.minStock && product.stock > 0) {
            // Notificação de Stock baixo removida
        }
    })
}

const loadCategories = async () => {
    try {
        await productsStore.loadCategories()
    } catch (error) {
        console.error('Erro ao carregar categorias:', error)
    }
}

const searchProducts = () => {
    productsStore.setFilters(filters)
    loadProducts()
}

const clearFilters = () => {
    Object.assign(filters, {
        search: '',
        category: '',
        lowStock: false
    })
    productsStore.clearFilters()
    loadProducts()
}

const openModal = (mode, product = null) => {
    modalMode.value = mode
    if (mode === 'edit' && product) {
        Object.assign(form, {
            id: product.id,
            name: product.name,
            price: product.price,
            costPrice: product.costPrice || '',
            code: product.code || '',
            category: product.category || '',
            stock: product.stock,
            minStock: product.minStock || '',
            description: product.description || '',
            location: product.location || '',
            weight: product.weight || '',
            volume: product.volume || '',
            notes: product.notes || ''
        })
    } else {
        Object.assign(form, {
            id: null,
            name: '',
            price: '',
            costPrice: '',
            code: '',
            category: '',
            stock: '',
            minStock: '',
            description: '',
            location: '',
            weight: '',
            volume: '',
            notes: ''
        })
    }
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
    Object.assign(form, {
        id: null,
        name: '',
        price: '',
        costPrice: '',
        code: '',
        category: '',
        stock: '',
        minStock: '',
        description: '',
        location: '',
        weight: '',
        volume: '',
        notes: ''
    })
}

const saveProduct = async () => {
    try {
        let result

        if (modalMode.value === 'create') {
            result = await productsStore.createProduct(form)
        } else {
            result = await productsStore.updateProduct(form.id, form)
        }

        if (result.success) {
            closeModal()
            loadProducts()
        } else {
            alert('Erro ao salvar produto: ' + result.error)
        }
    } catch (error) {
        console.error('Erro ao salvar produto:', error)
        alert('Erro ao salvar produto')
    }
}

const deleteProduct = async (id) => {
    if (!confirm('Tem a certeza que deseja excluir este produto?')) return

    try {
        const result = await productsStore.deleteProduct(id)

        if (result.success) {
            loadProducts()
        } else {
            alert('Erro ao excluir produto: ' + result.error)
        }
    } catch (error) {
        console.error('Erro ao excluir produto:', error)
        alert('Erro ao excluir produto')
    }
}

const openStockModal = (product) => {
    selectedProduct.value = product
    stockForm.operation = 'add'
    stockForm.quantity = ''
    showStockModal.value = true
}

const closeStockModal = () => {
    showStockModal.value = false
    selectedProduct.value = null
    stockForm.operation = 'add'
    stockForm.quantity = ''
}

const updateStock = async () => {
    try {
        const stockData = {
            operation: stockForm.operation,
            quantity: parseInt(stockForm.quantity),
            reason: stockForm.reason
        }

        const result = await productsStore.updateStock(selectedProduct.value.id, stockData)

        if (result.success) {
            closeStockModal()
            loadProducts()
        } else {
            alert('Erro ao atualizar Stock: ' + result.error)
        }
    } catch (error) {
        console.error('Erro ao atualizar Stock:', error)
        alert('Erro ao atualizar Stock')
    }
}

// Funções para eventos
const handleSaleCreated = async () => {
    console.log('🔄 Evento sale-created recebido, recarregando produtos...')

    // Aguardar um pouco para garantir que o backend processou a venda
    setTimeout(async () => {
        try {
            // Forçar recarregamento direto da API
            const response = await fetch('http://localhost:3000/products')
            const data = await response.json()
            console.log('🔄 Dados atualizados da API:', data)

            // Atualizar a store diretamente
            productsStore.$patch({ products: data })
            console.log('✅ Store atualizada diretamente')
        } catch (error) {
            console.error('❌ Erro ao recarregar produtos:', error)
        }
    }, 1000)
}

const handleSaleDeleted = async () => {
    console.log('🔄 Evento sale-deleted recebido, recarregando produtos...')

    // Aguardar um pouco para garantir que o backend processou o cancelamento
    setTimeout(async () => {
        try {
            // Forçar recarregamento direto da API
            const response = await fetch('http://localhost:3000/products')
            const data = await response.json()
            console.log('🔄 Dados atualizados da API:', data)

            // Atualizar a store diretamente
            productsStore.$patch({ products: data })
            console.log('✅ Store atualizada diretamente')
        } catch (error) {
            console.error('❌ Erro ao recarregar produtos:', error)
        }
    }, 1000)
}

// Lifecycle
onMounted(() => {
    // Configurar permissionManager com o usuário atual
    if (authStore.user) {
        permissionManager.setCurrentUser(authStore.user)
    }

    loadProducts()
    loadCategories()

    // Escutar eventos de venda criada/deletada para atualizar produtos
    window.addEventListener('sale-created', handleSaleCreated)
    window.addEventListener('sale-deleted', handleSaleDeleted)
})

onUnmounted(() => {
    // Remover listener ao sair da página
    window.removeEventListener('sale-created', handleSaleCreated)
    window.removeEventListener('sale-deleted', handleSaleDeleted)
})
</script>
<template>
    <div class="min-h-screen bg-slate-50">
        <!-- Header Mobile -->
        <div class="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 shadow-xl">
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
                            <h1 class="text-xl font-bold text-white">Gerenciar Usuários</h1>
                            <p class="text-indigo-100 text-sm">Controle de acesso e permissões</p>
                        </div>
                    </div>

                    <!-- Ações Mobile -->
                    <div class="flex items-center gap-3">
                        <!-- Novo Usuário -->
                        <button @click="openModal('create')"
                            class="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors font-medium text-sm">
                            Novo Usuário
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="p-4 space-y-4">
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
                        <button @click="clearFilters" class="text-xs text-blue-600 hover:text-blue-800 font-medium">
                            Limpar
                        </button>
                    </div>

                    <div class="space-y-4">
                        <!-- Busca -->
                        <div>
                            <input v-model="filters.search" type="text" placeholder="Buscar utilizadores..."
                                class="w-full px-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                        </div>

                        <!-- Filtros -->
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block text-xs font-medium text-slate-700 mb-2">Função</label>
                                <select v-model="filters.role"
                                    class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                                    <option value="">Todas</option>
                                    <option value="admin">Administrador</option>
                                    <option value="gerente">Gerente</option>
                                    <option value="vendedor">Vendedor</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-xs font-medium text-slate-700 mb-2">Status</label>
                                <select v-model="filters.status"
                                    class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                                    <option value="">Todos</option>
                                    <option value="active">Ativo</option>
                                    <option value="inactive">Inativo</option>
                                </select>
                            </div>
                        </div>

                        <!-- Botão Aplicar -->
                        <button @click="applyFilters"
                            class="w-full px-4 py-3 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                            Aplicar Filtros
                        </button>
                    </div>
                </div>
            </div>

            <!-- Lista de Usuários -->
            <div v-if="loading" class="flex justify-center py-8">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>

            <div v-else-if="filteredUsers.length === 0" class="text-center py-8">
                <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z">
                        </path>
                    </svg>
                </div>
                <h3 class="text-lg font-medium text-slate-800 mb-2">Nenhum utilizador encontrado</h3>
                <p class="text-slate-600 mb-4">Comece criando um novo utilizador</p>
                <button @click="openModal('create')"
                    class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Criar Usuário
                </button>
            </div>

            <div v-else class="space-y-3">
                <div v-for="user in filteredUsers" :key="user.id"
                    class="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
                    <div class="p-4">
                        <!-- Header Mobile -->
                        <div class="flex items-start justify-between mb-3">
                            <div class="flex items-center gap-3">
                                <div
                                    class="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
                                    <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z">
                                        </path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-slate-800">{{ user.name }}</h3>
                                    <p class="text-sm text-slate-600">{{ user.email }}</p>
                                </div>
                            </div>
                            <!-- Status Badge -->
                            <div class="flex flex-col items-end gap-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                                    :class="getRoleClass(user.role)">
                                    {{ getRoleText(user.role) }}
                                </span>
                                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                                    :class="user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                                    <div class="w-2 h-2 rounded-full mr-2"
                                        :class="user.isActive ? 'bg-green-500' : 'bg-red-500'"></div>
                                    {{ user.isActive ? 'Ativo' : 'Inativo' }}
                                </span>
                            </div>
                        </div>

                        <!-- Informações Principais -->
                        <div class="grid grid-cols-2 gap-4 mb-3">
                            <div class="bg-slate-50 rounded-lg p-3">
                                <div class="text-xs text-slate-500 mb-1">Último Acesso</div>
                                <div class="text-sm font-medium text-slate-800">{{ formatDate(user.lastLogin) }}</div>
                            </div>
                            <div class="bg-slate-50 rounded-lg p-3">
                                <div class="text-xs text-slate-500 mb-1">Permissões</div>
                                <div class="text-sm font-medium text-slate-800">{{ user.permissions?.length || 0 }}
                                    ações</div>
                            </div>
                        </div>

                        <!-- Ações Mobile -->
                        <div class="flex gap-2">
                            <button @click="openModal('edit', user)"
                                class="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                                    </path>
                                </svg>
                                Editar
                            </button>
                            <button @click="toggleUserStatus(user)"
                                class="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
                                :class="user.isActive ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-green-50 text-green-600 hover:bg-green-100'">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path v-if="user.isActive" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728">
                                    </path>
                                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z">
                                    </path>
                                </svg>
                                {{ user.isActive ? 'Desativar' : 'Ativar' }}
                            </button>
                            <button @click="deleteUser(user.id)"
                                class="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                    </path>
                                </svg>
                            </button>
                        </div>

                        <!-- Permissões (se existir) -->
                        <div v-if="user.permissions && user.permissions.length > 0"
                            class="mt-3 p-3 bg-slate-50 rounded-lg">
                            <div class="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Permissões
                            </div>
                            <div class="flex flex-wrap gap-1">
                                <span v-for="permission in user.permissions.slice(0, 3)" :key="permission"
                                    class="inline-flex items-center px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                                    {{ getPermissionText(permission) }}
                                </span>
                                <span v-if="user.permissions.length > 3"
                                    class="inline-flex items-center px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                                    +{{ user.permissions.length - 3 }} mais
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal de Usuário -->
        <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
            <div class="bg-white rounded-t-2xl shadow-xl w-full max-h-[90vh] overflow-y-auto">
                <div class="p-4 border-b border-slate-200">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="p-2 bg-indigo-100 rounded-lg">
                                <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path v-if="modalMode === 'create'" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M12 4v16m8-8H4"></path>
                                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                                    </path>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold text-slate-800">
                                    {{ modalMode === 'create' ? 'Novo Usuário' : 'Editar Usuário' }}
                                </h3>
                                <p class="text-sm text-slate-600">
                                    {{ modalMode === 'create' ? 'Adicione um novo utilizador' : 'Actualize a informação'
                                    }}
                                </p>
                            </div>
                        </div>
                        <button @click="closeModal"
                            class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <form @submit.prevent="saveUser" class="p-4">
                    <div class="space-y-4">
                        <!-- Nome -->
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-2">Nome Completo *</label>
                            <input v-model="form.name" type="text" placeholder="Digite o nome completo"
                                class="w-full px-4 py-3 text-sm text-black placeholder-gray-500 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                required />
                        </div>

                        <!-- Email -->
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                            <input v-model="form.email" type="email" placeholder="Digite o email"
                                class="w-full px-4 py-3 text-sm text-black placeholder-gray-500 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                required />
                        </div>

                        <!-- Senha (apenas para criação) -->
                        <div v-if="modalMode === 'create'">
                            <label class="block text-sm font-medium text-slate-700 mb-2">Senha *</label>
                            <input v-model="form.password" type="password" placeholder="Digite a senha"
                                class="w-full px-4 py-3 text-sm text-black placeholder-gray-500 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                required />
                        </div>

                        <!-- Função -->
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-2">Função *</label>
                            <select v-model="form.role"
                                class="w-full px-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                required>
                                <option value="">Selecione uma função</option>
                                <option value="admin">Administrador</option>
                                <option value="gerente">Gerente</option>
                                <option value="vendedor">Vendedor</option>
                            </select>
                        </div>

                        <!-- Status -->
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-2">Status</label>
                            <div class="flex items-center gap-4">
                                <label class="flex items-center">
                                    <input v-model="form.isActive" type="radio" :value="true"
                                        class="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500" />
                                    <span class="ml-2 text-sm text-slate-700">Ativo</span>
                                </label>
                                <label class="flex items-center">
                                    <input v-model="form.isActive" type="radio" :value="false"
                                        class="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500" />
                                    <span class="ml-2 text-sm text-slate-700">Inativo</span>
                                </label>
                            </div>
                        </div>

                        <!-- Permissões -->
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-2">Permissões</label>
                            <div class="grid grid-cols-2 gap-3">
                                <label v-for="permission in availablePermissions" :key="permission.value"
                                    class="flex items-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                                    <input v-model="form.permissions" type="checkbox" :value="permission.value"
                                        class="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500" />
                                    <div class="ml-3">
                                        <div class="text-sm font-medium text-slate-700">{{ permission.label }}</div>
                                        <div class="text-xs text-slate-500">{{ permission.description }}</div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="flex gap-3 pt-4 border-t border-slate-200 mt-6">
                        <button type="button" @click="closeModal"
                            class="flex-1 px-4 py-3 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">
                            Cancelar
                        </button>
                        <button type="submit"
                            class="flex-1 px-4 py-3 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                            :disabled="loading">
                            <div v-if="loading" class="flex items-center justify-center">
                                <div
                                    class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2">
                                </div>
                                Salvando...
                            </div>
                            <div v-else>
                                {{ modalMode === 'create' ? 'Criar Usuário' : 'Salvar Alterações' }}
                            </div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

// Estado reativo
const loading = ref(false)
const showModal = ref(false)
const modalMode = ref('create')
const users = ref([])

const filters = reactive({
    search: '',
    role: '',
    status: ''
})

const form = reactive({
    id: null,
    name: '',
    email: '',
    password: '',
    role: '',
    isActive: true,
    permissions: []
})

// Permissões disponíveis
const availablePermissions = [
    { value: 'sales.create', label: 'Criar Vendas', description: 'Registrar novas vendas' },
    { value: 'sales.edit', label: 'Editar Vendas', description: 'Modificar vendas existentes' },
    { value: 'sales.delete', label: 'Excluir Vendas', description: 'Remover vendas' },
    { value: 'products.create', label: 'Criar Produtos', description: 'Adicionar novos produtos' },
    { value: 'products.edit', label: 'Editar Produtos', description: 'Modificar produtos' },
    { value: 'products.delete', label: 'Excluir Produtos', description: 'Remover produtos' },
    { value: 'clients.create', label: 'Criar Clientes', description: 'Cadastrar clientes' },
    { value: 'clients.edit', label: 'Editar Clientes', description: 'Modificar clientes' },
    { value: 'clients.delete', label: 'Excluir Clientes', description: 'Remover clientes' },
    { value: 'reports.view', label: 'Ver Relatórios', description: 'Acessar relatórios' },
    { value: 'users.manage', label: 'Gerir Utilizadores', description: 'Criar/editar utilizadores' },
    { value: 'settings.manage', label: 'Configurações', description: 'Acessar configurações' }
]

// Computed
const filteredUsers = computed(() => {
    let result = users.value

    if (filters.search) {
        result = result.filter(user =>
            user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            user.email.toLowerCase().includes(filters.search.toLowerCase())
        )
    }

    if (filters.role) {
        result = result.filter(user => user.role === filters.role)
    }

    if (filters.status) {
        result = result.filter(user =>
            filters.status === 'active' ? user.isActive : !user.isActive
        )
    }

    return result
})

// Métodos
const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-PT')
}

const getRoleText = (role) => {
    const roles = {
        admin: 'Administrador',
        gerente: 'Gerente',
        vendedor: 'Vendedor'
    }
    return roles[role] || role
}

const getRoleClass = (role) => {
    const classes = {
        admin: 'bg-red-100 text-red-800',
        gerente: 'bg-blue-100 text-blue-800',
        vendedor: 'bg-green-100 text-green-800'
    }
    return classes[role] || 'bg-slate-100 text-slate-800'
}

const getPermissionText = (permission) => {
    const permissionMap = {
        'sales.create': 'Criar Vendas',
        'sales.edit': 'Editar Vendas',
        'sales.delete': 'Excluir Vendas',
        'products.create': 'Criar Produtos',
        'products.edit': 'Editar Produtos',
        'products.delete': 'Excluir Produtos',
        'clients.create': 'Criar Clientes',
        'clients.edit': 'Editar Clientes',
        'clients.delete': 'Excluir Clientes',
        'reports.view': 'Ver Relatórios',
        'users.manage': 'Gerenciar Usuários',
        'settings.manage': 'Configurações'
    }
    return permissionMap[permission] || permission
}

const openModal = (mode, user = null) => {
    modalMode.value = mode
    showModal.value = true

    if (mode === 'create') {
        Object.assign(form, {
            id: null,
            name: '',
            email: '',
            password: '',
            role: '',
            isActive: true,
            permissions: []
        })
    } else if (mode === 'edit' && user) {
        Object.assign(form, {
            id: user.id,
            name: user.name,
            email: user.email,
            password: '',
            role: user.role,
            isActive: user.isActive,
            permissions: user.permissions || []
        })
    }
}

const closeModal = () => {
    showModal.value = false
    modalMode.value = 'create'
}

const saveUser = async () => {
    try {
        loading.value = true

        // Simular API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        if (modalMode.value === 'create') {
            const newUser = {
                id: Date.now(),
                ...form,
                lastLogin: new Date().toISOString(),
                createdAt: new Date().toISOString()
            }
            users.value.push(newUser)
        } else {
            const index = users.value.findIndex(u => u.id === form.id)
            if (index !== -1) {
                users.value[index] = { ...users.value[index], ...form }
            }
        }

        closeModal()
        alert('Usuário salvo com sucesso!')
    } catch (error) {
        console.error('Erro ao salvar utilizador:', error)
        alert('Erro ao salvar utilizador')
    } finally {
        loading.value = false
    }
}

const toggleUserStatus = async (user) => {
    try {
        loading.value = true

        // Simular API call
        await new Promise(resolve => setTimeout(resolve, 500))

        user.isActive = !user.isActive
        alert(`Usuário ${user.isActive ? 'ativado' : 'desativado'} com sucesso!`)
    } catch (error) {
        console.error('Erro ao alterar status:', error)
        alert('Erro ao alterar status do utilizador')
    } finally {
        loading.value = false
    }
}

const deleteUser = async (userId) => {
    if (!confirm('Tem a certeza que deseja excluir este utilizador?')) {
        return
    }

    try {
        loading.value = true

        // Simular API call
        await new Promise(resolve => setTimeout(resolve, 500))

        users.value = users.value.filter(u => u.id !== userId)
        alert('Usuário excluído com sucesso!')
    } catch (error) {
        console.error('Erro ao excluir utilizador:', error)
        alert('Erro ao excluir utilizador')
    } finally {
        loading.value = false
    }
}

const applyFilters = () => {
    // Filtros são aplicados automaticamente via computed
}

const clearFilters = () => {
    Object.assign(filters, {
        search: '',
        role: '',
        status: ''
    })
}

const loadUsers = async () => {
    try {
        loading.value = true

        // Simular API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Dados mock
        users.value = [
            {
                id: 1,
                name: 'João Silva',
                email: 'joao@lojinha.com',
                role: 'admin',
                isActive: true,
                permissions: ['sales.create', 'sales.edit', 'sales.delete', 'products.create', 'products.edit', 'products.delete', 'clients.create', 'clients.edit', 'clients.delete', 'reports.view', 'users.manage', 'settings.manage'],
                lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 2,
                name: 'Maria Santos',
                email: 'maria@lojinha.com',
                role: 'gerente',
                isActive: true,
                permissions: ['sales.create', 'sales.edit', 'products.create', 'products.edit', 'clients.create', 'clients.edit', 'reports.view'],
                lastLogin: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
                createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 3,
                name: 'Pedro Costa',
                email: 'pedro@lojinha.com',
                role: 'vendedor',
                isActive: true,
                permissions: ['sales.create', 'sales.edit', 'clients.create', 'clients.edit'],
                lastLogin: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
                createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 4,
                name: 'Ana Oliveira',
                email: 'ana@lojinha.com',
                role: 'vendedor',
                isActive: false,
                permissions: ['sales.create', 'clients.create'],
                lastLogin: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
            }
        ]
    } catch (error) {
        console.error('Erro ao carregar utilizadores:', error)
        alert('Erro ao carregar utilizadores')
    } finally {
        loading.value = false
    }
}

// Lifecycle
onMounted(() => {
    loadUsers()
})
</script>
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
                            <h1 class="text-xl font-bold text-white">Gestão de Colaboradores</h1>
                            <p class="text-indigo-100 text-sm">
                                {{ isAdmin ? 'Gerencie todos os colaboradores' : isManager ? 'Colaboradores' : ''
                                }}
                            </p>
                        </div>
                    </div>

                    <!-- Ações Mobile -->
                    <div class="flex items-center gap-3">
                        <!-- Novo Colaborador (apenas se tiver permissão) -->
                        <button v-if="canManageUsers" @click="openModal('create')"
                            class="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors font-medium text-sm flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6">
                                </path>
                            </svg>
                            Novo Colaborador
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="p-4 space-y-4">
            <!-- Estatísticas dos Colaboradores -->
            <div class="bg-white rounded-xl border border-slate-200 shadow-sm">
                <div class="p-4">
                    <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                            </path>
                        </svg>
                        Resumo dos Colaboradores
                    </h2>

                    <div class="grid grid-cols-2 gap-4">
                        <!-- Total de Colaboradores -->
                        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                            <div class="flex items-center justify-between">
                                <div>
                                    <div class="text-2xl font-bold text-blue-600">{{ users.length }}</div>
                                    <div class="text-sm text-blue-700 font-medium">Total</div>
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

                        <!-- Colaboradores Ativos -->
                        <div
                            class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                            <div class="flex items-center justify-between">
                                <div>
                                    <div class="text-2xl font-bold text-green-600">{{ activeUsers }}</div>
                                    <div class="text-sm text-green-700 font-medium">Ativos</div>
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

                        <!-- Administradores -->
                        <div class="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-4 border border-red-200">
                            <div class="flex items-center justify-between">
                                <div>
                                    <div class="text-2xl font-bold text-red-600">{{ adminUsers }}</div>
                                    <div class="text-sm text-red-700 font-medium">Admins</div>
                                </div>
                                <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                    <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <!-- Vendedores -->
                        <div
                            class="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-4 border border-orange-200">
                            <div class="flex items-center justify-between">
                                <div>
                                    <div class="text-2xl font-bold text-orange-600">{{ sellerUsers }}</div>
                                    <div class="text-sm text-orange-700 font-medium">Vendedores</div>
                                </div>
                                <div class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                    <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z">
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
                            <button @click="selectAllUsers"
                                class="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
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
                <h3 class="text-lg font-medium text-slate-800 mb-2">Nenhum colaborador encontrado</h3>
                <p class="text-slate-600 mb-4">Comece adicionando um novo colaborador</p>
                <button @click="openModal('create')"
                    class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Adicionar Colaborador
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
                            <!-- Seleção -->
                            <button @click="toggleUserSelection(user.id)" class="px-3 py-2 rounded-lg transition-colors"
                                :class="selectedUsers.includes(user.id) ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path v-if="selectedUsers.includes(user.id)" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7">
                                    </path>
                                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6">
                                    </path>
                                </svg>
                            </button>

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
                            <button @click="resetUserPassword(user)"
                                class="px-3 py-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1721 9z">
                                    </path>
                                </svg>
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

        <!-- Barra de Ações em Lote -->
        <div v-if="showBulkActions" class="fixed bottom-4 left-4 right-4 z-50">
            <div class="bg-white rounded-xl shadow-2xl border border-slate-200 p-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                            <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z">
                                </path>
                            </svg>
                        </div>
                        <div>
                            <div class="text-sm font-semibold text-slate-800">{{ selectedUsers.length }} colaboradores
                                selecionados</div>
                            <div class="text-xs text-slate-600">Escolha uma ação para aplicar</div>
                        </div>
                    </div>

                    <div class="flex items-center gap-2">
                        <button @click="bulkActivateUsers"
                            class="px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
                            Ativar
                        </button>
                        <button @click="bulkDeactivateUsers"
                            class="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium">
                            Desativar
                        </button>
                        <button @click="bulkDeleteUsers"
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

        <!-- Bottom Sheet de Usuário -->
        <CustomBottomSheet :visible="showModal" @close="closeModal">
            <template #header>
                <div class="flex items-center gap-3">
                    <div class="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl">
                        <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path v-if="modalMode === 'create'" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2" d="M12 4v16m8-8H4"></path>
                            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                            </path>
                        </svg>
                    </div>
                    <div>
                        <h3
                            class="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                            {{ modalMode === 'create' ? 'Novo Colaborador' : 'Editar Colaborador' }}
                        </h3>
                        <p class="text-sm text-slate-600">
                            {{ modalMode === 'create' ? 'Adicione novo colaborador' : 'Actualize infos do colaborador'
                            }}
                        </p>
                    </div>
                </div>
            </template>

            <form @submit.prevent="saveUser" class="space-y-6">
                <!-- Informações Básicas -->
                <div class="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4">
                    <h4 class="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                        <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z">
                            </path>
                        </svg>
                        Informações Básicas
                    </h4>

                    <div class="grid grid-cols-1 gap-4">
                        <!-- Nome -->
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-2">Nome Completo *</label>
                            <input v-model="form.name" type="text" placeholder="Digite o nome completo"
                                class="w-full px-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                required />
                        </div>

                        <!-- Email -->
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                            <input v-model="form.email" type="email" placeholder="Digite o email"
                                class="w-full px-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                required />
                        </div>

                        <!-- Telefone -->
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-2">Telefone</label>
                            <input v-model="form.phone" type="tel" placeholder="Digite o telefone"
                                class="w-full px-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                        </div>

                        <!-- Senha (apenas para criação) -->
                        <div v-if="modalMode === 'create'">
                            <label class="block text-sm font-medium text-slate-700 mb-2">Senha *</label>
                            <input v-model="form.password" type="password" placeholder="Digite a senha"
                                class="w-full px-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                required />
                        </div>
                    </div>
                </div>

                <!-- Função e Status -->
                <div class="bg-gradient-to-r from-slate-50 to-green-50 rounded-xl p-4">
                    <h4 class="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                        <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z">
                            </path>
                        </svg>
                        Função e Status
                    </h4>

                    <div class="grid grid-cols-1 gap-4">
                        <!-- Função -->
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-2">Função *</label>
                            <select v-model="form.role" @change="updatePermissionsByRole"
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
                    </div>
                </div>

                <!-- Permissões -->
                <div class="bg-gradient-to-r from-slate-50 to-purple-50 rounded-xl p-4">
                    <h4 class="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                        <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z">
                            </path>
                        </svg>
                        Permissões do Sistema
                    </h4>

                    <div class="grid grid-cols-1 gap-3">
                        <label v-for="permission in availablePermissions" :key="permission.value"
                            class="flex items-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                            <input v-model="form.permissions" type="checkbox" :value="permission.value"
                                class="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500" />
                            <div class="ml-3">
                                <div class="text-sm font-medium text-slate-700">{{ permission.label }}</div>
                                <div class="text-xs text-slate-500">{{ permission.description }}</div>
                            </div>
                        </label>
                    </div>
                </div>

                <!-- Botões de Ação -->
                <div class="flex gap-3 pt-6">
                    <button type="button" @click="closeModal"
                        class="flex-1 px-4 py-3 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">
                        Cancelar
                    </button>
                    <button type="submit" @click="saveUser"
                        class="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
                        :disabled="formLoading">
                        <div v-if="formLoading" class="flex items-center justify-center">
                            <div
                                class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2">
                            </div>
                            Salvando...
                        </div>
                        <div v-else>
                            {{ modalMode === 'create' ? 'Criar Colaborador' : 'Salvar Alterações' }}
                        </div>
                    </button>
                </div>
            </form>
        </CustomBottomSheet>

        <!-- Paginação -->
        <PaginationComponent :current-page="usersStore.pagination.page" :total-items="usersStore.pagination.total"
            :items-per-page="usersStore.pagination.limit" @page-change="handlePageChange"
            @items-per-page-change="handleItemsPerPageChange" />
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { PERMISSIONS, ROLE_PERMISSIONS, permissionManager } from '@/utils/permissions'
import { useUsersStore } from '@/stores/users'
import { useAuthStore } from '@/stores/auth'
import CustomBottomSheet from '@/components/CustomBottomSheet.vue'
import PaginationComponent from '@/components/Pagination/PaginationComponent.vue'

// Store
const authStore = useAuthStore()
const usersStore = useUsersStore()

// Controle de acesso baseado em roles
const userRole = computed(() => authStore.user?.role || 'seller')
const isAdmin = computed(() => userRole.value === 'admin')
const isManager = computed(() => userRole.value === 'manager')
const isSeller = computed(() => userRole.value === 'seller')

// Permissões específicas
const canManageUsers = computed(() => permissionManager.hasPermission(PERMISSIONS.USERS_MANAGE))
const canViewUsers = computed(() => permissionManager.hasPermission(PERMISSIONS.USERS_VIEW))

// Estado reativo
const showModal = ref(false)
const modalMode = ref('create')
const selectedUsers = ref([])
const showBulkActions = ref(false)
const formLoading = ref(false)

const filters = reactive({
    search: '',
    role: '',
    status: ''
})

const form = reactive({
    id: null,
    name: '',
    email: '',
    phone: '',
    password: '',
    role: '',
    isActive: true,
    permissions: []
})

// Permissões disponíveis baseadas no sistema de permissões
const availablePermissions = computed(() => {
    return permissionManager.getPermissionLabels(Object.values(PERMISSIONS))
})

// Computed
const users = computed(() => usersStore.users)
const loading = computed(() => usersStore.loading)
const filteredUsers = computed(() => usersStore.filteredUsers)

// Estatísticas dos colaboradores
const activeUsers = computed(() => usersStore.stats.activeUsers)
const adminUsers = computed(() => usersStore.stats.adminUsers)
const sellerUsers = computed(() => usersStore.stats.sellerUsers)
const managerUsers = computed(() => usersStore.stats.managerUsers)

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
    return permissionManager.getPermissionLabels([permission])[0]?.label || permission
}

// Atualizar permissões baseadas no role selecionado
const updatePermissionsByRole = () => {
    if (form.role) {
        const rolePermissions = ROLE_PERMISSIONS[form.role] || []
        form.permissions = [...rolePermissions]
    }
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
    resetForm()
}

const resetForm = () => {
    form.id = null
    form.name = ''
    form.email = ''
    form.phone = ''
    form.password = ''
    form.role = ''
    form.isActive = true
    form.permissions = []
}

const saveUser = async () => {
    try {
        formLoading.value = true

        // Validação de formulário
        if (!form.name.trim()) {
            alert('Nome é obrigatório')
            return
        }

        if (!form.email.trim()) {
            alert('Email é obrigatório')
            return
        }

        if (!form.role) {
            alert('Função é obrigatória')
            return
        }

        if (modalMode.value === 'create' && !form.password.trim()) {
            alert('Senha é obrigatória')
            return
        }

        // Validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(form.email)) {
            alert('Email inválido')
            return
        }

        // Validação de senha (mínimo 6 caracteres)
        if (modalMode.value === 'create' && form.password.length < 6) {
            alert('Senha deve ter pelo menos 6 caracteres')
            return
        }

        // Validação de telefone (se fornecido)
        if (form.phone && form.phone.trim()) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/
            if (!phoneRegex.test(form.phone)) {
                alert('Telefone inválido')
                return
            }
        }

        // Validar permissões baseadas no role
        const rolePermissions = ROLE_PERMISSIONS[form.role] || []
        const validPermissions = form.permissions.filter(permission =>
            rolePermissions.includes(permission)
        )

        const userData = {
            ...form,
            permissions: validPermissions
        }

        let result
        if (modalMode.value === 'create') {
            result = await usersStore.createUser(userData)
        } else {
            result = await usersStore.updateUser(form.id, userData)
        }

        if (result.success) {
            closeModal()
            loadUsers()
            alert('Colaborador salvo com sucesso!')
        } else {
            alert('Erro ao salvar colaborador: ' + result.error)
        }
    } catch (error) {
        console.error('Erro ao salvar colaborador:', error)
        alert('Erro ao salvar colaborador')
    } finally {
        formLoading.value = false
    }
}

const toggleUserStatus = async (user) => {
    const action = user.isActive ? 'desativar' : 'ativar'
    if (!confirm(`Tem certeza que deseja ${action} o colaborador "${user.name}"?`)) {
        return
    }

    try {
        loading.value = true
        const result = await usersStore.toggleUserStatus(user.id)

        if (result.success) {
            loadUsers()
            alert(`Colaborador ${user.isActive ? 'desativado' : 'ativado'} com sucesso!`)
        } else {
            alert('Erro ao alterar status: ' + result.error)
        }
    } catch (error) {
        console.error('Erro ao alterar status:', error)
        alert('Erro ao alterar status do colaborador')
    } finally {
        loading.value = false
    }
}

const resetUserPassword = async (user) => {
    if (!confirm(`Tem certeza que deseja resetar a senha do colaborador "${user.name}"?`)) {
        return
    }

    try {
        loading.value = true
        const result = await usersStore.resetUserPassword(user.id)

        if (result.success) {
            alert('Senha resetada com sucesso! Nova senha: ' + result.newPassword)
        } else {
            alert('Erro ao resetar senha: ' + result.error)
        }
    } catch (error) {
        console.error('Erro ao resetar senha:', error)
        alert('Erro ao resetar senha')
    } finally {
        loading.value = false
    }
}

const deleteUser = async (userId) => {
    if (!confirm('Tem a certeza que deseja excluir este colaborador?')) {
        return
    }

    try {
        const result = await usersStore.deleteUser(userId)

        if (result.success) {
            loadUsers()
            alert('Colaborador excluído com sucesso!')
        } else {
            alert('Erro ao excluir colaborador: ' + result.error)
        }
    } catch (error) {
        console.error('Erro ao excluir colaborador:', error)
        alert('Erro ao excluir colaborador')
    }
}

const applyFilters = () => {
    usersStore.setFilters(filters)
    loadUsers()
}

const clearFilters = () => {
    Object.assign(filters, {
        search: '',
        role: '',
        status: ''
    })
    usersStore.clearFilters()
    loadUsers()
}

// Funções para seleção múltipla
const toggleUserSelection = (userId) => {
    const index = selectedUsers.value.indexOf(userId)
    if (index > -1) {
        selectedUsers.value.splice(index, 1)
    } else {
        selectedUsers.value.push(userId)
    }
    showBulkActions.value = selectedUsers.value.length > 0
}

const selectAllUsers = () => {
    selectedUsers.value = filteredUsers.value.map(user => user.id)
    showBulkActions.value = true
}

const clearSelection = () => {
    selectedUsers.value = []
    showBulkActions.value = false
}

// Ações em lote
const bulkActivateUsers = async () => {
    try {
        loading.value = true
        await new Promise(resolve => setTimeout(resolve, 1000))

        selectedUsers.value.forEach(userId => {
            const user = users.value.find(u => u.id === userId)
            if (user) user.isActive = true
        })

        clearSelection()
        alert(`${selectedUsers.value.length} colaboradores ativados com sucesso!`)
    } catch (error) {
        console.error('Erro ao ativar colaboradores:', error)
        alert('Erro ao ativar colaboradores')
    } finally {
        loading.value = false
    }
}

const bulkDeactivateUsers = async () => {
    try {
        loading.value = true
        await new Promise(resolve => setTimeout(resolve, 1000))

        selectedUsers.value.forEach(userId => {
            const user = users.value.find(u => u.id === userId)
            if (user) user.isActive = false
        })

        clearSelection()
        alert(`${selectedUsers.value.length} colaboradores desativados com sucesso!`)
    } catch (error) {
        console.error('Erro ao desativar colaboradores:', error)
        alert('Erro ao desativar colaboradores')
    } finally {
        loading.value = false
    }
}

const bulkDeleteUsers = async () => {
    if (!confirm(`Tem certeza que deseja excluir ${selectedUsers.value.length} colaboradores?`)) {
        return
    }

    try {
        loading.value = true
        await new Promise(resolve => setTimeout(resolve, 1000))

        users.value = users.value.filter(user => !selectedUsers.value.includes(user.id))
        clearSelection()
        alert(`${selectedUsers.value.length} colaboradores excluídos com sucesso!`)
    } catch (error) {
        console.error('Erro ao excluir colaboradores:', error)
        alert('Erro ao excluir colaboradores')
    } finally {
        loading.value = false
    }
}

const loadUsers = async () => {
    try {
        usersStore.setFilters(filters)
        const result = await usersStore.loadUsers()

        if (!result.success) {
            console.error('Erro ao carregar colaboradores:', result.error)
        }
    } catch (error) {
        console.error('Erro ao carregar colaboradores:', error)
    }
}

// Métodos de paginação
const handlePageChange = (page) => {
    usersStore.setPage(page)
    loadUsers()
}

const handleItemsPerPageChange = (itemsPerPage) => {
    usersStore.setLimit(itemsPerPage)
    usersStore.setPage(1) // Reset para primeira página
    loadUsers()
}

// Lifecycle
onMounted(() => {
    // Configurar permissionManager com o usuário atual
    if (authStore.user) {
        permissionManager.setCurrentUser(authStore.user)
    }

    loadUsers()
})
</script>
<template>
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <!-- Header com Notificações -->
        <div class="bg-white/90 backdrop-blur-xl border-b border-slate-200/50 shadow-lg sticky top-0 z-40">
            <div class="px-4 py-3">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-lg overflow-hidden">
                            <img src="/src/assets/logo-branco.png" alt="Logo" class="w-full h-full object-contain">
                        </div>
                        <router-link to="/">
                            <div>
                                <h1 class="text-2xl font-normal bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                                    style="font-family: 'Arbutus', cursive; letter-spacing: 0.05em;">
                                    NEXA
                                </h1>
                            </div>
                        </router-link>
                    </div>

                    <!-- Centro de Notificações e Perfil -->
                    <div class="flex items-center gap-3">
                        <NotificationCenter />
                        <UserProfile />
                    </div>
                </div>
            </div>
        </div>

        <!-- Conteúdo da página -->
        <main class="flex-1 overflow-y-auto pb-24">
            <router-view />
        </main>

        <!-- Navigation Bar (mobile-first) -->
        <div class="fixed bottom-0 left-0 right-0 z-50">
            <!-- Background com glassmorphism -->
            <div class="bg-white/80 backdrop-blur-xl border-t border-white/20 shadow-2xl">
                <!-- Gradient overlay -->
                <div class="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5"></div>

                <!-- Navigation tabs - Ordem de Relevância -->
                <div class="relative flex items-center justify-around px-4 py-3">
                    <!-- 1. VENDAS - Mais importante (receita) -->
                    <router-link v-if="canViewSales" to="/app/sales"
                        class="group flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 hover:scale-110"
                        :class="$route.path === '/app/sales'
                            ? 'text-green-600'
                            : 'text-slate-600 hover:text-green-600'">
                        <div class="relative">
                            <svg class="w-6 h-6 transition-all duration-300" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24" :class="$route.path === '/app/sales' ? 'drop-shadow-lg' : ''">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01">
                                </path>
                            </svg>
                            <!-- Active glow effect -->
                            <div v-if="$route.path === '/app/sales'"
                                class="absolute inset-0 bg-green-500/20 rounded-full blur-sm scale-150"></div>
                        </div>
                        <span class="text-xs font-semibold mt-1 transition-all duration-300"
                            :class="$route.path === '/app/sales' ? 'text-green-600' : 'text-slate-600'">Vendas</span>
                    </router-link>

                    <!-- 2. PRODUTOS - Segundo mais importante (Stock) -->
                    <router-link v-if="canViewProducts" to="/app/products"
                        class="group flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 hover:scale-110"
                        :class="$route.path === '/app/products'
                            ? 'text-blue-600'
                            : 'text-slate-600 hover:text-blue-600'">
                        <div class="relative">
                            <svg class="w-6 h-6 transition-all duration-300" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24" :class="$route.path === '/app/products' ? 'drop-shadow-lg' : ''">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                            </svg>
                            <!-- Active glow effect -->
                            <div v-if="$route.path === '/app/products'"
                                class="absolute inset-0 bg-blue-500/20 rounded-full blur-sm scale-150"></div>
                        </div>
                        <span class="text-xs font-semibold mt-1 transition-all duration-300"
                            :class="$route.path === '/app/products' ? 'text-blue-600' : 'text-slate-600'">Produtos</span>
                    </router-link>

                    <!-- 3. HOME - Dashboard (visão geral) -->
                    <router-link to="/app"
                        class="group flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 hover:scale-110"
                        :class="$route.path === '/app'
                            ? 'text-indigo-600'
                            : 'text-slate-600 hover:text-indigo-600'">
                        <div class="relative">
                            <svg class="w-6 h-6 transition-all duration-300" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24" :class="$route.path === '/app' ? 'drop-shadow-lg' : ''">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
                                </path>
                            </svg>
                            <!-- Active glow effect -->
                            <div v-if="$route.path === '/app'"
                                class="absolute inset-0 bg-indigo-500/20 rounded-full blur-sm scale-150"></div>
                        </div>
                        <span class="text-xs font-semibold mt-1 transition-all duration-300"
                            :class="$route.path === '/app' ? 'text-indigo-600' : 'text-slate-600'">Home</span>
                    </router-link>

                    <!-- 4. CLIENTES A FIADO - Gestão de vendas a crédito -->
                    <router-link v-if="canViewClients" to="/app/clients"
                        class="group flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 hover:scale-110"
                        :class="$route.path === '/app/clients'
                            ? 'text-orange-600'
                            : 'text-slate-600 hover:text-orange-600'">
                        <div class="relative">
                            <svg class="w-6 h-6 transition-all duration-300" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24" :class="$route.path === '/app/clients' ? 'drop-shadow-lg' : ''">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1">
                                </path>
                            </svg>
                            <!-- Active glow effect -->
                            <div v-if="$route.path === '/app/clients'"
                                class="absolute inset-0 bg-orange-500/20 rounded-full blur-sm scale-150"></div>
                        </div>
                        <span class="text-xs font-semibold mt-1 transition-all duration-300"
                            :class="$route.path === '/app/clients' ? 'text-orange-600' : 'text-slate-600'">Clientes a
                            Fiado</span>
                    </router-link>

                    <!-- 5. RELATÓRIOS - Análise e insights -->
                    <router-link v-if="canViewReports" to="/app/reports"
                        class="group flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 hover:scale-110"
                        :class="$route.path === '/app/reports'
                            ? 'text-purple-600'
                            : 'text-slate-600 hover:text-purple-600'">
                        <div class="relative">
                            <svg class="w-6 h-6 transition-all duration-300" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24" :class="$route.path === '/app/reports' ? 'drop-shadow-lg' : ''">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                                </path>
                            </svg>
                            <!-- Active glow effect -->
                            <div v-if="$route.path === '/app/reports'"
                                class="absolute inset-0 bg-purple-500/20 rounded-full blur-sm scale-150"></div>
                        </div>
                        <span class="text-xs font-semibold mt-1 transition-all duration-300"
                            :class="$route.path === '/app/reports' ? 'text-purple-600' : 'text-slate-600'">Relatórios</span>
                    </router-link>

                    <!-- 6. USUÁRIOS - Gestão de colaboradores (apenas admin e gerente) -->
                    <router-link v-if="canManageUsers" to="/app/users"
                        class="group flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 hover:scale-110"
                        :class="$route.path === '/app/users'
                            ? 'text-indigo-600'
                            : 'text-slate-600 hover:text-indigo-600'">
                        <div class="relative">
                            <svg class="w-6 h-6 transition-all duration-300" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24" :class="$route.path === '/app/users' ? 'drop-shadow-lg' : ''">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z">
                                </path>
                            </svg>
                            <!-- Active glow effect -->
                            <div v-if="$route.path === '/app/users'"
                                class="absolute inset-0 bg-indigo-500/20 rounded-full blur-sm scale-150"></div>
                        </div>
                        <span class="text-xs font-semibold mt-1 transition-all duration-300"
                            :class="$route.path === '/app/users' ? 'text-indigo-600' : 'text-slate-600'">Colaboradores</span>
                    </router-link>

                    <!-- 7. CONFIGURAÇÕES - Apenas admin -->
                    <router-link v-if="canViewSettings" to="/app/settings"
                        class="group flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 hover:scale-110"
                        :class="$route.path === '/app/settings'
                            ? 'text-slate-600'
                            : 'text-slate-600 hover:text-slate-600'">
                        <div class="relative">
                            <svg class="w-6 h-6 transition-all duration-300" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24" :class="$route.path === '/app/settings' ? 'drop-shadow-lg' : ''">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z">
                                </path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z">
                                </path>
                            </svg>
                            <!-- Active glow effect -->
                            <div v-if="$route.path === '/app/settings'"
                                class="absolute inset-0 bg-slate-500/20 rounded-full blur-sm scale-150"></div>
                        </div>
                        <span class="text-xs font-semibold mt-1 transition-all duration-300"
                            :class="$route.path === '/app/settings' ? 'text-slate-600' : 'text-slate-600'">Configurações</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, computed } from 'vue'
import NotificationCenter from '../components/NotificationCenter.vue'
import UserProfile from '../components/UserProfile.vue'
import { useAuthStore } from '@/stores/auth'
import { permissionManager, PERMISSIONS } from '@/utils/permissions'

export default {
    name: 'MainLayout',
    components: {
        NotificationCenter,
        UserProfile
    },
    setup() {
        const authStore = useAuthStore()

        // Controle de acesso baseado em roles
        const userRole = computed(() => authStore.user?.role || 'seller')
        const isAdmin = computed(() => userRole.value === 'admin')
        const isManager = computed(() => userRole.value === 'manager')
        const isSeller = computed(() => userRole.value === 'seller')

        // Permissões específicas
        const canViewSales = computed(() => permissionManager.hasPermission(PERMISSIONS.SALES_VIEW))
        const canViewProducts = computed(() => permissionManager.hasPermission(PERMISSIONS.PRODUCTS_VIEW))
        const canViewClients = computed(() => permissionManager.hasPermission(PERMISSIONS.CLIENTS_VIEW))
        const canViewReports = computed(() => permissionManager.hasPermission(PERMISSIONS.REPORTS_VIEW))
        const canManageUsers = computed(() => permissionManager.hasPermission(PERMISSIONS.USERS_MANAGE))
        const canViewSettings = computed(() => permissionManager.hasPermission(PERMISSIONS.SETTINGS_VIEW))

        onMounted(() => {
            // Inicializar o gerenciador de permissões com o usuário atual
            if (authStore.user) {
                permissionManager.setCurrentUser(authStore.user)
            }
        })

        return {
            authStore,
            userRole,
            isAdmin,
            isManager,
            isSeller,
            canViewSales,
            canViewProducts,
            canViewClients,
            canViewReports,
            canManageUsers,
            canViewSettings
        }
    }
}
</script>

<style scoped>
/* Efeitos de glassmorphism mais pronunciados */
.bg-white\/80 {
    background: rgba(255, 255, 255, 0.85);
}

.backdrop-blur-xl {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
}

/* Sombras mais elegantes */
.shadow-2xl {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.shadow-lg {
    box-shadow: 0 5px 10px -3px rgba(0, 0, 0, 0.1), 0 2px 3px -2px rgba(0, 0, 0, 0.05);
}

/* Transições suaves para todos os elementos */
* {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Efeito de ripple no clique */
.router-link-active {
    position: relative;
    overflow: hidden;
}

.router-link-active::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
}

.router-link-active:active::before {
    width: 300px;
    height: 300px;
}

/* Melhorar a legibilidade do texto */
.text-xs {
    font-weight: 600;
    letter-spacing: 0.025em;
}

/* Efeito de hover mais suave */
.group:hover {
    transform: translateY(-2px);
}

/* Indicador ativo mais visível */
.absolute.-top-1.-right-1 {
    animation: pulse 2s infinite;
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
        transform: scale(1);
    }

    50% {
        opacity: 0.8;
        transform: scale(1.1);
    }
}

/* Responsividade melhorada */
@media (max-width: 640px) {
    .group {
        padding: 0.5rem;
    }

    .text-xs {
        font-size: 0.65rem;
    }

    .w-6 {
        width: 1.25rem;
        height: 1.25rem;
    }
}

/* Melhorar acessibilidade */
.router-link-active:focus {
    outline: 2px solid rgba(59, 130, 246, 0.5);
    outline-offset: 2px;
}

/* Efeito de glassmorphism mais pronunciado */
.bg-white\/80 {
    background: rgba(255, 255, 255, 0.85);
}

.backdrop-blur-xl {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
}

/* Sombras mais elegantes */
.shadow-2xl {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.shadow-lg {
    box-shadow: 0 5px 10px -3px rgba(0, 0, 0, 0.1), 0 2px 3px -2px rgba(0, 0, 0, 0.05);
}
</style>
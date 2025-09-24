<template>
    <div class="relative">
        <!-- Botão de Notificações Ultra-Moderno -->
        <button @click="toggleNotifications"
            class="relative p-3 text-slate-600 hover:text-slate-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-2xl transition-all duration-300 hover:scale-105 group backdrop-blur-sm">

            <!-- Ícone de sino moderno com animação -->
            <svg class="w-6 h-6 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 17h5l-5 5v-5zM4.5 19.5a1.5 1.5 0 01-1.5-1.5V6a1.5 1.5 0 011.5-1.5h15A1.5 1.5 0 0119.5 6v12a1.5 1.5 0 01-1.5 1.5h-15z">
                </path>
            </svg>

            <!-- Efeito de pulso ultra-moderno -->
            <div v-if="unreadCount > 0"
                class="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/30 via-pink-500/20 to-red-500/30 animate-pulse">
            </div>

            <!-- Efeito de shimmer -->
            <div v-if="unreadCount > 0"
                class="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer">
            </div>

            <!-- Badge ultra-moderno -->
            <span v-if="unreadCount > 0"
                class="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg border-2 border-white animate-bounce">
                {{ unreadCount > 99 ? '99+' : unreadCount }}
            </span>
        </button>

        <!-- Painel de Notificações Ultra-Moderno -->
        <Transition enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 scale-95 translate-y-2" enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 scale-100 translate-y-0" leave-to-class="opacity-0 scale-95 translate-y-2">
            <div v-if="showNotifications"
                class="fixed right-4 top-16 w-96 max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 z-[9999] overflow-hidden">

                <!-- Header Ultra-Moderno -->
                <div
                    class="p-6 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 backdrop-blur-sm border-b border-white/30">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div
                                class="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 17h5l-5 5v-5zM4.5 19.5a1.5 1.5 0 01-1.5-1.5V6a1.5 1.5 0 011.5-1.5h15A1.5 1.5 0 0119.5 6v12a1.5 1.5 0 01-1.5 1.5h-15z">
                                    </path>
                                </svg>
                            </div>
                            <div>
                                <h3
                                    class="text-lg font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    Notificações</h3>
                                <p class="text-xs text-slate-500">{{ unreadCount }} não lidas</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <button v-if="unreadCount > 0" @click="markAllAsRead"
                                class="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 font-medium shadow-lg">
                                ✓ Marcar todas
                            </button>
                            <button @click="clearAll"
                                class="px-3 py-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 font-medium shadow-lg">
                                🗑️ Limpar
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Lista de Notificações Ultra-Moderna -->
                <div class="max-h-96 overflow-y-auto custom-scrollbar">
                    <div v-if="notifications.length === 0" class="p-8 text-center">
                        <div
                            class="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 17h5l-5 5v-5zM4.5 19.5a1.5 1.5 0 01-1.5-1.5V6a1.5 1.5 0 011.5-1.5h15A1.5 1.5 0 0119.5 6v12a1.5 1.5 0 01-1.5 1.5h-15z">
                                </path>
                            </svg>
                        </div>
                        <h4 class="text-lg font-semibold text-slate-700 mb-2">Tudo em dia!</h4>
                        <p class="text-slate-500">Nenhuma notificação pendente</p>
                    </div>

                    <div v-else class="divide-y divide-slate-200/50">
                        <div v-for="notification in notifications" :key="notification.id"
                            class="p-4 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-300 group"
                            :class="{ 'bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border-l-4 border-blue-500': !notification.read }">

                            <div class="flex items-start gap-4">
                                <!-- Ícone do tipo ultra-moderno -->
                                <div class="flex-shrink-0 mt-1">
                                    <div class="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110"
                                        :class="getIconClass(notification.type)">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path v-if="notification.type === 'success'" stroke-linecap="round"
                                                stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                            <path v-else-if="notification.type === 'warning'" stroke-linecap="round"
                                                stroke-linejoin="round" stroke-width="2"
                                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z">
                                            </path>
                                            <path v-else-if="notification.type === 'error'" stroke-linecap="round"
                                                stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                                            </path>
                                            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                </div>

                                <!-- Conteúdo ultra-moderno -->
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-start justify-between">
                                        <div class="flex-1">
                                            <div class="flex items-center gap-2 mb-1">
                                                <h4 class="text-sm font-bold text-slate-800">{{
                                                    notification.title }}</h4>
                                                <span v-if="!notification.read"
                                                    class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                                            </div>
                                            <p class="text-sm text-slate-600 mb-2 leading-relaxed">
                                                {{
                                                    notification.message }}</p>
                                            <div class="flex items-center gap-2">
                                                <span
                                                    class="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">{{
                                                        formatTime(notification.timestamp) }}</span>
                                                <span class="text-xs px-2 py-1 rounded-full font-medium"
                                                    :class="getTypeBadgeClass(notification.type)">
                                                    {{ getTypeLabel(notification.type) }}
                                                </span>
                                            </div>
                                        </div>

                                        <!-- Ações ultra-modernas -->
                                        <div class="flex items-center gap-1 ml-3">
                                            <button v-if="!notification.read" @click="markAsRead(notification.id)"
                                                class="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 group"
                                                title="Marcar como lida">
                                                <svg class="w-4 h-4 group-hover:scale-110 transition-transform"
                                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2" d="M5 13l4 4L19 7"></path>
                                                </svg>
                                            </button>
                                            <button @click="removeNotification(notification.id)"
                                                class="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group"
                                                title="Remover">
                                                <svg class="w-4 h-4 group-hover:scale-110 transition-transform"
                                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Ação específica ultra-moderna -->
                                    <div v-if="notification.action" class="mt-3">
                                        <button @click="handleAction(notification)"
                                            class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M9 5l7 7-7 7"></path>
                                            </svg>
                                            {{ getActionText(notification.type) }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer Ultra-Moderno -->
                <div v-if="notifications.length > 0"
                    class="p-6 bg-gradient-to-r from-slate-50/80 to-blue-50/80 backdrop-blur-sm border-t border-white/30">
                    <button @click="viewAllNotifications"
                        class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl group">
                        <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7">
                            </path>
                        </svg>
                        Ver todas as notificações
                    </button>
                </div>
            </div>
        </Transition>

        <!-- Overlay para fechar -->
        <Transition enter-active-class="transition-opacity duration-200" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition-opacity duration-200"
            leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="showNotifications" @click="closeNotifications"
                class="fixed inset-0 z-[9998] bg-black/20 backdrop-blur-sm"></div>
        </Transition>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Estado reativo
const showNotifications = ref(false)
const notifications = ref([])
const unreadCount = ref(0)

// Métodos
const toggleNotifications = () => {
    showNotifications.value = !showNotifications.value
}

const closeNotifications = () => {
    showNotifications.value = false
}

const markAsRead = (id) => {
    const notification = notifications.value.find(n => n.id === id)
    if (notification) {
        notification.read = true
        updateUnreadCount()
        saveNotifications()
    }
}

const markAllAsRead = () => {
    notifications.value.forEach(notification => {
        notification.read = true
    })
    updateUnreadCount()
    saveNotifications()
}

const removeNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
        notifications.value.splice(index, 1)
        updateUnreadCount()
        saveNotifications()
    }
}

const clearAll = () => {
    if (confirm('Tem certeza que deseja limpar todas as notificações?')) {
        notifications.value = []
        unreadCount.value = 0
        saveNotifications()
    }
}

// Funções auxiliares
const updateUnreadCount = () => {
    unreadCount.value = notifications.value.filter(n => !n.read).length
}

const saveNotifications = () => {
    localStorage.setItem('lojinha-notifications', JSON.stringify(notifications.value))
}

const loadNotifications = () => {
    const saved = localStorage.getItem('lojinha-notifications')
    if (saved) {
        try {
            notifications.value = JSON.parse(saved)
            updateUnreadCount()
        } catch (error) {
            console.error('Erro ao carregar notificações:', error)
            notifications.value = []
        }
    }
}

// Adicionar notificação de exemplo
const addSampleNotification = () => {
    const sampleNotifications = [
        {
            id: Date.now(),
            type: 'success',
            title: 'Venda Realizada',
            message: 'Nova venda de MT 1,500 registrada com sucesso',
            timestamp: new Date(),
            read: false,
            action: true,
            data: { type: 'new_sale' }
        },
        {
            id: Date.now() + 1,
            type: 'warning',
            title: 'Estoque Baixo',
            message: 'Produto "Arroz" com apenas 5 unidades em estoque',
            timestamp: new Date(Date.now() - 3600000), // 1 hora atrás
            read: false,
            action: true,
            data: { type: 'low_stock' }
        },
        {
            id: Date.now() + 2,
            type: 'info',
            title: 'Bem-vindo!',
            message: 'Sistema carregado com sucesso. Comece a gerir a sua loja.',
            timestamp: new Date(Date.now() - 7200000), // 2 horas atrás
            read: true,
            action: false
        }
    ]

    notifications.value = sampleNotifications
    updateUnreadCount()
    saveNotifications()
}

const handleAction = (notification) => {
    // Implementar ações específicas baseadas no tipo
    switch (notification.data?.type) {
        case 'low_stock':
            // Navegar para produtos
            window.location.href = '/products'
            break
        case 'new_sale':
            // Navegar para vendas
            window.location.href = '/sales'
            break
        case 'overdue_debt':
            // Navegar para clientes
            window.location.href = '/clients'
            break
        default:
            console.log('Ação não implementada:', notification.data?.type)
    }
}

const getActionText = (type) => {
    switch (type) {
        case 'low_stock':
            return 'Ver Produtos'
        case 'new_sale':
            return 'Ver Vendas'
        case 'overdue_debt':
            return 'Ver Clientes'
        default:
            return 'Ver Detalhes'
    }
}

const getIconClass = (type) => {
    switch (type) {
        case 'success':
            return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-600'
        case 'warning':
            return 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-600'
        case 'error':
            return 'bg-gradient-to-r from-red-100 to-pink-100 text-red-600'
        default:
            return 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-600'
    }
}

const getTypeBadgeClass = (type) => {
    switch (type) {
        case 'success':
            return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
        case 'warning':
            return 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white'
        case 'error':
            return 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
        default:
            return 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
    }
}

const getTypeLabel = (type) => {
    switch (type) {
        case 'success':
            return 'Sucesso'
        case 'warning':
            return 'Aviso'
        case 'error':
            return 'Erro'
        default:
            return 'Info'
    }
}

const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now - date

    if (diff < 60000) { // Menos de 1 minuto
        return 'Agora'
    } else if (diff < 3600000) { // Menos de 1 hora
        const minutes = Math.floor(diff / 60000)
        return `${minutes}m atrás`
    } else if (diff < 86400000) { // Menos de 1 dia
        const hours = Math.floor(diff / 3600000)
        return `${hours}h atrás`
    } else {
        return date.toLocaleDateString('pt-PT')
    }
}

const viewAllNotifications = () => {
    // Implementar página de todas as notificações
    console.log('Ver todas as notificações')
}

// Lifecycle
onMounted(() => {
    // Carregar notificações salvas ou criar exemplos
    loadNotifications()

    // Se não há notificações, adicionar exemplos
    if (notifications.value.length === 0) {
        addSampleNotification()
    }
})

onUnmounted(() => {
    // Salvar notificações ao sair
    saveNotifications()
})
</script>

<style scoped>
/* Scrollbar customizada ultra-moderna */
.custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(59, 130, 246, 0.3) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%);
    border-radius: 10px;
    transition: all 0.3s ease;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #7c3aed 100%);
}

/* Animação shimmer */
@keyframes shimmer {
    0% {
        transform: translateX(-100%);
    }

    100% {
        transform: translateX(100%);
    }
}

.animate-shimmer {
    animation: shimmer 2s infinite;
}

/* Animações de entrada */
.notification-enter-active {
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.notification-enter-from {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
}

.notification-enter-to {
    opacity: 1;
    transform: translateY(0) scale(1);
}

/* Efeitos de hover melhorados */
.group:hover .group-hover\:scale-110 {
    transform: scale(1.1);
}

.group:hover .group-hover\:translate-x-1 {
    transform: translateX(0.25rem);
}

/* Glassmorphism melhorado */
.backdrop-blur-xl {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
}

/* Sombras ultra-modernas */
.shadow-2xl {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05);
}

/* Transições suaves */
* {
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Responsividade */
@media (max-width: 640px) {
    .w-96 {
        width: calc(100vw - 2rem);
        right: 1rem;
        top: 1rem;
        max-height: calc(100vh - 2rem);
    }
}

/* Garantir que o painel apareça completamente */
@media (max-width: 768px) {
    .fixed.right-4.top-16 {
        right: 1rem;
        top: 1rem;
        width: calc(100vw - 2rem);
        max-width: calc(100vw - 2rem);
    }
}
</style>

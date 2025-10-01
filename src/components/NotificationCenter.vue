<template>
    <div class="relative">
        <!-- Botão de Notificações Melhorado -->
        <button @click="toggleNotifications"
            class="relative p-2.5 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all duration-200 group"
            :class="{ 'bg-blue-50 text-blue-600': showNotifications }">

            <!-- Ícone de sino com animação suave -->
            <svg class="w-5 h-5 transition-all duration-200 group-hover:scale-110" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 17h5l-5 5v-5zM4.5 19.5a1.5 1.5 0 01-1.5-1.5V6a1.5 1.5 0 011.5-1.5h15A1.5 1.5 0 0119.5 6v12a1.5 1.5 0 01-1.5 1.5h-15z">
                </path>
            </svg>

            <!-- Badge de notificações não lidas -->
            <span v-if="unreadCount > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-sm border border-white">
                {{ unreadCount > 9 ? '9+' : unreadCount }}
            </span>
        </button>

        <!-- Painel de Notificações Melhorado -->
        <Transition enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 scale-95 translate-y-1" enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition-all duration-150 ease-in"
            leave-from-class="opacity-100 scale-100 translate-y-0" leave-to-class="opacity-0 scale-95 translate-y-1">
            <div v-if="showNotifications"
                class="fixed right-4 top-16 w-80 max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-lg border border-slate-200 z-[9999] overflow-hidden">

                <!-- Header Melhorado -->
                <div class="p-4 bg-slate-50 border-b border-slate-200">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <div class="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center">
                                <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 17h5l-5 5v-5zM4.5 19.5a1.5 1.5 0 01-1.5-1.5V6a1.5 1.5 0 011.5-1.5h15A1.5 1.5 0 0119.5 6v12a1.5 1.5 0 01-1.5 1.5h-15z">
                                    </path>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-sm font-semibold text-slate-800">Notificações</h3>
                                <p class="text-xs text-slate-500">{{ unreadCount }} não lidas</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-1">
                            <button v-if="unreadCount > 0" @click="markAllAsRead"
                                class="px-2 py-1 bg-green-500 text-white text-xs rounded-md hover:bg-green-600 transition-colors">
                                ✓ Todas
                            </button>
                            <button @click="clearAll"
                                class="px-2 py-1 bg-red-500 text-white text-xs rounded-md hover:bg-red-600 transition-colors">
                                🗑️
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Lista de Notificações Melhorada -->
                <div class="max-h-80 overflow-y-auto">
                    <div v-if="notifications.length === 0" class="p-6 text-center">
                        <div class="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 17h5l-5 5v-5zM4.5 19.5a1.5 1.5 0 01-1.5-1.5V6a1.5 1.5 0 011.5-1.5h15A1.5 1.5 0 0119.5 6v12a1.5 1.5 0 01-1.5 1.5h-15z">
                                </path>
                            </svg>
                        </div>
                        <h4 class="text-sm font-medium text-slate-700 mb-1">Tudo em dia!</h4>
                        <p class="text-xs text-slate-500">Nenhuma notificação pendente</p>
                    </div>

                    <div v-else class="divide-y divide-slate-200">
                        <div v-for="notification in notifications" :key="notification.id"
                            class="p-3 hover:bg-slate-50 transition-colors group"
                            :class="{ 'bg-blue-50 border-l-2 border-blue-500': !notification.read }">

                            <div class="flex items-start gap-3">
                                <!-- Ícone do tipo -->
                                <div class="flex-shrink-0 mt-0.5">
                                    <div class="w-6 h-6 rounded-lg flex items-center justify-center"
                                        :class="getIconClass(notification.type)">
                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

                                <!-- Conteúdo -->
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-start justify-between">
                                        <div class="flex-1">
                                            <div class="flex items-center gap-2 mb-1">
                                                <h4 class="text-sm font-medium text-slate-800">{{
                                                    notification.title }}</h4>
                                                <span v-if="!notification.read"
                                                    class="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                            </div>
                                            <p class="text-xs text-slate-600 mb-2 leading-relaxed">
                                                {{ notification.message }}</p>
                                            <div class="flex items-center gap-2">
                                                <span class="text-xs text-slate-500">{{
                                                    formatTime(notification.timestamp) }}</span>
                                                <span class="text-xs px-1.5 py-0.5 rounded-md font-medium"
                                                    :class="getTypeBadgeClass(notification.type)">
                                                    {{ getTypeLabel(notification.type) }}
                                                </span>
                                            </div>
                                        </div>

                                        <!-- Ações -->
                                        <div class="flex items-center gap-1 ml-2">
                                            <button v-if="!notification.read" @click="markAsRead(notification.id)"
                                                class="p-1 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                                                title="Marcar como lida">
                                                <svg class="w-3 h-3" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2" d="M5 13l4 4L19 7"></path>
                                                </svg>
                                            </button>
                                            <button @click="removeNotification(notification.id)"
                                                class="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                                title="Remover">
                                                <svg class="w-3 h-3" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Ação específica -->
                                    <div v-if="notification.action" class="mt-2">
                                        <button @click="handleAction(notification)"
                                            class="inline-flex items-center gap-1 px-2 py-1 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600 transition-colors">
                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

                <!-- Footer Melhorado -->
                <div v-if="notifications.length > 0" class="p-3 bg-slate-50 border-t border-slate-200">
                    <button @click="viewAllNotifications"
                        class="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7">
                            </path>
                        </svg>
                        Ver todas
                    </button>
                </div>
            </div>
        </Transition>

        <!-- Overlay para fechar -->
        <Transition enter-active-class="transition-opacity duration-150" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition-opacity duration-150"
            leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="showNotifications" @click="closeNotifications" class="fixed inset-0 z-[9998] bg-black/10"></div>
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
            title: 'Stock Baixo',
            message: 'Produto "Arroz" com apenas 5 unidades em Stock',
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
            return 'bg-green-100 text-green-600'
        case 'warning':
            return 'bg-yellow-100 text-yellow-600'
        case 'error':
            return 'bg-red-100 text-red-600'
        default:
            return 'bg-blue-100 text-blue-600'
    }
}

const getTypeBadgeClass = (type) => {
    switch (type) {
        case 'success':
            return 'bg-green-500 text-white'
        case 'warning':
            return 'bg-yellow-500 text-white'
        case 'error':
            return 'bg-red-500 text-white'
        default:
            return 'bg-blue-500 text-white'
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
/* Scrollbar customizada */
.overflow-y-auto {
    scrollbar-width: thin;
    scrollbar-color: #cbd5e1 transparent;
}

.overflow-y-auto::-webkit-scrollbar {
    width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
}

/* Responsividade */
@media (max-width: 640px) {
    .w-80 {
        width: calc(100vw - 2rem);
        right: 1rem;
        top: 1rem;
        max-height: calc(100vh - 2rem);
    }
}
</style>

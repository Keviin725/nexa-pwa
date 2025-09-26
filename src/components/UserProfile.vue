<template>
    <div class="relative">
        <!-- Botão do Perfil -->
        <button @click="toggleProfile"
            class="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <div
                class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                <span class="text-white text-sm font-medium">{{ userInitials }}</span>
            </div>
            <div class="text-left hidden md:block">
                <p class="text-sm font-medium text-slate-800">{{ currentUser?.name }}</p>
                <p class="text-xs text-slate-500">{{ currentUser?.role }}</p>
            </div>
            <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        </button>

        <!-- Dropdown do Perfil -->
        <div v-if="showProfile"
            class="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-xl border border-slate-200 z-50">
            <!-- Header do Perfil -->
            <div class="p-4 border-b border-slate-200">
                <div class="flex items-center gap-3">
                    <div
                        class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                        <span class="text-white text-lg font-medium">{{ userInitials }}</span>
                    </div>
                    <div class="flex-1">
                        <h3 class="font-semibold text-slate-800">{{ currentUser?.name }}</h3>
                        <p class="text-sm text-slate-500">{{ currentUser?.email }}</p>
                        <span
                            class="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mt-1">
                            {{ roleLabel }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Menu do Perfil -->
            <div class="p-2">
                <button @click="editProfile"
                    class="w-full flex items-center gap-3 p-3 text-left hover:bg-slate-50 rounded-lg transition-colors">
                    <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <span class="text-sm font-medium text-slate-700">Editar Perfil</span>
                </button>

                <button @click="changePassword"
                    class="w-full flex items-center gap-3 p-3 text-left hover:bg-slate-50 rounded-lg transition-colors">
                    <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z">
                        </path>
                    </svg>
                    <span class="text-sm font-medium text-slate-700">Alterar Senha</span>
                </button>

                <button @click="viewNotifications"
                    class="w-full flex items-center gap-3 p-3 text-left hover:bg-slate-50 rounded-lg transition-colors">
                    <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 17h5l-5 5v-5zM4.5 19.5a1.5 1.5 0 01-1.5-1.5V6a1.5 1.5 0 011.5-1.5h15A1.5 1.5 0 0119.5 6v12a1.5 1.5 0 01-1.5 1.5h-15z">
                        </path>
                    </svg>
                    <span class="text-sm font-medium text-slate-700">Notificações</span>
                </button>

                <div class="border-t border-slate-200 my-2"></div>

                <button @click="logout"
                    class="w-full flex items-center gap-3 p-3 text-left hover:bg-red-50 rounded-lg transition-colors text-red-600">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1">
                        </path>
                    </svg>
                    <span class="text-sm font-medium">Sair</span>
                </button>
            </div>
        </div>

        <!-- Overlay para fechar -->
        <div v-if="showProfile" @click="closeProfile" class="fixed inset-0 z-40"></div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

// Estado reativo
const showProfile = ref(false)
const authStore = useAuthStore()

// Computed
const currentUser = computed(() => authStore.user)

const userInitials = computed(() => {
    if (!currentUser.value?.name) return 'U'
    return currentUser.value.name
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
})

const roleLabel = computed(() => {
    const roles = {
        admin: 'Administrador',
        manager: 'Gerente',
        seller: 'Vendedor'
    }
    return roles[currentUser.value?.role] || 'Usuário'
})

// Métodos
const toggleProfile = () => {
    showProfile.value = !showProfile.value
}

const closeProfile = () => {
    showProfile.value = false
}

const editProfile = () => {
    closeProfile()
    // Implementar edição de perfil
    console.log('Editar perfil')
}

const changePassword = () => {
    closeProfile()
    // Implementar alteração de senha
    console.log('Alterar senha')
}

const viewNotifications = () => {
    closeProfile()
    // Implementar visualização de notificações
    console.log('Ver notificações')
}

const logout = () => {
    closeProfile()
    authStore.logout()
}
</script>

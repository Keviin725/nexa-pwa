<template>
    <div
        class="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div class="w-full max-w-md">
            <!-- Logo e Título -->
            <div class="text-center mb-8">
                <div
                    class="w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z">
                        </path>
                    </svg>
                </div>
                <h1 class="text-3xl font-bold text-slate-900 mb-2">Criar Conta</h1>
                <p class="text-slate-600">Cadastre-se para começar a usar o sistema</p>
            </div>

            <!-- Card de Registro -->
            <div class="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
                <form @submit.prevent="handleRegister" class="space-y-6">
                    <!-- Nome -->
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-2">Nome Completo</label>
                        <div class="relative">
                            <input v-model="form.name" type="text" required
                                class="w-full px-4 py-3 pl-12 text-black placeholder-gray-500 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                placeholder="Seu nome completo">
                            <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                        </div>
                    </div>

                    <!-- Email -->
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-2">Email</label>
                        <div class="relative">
                            <input v-model="form.email" type="email" required
                                class="w-full px-4 py-3 pl-12 text-black placeholder-gray-500 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                placeholder="seu@email.com">
                            <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207">
                                </path>
                            </svg>
                        </div>
                    </div>

                    <!-- Telefone -->
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-2">Telefone</label>
                        <div class="relative">
                            <input v-model="form.phone" type="tel" required
                                class="w-full px-4 py-3 pl-12 text-black placeholder-gray-500 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                placeholder="(11) 99999-9999">
                            <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                                </path>
                            </svg>
                        </div>
                    </div>

                    <!-- Informação sobre o tipo de conta -->
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                                    </path>
                                </svg>
                            </div>
                            <div>
                                <h4 class="text-sm font-semibold text-blue-800">Conta Administrativa</h4>
                                <p class="text-xs text-blue-600">Você será criado como administrador com acesso total ao
                                    sistema</p>
                            </div>
                        </div>
                    </div>

                    <!-- Senha -->
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-2">Senha</label>
                        <div class="relative">
                            <input v-model="form.password" :type="showPassword ? 'text' : 'password'" required
                                class="w-full px-4 py-3 pl-12 pr-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                placeholder="Mínimo 6 caracteres">
                            <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z">
                                </path>
                            </svg>
                            <button type="button" @click="showPassword = !showPassword"
                                class="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21">
                                    </path>
                                </svg>
                                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                                    </path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Confirmar Senha -->
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-2">Confirmar Senha</label>
                        <div class="relative">
                            <input v-model="form.confirmPassword" :type="showConfirmPassword ? 'text' : 'password'"
                                required
                                class="w-full px-4 py-3 pl-12 pr-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                placeholder="Digite a senha novamente">
                            <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z">
                                </path>
                            </svg>
                            <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                                class="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                <svg v-if="showConfirmPassword" class="w-5 h-5" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21">
                                    </path>
                                </svg>
                                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                                    </path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Termos -->
                    <div class="flex items-start">
                        <input v-model="form.acceptTerms" type="checkbox" required
                            class="w-4 h-4 text-green-600 border-slate-300 rounded focus:ring-green-500 mt-1">
                        <label class="ml-2 text-sm text-slate-600">
                            Aceito os
                            <a href="#" class="text-green-600 hover:text-green-800 font-medium">termos de uso</a>
                            e
                            <a href="#" class="text-green-600 hover:text-green-800 font-medium">política de
                                privacidade</a>
                        </label>
                    </div>

                    <!-- Botão de Registro -->
                    <button type="submit" :disabled="loading || !passwordsMatch"
                        class="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-blue-700 focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                        <svg v-if="loading" class="w-5 h-5 mr-2 animate-spin inline" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                            </path>
                        </svg>
                        {{ loading ? 'Criando conta...' : 'Criar Conta' }}
                    </button>

                    <!-- Divisor -->
                    <div class="relative">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-slate-300"></div>
                        </div>
                        <div class="relative flex justify-center text-sm">
                            <span class="px-2 bg-white text-slate-500">ou</span>
                        </div>
                    </div>

                    <!-- Link para Login -->
                    <div class="text-center">
                        <p class="text-sm text-slate-600">
                            Já tem uma conta?
                            <router-link to="/auth/login" class="text-green-600 hover:text-green-800 font-medium">
                                Fazer login
                            </router-link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// Estado reativo
const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const form = reactive({
    name: '',
    email: '',
    phone: '',
    role: 'admin', // Definido como admin por padrão
    password: '',
    confirmPassword: '',
    acceptTerms: false
})

// Computed
const passwordsMatch = computed(() => {
    return form.password === form.confirmPassword && form.password.length >= 6
})

// Métodos
const handleRegister = async () => {
    try {
        loading.value = true

        if (!passwordsMatch.value) {
            alert('As senhas não coincidem ou são muito curtas')
            return
        }

        const result = await authStore.login({
            name: form.name,
            email: form.email,
            phone: form.phone,
            role: form.role,
            password: form.password
        })

        if (result.success) {
            alert('Conta criada com sucesso! Faça login para continuar.')
            router.push('/auth/login')
        } else {
            alert(result.message)
        }
    } catch (error) {
        console.error('Erro no registro:', error)
        alert('Erro interno do sistema')
    } finally {
        loading.value = false
    }
}
</script>
<template>
    <div
        class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div class="w-full max-w-md">
            <!-- Logo e Título -->
            <div class="text-center mb-8">
                <div
                    class="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                        </path>
                    </svg>
                </div>
                <h1 class="text-4xl font-normal bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2"
                    style="font-family: 'Arbutus', cursive; letter-spacing: 0.08em;">
                    NEXA
                </h1>

            </div>

            <!-- Card de Login -->
            <div class="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
                <form @submit.prevent="handleLogin" class="space-y-6">
                    <!-- Email -->
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-2">Email</label>
                        <div class="relative">
                            <input v-model="form.email" type="email" required
                                class="w-full px-4 py-3 pl-12 text-black placeholder-gray-500 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="seu@email.com">
                            <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207">
                                </path>
                            </svg>
                        </div>
                    </div>

                    <!-- Senha -->
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-2">Senha</label>
                        <div class="relative">
                            <input v-model="form.password" :type="showPassword ? 'text' : 'password'" required
                                class="w-full px-4 py-3 pl-12 pr-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Sua senha">
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

                    <!-- Lembrar de mim -->
                    <div class="flex items-center justify-between">
                        <label class="flex items-center">
                            <input v-model="form.remember" type="checkbox"
                                class="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500">
                            <span class="ml-2 text-sm text-slate-600">Lembrar de mim</span>
                        </label>
                        <a href="#" class="text-sm text-blue-600 hover:text-blue-800 font-medium">
                            Esqueceu a senha?
                        </a>
                    </div>

                    <!-- Botão de Login -->
                    <button type="submit" :disabled="loading"
                        class="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                        <svg v-if="loading" class="w-5 h-5 mr-2 animate-spin inline" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                            </path>
                        </svg>
                        {{ loading ? 'Entrando...' : 'Entrar' }}
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

                    <!-- Link para Registro -->
                    <div class="text-center">
                        <p class="text-sm text-slate-600">
                            Não tem uma conta?
                            <router-link to="/auth/register" class="text-blue-600 hover:text-blue-800 font-medium">
                                Criar conta
                            </router-link>
                        </p>
                    </div>
                </form>
            </div>

            <!-- Demo Account -->
            <div class="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h3 class="text-sm font-medium text-blue-800 mb-2">Conta Demo</h3>
                <div class="text-xs text-blue-600 space-y-1">
                    <p><strong>Admin:</strong> admin@lojinha.com / admin123</p>
                    <p><strong>Gerente:</strong> gerente@lojinha.com / gerente123</p>
                    <p><strong>Vendedor:</strong> vendedor@lojinha.com / vendedor123</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../services/authService.js'

const router = useRouter()

// Estado reativo
const loading = ref(false)
const showPassword = ref(false)
const form = reactive({
    email: '',
    password: '',
    remember: false
})

// Métodos
const handleLogin = async () => {
    try {
        loading.value = true

        const result = await authService.login(form.email, form.password)

        if (result.success) {
            // Redirecionar para home
            router.push('/app')
        } else {
            alert(result.message)
        }
    } catch (error) {
        console.error('Erro no login:', error)
        alert('Erro interno do sistema')
    } finally {
        loading.value = false
    }
}
</script>
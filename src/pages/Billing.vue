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
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z">
                                </path>
                            </svg>
                        </div>
                        <div>
                            <h1 class="text-xl font-bold text-white">Assinaturas</h1>
                            <p class="text-purple-100 text-sm">Gerencie sua assinatura</p>
                        </div>
                    </div>

                    <!-- Status da Assinatura -->
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full"
                            :class="subscriptionStatus === 'active' ? 'bg-green-400' : 'bg-yellow-400'"></div>
                        <span class="text-sm text-white font-medium">{{ getStatusText(subscriptionStatus) }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="p-4 space-y-4">
            <!-- Plano Atual -->
            <div
                class="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-xl border border-slate-200 p-6 relative overflow-hidden">
                <!-- Background Pattern -->
                <div class="absolute inset-0 opacity-5">
                    <div class="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200"></div>
                </div>

                <div class="relative z-10">
                    <div class="flex items-center justify-between mb-6">
                        <div>
                            <h3 class="text-xl font-bold text-slate-800">Plano Atual</h3>
                            <p class="text-sm text-slate-600 mt-1">Sua assinatura atual</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <div
                                class="w-3 h-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full animate-pulse">
                            </div>
                            <span class="text-sm text-slate-600">{{ currentPlan.name }}</span>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="bg-white rounded-xl p-4 border border-slate-200">
                            <div class="flex items-center gap-3 mb-3">
                                <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z">
                                        </path>
                                    </svg>
                                </div>
                                <div>
                                    <h4 class="text-sm font-medium text-slate-700">Plano</h4>
                                    <p class="text-xs text-slate-500">{{ currentPlan.name }}</p>
                                </div>
                            </div>
                            <div class="text-2xl font-bold text-purple-600">MT {{ formatPrice(currentPlan.price) }}
                            </div>
                            <div class="text-xs text-slate-500">por mês</div>
                        </div>

                        <div class="bg-white rounded-xl p-4 border border-slate-200">
                            <div class="flex items-center gap-3 mb-3">
                                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                                        </path>
                                    </svg>
                                </div>
                                <div>
                                    <h4 class="text-sm font-medium text-slate-700">Próximo Pagamento</h4>
                                    <p class="text-xs text-slate-500">{{ formatDate(nextPayment) }}</p>
                                </div>
                            </div>
                            <div class="text-2xl font-bold text-green-600">{{ daysUntilPayment }}</div>
                            <div class="text-xs text-slate-500">dias restantes</div>
                        </div>

                        <div class="bg-white rounded-xl p-4 border border-slate-200">
                            <div class="flex items-center gap-3 mb-3">
                                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                                        </path>
                                    </svg>
                                </div>
                                <div>
                                    <h4 class="text-sm font-medium text-slate-700">Status</h4>
                                    <p class="text-xs text-slate-500">{{ getStatusText(subscriptionStatus) }}</p>
                                </div>
                            </div>
                            <div class="text-2xl font-bold"
                                :class="subscriptionStatus === 'active' ? 'text-green-600' : 'text-yellow-600'">{{
                                    subscriptionStatus === 'active' ? 'Ativo' : 'Pendente' }}</div>
                            <div class="text-xs text-slate-500">assinatura</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Planos Disponíveis -->
            <div class="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
                <div class="flex items-center gap-3 mb-6">
                    <div class="p-2 bg-blue-100 rounded-lg">
                        <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10">
                            </path>
                        </svg>
                    </div>
                    <div>
                        <h2 class="text-lg font-semibold text-slate-800">Planos Disponíveis</h2>
                        <p class="text-sm text-slate-600">Escolha o plano ideal para sua loja</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <!-- Plano Básico -->
                    <div class="relative bg-white border-2 rounded-xl p-6"
                        :class="currentPlan.id === 'basic' ? 'border-purple-500 bg-purple-50' : 'border-slate-200'">
                        <div v-if="currentPlan.id === 'basic'"
                            class="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <span class="bg-purple-500 text-white text-xs font-medium px-3 py-1 rounded-full">Plano
                                Atual</span>
                        </div>

                        <div class="text-center mb-6">
                            <h3 class="text-lg font-semibold text-slate-800">Básico</h3>
                            <div class="mt-2">
                                <span class="text-3xl font-bold text-slate-800">MT 99</span>
                                <span class="text-slate-600">/mês</span>
                            </div>
                            <p class="text-sm text-slate-600 mt-2">Ideal para pequenas lojas</p>
                        </div>

                        <ul class="space-y-3 mb-6">
                            <li class="flex items-center gap-2">
                                <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-sm text-slate-700">Até 100 produtos</span>
                            </li>
                            <li class="flex items-center gap-2">
                                <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-sm text-slate-700">Relatórios básicos</span>
                            </li>
                            <li class="flex items-center gap-2">
                                <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-sm text-slate-700">Suporte por email</span>
                            </li>
                        </ul>

                        <button v-if="currentPlan.id !== 'basic'" @click="changePlan('basic')"
                            class="w-full py-2 px-4 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium">
                            Escolher Plano
                        </button>
                        <div v-else
                            class="w-full py-2 px-4 bg-purple-100 text-purple-700 rounded-lg text-center font-medium">
                            Plano Atual
                        </div>
                    </div>

                    <!-- Plano Profissional -->
                    <div class="relative bg-white border-2 rounded-xl p-6"
                        :class="currentPlan.id === 'professional' ? 'border-purple-500 bg-purple-50' : 'border-slate-200'">
                        <div v-if="currentPlan.id === 'professional'"
                            class="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <span class="bg-purple-500 text-white text-xs font-medium px-3 py-1 rounded-full">Plano
                                Atual</span>
                        </div>

                        <div class="text-center mb-6">
                            <h3 class="text-lg font-semibold text-slate-800">Profissional</h3>
                            <div class="mt-2">
                                <span class="text-3xl font-bold text-slate-800">MT 199</span>
                                <span class="text-slate-600">/mês</span>
                            </div>
                            <p class="text-sm text-slate-600 mt-2">Para lojas em crescimento</p>
                        </div>

                        <ul class="space-y-3 mb-6">
                            <li class="flex items-center gap-2">
                                <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-sm text-slate-700">Até 500 produtos</span>
                            </li>
                            <li class="flex items-center gap-2">
                                <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-sm text-slate-700">Relatórios avançados</span>
                            </li>
                            <li class="flex items-center gap-2">
                                <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-sm text-slate-700">Suporte prioritário</span>
                            </li>
                            <li class="flex items-center gap-2">
                                <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-sm text-slate-700">Integração com pagamentos</span>
                            </li>
                        </ul>

                        <button v-if="currentPlan.id !== 'professional'" @click="changePlan('professional')"
                            class="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
                            Escolher Plano
                        </button>
                        <div v-else
                            class="w-full py-2 px-4 bg-purple-100 text-purple-700 rounded-lg text-center font-medium">
                            Plano Atual
                        </div>
                    </div>

                    <!-- Plano Empresarial -->
                    <div class="relative bg-white border-2 rounded-xl p-6"
                        :class="currentPlan.id === 'enterprise' ? 'border-purple-500 bg-purple-50' : 'border-slate-200'">
                        <div v-if="currentPlan.id === 'enterprise'"
                            class="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <span class="bg-purple-500 text-white text-xs font-medium px-3 py-1 rounded-full">Plano
                                Atual</span>
                        </div>

                        <div class="text-center mb-6">
                            <h3 class="text-lg font-semibold text-slate-800">Empresarial</h3>
                            <div class="mt-2">
                                <span class="text-3xl font-bold text-slate-800">MT 399</span>
                                <span class="text-slate-600">/mês</span>
                            </div>
                            <p class="text-sm text-slate-600 mt-2">Para grandes empresas</p>
                        </div>

                        <ul class="space-y-3 mb-6">
                            <li class="flex items-center gap-2">
                                <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-sm text-slate-700">Produtos ilimitados</span>
                            </li>
                            <li class="flex items-center gap-2">
                                <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-sm text-slate-700">Relatórios personalizados</span>
                            </li>
                            <li class="flex items-center gap-2">
                                <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-sm text-slate-700">Suporte 24/7</span>
                            </li>
                            <li class="flex items-center gap-2">
                                <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-sm text-slate-700">Múltiplas lojas</span>
                            </li>
                        </ul>

                        <button v-if="currentPlan.id !== 'enterprise'" @click="changePlan('enterprise')"
                            class="w-full py-2 px-4 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium">
                            Escolher Plano
                        </button>
                        <div v-else
                            class="w-full py-2 px-4 bg-purple-100 text-purple-700 rounded-lg text-center font-medium">
                            Plano Atual
                        </div>
                    </div>
                </div>
            </div>

            <!-- Histórico de Pagamentos -->
            <div class="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
                <div class="flex items-center gap-3 mb-6">
                    <div class="p-2 bg-green-100 rounded-lg">
                        <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4">
                            </path>
                        </svg>
                    </div>
                    <div>
                        <h2 class="text-lg font-semibold text-slate-800">Histórico de Pagamentos</h2>
                        <p class="text-sm text-slate-600">Últimas transações da sua assinatura</p>
                    </div>
                </div>

                <div class="space-y-3">
                    <div v-for="payment in paymentHistory" :key="payment.id"
                        class="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <div>
                                <p class="font-medium text-slate-800">{{ payment.plan }}</p>
                                <p class="text-sm text-slate-600">{{ formatDate(payment.date) }}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="font-semibold text-slate-800">MT {{ formatPrice(payment.amount) }}</p>
                            <p class="text-sm"
                                :class="payment.status === 'paid' ? 'text-green-600' : 'text-yellow-600'">
                                {{ payment.status === 'paid' ? 'Pago' : 'Pendente' }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal de Pagamento -->
        <div v-if="showPaymentModal" class="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
            <div class="bg-white rounded-t-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div class="sticky top-0 bg-white border-b border-slate-200 p-4 flex items-center justify-between">
                    <h3 class="text-lg font-semibold text-slate-800">Pagamento da Assinatura</h3>
                    <button @click="closePaymentModal" class="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                        <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <div class="p-6 space-y-6">
                    <!-- Resumo do Plano -->
                    <div class="bg-slate-50 rounded-xl p-4">
                        <h4 class="font-semibold text-slate-800 mb-2">{{ selectedPlan.name }}</h4>
                        <div class="flex items-center justify-between">
                            <span class="text-slate-600">Valor mensal</span>
                            <span class="text-xl font-bold text-slate-800">MT {{ formatPrice(selectedPlan.price)
                            }}</span>
                        </div>
                    </div>

                    <!-- Métodos de Pagamento -->
                    <div class="space-y-4">
                        <h4 class="font-semibold text-slate-800">Método de Pagamento</h4>

                        <!-- M-Pesa -->
                        <div class="border border-slate-200 rounded-xl p-4 hover:border-purple-300 transition-colors cursor-pointer"
                            :class="selectedPaymentMethod === 'mpesa' ? 'border-purple-500 bg-purple-50' : ''"
                            @click="selectedPaymentMethod = 'mpesa'">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1">
                                        </path>
                                    </svg>
                                </div>
                                <div class="flex-1">
                                    <h5 class="font-medium text-slate-800">M-Pesa</h5>
                                    <p class="text-sm text-slate-600">Pagamento via M-Pesa</p>
                                </div>
                                <div class="w-5 h-5 border-2 rounded-full flex items-center justify-center"
                                    :class="selectedPaymentMethod === 'mpesa' ? 'border-purple-500 bg-purple-500' : 'border-slate-300'">
                                    <div v-if="selectedPaymentMethod === 'mpesa'" class="w-2 h-2 bg-white rounded-full">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Emola -->
                        <div class="border border-slate-200 rounded-xl p-4 hover:border-purple-300 transition-colors cursor-pointer"
                            :class="selectedPaymentMethod === 'emola' ? 'border-purple-500 bg-purple-50' : ''"
                            @click="selectedPaymentMethod = 'emola'">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z">
                                        </path>
                                    </svg>
                                </div>
                                <div class="flex-1">
                                    <h5 class="font-medium text-slate-800">Emola</h5>
                                    <p class="text-sm text-slate-600">Pagamento via Emola</p>
                                </div>
                                <div class="w-5 h-5 border-2 rounded-full flex items-center justify-center"
                                    :class="selectedPaymentMethod === 'emola' ? 'border-purple-500 bg-purple-500' : 'border-slate-300'">
                                    <div v-if="selectedPaymentMethod === 'emola'" class="w-2 h-2 bg-white rounded-full">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Visa -->
                        <div class="border border-slate-200 rounded-xl p-4 hover:border-purple-300 transition-colors cursor-pointer"
                            :class="selectedPaymentMethod === 'visa' ? 'border-purple-500 bg-purple-50' : ''"
                            @click="selectedPaymentMethod = 'visa'">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z">
                                        </path>
                                    </svg>
                                </div>
                                <div class="flex-1">
                                    <h5 class="font-medium text-slate-800">Visa</h5>
                                    <p class="text-sm text-slate-600">Cartão de crédito/débito</p>
                                </div>
                                <div class="w-5 h-5 border-2 rounded-full flex items-center justify-center"
                                    :class="selectedPaymentMethod === 'visa' ? 'border-purple-500 bg-purple-500' : 'border-slate-300'">
                                    <div v-if="selectedPaymentMethod === 'visa'" class="w-2 h-2 bg-white rounded-full">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Botões de Ação -->
                    <div class="flex gap-3 pt-4">
                        <button @click="closePaymentModal"
                            class="flex-1 py-3 px-4 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors">
                            Cancelar
                        </button>
                        <button @click="processPayment"
                            class="flex-1 py-3 px-4 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
                            :disabled="!selectedPaymentMethod || processing">
                            <span v-if="processing">Processando...</span>
                            <span v-else>Pagar Agora</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Estado reativo
const subscriptionStatus = ref('active')
const currentPlan = ref({
    id: 'professional',
    name: 'Profissional',
    price: 199
})

const nextPayment = ref(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)) // 30 dias
const showPaymentModal = ref(false)
const selectedPaymentMethod = ref('')
const selectedPlan = ref({})
const processing = ref(false)

// Histórico de pagamentos
const paymentHistory = ref([
    {
        id: 1,
        plan: 'Profissional',
        amount: 199,
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        status: 'paid'
    },
    {
        id: 2,
        plan: 'Profissional',
        amount: 199,
        date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        status: 'paid'
    },
    {
        id: 3,
        plan: 'Básico',
        amount: 99,
        date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        status: 'paid'
    }
])

// Computed
const daysUntilPayment = computed(() => {
    const now = new Date()
    const diffTime = nextPayment.value - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays)
})

// Métodos
const getStatusText = (status) => {
    const statusMap = {
        'active': 'Ativo',
        'pending': 'Pendente',
        'expired': 'Expirado'
    }
    return statusMap[status] || 'Desconhecido'
}

const formatPrice = (price) => {
    return price.toLocaleString('pt-PT')
}

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-PT')
}

const changePlan = (planId) => {
    const plans = {
        'basic': { id: 'basic', name: 'Básico', price: 99 },
        'professional': { id: 'professional', name: 'Profissional', price: 199 },
        'enterprise': { id: 'enterprise', name: 'Empresarial', price: 399 }
    }

    selectedPlan.value = plans[planId]
    showPaymentModal.value = true
}

const closePaymentModal = () => {
    showPaymentModal.value = false
    selectedPaymentMethod.value = ''
    selectedPlan.value = {}
}

const processPayment = async () => {
    if (!selectedPaymentMethod.value) return

    processing.value = true

    try {
        // Simular processamento de pagamento
        await new Promise(resolve => setTimeout(resolve, 2000))

        // Atualizar plano atual
        currentPlan.value = selectedPlan.value

        // Adicionar ao histórico
        paymentHistory.value.unshift({
            id: Date.now(),
            plan: selectedPlan.value.name,
            amount: selectedPlan.value.price,
            date: new Date(),
            status: 'paid'
        })

        alert('Pagamento processado com sucesso!')
        closePaymentModal()
    } catch (error) {
        console.error('Erro ao processar pagamento:', error)
        alert('Erro ao processar pagamento')
    } finally {
        processing.value = false
    }
}

// Lifecycle
onMounted(() => {
    console.log('Página de assinaturas carregada')
})
</script>

<style scoped>
/* Estilos específicos para a página de assinaturas */
</style>
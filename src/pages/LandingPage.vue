<template>
    <div class="min-h-screen bg-white">
        <!-- Header SaaS -->
        <header ref="headerRef" :class="[
            'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
            isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg' : 'bg-transparent'
        ]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <!-- Logo -->
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl overflow-hidden shadow-lg">
                            <img src="/src/assets/logo-branco.png" alt="Logo" class="w-full h-full object-contain">
                        </div>
                        <div>
                            <h1 class="text-2xl font-normal bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                                style="font-family: 'Arbutus', cursive; letter-spacing: 0.05em;">
                                NEXA
                            </h1>
                        </div>
                    </div>

                    <!-- Navigation -->
                    <nav class="hidden md:flex items-center gap-8">
                        <a href="#features" :class="[
                            'nav-link font-medium transition-colors',
                            isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/80 hover:text-white'
                        ]">Recursos</a>
                        <a href="#pricing" :class="[
                            'nav-link font-medium transition-colors',
                            isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/80 hover:text-white'
                        ]">Preços</a>
                        <a href="#about" :class="[
                            'nav-link font-medium transition-colors',
                            isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/80 hover:text-white'
                        ]">Sobre</a>
                    </nav>

                    <!-- CTA Buttons -->
                    <div class="flex items-center gap-4">
                        <router-link to="/auth/login" :class="[
                            'login-btn px-6 py-2 font-semibold rounded-lg transition-all duration-300 shadow-lg',
                            isScrolled
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm'
                        ]">
                            Entrar
                        </router-link>
                    </div>
                </div>
            </div>
        </header>

        <!-- Hero Section -->
        <section class="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
            <!-- Background Pattern -->
            <div class="absolute inset-0 opacity-10">
                <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
            </div>

            <!-- Floating Elements -->
            <div class="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
            <div
                class="absolute top-40 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-1000">
            </div>
            <div
                class="absolute bottom-20 left-1/4 w-16 h-16 bg-pink-500/10 rounded-full blur-lg animate-pulse delay-2000">
            </div>

            <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <!-- Left Content -->
                    <div class="text-center lg:text-left">


                        <!-- Main Headline -->
                        <h1 class="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                            Transforme sua
                            <span
                                class="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                gestão
                            </span>
                            <br>com inteligência
                        </h1>

                        <!-- Subtitle -->
                        <p class="text-xl lg:text-2xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
                            O sistema completo que sua loja precisa.
                            <span class="text-blue-300 font-semibold">Stock, vendas, clientes</span> e muito mais
                            em uma plataforma inteligente e acessível.
                        </p>

                        <!-- CTA Buttons -->
                        <div class="flex flex-col sm:flex-row gap-4 mb-12">
                            <router-link to="/auth/register"
                                class="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
                                <span class="relative z-10">Começar Teste Grátis</span>
                                <div
                                    class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                </div>
                            </router-link>

                            <button
                                class="px-8 py-4 border-2 border-white/20 text-white rounded-2xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                                Ver Demonstração
                            </button>
                        </div>

                        <!-- Trust Indicators -->
                        <div class="flex flex-col sm:flex-row items-center gap-8 text-gray-400">
                            <div class="flex items-center gap-2">
                                <svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                <span class="text-sm">Sem compromisso</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                <span class="text-sm">Configuração em 5 minutos</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                <span class="text-sm">Suporte 24/7</span>
                            </div>
                        </div>
                    </div>

                    <!-- Right Content - Dashboard Preview -->
                    <div class="relative">
                        <!-- Main Dashboard Card -->
                        <div
                            class="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
                            <!-- Dashboard Header -->
                            <div class="flex items-center justify-between mb-6">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"></div>
                                    <div>
                                        <h3 class="text-white font-semibold">Dashboard NEXA</h3>
                                        <p class="text-gray-300 text-sm">Visão geral do negócio</p>
                                    </div>
                                </div>
                                <div class="flex gap-2">
                                    <div class="w-3 h-3 bg-red-400 rounded-full"></div>
                                    <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                    <div class="w-3 h-3 bg-green-400 rounded-full"></div>
                                </div>
                            </div>

                            <!-- Stats Grid -->
                            <div class="grid grid-cols-2 gap-4 mb-6">
                                <div class="bg-white/5 rounded-xl p-4 border border-white/10">
                                    <div class="text-2xl font-bold text-white">R$ 12.450</div>
                                    <div class="text-gray-300 text-sm">Vendas Hoje</div>
                                    <div class="text-green-400 text-xs mt-1">+15% vs ontem</div>
                                </div>
                                <div class="bg-white/5 rounded-xl p-4 border border-white/10">
                                    <div class="text-2xl font-bold text-white">47</div>
                                    <div class="text-gray-300 text-sm">Produtos</div>
                                    <div class="text-blue-400 text-xs mt-1">3 em falta</div>
                                </div>
                            </div>

                            <!-- Chart Area -->
                            <div class="bg-white/5 rounded-xl p-4 border border-white/10">
                                <div class="flex items-center justify-between mb-3">
                                    <span class="text-white font-medium">Vendas por Período</span>
                                    <span class="text-gray-300 text-sm">Últimos 7 dias</span>
                                </div>
                                <div class="flex items-end gap-2 h-16">
                                    <div class="bg-gradient-to-t from-blue-500 to-blue-300 rounded-t w-6 h-12"></div>
                                    <div class="bg-gradient-to-t from-purple-500 to-purple-300 rounded-t w-6 h-16">
                                    </div>
                                    <div class="bg-gradient-to-t from-pink-500 to-pink-300 rounded-t w-6 h-8"></div>
                                    <div class="bg-gradient-to-t from-green-500 to-green-300 rounded-t w-6 h-20"></div>
                                    <div class="bg-gradient-to-t from-yellow-500 to-yellow-300 rounded-t w-6 h-14">
                                    </div>
                                    <div class="bg-gradient-to-t from-indigo-500 to-indigo-300 rounded-t w-6 h-10">
                                    </div>
                                    <div class="bg-gradient-to-t from-red-500 to-red-300 rounded-t w-6 h-18"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Floating Cards -->
                        <div
                            class="absolute -top-4 -right-4 bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-xl">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                                    <svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <div>
                                    <div class="text-white font-semibold">Venda Concluída</div>
                                    <div class="text-gray-300 text-sm">+R$ 150,00</div>
                                </div>
                            </div>
                        </div>

                        <div
                            class="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-xl">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                                    <svg class="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <div class="text-white font-semibold">Stock Atualizado</div>
                                    <div class="text-gray-300 text-sm">23 produtos</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bottom Wave -->
            <div class="absolute bottom-0 left-0 right-0">
                <svg class="w-full h-20 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path
                        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                        opacity=".25" fill="currentColor"></path>
                    <path
                        d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                        opacity=".5" fill="currentColor"></path>
                    <path
                        d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                        fill="currentColor"></path>
                </svg>
            </div>
        </section>

        <!-- Features Section -->
        <section id="features" class="py-20 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Tudo que você precisa para sua loja
                    </h2>
                    <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                        Funcionalidades poderosas em uma interface simples e intuitiva
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <!-- Feature 1 -->
                    <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                        <div
                            class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-gray-800 mb-3">Gestão de Stock</h3>
                        <p class="text-gray-600">Controle completo do Stock com alertas de produtos em falta e
                            relatórios detalhados.</p>
                    </div>

                    <!-- Feature 2 -->
                    <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100">
                        <div
                            class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-6">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z">
                                </path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-gray-800 mb-3">Vendas Inteligentes</h3>
                        <p class="text-gray-600">Sistema de vendas com suporte a fiado, pagamentos parciais e geração
                            automática de recibos.</p>
                    </div>

                    <!-- Feature 3 -->
                    <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
                        <div
                            class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.103-1.274-.293-1.857M7 20v-2a3 3 0 015.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M12 10a6 6 0 110-12 6 6 0 010 12z">
                                </path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-gray-800 mb-3">Gestão de Clientes</h3>
                        <p class="text-gray-600">Cadastro completo de clientes com histórico de compras e controle de
                            crédito.</p>
                    </div>

                    <!-- Feature 4 -->
                    <div class="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-100">
                        <div
                            class="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-6">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                                </path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-gray-800 mb-3">Relatórios Avançados</h3>
                        <p class="text-gray-600">Dashboards e relatórios detalhados para análise de vendas e performance
                            do negócio.</p>
                    </div>

                    <!-- Feature 5 -->
                    <div class="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8 border border-red-100">
                        <div
                            class="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z">
                                </path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-gray-800 mb-3">PWA Mobile</h3>
                        <p class="text-gray-600">Aplicação web progressiva que funciona offline e pode ser instalada no
                            telemóvel.</p>
                    </div>

                    <!-- Feature 6 -->
                    <div class="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 border border-indigo-100">
                        <div
                            class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z">
                                </path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-gray-800 mb-3">Multi-utilizador</h3>
                        <p class="text-gray-600">Sistema de permissões com diferentes níveis de acesso para
                            administradores e vendedores.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Pricing Section -->
        <section id="pricing" class="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <div class="inline-flex items-center gap-2 bg-blue-100 text-blue-800 rounded-full px-4 py-2 mb-6">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span class="text-sm font-semibold">Preços Transparentes</span>
                    </div>
                    <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Escolha o plano ideal para sua
                        <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            empresa
                        </span>
                    </h2>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Planos flexíveis que crescem com seu negócio. Sem taxas ocultas, sem surpresas.
                    </p>

                    <!-- Billing Toggle -->
                    <div class="flex items-center justify-center gap-4 mb-12">
                        <span
                            :class="['text-lg font-medium transition-colors', !isYearly ? 'text-gray-900' : 'text-gray-500']">
                            Mensal
                        </span>
                        <button @click="isYearly = !isYearly"
                            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                            :class="isYearly ? 'bg-blue-600' : 'bg-gray-300'">
                            <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                                :class="isYearly ? 'translate-x-6' : 'translate-x-1'"></span>
                        </button>
                        <span
                            :class="['text-lg font-medium transition-colors', isYearly ? 'text-gray-900' : 'text-gray-500']">
                            Anual
                        </span>
                        <div v-if="isYearly"
                            class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                            -20% de desconto
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <!-- Plano Starter -->
                    <div
                        class="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                        <div class="text-center">
                            <div
                                class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            </div>
                            <h3 class="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
                            <p class="text-gray-600 mb-6">Perfeito para começar</p>
                            <div class="mb-8">
                                <div class="flex items-baseline justify-center">
                                    <span class="text-5xl font-bold text-gray-900">{{ isYearly ? 'MT 480' : 'MT 600'
                                    }}</span>
                                    <span class="text-gray-600 ml-2">/mês</span>
                                </div>
                                <p v-if="isYearly" class="text-sm text-green-600 font-semibold mt-2">Economize MT 1.440
                                    por ano</p>
                            </div>
                            <ul class="space-y-4 mb-8 text-left">
                                <li class="flex items-start gap-3">
                                    <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="text-gray-700">Até 100 produtos</span>
                                </li>
                                <li class="flex items-start gap-3">
                                    <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="text-gray-700">1 utilizador</span>
                                </li>
                                <li class="flex items-start gap-3">
                                    <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="text-gray-700">Relatórios básicos</span>
                                </li>
                                <li class="flex items-start gap-3">
                                    <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="text-gray-700">Suporte por email</span>
                                </li>
                                <li class="flex items-start gap-3">
                                    <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="text-gray-700">Backup automático</span>
                                </li>
                            </ul>
                            <router-link to="/auth/register"
                                class="w-full py-4 px-6 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all duration-300 font-semibold text-center block hover:shadow-lg">
                                Começar Teste Grátis
                            </router-link>
                        </div>
                    </div>

                    <!-- Plano Professional -->
                    <div
                        class="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl relative transform scale-105 hover:scale-110 transition-all duration-300">
                        <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
                            <span
                                class="bg-yellow-400 text-yellow-900 px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                                ⭐ Mais Popular
                            </span>
                        </div>
                        <div class="text-center">
                            <div
                                class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h3 class="text-2xl font-bold mb-2">Professional</h3>
                            <p class="text-blue-100 mb-6">Para empresas em crescimento</p>
                            <div class="mb-8">
                                <div class="flex items-baseline justify-center">
                                    <span class="text-5xl font-bold">{{ isYearly ? 'MT 960' : 'MT 1.200' }}</span>
                                    <span class="text-blue-100 ml-2">/mês</span>
                                </div>
                                <p v-if="isYearly" class="text-sm text-green-300 font-semibold mt-2">Economize MT 2.880
                                    por ano</p>
                            </div>
                            <ul class="space-y-4 mb-8 text-left">
                                <li class="flex items-start gap-3">
                                    <svg class="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span>Produtos ilimitados</span>
                                </li>
                                <li class="flex items-start gap-3">
                                    <svg class="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span>Até 5 utilizadores</span>
                                </li>
                                <li class="flex items-start gap-3">
                                    <svg class="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span>Relatórios avançados</span>
                                </li>
                                <li class="flex items-start gap-3">
                                    <svg class="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span>Suporte prioritário</span>
                                </li>
                                <li class="flex items-start gap-3">
                                    <svg class="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span>Integrações avançadas</span>
                                </li>
                                <li class="flex items-start gap-3">
                                    <svg class="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span>API completa</span>
                                </li>
                            </ul>
                            <router-link to="/auth/register"
                                class="w-full py-4 px-6 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold text-center block hover:shadow-lg">
                                Começar Agora
                            </router-link>
                        </div>
                    </div>

                    <!-- Plano Enterprise -->
                    <div
                        class="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                        <div class="text-center">
                            <div
                                class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                                    </path>
                                </svg>
                            </div>
                            <h3 class="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                            <p class="text-gray-600 mb-6">Para grandes empresas</p>
                            <div class="mb-8">
                                <div class="flex items-baseline justify-center">
                                    <span class="text-5xl font-bold text-gray-900">{{ isYearly ? 'MT 2.000' : 'MT 2.500'
                                    }}</span>
                                    <span class="text-gray-600 ml-2">/mês</span>
                                </div>
                                <p v-if="isYearly" class="text-sm text-green-600 font-semibold mt-2">Economize MT 6.000
                                    por ano</p>
                            </div>
                            <ul class="space-y-4 mb-8 text-left">
                                <li class="flex items-start gap-3">
                                    <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="text-gray-700">Tudo do Professional</span>
                                </li>
                                <li class="flex items-start gap-3">
                                    <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="text-gray-700">Usuários ilimitados</span>
                                </li>
                                <li class="flex items-start gap-3">
                                    <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="text-gray-700">API personalizada</span>
                                </li>
                                <li class="flex items-start gap-3">
                                    <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="text-gray-700">Suporte 24/7</span>
                                </li>
                                <li class="flex items-start gap-3">
                                    <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="text-gray-700">Gerente de conta dedicado</span>
                                </li>
                            </ul>
                            <router-link to="/auth/register"
                                class="w-full py-4 px-6 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-purple-500 hover:text-purple-600 transition-all duration-300 font-semibold text-center block hover:shadow-lg">
                                Falar com Vendas
                            </router-link>
                        </div>
                    </div>
                </div>

                <!-- FAQ Section -->
                <div class="mt-20">
                    <div class="text-center mb-12">
                        <h3 class="text-3xl font-bold text-gray-900 mb-4">Perguntas Frequentes</h3>
                        <p class="text-xl text-gray-600">Tire suas dúvidas sobre nossos planos</p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div class="bg-white rounded-2xl p-6 shadow-lg">
                            <h4 class="text-lg font-semibold text-gray-900 mb-3">Posso mudar de plano a qualquer
                                momento?</h4>
                            <p class="text-gray-600">Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer
                                momento. As mudanças são aplicadas imediatamente.</p>
                        </div>

                        <div class="bg-white rounded-2xl p-6 shadow-lg">
                            <h4 class="text-lg font-semibold text-gray-900 mb-3">Há período de teste gratuito?</h4>
                            <p class="text-gray-600">Oferecemos 14 dias de teste gratuito para todos os planos. Sem
                                compromisso, sem cartão de crédito.</p>
                        </div>

                        <div class="bg-white rounded-2xl p-6 shadow-lg">
                            <h4 class="text-lg font-semibold text-gray-900 mb-3">Como funciona o desconto anual?</h4>
                            <p class="text-gray-600">Ao pagar anualmente, você economiza 20% em todos os planos. O
                                desconto é aplicado automaticamente.</p>
                        </div>

                        <div class="bg-white rounded-2xl p-6 shadow-lg">
                            <h4 class="text-lg font-semibold text-gray-900 mb-3">Posso cancelar quando quiser?</h4>
                            <p class="text-gray-600">Sim, você pode cancelar sua assinatura a qualquer momento. Não há
                                taxas de cancelamento ou multas.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-20 bg-blue-600">
            <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
                    Pronto para transformar sua loja?
                </h2>
                <p class="text-xl text-blue-100 mb-8">
                    Comece hoje mesmo e veja a diferença em sua gestão
                </p>
                <div class="flex justify-center">
                    <router-link to="/auth/register"
                        class="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl">
                        Começar Teste Grátis
                    </router-link>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-gray-900 text-white py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div class="col-span-1 md:col-span-2">
                        <div class="flex items-center gap-3 mb-4">
                            <div class="w-10 h-10 rounded-xl overflow-hidden shadow-lg">
                                <img src="/src/assets/logo-branco.png" alt="Logo" class="w-full h-full object-contain">
                            </div>
                            <div>
                                <h3 class="text-xl font-normal bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                                    style="font-family: 'Arbutus', cursive; letter-spacing: 0.05em;">
                                    NEXA
                                </h3>
                                <p class="text-gray-400">SaaS de Gestão</p>
                            </div>
                        </div>
                        <p class="text-gray-400 mb-6 max-w-md">
                            A solução completa para gestão de pequenas e médias empresas.
                            Simples, eficiente e acessível.
                        </p>
                    </div>

                    <div>
                        <h4 class="text-lg font-semibold mb-4">Produto</h4>
                        <ul class="space-y-2">
                            <li><a href="#features"
                                    class="text-gray-400 hover:text-white transition-colors">Recursos</a></li>
                            <li><a href="#pricing" class="text-gray-400 hover:text-white transition-colors">Preços</a>
                            </li>
                            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">API</a></li>
                            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Integrações</a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 class="text-lg font-semibold mb-4">Suporte</h4>
                        <ul class="space-y-2">
                            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Central de
                                    Ajuda</a></li>
                            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Documentação</a>
                            </li>
                            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Contato</a></li>
                            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Status</a></li>
                        </ul>
                    </div>
                </div>

                <div class="border-t border-gray-800 mt-12 pt-8 text-center">
                    <p class="text-gray-400">
                        &copy;2025 NEXA. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const headerRef = ref(null)
const isScrolled = ref(false)
const isYearly = ref(false)

const handleScroll = () => {
    const scrollY = window.scrollY
    const heroHeight = 600 // Altura aproximada do hero

    if (scrollY > heroHeight) {
        isScrolled.value = true
    } else {
        isScrolled.value = false
    }
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>
<template>
    <div class="min-h-screen bg-white">
        <!-- Header SaaS -->
        <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
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
                        <a href="#features"
                            class="text-gray-600 hover:text-gray-900 font-medium transition-colors">Recursos</a>
                        <a href="#pricing"
                            class="text-gray-600 hover:text-gray-900 font-medium transition-colors">Preços</a>
                        <a href="#about"
                            class="text-gray-600 hover:text-gray-900 font-medium transition-colors">Sobre</a>
                    </nav>

                    <!-- CTA Buttons -->
                    <div class="flex items-center gap-4">

                        <router-link to="/auth/login"
                            class="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
                            Entrar
                        </router-link>
                    </div>
                </div>
            </div>
        </header>

        <!-- Hero Section -->
        <section class="relative py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-indigo-100">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center">
                    <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        Gerencie sua loja com
                        <span class="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            inteligência
                        </span>
                    </h1>
                    <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Sistema completo de gestão para pequenas e médias empresas.
                        Controle estoque, vendas, clientes e muito mais em uma única plataforma.
                    </p>
                    <div class="flex justify-center">
                        <router-link to="/auth/register"
                            class="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl">
                            Começar Agora
                        </router-link>
                    </div>
                </div>
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
                        <h3 class="text-xl font-bold text-gray-800 mb-3">Gestão de Estoque</h3>
                        <p class="text-gray-600">Controle completo do estoque com alertas de produtos em falta e
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
        <section id="pricing" class="py-20 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Planos simples e transparentes
                    </h2>
                    <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                        Escolha o plano ideal para o tamanho da sua empresa
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <!-- Plano Básico -->
                    <div class="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                        <div class="text-center">
                            <h3 class="text-2xl font-bold text-gray-800 mb-2">Básico</h3>
                            <p class="text-gray-600 mb-6">Para pequenas lojas</p>
                            <div class="mb-8">
                                <span class="text-4xl font-bold text-gray-900">MT 600</span>
                                <span class="text-gray-600">/mês</span>
                            </div>
                            <ul class="space-y-4 mb-8">
                                <li class="flex items-center gap-3">
                                    <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span class="text-gray-600">Até 100 produtos</span>
                                </li>
                                <li class="flex items-center gap-3">
                                    <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span class="text-gray-600">1 utilizador</span>
                                </li>
                                <li class="flex items-center gap-3">
                                    <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span class="text-gray-600">Relatórios básicos</span>
                                </li>
                            </ul>
                            <router-link to="/auth/register"
                                class="w-full py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors font-semibold text-center block">
                                Começar Teste Grátis
                            </router-link>
                        </div>
                    </div>

                    <!-- Plano Profissional -->
                    <div
                        class="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl relative">
                        <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
                            <span class="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-semibold">
                                Mais Popular
                            </span>
                        </div>
                        <div class="text-center">
                            <h3 class="text-2xl font-bold mb-2">Profissional</h3>
                            <p class="text-blue-100 mb-6">Para lojas em crescimento</p>
                            <div class="mb-8">
                                <span class="text-4xl font-bold">MT 1.200</span>
                                <span class="text-blue-100">/mês</span>
                            </div>
                            <ul class="space-y-4 mb-8">
                                <li class="flex items-center gap-3">
                                    <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span>Produtos ilimitados</span>
                                </li>
                                <li class="flex items-center gap-3">
                                    <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span>Até 5 utilizadores</span>
                                </li>
                                <li class="flex items-center gap-3">
                                    <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span>Relatórios avançados</span>
                                </li>
                                <li class="flex items-center gap-3">
                                    <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span>Suporte prioritário</span>
                                </li>
                            </ul>
                            <router-link to="/auth/register"
                                class="w-full py-3 px-6 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-center block">
                                Começar Agora
                            </router-link>
                        </div>
                    </div>

                    <!-- Plano Empresarial -->
                    <div class="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                        <div class="text-center">
                            <h3 class="text-2xl font-bold text-gray-800 mb-2">Empresarial</h3>
                            <p class="text-gray-600 mb-6">Para grandes empresas</p>
                            <div class="mb-8">
                                <span class="text-4xl font-bold text-gray-900">MT 2.500</span>
                                <span class="text-gray-600">/mês</span>
                            </div>
                            <ul class="space-y-4 mb-8">
                                <li class="flex items-center gap-3">
                                    <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span class="text-gray-600">Tudo do Profissional</span>
                                </li>
                                <li class="flex items-center gap-3">
                                    <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span class="text-gray-600">Usuários ilimitados</span>
                                </li>
                                <li class="flex items-center gap-3">
                                    <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span class="text-gray-600">API personalizada</span>
                                </li>
                                <li class="flex items-center gap-3">
                                    <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span class="text-gray-600">Suporte 24/7</span>
                                </li>
                            </ul>
                            <router-link to="/auth/register"
                                class="w-full py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors font-semibold text-center block">
                                Falar com Vendas
                            </router-link>
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
// Landing page SaaS não precisa de lógica complexa
</script>
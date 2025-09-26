<template>
    <div class="min-h-screen bg-slate-50">
        <!-- Header Mobile -->
        <div class="bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 shadow-xl">
            <div class="px-4 py-4">
                <div class="flex items-center justify-between">
                    <!-- Logo e Título -->
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01">
                                </path>
                            </svg>
                        </div>
                        <div>
                            <h1 class="text-xl font-bold text-white">Vendas</h1>
                            <p class="text-green-100 text-sm">
                                {{ isAdmin ? 'Gerencie todas as vendas' : isManager ? 'Gerencie vendas da equipe' :
                                    'Gerencie suas vendas' }}
                            </p>
                        </div>
                    </div>

                    <!-- Ações Mobile -->
                    <div class="flex items-center gap-3">
                        <!-- Nova Venda (apenas se tiver permissão) -->
                        <button v-if="canCreateSales" @click="openSaleModal"
                            class="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors font-medium text-sm">
                            Nova Venda
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="p-4">
            <!-- 1. RESUMO RÁPIDO - Mais importante -->
            <div class="bg-white rounded-xl border border-slate-200 mb-4 shadow-sm">
                <div class="p-4">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-slate-800"> Resumo de Vendas</h3>
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span class="text-xs text-green-600 font-medium">Atualizado</span>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                            <div class="text-2xl font-bold text-green-600 mb-1">{{ sales.length }}</div>
                            <div class="text-sm font-medium text-slate-700">Total Vendas</div>
                        </div>
                        <div class="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div class="text-2xl font-bold text-blue-600 mb-1">{{ pendingSales.length }}</div>
                            <div class="text-sm font-medium text-slate-700">Pendentes</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 2. FILTROS - Segunda prioridade -->
            <div class="bg-white rounded-xl border border-slate-200 mb-4 shadow-sm">
                <div class="p-4">
                    <!-- Header dos Filtros -->
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z">
                                </path>
                            </svg>
                            <h3 class="text-sm font-semibold text-slate-700"> Filtros</h3>
                        </div>
                        <button @click="clearFilters" class="text-xs text-green-600 hover:text-green-800 font-medium">
                            Limpar todos
                        </button>
                    </div>

                    <!-- Busca Principal -->
                    <div class="mb-4">
                        <div class="relative">
                            <input v-model="filters.search" type="text" placeholder="Buscar vendas..."
                                class="w-full pl-10 pr-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                @input="searchSales" />
                            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                    </div>

                    <!-- Filtros Secundários -->
                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="block text-xs font-medium text-slate-600 mb-2">Cliente</label>
                            <select v-model="filters.clientId"
                                class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                @change="searchSales">
                                <option value="">Todos os clientes a fiado</option>
                                <option v-for="client in clients" :key="client.id" :value="client.id">
                                    {{ client.name }}
                                </option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-medium text-slate-600 mb-2">Status</label>
                            <select v-model="filters.paymentStatus"
                                class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                @change="searchSales">
                                <option value="">Todos os status</option>
                                <option value="paid">Pago</option>
                                <option value="pending">Pendente</option>
                                <option value="partial">Parcial</option>
                            </select>
                        </div>
                    </div>

                    <!-- Filtro de Data -->
                    <div class="mt-3">
                        <label class="block text-xs font-medium text-slate-600 mb-2">Data</label>
                        <input v-model="filters.startDate" type="date"
                            class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                            @change="searchSales" />
                    </div>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="flex justify-center py-8">
                <div class="flex flex-col items-center space-y-3">
                    <div class="w-6 h-6 border-2 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
                    <p class="text-sm text-slate-600">Carregando...</p>
                </div>
            </div>

            <!-- Empty State -->
            <div v-else-if="sales.length === 0" class="text-center py-8">
                <div class="max-w-sm mx-auto">
                    <div class="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
                        <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01">
                            </path>
                        </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-slate-800 mb-1">Nenhuma venda encontrada</h3>
                    <p class="text-sm text-slate-600 mb-4">Comece registrando sua primeira venda</p>
                    <button @click="openSaleModal"
                        class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4">
                            </path>
                        </svg>
                        Nova Venda
                    </button>
                </div>
            </div>

            <!-- Lista de Vendas Mobile -->
            <div v-else class="space-y-3">
                <div v-for="sale in sales" :key="sale.id"
                    class="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
                    <div class="p-4">
                        <!-- Header Mobile -->
                        <div class="flex items-start justify-between mb-3">
                            <div class="flex-1">
                                <h3 class="text-lg font-semibold text-slate-800 mb-1">Venda #{{ sale.saleNumber }}</h3>
                                <div class="flex items-center gap-2 mb-2">
                                    <span class="text-sm text-slate-600">{{ formatDate(sale.createdAt) }}</span>
                                    <span class="text-slate-400">•</span>
                                    <span class="text-sm text-slate-600">{{ sale.Client?.name || 'Cliente Avulso'
                                        }}</span>
                                </div>
                            </div>
                            <!-- Status Badge -->
                            <div class="flex flex-col items-end gap-2">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                                    :class="{
                                        'bg-green-100 text-green-800': sale.paymentStatus === 'paid',
                                        'bg-yellow-100 text-yellow-800': sale.paymentStatus === 'partial',
                                        'bg-red-100 text-red-800': sale.paymentStatus === 'pending'
                                    }">
                                    <div class="w-2 h-2 rounded-full mr-2" :class="{
                                        'bg-green-500': sale.paymentStatus === 'paid',
                                        'bg-yellow-500': sale.paymentStatus === 'partial',
                                        'bg-red-500': sale.paymentStatus === 'pending'
                                    }"></div>
                                    {{ getStatusText(sale.paymentStatus) }}
                                </span>
                            </div>
                        </div>

                        <!-- Valores Principais -->
                        <div class="grid grid-cols-2 gap-4 mb-3">
                            <div class="bg-slate-50 rounded-lg p-3">
                                <div class="text-xs text-slate-500 mb-1">Total da Venda</div>
                                <div class="text-lg font-bold text-green-600">MT {{ formatPrice(sale.totalAmount) }}
                                </div>
                            </div>
                            <div class="bg-slate-50 rounded-lg p-3">
                                <div class="text-xs text-slate-500 mb-1">Itens</div>
                                <div class="text-lg font-bold text-blue-600">{{ sale.SaleItems?.length || 0 }} produtos
                                </div>
                            </div>
                        </div>

                        <!-- Ações Mobile -->
                        <div class="flex gap-2">
                            <button @click="viewSale(sale)"
                                class="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                                    </path>
                                </svg>
                                Ver
                            </button>
                            <button @click="generateReceipt(sale.id)"
                                class="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                                    </path>
                                </svg>
                                Recibo
                            </button>
                            <button v-if="sale.paymentMethod === 'credit'" @click="openPaymentModal(sale)"
                                class="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z">
                                    </path>
                                </svg>
                            </button>
                            <button @click="deleteSale(sale.id)"
                                class="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                    </path>
                                </svg>
                            </button>
                        </div>

                        <!-- Itens da Venda (se existir) -->
                        <div v-if="sale.SaleItems && sale.SaleItems.length > 0" class="mt-3 p-3 bg-slate-50 rounded-lg">
                            <div class="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Itens da Venda
                            </div>
                            <div class="space-y-2">
                                <div v-for="item in sale.SaleItems" :key="item.id"
                                    class="flex justify-between items-center bg-white rounded p-2">
                                    <div>
                                        <span class="text-sm font-medium text-slate-800">{{ item.Product?.name }}</span>
                                        <span class="text-slate-600 ml-2">x{{ item.quantity }}</span>
                                    </div>
                                    <span class="text-sm font-semibold text-green-600">MT {{ formatPrice(item.unitPrice
                                        * item.quantity) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bottom Sheet de Nova Venda -->
            <CustomBottomSheet v-model:visible="showSaleModal" title="Nova Venda" height="90vh" @close="closeSaleModal">

                <form @submit.prevent="createSale">
                    <div class="space-y-4 mb-4">
                        <!-- Cliente -->
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-2">Cliente</label>
                            <select v-model="saleForm.clientId"
                                class="w-full px-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors">
                                <option value="">Cliente Avulso</option>
                                <option v-for="client in clients" :key="client.id" :value="client.id">
                                    {{ client.name }}
                                </option>
                            </select>
                        </div>

                        <!-- Forma de Pagamento -->
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-2">Forma de Pagamento</label>
                            <select v-model="saleForm.paymentMethod"
                                class="w-full px-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors">
                                <option value="cash">Dinheiro</option>
                                <option value="card">Cartão</option>
                                <option value="transfer">Transferência</option>
                                <option value="credit">Fiado</option>
                            </select>
                        </div>
                    </div>

                    <!-- Data de Vencimento (se fiado) -->
                    <div v-if="saleForm.paymentMethod === 'credit'" class="mb-4">
                        <label class="block text-sm font-medium text-slate-700 mb-2">Data de Vencimento</label>
                        <input v-model="saleForm.dueDate" type="date"
                            class="w-full px-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" />
                    </div>

                    <!-- Seleção de Produtos -->
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-slate-700 mb-2">Adicionar Produto</label>
                        <select v-model="selectedProduct"
                            class="w-full px-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                            @change="addProductToSale">
                            <option value="">Selecione um produto</option>
                            <option v-for="product in availableProducts" :key="product.id" :value="product.id">
                                {{ product.name }} - MT {{ formatPrice(product.price) }} (Stock: {{ product.stock
                                }})
                            </option>
                        </select>
                    </div>

                    <!-- Itens da Venda -->
                    <div v-if="saleForm.products.length > 0" class="mb-4">
                        <h4 class="text-sm font-medium text-slate-800 mb-2">Itens da Venda</h4>
                        <div class="space-y-2">
                            <div v-for="(item, index) in saleForm.products" :key="index"
                                class="flex items-center justify-between p-3 bg-slate-50 rounded">
                                <div class="flex-1">
                                    <span class="text-sm font-medium text-slate-800">{{ item.name }}</span>
                                    <span class="text-slate-600 ml-2">x{{ item.quantity }}</span>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <input v-model.number="item.quantity" type="number" min="1" :max="item.maxStock"
                                        class="w-16 px-2 py-1 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors text-center"
                                        @change="updateItemQuantity(index)" />
                                    <span class="text-sm font-semibold text-green-600">MT {{
                                        formatPrice(item.unitPrice * item.quantity) }}</span>
                                    <button type="button" @click="removeProductFromSale(index)"
                                        class="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors">
                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                            </path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Cálculos -->
                    <div v-if="saleForm.products.length > 0" class="bg-green-50 rounded p-3 mb-4">
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div>
                                <label class="block text-xs font-medium text-slate-700 mb-1">Subtotal</label>
                                <input v-model="saleForm.subtotal" type="number" step="0.01"
                                    class="w-full px-2 py-1 text-sm border border-slate-300 rounded text-slate-800 font-medium"
                                    readonly />
                            </div>
                            <div>
                                <label class="block text-xs font-medium text-slate-700 mb-1">Desconto</label>
                                <input v-model="saleForm.discount" type="number" step="0.01" placeholder="0.00"
                                    class="w-full px-2 py-1 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors"
                                    @input="calculateTotal" />
                            </div>
                            <div>
                                <label class="block text-xs font-medium text-slate-700 mb-1">Imposto</label>
                                <input v-model="saleForm.tax" type="number" step="0.01" placeholder="0.00"
                                    class="w-full px-2 py-1 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors"
                                    @input="calculateTotal" />
                            </div>
                            <div>
                                <label class="block text-xs font-medium text-slate-700 mb-1">Total</label>
                                <input v-model="saleForm.totalAmount" type="number" step="0.01"
                                    class="w-full px-2 py-1 text-sm border border-green-300 rounded text-green-800 font-bold bg-green-100"
                                    readonly />
                            </div>
                        </div>
                    </div>

                    <div class="mb-4">
                        <label class="block text-sm font-medium text-slate-700 mb-1">Observações</label>
                        <textarea v-model="saleForm.notes" placeholder="Observações da venda"
                            class="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors"
                            rows="2"></textarea>
                    </div>

                    <div class="flex gap-3 pt-4 border-t border-slate-200 mt-6">
                        <button type="button" @click="closeSaleModal"
                            class="flex-1 px-4 py-3 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">
                            Cancelar
                        </button>
                        <button type="submit"
                            class="flex-1 px-4 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            :disabled="loading || saleForm.products.length === 0">
                            <div v-if="loading" class="flex items-center justify-center">
                                <div
                                    class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2">
                                </div>
                                Finalizando...
                            </div>
                            <div v-else>Finalizar Venda</div>
                        </button>
                    </div>
                </form>
            </CustomBottomSheet>

            <!-- Bottom Sheet de Pagamento -->
            <CustomBottomSheet v-model:visible="showPaymentModal" title="Registrar Pagamento" height="70vh"
                @close="closePaymentModal">

                <form @submit.prevent="createPayment">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-2">Valor do Pagamento</label>
                            <input v-model="paymentForm.amountPaid" type="number" step="0.01" placeholder="0.00"
                                class="w-full px-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                required />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-2">Forma de Pagamento</label>
                            <select v-model="paymentForm.paymentMethod"
                                class="w-full px-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                                <option value="cash">Dinheiro</option>
                                <option value="card">Cartão</option>
                                <option value="transfer">Transferência</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-2">Observações</label>
                            <textarea v-model="paymentForm.notes" placeholder="Observações do pagamento"
                                class="w-full px-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                rows="3"></textarea>
                        </div>
                    </div>

                    <div class="flex gap-3 pt-4 border-t border-slate-200 mt-6">
                        <button type="button" @click="closePaymentModal"
                            class="flex-1 px-4 py-3 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">
                            Cancelar
                        </button>
                        <button type="submit"
                            class="flex-1 px-4 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            :disabled="loading">
                            <div v-if="loading" class="flex items-center justify-center">
                                <div
                                    class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2">
                                </div>
                                Registrando...
                            </div>
                            <div v-else>Registrar Pagamento</div>
                        </button>
                    </div>
                </form>
            </CustomBottomSheet>

            <!-- Paginação -->
            <PaginationComponent :current-page="salesStore.pagination.page" :total-items="salesStore.pagination.total"
                :items-per-page="salesStore.pagination.limit" @page-change="handlePageChange"
                @items-per-page-change="handleItemsPerPageChange" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSalesStore } from '@/stores/sales'
import { useClientsStore } from '@/stores/clients'
import { useProductsStore } from '@/stores/products'
import { useAuthStore } from '@/stores/auth'
import { permissionManager, PERMISSIONS } from '@/utils/permissions'
import CustomBottomSheet from '../components/CustomBottomSheet.vue'
import PaginationComponent from '@/components/Pagination/PaginationComponent.vue'

// Router
const router = useRouter()

// Stores
const authStore = useAuthStore()
const salesStore = useSalesStore()
const clientsStore = useClientsStore()
const productsStore = useProductsStore()

// Controle de acesso baseado em roles
const userRole = computed(() => authStore.user?.role || 'seller')
const isAdmin = computed(() => userRole.value === 'admin')
const isManager = computed(() => userRole.value === 'manager')
const isSeller = computed(() => userRole.value === 'seller')

// Permissões específicas
const canCreateSales = computed(() => permissionManager.hasPermission(PERMISSIONS.SALES_CREATE))
const canEditSales = computed(() => permissionManager.hasPermission(PERMISSIONS.SALES_EDIT))
const canDeleteSales = computed(() => permissionManager.hasPermission(PERMISSIONS.SALES_DELETE))
const canViewAllSales = computed(() => isAdmin.value || isManager.value)

// Estado reativo
const showSaleModal = ref(false)
const showPaymentModal = ref(false)
const selectedSale = ref(null)
const selectedProduct = ref('')

// Computed properties
const sales = computed(() => salesStore.sales)
const clients = computed(() => clientsStore.clients)
const availableProducts = computed(() => productsStore.products)
const loading = computed(() => salesStore.loading)
const pendingSales = computed(() => salesStore.pendingSales)

// Filtros
const filters = reactive({
    search: '',
    clientId: '',
    paymentStatus: '',
    startDate: ''
})

// Formulário de venda
const saleForm = reactive({
    clientId: '',
    paymentMethod: 'immediate',
    dueDate: '',
    products: [],
    subtotal: 0,
    discount: 0,
    tax: 0,
    totalAmount: 0,
    notes: ''
})

// Formulário de pagamento
const paymentForm = reactive({
    amountPaid: 0,
    paymentMethod: 'cash',
    notes: ''
})

// API Base URL
const API_BASE = 'http://localhost:3000'

// Métodos
const formatPrice = (price) => {
    return parseFloat(price).toFixed(2).replace('.', ',')
}

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-PT')
}

const getStatusText = (status) => {
    const statusMap = {
        'paid': 'Pago',
        'pending': 'Pendente',
        'partial': 'Parcial'
    }
    return statusMap[status] || status
}

const loadSales = async () => {
    try {
        salesStore.setFilters(filters)
        const result = await salesStore.loadSales()

        if (!result.success) {
            console.error('Erro ao carregar vendas:', result.error)
        }
    } catch (error) {
        console.error('Erro ao carregar vendas:', error)
    }
}

const loadClients = async () => {
    try {
        const result = await clientsStore.loadClients()

        if (!result.success) {
            console.error('Erro ao carregar clientes:', result.error)
        }
    } catch (error) {
        console.error('Erro ao carregar clientes:', error)
    }
}

const loadProducts = async () => {
    try {
        const result = await productsStore.loadProducts()

        if (!result.success) {
            console.error('Erro ao carregar produtos:', result.error)
        }
    } catch (error) {
        console.error('Erro ao carregar produtos:', error)
    }
}

const searchSales = () => {
    salesStore.setFilters(filters)
    loadSales()
}

const clearFilters = () => {
    Object.assign(filters, {
        search: '',
        clientId: '',
        paymentStatus: '',
        startDate: ''
    })
    salesStore.clearFilters()
    loadSales()
}

const openSaleModal = () => {
    Object.assign(saleForm, {
        clientId: '',
        paymentMethod: 'immediate',
        dueDate: '',
        products: [],
        subtotal: 0,
        discount: 0,
        tax: 0,
        totalAmount: 0,
        notes: ''
    })
    showSaleModal.value = true
}

const closeSaleModal = () => {
    showSaleModal.value = false
}

const addProductToSale = () => {
    if (!selectedProduct.value) return

    const product = availableProducts.value.find(p => p.id == selectedProduct.value)
    if (!product) return

    // Verificar se produto já está na venda
    const existingIndex = saleForm.products.findIndex(p => p.id === product.id)
    if (existingIndex >= 0) {
        saleForm.products[existingIndex].quantity += 1
    } else {
        saleForm.products.push({
            id: product.id,
            name: product.name,
            quantity: 1,
            unitPrice: product.price,
            maxStock: product.stock
        })
    }

    calculateSubtotal()
    selectedProduct.value = ''
}

const removeProductFromSale = (index) => {
    saleForm.products.splice(index, 1)
    calculateSubtotal()
}

const updateItemQuantity = (index) => {
    calculateSubtotal()
}

const calculateSubtotal = () => {
    saleForm.subtotal = saleForm.products.reduce((total, item) => {
        return total + (item.unitPrice * item.quantity)
    }, 0)
    calculateTotal()
}

const calculateTotal = () => {
    saleForm.totalAmount = saleForm.subtotal - saleForm.discount + saleForm.tax
}

const createSale = async () => {
    try {
        const saleData = {
            clientId: saleForm.clientId || null,
            paymentMethod: saleForm.paymentMethod,
            dueDate: saleForm.paymentMethod === 'credit' ? saleForm.dueDate : null,
            products: saleForm.products.map(p => ({
                productId: p.id,
                quantity: p.quantity
            })),
            subtotal: saleForm.subtotal,
            discount: saleForm.discount,
            tax: saleForm.tax,
            totalAmount: saleForm.totalAmount,
            notes: saleForm.notes
        }

        const result = await salesStore.createSale(saleData)

        if (result.success) {
            closeSaleModal()
            loadSales()
            loadProducts() // Recarregar produtos para atualizar stock
            // Notificar que o dashboard deve ser atualizado
            console.log('🔥 Disparando evento sale-created')
            window.dispatchEvent(new CustomEvent('sale-created'))
        } else {
            alert('Erro ao criar venda: ' + result.error)
        }
    } catch (error) {
        console.error('Erro ao criar venda:', error)
        alert('Erro ao criar venda')
    }
}

const viewSale = (sale) => {
    router.push(`/app/sales/${sale.id}`)
}

const generateReceipt = async (saleId) => {
    try {
        const response = await fetch(`${API_BASE}/sales/${saleId}/receipt`)
        const receipt = await response.json()

        // Aqui você pode implementar a geração de PDF
        console.log('Recibo:', receipt)
        alert('Recibo gerado com sucesso!')
    } catch (error) {
        console.error('Erro ao gerar recibo:', error)
        alert('Erro ao gerar recibo')
    }
}

const deleteSale = async (saleId) => {
    if (!confirm('Tem certeza que deseja cancelar esta venda?')) return

    try {
        const result = await salesStore.deleteSale(saleId)

        if (result.success) {
            loadSales()
            loadProducts() // Recarregar produtos para atualizar stock
            // Notificar que o dashboard deve ser atualizado
            console.log('🔥 Disparando evento sale-deleted')
            window.dispatchEvent(new CustomEvent('sale-deleted'))
        } else {
            alert('Erro ao cancelar venda: ' + result.error)
        }
    } catch (error) {
        console.error('Erro ao cancelar venda:', error)
        alert('Erro ao cancelar venda')
    }
}

const openPaymentModal = (sale) => {
    selectedSale.value = sale
    paymentForm.amountPaid = 0
    paymentForm.paymentMethod = 'cash'
    paymentForm.notes = ''
    showPaymentModal.value = true
}

const closePaymentModal = () => {
    showPaymentModal.value = false
    selectedSale.value = null
}

const createPayment = async () => {
    try {
        loading.value = true

        const response = await fetch(`${API_BASE}/credit-payments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                saleId: selectedSale.value.id,
                clientId: selectedSale.value.ClientId,
                amountPaid: paymentForm.amountPaid,
                paymentMethod: paymentForm.paymentMethod,
                notes: paymentForm.notes
            })
        })

        if (response.ok) {
            const paymentData = await response.json()
            // Notificação de pagamento removida
            closePaymentModal()
            loadSales()
        } else {
            const error = await response.json()
            alert('Erro: ' + error.error)
        }
    } catch (error) {
        console.error('Erro ao registrar pagamento:', error)
        alert('Erro ao registrar pagamento')
    } finally {
        loading.value = false
    }
}

// Métodos de paginação
const handlePageChange = (page) => {
    salesStore.setPage(page)
    loadSales()
}

const handleItemsPerPageChange = (itemsPerPage) => {
    salesStore.setLimit(itemsPerPage)
    salesStore.setPage(1) // Reset para primeira página
    loadSales()
}

// Lifecycle
onMounted(() => {
    // Configurar permissionManager com o usuário atual
    if (authStore.user) {
        permissionManager.setCurrentUser(authStore.user)
    }

    loadSales()
    loadClients()
    loadProducts()
})
</script>
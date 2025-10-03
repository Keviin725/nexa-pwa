<template>
    <div class="min-h-screen bg-slate-50">
        <!-- Header Mobile -->
        <div class="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 shadow-xl">
            <div class="px-4 py-4">
                <div class="flex items-center justify-between">
                    <!-- Logo e Título -->
                    <div class="flex items-center gap-4">
                        <button @click="goBack"
                            class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 19l-7-7 7-7"></path>
                            </svg>
                        </button>
                        <div>
                            <h1 class="text-xl font-bold text-white">Detalhes da Venda</h1>
                            <p class="text-blue-100 text-sm">Venda #{{ sale?.saleNumber || '...' }}</p>
                        </div>
                    </div>

                    <!-- Ações Mobile -->
                    <div class="flex items-center gap-3">
                        <!-- Gerar Recibo -->
                        <button @click="generateReceipt"
                            class="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors font-medium text-sm">
                            <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                                </path>
                            </svg>
                            Recibo
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="p-4">
            <!-- Loading State -->
            <div v-if="loading" class="flex justify-center py-8">
                <div class="flex flex-col items-center space-y-3">
                    <div class="w-6 h-6 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    <p class="text-sm text-slate-600">Carregando detalhes...</p>
                </div>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="text-center py-8">
                <div class="max-w-sm mx-auto">
                    <div class="w-12 h-12 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-3">
                        <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                            </path>
                        </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-slate-800 mb-1">Erro ao carregar venda</h3>
                    <p class="text-sm text-slate-600 mb-4">{{ error }}</p>
                    <button @click="loadSaleDetails"
                        class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                        Tentar Novamente
                    </button>
                </div>
            </div>

            <!-- Sale Details -->
            <div v-else-if="sale" class="space-y-4">
                <!-- 1. Informações Principais -->
                <div class="bg-white rounded-xl border border-slate-200 shadow-sm">
                    <div class="p-4">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-semibold text-slate-800">Informações da Venda</h3>
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium" :class="{
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

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-xs font-medium text-slate-500 mb-1">Número da Venda</label>
                                <p class="text-sm font-semibold text-slate-800">#{{ sale.saleNumber }}</p>
                            </div>
                            <div>
                                <label class="block text-xs font-medium text-slate-500 mb-1">Data da Venda</label>
                                <p class="text-sm text-slate-800">{{ formatDate(sale.createdAt) }}</p>
                            </div>
                            <div>
                                <label class="block text-xs font-medium text-slate-500 mb-1">Cliente</label>
                                <p class="text-sm text-slate-800">{{ sale.Client?.name || 'Cliente Avulso' }}</p>
                            </div>
                            <div>
                                <label class="block text-xs font-medium text-slate-500 mb-1">Método de Pagamento</label>
                                <p class="text-sm text-slate-800">{{ getPaymentMethodText(sale.paymentMethod) }}</p>
                            </div>
                        </div>

                        <div v-if="sale.dueDate" class="mt-4">
                            <label class="block text-xs font-medium text-slate-500 mb-1">Data de Vencimento</label>
                            <p class="text-sm text-slate-800">{{ formatDate(sale.dueDate) }}</p>
                        </div>

                        <div v-if="sale.notes" class="mt-4">
                            <label class="block text-xs font-medium text-slate-500 mb-1">Observações</label>
                            <p class="text-sm text-slate-800">{{ sale.notes }}</p>
                        </div>
                    </div>
                </div>

                <!-- 2. Itens da Venda -->
                <div class="bg-white rounded-xl border border-slate-200 shadow-sm">
                    <div class="p-4">
                        <h3 class="text-lg font-semibold text-slate-800 mb-4">Itens da Venda</h3>

                        <div v-if="sale.SaleItems && sale.SaleItems.length > 0" class="space-y-3">
                            <div v-for="(item, index) in sale.SaleItems" :key="item.id"
                                class="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                <div class="flex-1">
                                    <div class="flex items-center gap-3">
                                        <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <span class="text-xs font-bold text-blue-600">{{ index + 1 }}</span>
                                        </div>
                                        <div>
                                            <p class="text-sm font-medium text-slate-800">{{ item.Product?.name }}</p>
                                            <p class="text-xs text-slate-500">Código: {{ item.Product?.code }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <p class="text-sm font-medium text-slate-800">Qtd: {{ item.quantity }}</p>
                                    <p class="text-sm font-semibold text-green-600">MT {{ formatPrice(item.unitPrice) }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div v-else class="text-center py-4">
                            <p class="text-sm text-slate-500">Nenhum item encontrado</p>
                        </div>
                    </div>
                </div>

                <!-- 3. Resumo Financeiro -->
                <div class="bg-white rounded-xl border border-slate-200 shadow-sm">
                    <div class="p-4">
                        <h3 class="text-lg font-semibold text-slate-800 mb-4">Resumo Financeiro</h3>

                        <div class="space-y-3">
                            <div class="flex justify-between items-center py-2 border-b border-slate-100">
                                <span class="text-sm text-slate-600">Subtotal</span>
                                <span class="text-sm font-medium text-slate-800">MT {{ formatPrice(sale.subtotal)
                                }}</span>
                            </div>

                            <div v-if="sale.discount > 0"
                                class="flex justify-between items-center py-2 border-b border-slate-100">
                                <span class="text-sm text-slate-600">Desconto</span>
                                <span class="text-sm font-medium text-red-600">- MT {{ formatPrice(sale.discount)
                                }}</span>
                            </div>

                            <div v-if="sale.tax > 0"
                                class="flex justify-between items-center py-2 border-b border-slate-100">
                                <span class="text-sm text-slate-600">Imposto</span>
                                <span class="text-sm font-medium text-slate-800">MT {{ formatPrice(sale.tax) }}</span>
                            </div>

                            <div class="flex justify-between items-center py-3 bg-green-50 rounded-lg px-3">
                                <span class="text-base font-semibold text-slate-800">Total</span>
                                <span class="text-lg font-bold text-green-600">MT {{ formatPrice(sale.totalAmount)
                                }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 4. Status de Pagamento (para vendas a crédito) -->
                <div v-if="sale.paymentMethod === 'credit'"
                    class="bg-white rounded-xl border border-slate-200 shadow-sm">
                    <div class="p-4">
                        <h3 class="text-lg font-semibold text-slate-800 mb-4">Status de Pagamento</h3>

                        <div class="space-y-4">
                            <!-- Valor Total -->
                            <div class="flex justify-between items-center py-3 bg-slate-50 rounded-lg px-4">
                                <span class="text-sm font-medium text-slate-700">Valor Total da Venda</span>
                                <span class="text-lg font-bold text-slate-800">MT {{ formatPrice(sale.totalAmount)
                                    }}</span>
                            </div>

                            <!-- Valor Pago -->
                            <div class="flex justify-between items-center py-3 bg-blue-50 rounded-lg px-4">
                                <span class="text-sm font-medium text-blue-700">Valor Já Pago</span>
                                <span class="text-lg font-bold text-blue-600">MT {{ formatPrice(totalPaid) }}</span>
                            </div>

                            <!-- Valor Restante -->
                            <div class="flex justify-between items-center py-3 rounded-lg px-4" :class="{
                                'bg-green-50': remainingAmount <= 0,
                                'bg-yellow-50': remainingAmount > 0 && remainingAmount < sale.totalAmount,
                                'bg-red-50': remainingAmount >= sale.totalAmount
                            }">
                                <span class="text-sm font-medium" :class="{
                                    'text-green-700': remainingAmount <= 0,
                                    'text-yellow-700': remainingAmount > 0 && remainingAmount < sale.totalAmount,
                                    'text-red-700': remainingAmount >= sale.totalAmount
                                }">Valor Restante</span>
                                <span class="text-lg font-bold" :class="{
                                    'text-green-600': remainingAmount <= 0,
                                    'text-yellow-600': remainingAmount > 0 && remainingAmount < sale.totalAmount,
                                    'text-red-600': remainingAmount >= sale.totalAmount
                                }">MT {{ formatPrice(remainingAmount) }}</span>
                            </div>

                            <!-- Progresso do Pagamento -->
                            <div class="space-y-2">
                                <div class="flex justify-between items-center">
                                    <span class="text-xs font-medium text-slate-600">Progresso do Pagamento</span>
                                    <span class="text-xs font-medium text-slate-600">{{ paymentProgress }}%</span>
                                </div>
                                <div class="w-full bg-slate-200 rounded-full h-2">
                                    <div class="h-2 rounded-full transition-all duration-300" :class="{
                                        'bg-green-500': paymentProgress >= 100,
                                        'bg-yellow-500': paymentProgress > 0 && paymentProgress < 100,
                                        'bg-red-500': paymentProgress === 0
                                    }" :style="{ width: `${Math.min(paymentProgress, 100)}%` }"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 5. Histórico de Pagamentos (para vendas a crédito) -->
                <div v-if="sale.paymentMethod === 'credit' && payments.length > 0"
                    class="bg-white rounded-xl border border-slate-200 shadow-sm">
                    <div class="p-4">
                        <h3 class="text-lg font-semibold text-slate-800 mb-4">Histórico de Pagamentos</h3>

                        <div class="space-y-3">
                            <div v-for="payment in payments" :key="payment.id"
                                class="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                        <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-slate-800">MT {{
                                            formatPrice(payment.amountPaid) }}</p>
                                        <p class="text-xs text-slate-500">{{ getPaymentMethodText(payment.paymentMethod)
                                            }} • {{ formatDate(payment.createdAt) }}</p>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <p class="text-xs text-slate-500">{{ formatDate(payment.createdAt) }}</p>
                                    <p v-if="payment.notes" class="text-xs text-slate-400 mt-1">{{ payment.notes }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 6. Ações -->
                <div class="bg-white rounded-xl border border-slate-200 shadow-sm">
                    <div class="p-4">
                        <h3 class="text-lg font-semibold text-slate-800 mb-4">Ações</h3>

                        <div class="grid grid-cols-2 gap-3">
                            <button @click="generateReceipt"
                                class="flex items-center justify-center gap-2 px-4 py-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                                    </path>
                                </svg>
                                Gerar Recibo
                            </button>

                            <button v-if="sale.paymentMethod === 'credit'" @click="openPaymentModal"
                                class="flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z">
                                    </path>
                                </svg>
                                Registrar Pagamento
                            </button>

                            <button @click="editSale"
                                class="flex items-center justify-center gap-2 px-4 py-3 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors text-sm font-medium">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                                    </path>
                                </svg>
                                Editar Venda
                            </button>

                            <button @click="deleteSale"
                                class="flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                    </path>
                                </svg>
                                Cancelar Venda
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom Sheet de Pagamento -->
        <CustomBottomSheet :visible="showPaymentModal" title="Registrar Pagamento" height="70vh"
            @close="closePaymentModal" @update:visible="showPaymentModal = $event">

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
    </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSalesStore } from '@/stores/sales'
import { apiService } from '@/services/api'
import CustomBottomSheet from '../components/CustomBottomSheet.vue'

// Router
const route = useRoute()
const router = useRouter()

// Store
const salesStore = useSalesStore()

// Estado reativo
const sale = ref(null)
const loading = ref(false)
const error = ref(null)
const showPaymentModal = ref(false)
const payments = ref([])

// Formulário de pagamento
const paymentForm = reactive({
    amountPaid: 0,
    paymentMethod: 'cash',
    notes: ''
})

// Computed properties para cálculos de pagamento
const totalPaid = computed(() => {
    return payments.value.reduce((sum, payment) => sum + parseFloat(payment.amountPaid || 0), 0)
})

const remainingAmount = computed(() => {
    if (!sale.value) return 0
    return Math.max(0, parseFloat(sale.value.totalAmount) - totalPaid.value)
})

const paymentProgress = computed(() => {
    if (!sale.value || sale.value.totalAmount === 0) return 0
    return Math.round((totalPaid.value / parseFloat(sale.value.totalAmount)) * 100)
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

const getPaymentMethodText = (method) => {
    const methodMap = {
        'cash': 'Dinheiro',
        'card': 'Cartão',
        'transfer': 'Transferência',
        'credit': 'Fiado'
    }
    return methodMap[method] || method
}

const loadSaleDetails = async () => {
    loading.value = true
    error.value = null

    try {
        const saleId = route.params.id

        // Carregar detalhes da venda
        const saleResponse = await fetch(`${API_BASE}/sales/${saleId}`)
        if (!saleResponse.ok) {
            throw new Error('Venda não encontrada')
        }
        sale.value = await saleResponse.json()

        // Se for venda a crédito, carregar pagamentos
        if (sale.value.paymentMethod === 'credit') {
            try {
                const paymentsResponse = await apiService.creditPayments.getBySale(saleId)
                payments.value = paymentsResponse.data || []
            } catch (err) {
                console.warn('Erro ao carregar pagamentos:', err)
                payments.value = []
            }
        }
    } catch (err) {
        error.value = err.message
    } finally {
        loading.value = false
    }
}

const goBack = () => {
    router.go(-1)
}

const generateReceipt = async () => {
    try {
        const response = await fetch(`${API_BASE}/sales/${sale.value.id}/receipt`)
        const receipt = await response.json()

        // Aqui você pode implementar a geração de PDF
        console.log('Recibo:', receipt)
        alert('Recibo gerado com sucesso!')
    } catch (error) {
        console.error('Erro ao gerar recibo:', error)
        alert('Erro ao gerar recibo')
    }
}

const openPaymentModal = () => {
    paymentForm.amountPaid = 0
    paymentForm.paymentMethod = 'cash'
    paymentForm.notes = ''
    showPaymentModal.value = true
}

const closePaymentModal = () => {
    showPaymentModal.value = false
}

const createPayment = async () => {
    try {
        loading.value = true

        const paymentData = {
            saleId: sale.value.id,
            clientId: sale.value.ClientId,
            amountPaid: paymentForm.amountPaid,
            paymentMethod: paymentForm.paymentMethod,
            notes: paymentForm.notes
        }

        const response = await apiService.creditPayments.create(paymentData)

        closePaymentModal()

        // Recarregar pagamentos da venda
        if (sale.value.paymentMethod === 'credit') {
            try {
                const paymentsResponse = await apiService.creditPayments.getBySale(sale.value.id)
                payments.value = paymentsResponse.data || []
            } catch (err) {
                console.warn('Erro ao recarregar pagamentos:', err)
            }
        }

        // Notificar que os dados devem ser atualizados
        window.dispatchEvent(new CustomEvent('payment-created'))
        alert('Pagamento registrado com sucesso!')
    } catch (error) {
        console.error('Erro ao registrar pagamento:', error)
        alert('Erro: ' + (error.response?.data?.error || error.message || 'Erro ao registrar pagamento'))
    } finally {
        loading.value = false
    }
}

const editSale = () => {
    // Implementar edição da venda
    console.log('Editar venda:', sale.value.id)
}

const deleteSale = async () => {
    if (!confirm('Tem certeza que deseja cancelar esta venda?')) return

    try {
        const result = await salesStore.deleteSale(sale.value.id)

        if (result.success) {
            router.push('/app/sales')
        } else {
            alert('Erro ao cancelar venda: ' + result.error)
        }
    } catch (error) {
        console.error('Erro ao cancelar venda:', error)
        alert('Erro ao cancelar venda')
    }
}

// Lifecycle
onMounted(() => {
    loadSaleDetails()
})
</script>

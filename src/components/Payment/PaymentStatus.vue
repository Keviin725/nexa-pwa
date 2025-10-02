<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div class="text-center">
                <!-- Status Icon -->
                <div class="mb-4">
                    <div v-if="status === 'pending'"
                        class="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center">
                        <svg class="w-8 h-8 text-yellow-600 animate-spin" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <div v-else-if="status === 'success'"
                        class="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7">
                            </path>
                        </svg>
                    </div>
                    <div v-else-if="status === 'error'"
                        class="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                        <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </div>
                </div>

                <!-- Status Message -->
                <h3 class="text-xl font-bold text-gray-900 mb-2">
                    {{ getStatusTitle() }}
                </h3>

                <p class="text-gray-600 mb-4">
                    {{ getStatusMessage() }}
                </p>

                <!-- Transaction Details -->
                <div v-if="transaction" class="bg-gray-50 rounded-lg p-4 mb-4">
                    <div class="text-sm text-gray-600">
                        <p><strong>Plano:</strong> {{ transaction.planName }}</p>
                        <p><strong>Valor:</strong> MT {{ transaction.amount }}</p>
                        <p><strong>ID:</strong> {{ transaction.id }}</p>
                    </div>
                </div>

                <!-- Instructions for M-Pesa -->
                <div v-if="status === 'pending'" class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <h4 class="font-semibold text-blue-900 mb-2">📱 Instruções para Pagamento:</h4>
                    <ol class="text-sm text-blue-800 space-y-1">
                        <li>1. Verifique seu celular</li>
                        <li>2. Aguarde o popup do M-Pesa</li>
                        <li>3. Digite seu PIN M-Pesa</li>
                        <li>4. Confirme o pagamento</li>
                    </ol>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-3">
                    <button v-if="status === 'pending'" @click="checkPaymentStatus" :disabled="checking"
                        class="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50">
                        {{ checking ? 'Verificando...' : 'Verificar Pagamento' }}
                    </button>

                    <button v-if="status === 'success'" @click="goToDashboard"
                        class="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                        Ir para Dashboard
                    </button>

                    <button v-if="status === 'error'" @click="retryPayment"
                        class="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                        Tentar Novamente
                    </button>

                    <button @click="$emit('close')"
                        class="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePaymentStore } from '@/stores/payment'

const props = defineProps({
    transactionId: {
        type: String,
        required: true
    }
})

const emit = defineEmits(['close'])

const paymentStore = usePaymentStore()
const router = useRouter()

const status = ref('pending')
const checking = ref(false)
const transaction = ref(null)

const getStatusTitle = () => {
    switch (status.value) {
        case 'pending': return 'Aguardando Pagamento'
        case 'success': return 'Pagamento Confirmado!'
        case 'error': return 'Erro no Pagamento'
        default: return 'Status Desconhecido'
    }
}

const getStatusMessage = () => {
    switch (status.value) {
        case 'pending': return 'Aguarde o popup do M-Pesa no seu celular e confirme o pagamento.'
        case 'success': return 'Seu plano foi ativado com sucesso!'
        case 'error': return 'Ocorreu um erro no processamento do pagamento.'
        default: return 'Status não identificado.'
    }
}

const checkPaymentStatus = async () => {
    checking.value = true

    try {
        const result = await paymentStore.verifyPayment(props.transactionId)

        if (result.status === 'completed' || result.status === 'success') {
            status.value = 'success'
        } else if (result.status === 'failed' || result.status === 'cancelled') {
            status.value = 'error'
        }
    } catch (error) {
        console.error('Erro ao verificar pagamento:', error)
        status.value = 'error'
    } finally {
        checking.value = false
    }
}

const goToDashboard = () => {
    router.push('/')
    emit('close')
}

const retryPayment = () => {
    router.push('/billing')
    emit('close')
}

// Auto-check payment status every 10 seconds
let checkInterval = null

onMounted(() => {
    checkInterval = setInterval(checkPaymentStatus, 10000)
})

// Cleanup interval on unmount
onUnmounted(() => {
    if (checkInterval) {
        clearInterval(checkInterval)
    }
})
</script>

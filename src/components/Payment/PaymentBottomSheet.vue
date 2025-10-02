<template>
    <CustomBottomSheet :visible="isOpen" title="💳 Pagamento" @close="$emit('close')">
        <!-- Plan Info -->
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 mb-6">
            <div class="flex items-center justify-between">
                <div>
                    <h4 class="font-semibold text-gray-900">{{ planName }}</h4>
                    <p class="text-sm text-gray-600">Plano de Assinatura</p>
                </div>
                <div class="flex items-baseline">
                    <span class="text-2xl font-bold text-blue-600">MT {{ amount }}</span>
                    <p class="text-sm text-gray-500">/ mês</p>
                </div>
            </div>
        </div>

        <!-- Payment Method Selection -->
        <div class="mb-6">
            <h4 class="font-semibold text-gray-900 mb-4">Escolha o método de pagamento</h4>
            <div class="space-y-3">
                <PaymentMethodCard method="mpesa" name="M-Pesa" description="Pagamento via celular"
                    :selected="selectedMethod === 'mpesa'" color="green" @select="selectPaymentMethod" />

                <PaymentMethodCard method="emola" name="Emola" description="Carteira digital"
                    :selected="selectedMethod === 'emola'" color="blue" @select="selectPaymentMethod" />

                <PaymentMethodCard method="visa" name="Cartão Visa" description="Cartão de crédito/débito"
                    :selected="selectedMethod === 'visa'" color="purple" @select="selectPaymentMethod" />
            </div>
        </div>

        <!-- Phone Number (for M-Pesa and Emola) -->
        <div v-if="selectedMethod === 'mpesa' || selectedMethod === 'emola'" class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
                📱 Número do Telefone
            </label>
            <input v-model="phoneNumber" type="tel" placeholder="Ex: 848512345"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                :class="{ 'border-red-500': phoneError }" />
            <p v-if="phoneError" class="text-red-500 text-xs mt-1">{{ phoneError }}</p>
            <p class="text-gray-500 text-xs mt-1">
                Digite o número do telefone que tem {{ selectedMethod === 'mpesa' ? 'M-Pesa' : 'Emola' }} (9 dígitos)
            </p>
        </div>

        <!-- Card Details (for Visa) -->
        <div v-else-if="selectedMethod === 'visa'" class="mb-6">
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Número do Cartão</label>
                    <input v-model="cardNumber" type="text" placeholder="XXXX XXXX XXXX XXXX"
                        class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        :class="{ 'border-red-500': cardError }" />
                    <p v-if="cardError" class="text-red-500 text-xs mt-1">{{ cardError }}</p>
                </div>
                <div class="grid grid-cols-3 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Mês</label>
                        <input v-model="cardMonth" type="text" placeholder="MM"
                            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            :class="{ 'border-red-500': cardError }" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Ano</label>
                        <input v-model="cardYear" type="text" placeholder="AA"
                            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            :class="{ 'border-red-500': cardError }" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                        <input v-model="cardCvv" type="text" placeholder="123"
                            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            :class="{ 'border-red-500': cardError }" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Payment Summary -->
        <div class="bg-gray-50 rounded-2xl p-4 mb-6">
            <h5 class="font-semibold text-gray-900 mb-3">Resumo do Pagamento</h5>
            <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                    <span class="text-gray-600">Plano:</span>
                    <span class="font-medium">{{ planName }}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Método:</span>
                    <span class="font-medium">{{ getMethodName(selectedMethod) }}</span>
                </div>
                <div class="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span class="text-blue-600">MT {{ amount }}</span>
                </div>
            </div>
        </div>

        <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 flex items-start">
            <svg class="w-5 h-5 text-blue-600 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"></path>
            </svg>
            <p>Seu pagamento é processado de forma segura. Não armazenamos seus dados de cartão.</p>
        </div>

        <!-- Botões de Ação -->
        <div class="mt-8 mb-8 flex gap-3">
            <button @click="confirmPayment" :disabled="!canProceed || loading"
                class="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                <span v-if="loading" class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                    Processando...
                </span>
                <span v-else>Pagar Agora</span>
            </button>

            <button @click="$emit('close')"
                class="px-6 py-4 border border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-colors font-semibold">
                Cancelar
            </button>
        </div>
    </CustomBottomSheet>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useNotifications } from '@/composables/useNotifications'
import PaymentMethodCard from './PaymentMethodCard.vue'
import CustomBottomSheet from '@/components/CustomBottomSheet.vue'

const props = defineProps({
    planId: {
        type: String,
        required: true
    },
    planName: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    isOpen: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['close'])

const router = useRouter()
const { handleApiSuccess, handleApiError } = useNotifications()

const selectedMethod = ref('mpesa') // Default to M-Pesa
const phoneNumber = ref('')
const phoneError = ref('')
const cardNumber = ref('')
const cardCvv = ref('')
const cardMonth = ref('')
const cardYear = ref('')
const cardError = ref('')
const loading = ref(false)

const selectPaymentMethod = (method) => {
    selectedMethod.value = method
    // Reset errors and fields when changing method
    phoneError.value = ''
    cardError.value = ''
    phoneNumber.value = ''
    cardNumber.value = ''
    cardCvv.value = ''
    cardMonth.value = ''
    cardYear.value = ''
}

const getMethodName = (method) => {
    const names = {
        'mpesa': 'M-Pesa',
        'emola': 'Emola',
        'visa': 'Cartão Visa'
    }
    return names[method] || method
}

const validatePhone = () => {
    phoneError.value = ''
    const cleanPhone = phoneNumber.value.replace(/\D/g, '')

    if (!cleanPhone) {
        phoneError.value = 'Número do telefone é obrigatório'
        return false
    }
    if (cleanPhone.length !== 9) {
        phoneError.value = 'Número deve ter 9 dígitos (ex: 848512345)'
        return false
    }
    if (!cleanPhone.startsWith('8')) {
        phoneError.value = 'Número deve começar com 8 (formato moçambicano)'
        return false
    }
    return true
}

const validateCard = () => {
    cardError.value = ''
    if (!cardNumber.value || cardNumber.value.replace(/\s/g, '').length !== 16) {
        cardError.value = 'Número do cartão inválido (16 dígitos)'
        return false
    }
    if (!cardCvv.value || cardCvv.value.length !== 3) {
        cardError.value = 'CVV inválido (3 dígitos)'
        return false
    }
    if (!cardMonth.value || parseInt(cardMonth.value) < 1 || parseInt(cardMonth.value) > 12) {
        cardError.value = 'Mês inválido'
        return false
    }
    if (!cardYear.value || parseInt(cardYear.value) < new Date().getFullYear() % 100) { // Basic year check
        cardError.value = 'Ano inválido'
        return false
    }
    return true
}

const canProceed = computed(() => {
    if (selectedMethod.value === 'mpesa' || selectedMethod.value === 'emola') {
        return validatePhone() && phoneNumber.value !== ''
    } else if (selectedMethod.value === 'visa') {
        return validateCard() && cardNumber.value !== '' && cardCvv.value !== '' && cardMonth.value !== '' && cardYear.value !== ''
    }
    return false
})

const confirmPayment = async () => {
    if (!selectedMethod.value) {
        handleApiError('Selecione um método de pagamento')
        return
    }

    if (selectedMethod.value === 'mpesa' || selectedMethod.value === 'emola') {
        if (!validatePhone()) return
    }

    if (selectedMethod.value === 'visa') {
        if (!validateCard()) return
    }

    try {
        loading.value = true

        // Simular processamento de pagamento
        await new Promise(resolve => setTimeout(resolve, 2000))

        emit('close')
        handleApiSuccess('Pagamento processado com sucesso!')

        // Redirecionar para página de sucesso ou dashboard
        router.push('/')

    } catch (error) {
        handleApiError('Erro ao processar pagamento. Tente novamente.')
    } finally {
        loading.value = false
    }
}

watch(() => props.isOpen, (newVal) => {
    if (newVal) {
        // Reset state when opening
        selectedMethod.value = 'mpesa'
        phoneNumber.value = ''
        phoneError.value = ''
        cardNumber.value = ''
        cardCvv.value = ''
        cardMonth.value = ''
        cardYear.value = ''
        cardError.value = ''
    }
})
</script>

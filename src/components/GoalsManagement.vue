<template>
    <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
                <div>
                    <h3 class="text-lg font-semibold text-slate-800">Meta de Receita Mensal</h3>
                    <p class="text-sm text-slate-500">Defina e acompanhe sua meta de receita</p>
                </div>
            </div>
            <button @click="toggleEditMode"
                class="px-3 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors">
                {{ isEditing ? 'Salvar' : 'Editar' }}
            </button>
        </div>

        <!-- Meta Atual -->
        <div v-if="!isEditing" class="space-y-4">
            <!-- Meta de Receita -->
            <div class="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div class="flex items-center justify-between mb-4">

                    <div>
                        <div class="text-2xl font-bold text-green-600">
                            <p class="text-sm text-slate-500">Meta definida</p>
                            {{ formatNumber(dashboardStore.targets.monthlyRevenue) }}MZN
                        </div>
                    </div>
                </div>

                <div class="space-y-3">
                    <div class="w-full bg-green-200 rounded-full h-3">
                        <div class="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                            :style="{ width: `${Math.min((dashboardStore.data.totalRevenue / dashboardStore.targets.monthlyRevenue) * 100, 100)}%` }">
                        </div>
                    </div>

                    <div class="flex justify-between items-center text-sm">
                        <div class="text-slate-600">
                            <span class="font-medium text-green-600">MZN {{
                                formatNumber(dashboardStore.data.totalRevenue) }}</span>
                            <span class="text-slate-500"> / MZN {{ formatNumber(dashboardStore.targets.monthlyRevenue)
                            }}</span>
                        </div>
                        <div class="text-green-600 font-semibold">
                            {{ Math.round((dashboardStore.data.totalRevenue / dashboardStore.targets.monthlyRevenue) *
                                100) }}%
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Formulário de Edição -->
        <div v-else class="space-y-4">
            <form @submit.prevent="saveGoal" class="space-y-4">
                <!-- Meta de Receita -->
                <div>
                    <label class="block text-sm font-medium text-slate-700 mb-2">
                        Meta de Receita Mensal (MZN)
                    </label>
                    <input v-model="form.monthlyRevenue" type="number" min="0" step="100"
                        class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-lg"
                        placeholder="Ex: 25000" />
                    <p class="text-xs text-slate-500 mt-1">Defina o valor que deseja alcançar este mês</p>
                </div>

                <!-- Botões -->
                <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                    <button type="button" @click="cancelEdit"
                        class="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                        Cancelar
                    </button>
                    <button type="button" @click="resetToDefault"
                        class="px-4 py-2 border border-orange-300 text-orange-700 rounded-lg hover:bg-orange-50 transition-colors">
                        Resetar
                    </button>
                    <button type="submit" :disabled="saving"
                        class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        <span v-if="saving" class="flex items-center gap-2">
                            <svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                                </path>
                            </svg>
                            Salvando...
                        </span>
                        <span v-else>Salvar Meta</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import { useNotifications } from '@/composables/useNotifications'

// Store
const dashboardStore = useDashboardStore()
const { handleApiSuccess, handleApiError } = useNotifications()

// Estado
const isEditing = ref(false)
const saving = ref(false)

// Formulário
const form = reactive({
    monthlyRevenue: 0
})

// Computed
const formatNumber = (value) => {
    return new Intl.NumberFormat('pt-PT').format(value || 0)
}

// Métodos
const toggleEditMode = () => {
    if (isEditing.value) {
        saveGoal()
    } else {
        loadCurrentGoal()
        isEditing.value = true
    }
}

const loadCurrentGoal = () => {
    form.monthlyRevenue = dashboardStore.targets.monthlyRevenue
}

const saveGoal = async () => {
    try {
        saving.value = true

        // Validar dados
        if (form.monthlyRevenue < 0) {
            handleApiError('O valor deve ser positivo')
            return
        }

        // Atualizar meta no store
        dashboardStore.setTarget('monthlyRevenue', Number(form.monthlyRevenue))

        // Salvar no localStorage
        localStorage.setItem('lojinha-monthly-goal', JSON.stringify({
            monthlyRevenue: form.monthlyRevenue,
            updatedAt: new Date().toISOString()
        }))

        isEditing.value = false
        handleApiSuccess('Meta atualizada com sucesso!')
    } catch (error) {
        console.error('Erro ao salvar meta:', error)
        handleApiError('Erro ao salvar meta')
    } finally {
        saving.value = false
    }
}

const cancelEdit = () => {
    isEditing.value = false
    loadCurrentGoal()
}

const resetToDefault = () => {
    if (confirm('Tem certeza que deseja resetar a meta para o valor padrão (MZN 25,000)?')) {
        dashboardStore.setTarget('monthlyRevenue', 25000)
        form.monthlyRevenue = 25000
        handleApiSuccess('Meta resetada para valor padrão')
    }
}

// Carregar meta salva
const loadSavedGoal = () => {
    try {
        const saved = localStorage.getItem('lojinha-monthly-goal')
        if (saved) {
            const goal = JSON.parse(saved)
            dashboardStore.setTarget('monthlyRevenue', goal.monthlyRevenue)
        }
    } catch (error) {
        console.error('Erro ao carregar meta salva:', error)
    }
}

// Inicializar
loadSavedGoal()
</script>
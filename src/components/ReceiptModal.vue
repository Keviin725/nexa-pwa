<template>
    <div v-if="show" class="receipt-modal-overlay" @click="handleOverlayClick">
        <div class="receipt-modal" @click.stop>
            <Receipt :sale="sale" :company-name="companyName" :company-details="companyDetails" @close="closeModal" />
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Receipt from './Receipt.vue'

// Props
const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    sale: {
        type: Object,
        required: true
    },
    companyName: {
        type: String,
        default: 'NEXA'
    },
    companyDetails: {
        type: String,
        default: 'Sistema de Gestão Inteligente\nEmail: contato@nexa.com\nTel: +258 84 000 0000'
    }
})

// Emits
const emit = defineEmits(['close'])

// Métodos
const closeModal = () => {
    emit('close')
}

const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
        closeModal()
    }
}

// Fechar com ESC
const handleKeydown = (event) => {
    if (event.key === 'Escape') {
        closeModal()
    }
}

// Lifecycle
watch(() => props.show, (newValue) => {
    if (newValue) {
        document.addEventListener('keydown', handleKeydown)
        document.body.style.overflow = 'hidden'
    } else {
        document.removeEventListener('keydown', handleKeydown)
        document.body.style.overflow = 'auto'
    }
})
</script>

<style scoped>
.receipt-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 20px;
    backdrop-filter: blur(4px);
}

.receipt-modal {
    max-width: 90vw;
    max-height: 90vh;
    overflow: auto;
    border-radius: 12px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
    animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
    from {
        opacity: 0;
        transform: scale(0.9) translateY(-20px);
    }

    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

/* Responsividade */
@media (max-width: 640px) {
    .receipt-modal-overlay {
        padding: 10px;
    }

    .receipt-modal {
        max-width: 100%;
        max-height: 100vh;
        border-radius: 0;
    }
}
</style>

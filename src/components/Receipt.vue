<template>
    <div class="receipt-container">
        <!-- Recibo -->
        <div class="receipt" ref="receiptRef">
            <!-- Header da Empresa -->
            <div class="receipt-header">
                <div class="company-logo">
                    <img src="/src/assets/logo-branco.png" alt="NEXA Logo" class="logo-img">
                </div>
                <div class="company-info">
                    <h1 class="company-name">NEXA</h1>
                    <p class="company-details">{{ companyDetails }}</p>
                </div>
                <div class="receipt-title">RECIBO DE VENDA</div>
                <div class="receipt-number">Nº: {{ sale?.saleNumber || 'N/A' }}</div>
            </div>

            <!-- Informações da Venda -->
            <div class="sale-info">
                <div class="info-row">
                    <span class="label">Data:</span>
                    <span class="value">{{ sale?.createdAt ? formatDate(sale.createdAt) : 'N/A' }}</span>
                </div>
                <div class="info-row">
                    <span class="label">Hora:</span>
                    <span class="value">{{ sale?.createdAt ? formatTime(sale.createdAt) : 'N/A' }}</span>
                </div>
                <div class="info-row">
                    <span class="label">Cliente:</span>
                    <span class="value">{{ sale?.Client?.name || 'Cliente Avulso' }}</span>
                </div>
                <div class="info-row">
                    <span class="label">Vendedor:</span>
                    <span class="value">{{ sale?.User?.name || 'Sistema' }}</span>
                </div>
                <div class="info-row">
                    <span class="label">Método:</span>
                    <span class="value">{{ getPaymentMethodLabel(sale?.paymentMethod) }}</span>
                </div>
                <div v-if="sale?.paymentMethod === 'credit'" class="info-row">
                    <span class="label">Vencimento:</span>
                    <span class="value">{{ sale?.dueDate ? formatDate(sale.dueDate) : 'N/A' }}</span>
                </div>
            </div>

            <!-- Itens da Venda -->
            <div class="items-section">
                <div class="section-title">ITENS VENDIDOS</div>
                <div class="items-header">
                    <span class="col-desc">Descrição</span>
                    <span class="col-qty">Qtd</span>
                    <span class="col-price">Preço</span>
                    <span class="col-total">Total</span>
                </div>
                <div v-for="item in (sale?.SaleItems || [])" :key="item.id" class="item-row">
                    <span class="col-desc">{{ item.Product?.name || 'Produto' }}</span>
                    <span class="col-qty">{{ item.quantity || 0 }}</span>
                    <span class="col-price">{{ formatPrice(item.unitPrice || 0) }}</span>
                    <span class="col-total">{{ formatPrice((item.quantity || 0) * (item.unitPrice || 0)) }}</span>
                </div>
            </div>

            <!-- Totais -->
            <div class="totals-section">
                <div class="totals-row">
                    <span class="label">Subtotal:</span>
                    <span class="value">{{ formatPrice(subtotal) }}</span>
                </div>
                <div v-if="(sale?.discount || 0) > 0" class="totals-row">
                    <span class="label">Desconto:</span>
                    <span class="value">-{{ formatPrice(sale.discount || 0) }}</span>
                </div>
                <div v-if="(sale?.tax || 0) > 0" class="totals-row">
                    <span class="label">Impostos:</span>
                    <span class="value">{{ formatPrice(sale.tax || 0) }}</span>
                </div>
                <div class="totals-row total">
                    <span class="label">TOTAL:</span>
                    <span class="value">{{ formatPrice(sale?.totalAmount || 0) }}</span>
                </div>
            </div>

            <!-- Status do Pagamento -->
            <div class="payment-status">
                <div class="status-badge" :class="getStatusClass(sale?.paymentStatus)">
                    {{ getStatusLabel(sale?.paymentStatus) }}
                </div>
            </div>

            <!-- Observações -->
            <div v-if="sale?.notes" class="notes-section">
                <h4 class="notes-title">Observações:</h4>
                <p class="notes-text">{{ sale.notes }}</p>
            </div>

            <!-- Footer -->
            <div class="receipt-footer">
                <div class="footer-text">
                    <p>Obrigado pela sua preferência!</p>
                    <p>Este recibo é válido como comprovante de compra.</p>
                </div>
                <div class="footer-info">
                    <p>Gerado em: {{ formatDateTime(new Date()) }}</p>
                    <p>Sistema {{ companyName }} v1.0</p>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { formatPrice, formatDate, formatDateTime } from '@/utils/formatters'

// Props
const props = defineProps({
    sale: {
        type: Object,
        required: true
    },
    companyName: {
        type: String,
        default: 'LOJINHA PWA'
    },
    companyDetails: {
        type: String,
        default: 'Sistema de Gestão de Loja\nEmail: contato@lojinha.com\nTel: +258 84 000 0000'
    }
})

// Emits
const emit = defineEmits(['close'])

// Refs
const receiptRef = ref(null)

// Computed
const subtotal = computed(() => {
    if (!props.sale || !props.sale.SaleItems) return 0
    return props.sale.SaleItems.reduce((sum, item) => {
        return sum + (item.quantity * item.unitPrice)
    }, 0)
})

// Métodos
const getPaymentMethodLabel = (method) => {
    const methods = {
        'cash': 'Dinheiro',
        'card': 'Cartão',
        'credit': 'Fiado',
        'transfer': 'Transferência'
    }
    return methods[method] || method
}

const getStatusLabel = (status) => {
    const statuses = {
        'paid': 'PAGO',
        'pending': 'PENDENTE',
        'partial': 'PAGAMENTO PARCIAL',
        'overdue': 'VENCIDO'
    }
    return statuses[status] || status
}

const getStatusClass = (status) => {
    const classes = {
        'paid': 'status-paid',
        'pending': 'status-pending',
        'partial': 'status-partial',
        'overdue': 'status-overdue'
    }
    return classes[status] || 'status-pending'
}

const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('pt-PT', {
        hour: '2-digit',
        minute: '2-digit'
    })
}

const printReceipt = () => {
    if (receiptRef.value) {
        const printWindow = window.open('', '_blank')
        printWindow.document.write(`
            <html>
                <head>
                    <title>Recibo - ${props.sale.saleNumber}</title>
                    <style>
                        ${getPrintStyles()}
                    </style>
                </head>
                <body>
                    ${receiptRef.value.innerHTML}
                </body>
            </html>
        `)
        printWindow.document.close()
        printWindow.print()
    }
}

const downloadReceipt = () => {
    // Implementar download PDF
    console.log('Download PDF - Implementar com biblioteca PDF')
}

const closeReceipt = () => {
    emit('close')
}

const getPrintStyles = () => {
    return `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Courier New', monospace;
            font-size: 12px;
            line-height: 1.4;
            color: #000;
            background: #fff;
        }
        
        .receipt {
            width: 80mm;
            max-width: 80mm;
            margin: 0 auto;
            padding: 10mm;
            background: #fff;
            border: 1px solid #000;
        }
        
        .company-logo {
            text-align: center;
            margin-bottom: 8px;
        }
        
        .company-logo-img {
            width: 30px;
            height: 30px;
            margin: 0 auto 5px;
        }
        
        .company-name {
            font-size: 18px;
            font-weight: normal;
            text-align: center;
            margin-bottom: 5px;
            font-family: 'Arbutus', cursive;
            letter-spacing: 0.05em;
            color: #2563eb;
        }
        
        .company-details {
            font-size: 10px;
            text-align: center;
            margin-bottom: 15px;
            white-space: pre-line;
        }
        
        .receipt-title {
            font-size: 14px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 10px;
        }
        
        .receipt-number {
            text-align: center;
            margin-bottom: 15px;
        }
        
        .info-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 3px;
        }
        
        .items-header {
            display: flex;
            font-weight: bold;
            border-bottom: 1px solid #000;
            padding-bottom: 3px;
            margin-bottom: 5px;
        }
        
        .col-desc { width: 40%; }
        .col-qty { width: 15%; text-align: center; }
        .col-price { width: 20%; text-align: right; }
        .col-total { width: 25%; text-align: right; }
        
        .item-row {
            display: flex;
            margin-bottom: 3px;
        }
        
        .totals-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 2px;
        }
        
        .totals-row.total {
            font-weight: bold;
            border-top: 1px solid #000;
            padding-top: 5px;
            margin-top: 5px;
        }
        
        .status-badge {
            text-align: center;
            padding: 5px;
            margin: 10px 0;
            font-weight: bold;
        }
        
        .status-paid { background: #d4edda; color: #155724; }
        .status-pending { background: #fff3cd; color: #856404; }
        .status-partial { background: #cce5ff; color: #004085; }
        .status-overdue { background: #f8d7da; color: #721c24; }
        
        .footer-text {
            text-align: center;
            margin: 15px 0;
        }
        
        .footer-text p {
            font-size: 10px;
            margin-bottom: 3px;
        }
        
        .footer-info {
            text-align: center;
            font-size: 8px;
            color: #666;
        }
    `
}

// Lifecycle
onMounted(() => {
    // Configurar estilos de impressão
    const style = document.createElement('style')
    style.textContent = getPrintStyles()
    document.head.appendChild(style)
})
</script>

<style scoped>
.receipt-container {
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
}

.receipt {
    background: white;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    padding: 24px;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.5;
}

.receipt-header {
    text-align: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 2px solid #000;
}

.company-logo {
    margin-bottom: 10px;
}

.logo-img {
    width: 40px;
    height: 40px;
    object-fit: contain;
}

.company-name {
    font-size: 20px;
    font-weight: bold;
    color: #000;
    margin-bottom: 8px;
}

.company-details {
    font-size: 12px;
    color: #666;
    white-space: pre-line;
    margin-bottom: 15px;
}

.receipt-title {
    font-size: 16px;
    font-weight: bold;
    color: #000;
    margin-bottom: 8px;
    text-transform: uppercase;
}

.receipt-number {
    font-size: 14px;
    color: #000;
    font-weight: bold;
}

.receipt-title {
    font-size: 16px;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 8px;
}

.receipt-number {
    font-size: 14px;
    color: #374151;
}

.sale-info {
    margin-bottom: 20px;
}

.info-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
    padding: 2px 0;
}

.info-row .label {
    font-weight: bold;
    color: #000;
}

.info-row .value {
    color: #000;
}

.items-section {
    margin-bottom: 20px;
}

.section-title {
    font-size: 14px;
    font-weight: bold;
    color: #000;
    margin-bottom: 10px;
    text-align: center;
    text-transform: uppercase;
}

.items-header {
    display: flex;
    font-weight: bold;
    color: #000;
    border-bottom: 1px solid #000;
    padding-bottom: 4px;
    margin-bottom: 8px;
    font-size: 12px;
}

.col-desc {
    width: 40%;
}

.col-qty {
    width: 15%;
    text-align: center;
}

.col-price {
    width: 20%;
    text-align: right;
}

.col-total {
    width: 25%;
    text-align: right;
}

.item-row {
    display: flex;
    margin-bottom: 4px;
    padding: 2px 0;
    font-size: 12px;
    border-bottom: 1px dotted #ccc;
}

.item-row:last-child {
    border-bottom: none;
}

.item-row {
    display: flex;
    margin-bottom: 6px;
    padding: 4px 0;
    border-bottom: 1px solid #f3f4f6;
}

.item-name {
    font-weight: 500;
    color: #1f2937;
}

.item-code {
    font-size: 11px;
    color: #6b7280;
    margin-top: 2px;
}

.totals-section {
    margin-bottom: 20px;
    padding-top: 10px;
    border-top: 1px solid #000;
}

.totals-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
    padding: 2px 0;
    font-size: 14px;
}

.totals-row .label {
    font-weight: bold;
    color: #000;
}

.totals-row .value {
    color: #000;
}

.totals-row.total {
    font-weight: bold;
    font-size: 16px;
    color: #000;
    border-top: 2px solid #000;
    padding-top: 8px;
    margin-top: 8px;
}

.totals-row.discount {
    color: #dc2626;
}

.totals-row.tax {
    color: #059669;
}

.payment-status {
    text-align: center;
    margin-bottom: 20px;
}

.status-badge {
    display: inline-block;
    padding: 8px 16px;
    border-radius: 4px;
    font-weight: bold;
    font-size: 14px;
    text-transform: uppercase;
}

.status-paid {
    background: #d4edda;
    color: #155724;
    border: 2px solid #155724;
}

.status-pending {
    background: #fff3cd;
    color: #856404;
    border: 2px solid #856404;
}

.status-partial {
    background: #dbeafe;
    color: #1e40af;
}

.status-overdue {
    background: #fee2e2;
    color: #991b1b;
}

.notes-section {
    margin-bottom: 20px;
    padding: 12px;
    background: #f9fafb;
    border-radius: 6px;
}

.notes-title {
    font-size: 12px;
    font-weight: bold;
    color: #374151;
    margin-bottom: 6px;
}

.notes-text {
    font-size: 12px;
    color: #6b7280;
    line-height: 1.4;
}

.receipt-footer {
    text-align: center;
    padding-top: 15px;
    border-top: 1px solid #000;
}

.footer-text {
    margin-bottom: 10px;
}

.footer-text p {
    font-size: 12px;
    color: #000;
    margin-bottom: 4px;
}

.footer-info {
    font-size: 10px;
    color: #666;
}


/* Responsividade */
@media (max-width: 640px) {
    .receipt {
        max-width: 100%;
        margin: 0;
        border-radius: 0;
        max-height: 100vh;
    }

    .receipt-actions {
        flex-direction: column;
    }

    .btn {
        width: 100%;
        justify-content: center;
    }
}
</style>

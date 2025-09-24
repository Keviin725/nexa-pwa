<template>
    <Teleport to="body">
        <!-- Backdrop Ultra-Moderno -->
        <Transition enter-active-class="transition-all duration-500 ease-out"
            enter-from-class="opacity-0 backdrop-blur-none" enter-to-class="opacity-100 backdrop-blur-md"
            leave-active-class="transition-all duration-300 ease-in" leave-from-class="opacity-100 backdrop-blur-md"
            leave-to-class="opacity-0 backdrop-blur-none">
            <div v-if="visible"
                class="fixed inset-0 z-50 bg-gradient-to-br from-black/60 via-purple-900/20 to-indigo-900/30 backdrop-blur-md"
                @click="handleBackdropClick" />
        </Transition>

        <!-- Bottom Sheet Ultra-Moderno -->
        <Transition enter-active-class="transition-all duration-500 ease-out"
            enter-from-class="translate-y-full opacity-0 scale-95" enter-to-class="translate-y-0 opacity-100 scale-100"
            leave-active-class="transition-all duration-300 ease-in"
            leave-from-class="translate-y-0 opacity-100 scale-100" leave-to-class="translate-y-full opacity-0 scale-95">
            <div v-if="visible"
                class="fixed bottom-0 left-0 right-0 z-50 max-h-[90vh] bg-white/95 backdrop-blur-xl rounded-t-[32px] shadow-2xl border-t border-white/20"
                :style="{ maxHeight: height }">
                <!-- Handle Ultra-Moderno -->
                <div class="flex justify-center pt-4 pb-3">
                    <div
                        class="w-16 h-2 bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 rounded-full shadow-lg">
                    </div>
                </div>

                <!-- Header Ultra-Moderno -->
                <div v-if="title || $slots.header"
                    class="px-8 py-6 bg-gradient-to-r from-purple-50/80 via-indigo-50/80 to-blue-50/80 backdrop-blur-sm border-b border-white/30">
                    <div class="flex items-center justify-between">
                        <div class="flex-1">
                            <slot name="header">
                                <h3 v-if="title"
                                    class="text-xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                                    {{ title }}
                                </h3>
                            </slot>
                        </div>
                        <button v-if="showCloseButton" @click="close"
                            class="p-3 text-slate-500 hover:text-slate-700 hover:bg-white/50 rounded-xl transition-all duration-200 hover:scale-110 hover:shadow-lg">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Content Ultra-Moderno -->
                <div ref="contentRef"
                    class="flex-1 overflow-y-auto max-h-[calc(90vh-140px)] bg-gradient-to-b from-white/90 to-slate-50/90"
                    :class="contentClass">
                    <div class="p-8">
                        <slot></slot>
                    </div>
                </div>

                <!-- Footer Ultra-Moderno -->
                <div v-if="$slots.footer"
                    class="px-8 py-6 bg-gradient-to-r from-purple-50/80 via-indigo-50/80 to-blue-50/80 backdrop-blur-sm border-t border-white/30">
                    <slot name="footer"></slot>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'

// Props
const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: ''
    },
    height: {
        type: String,
        default: '90vh'
    },
    showCloseButton: {
        type: Boolean,
        default: true
    },
    closeOnBackdrop: {
        type: Boolean,
        default: true
    },
    contentClass: {
        type: String,
        default: ''
    }
})

// Emits
const emit = defineEmits(['update:visible', 'close', 'opened', 'closed'])

// Estado interno
const isVisible = ref(props.visible)
const contentRef = ref(null)

// Watchers
watch(() => props.visible, (newValue) => {
    isVisible.value = newValue
    if (newValue) {
        nextTick(() => {
            emit('opened')
        })
    } else {
        emit('closed')
    }
})

watch(isVisible, (newValue) => {
    emit('update:visible', newValue)
})

// Métodos
const close = () => {
    isVisible.value = false
    emit('close')
}

const handleBackdropClick = () => {
    if (props.closeOnBackdrop) {
        close()
    }
}

// Prevenir scroll do body quando o bottom sheet estiver aberto
watch(isVisible, (newValue) => {
    if (newValue) {
        document.body.style.overflow = 'hidden'
        nextTick(() => {
            checkScrollable()
        })
    } else {
        document.body.style.overflow = ''
    }
})

// Função para verificar se o conteúdo é scrollável
const checkScrollable = () => {
    if (contentRef.value) {
        const element = contentRef.value
        const isScrollable = element.scrollHeight > element.clientHeight

        if (isScrollable) {
            element.classList.add('scrollable')
        } else {
            element.classList.remove('scrollable')
        }
    }
}

// Observer para detectar mudanças no conteúdo
let resizeObserver = null

onMounted(() => {
    if (contentRef.value) {
        resizeObserver = new ResizeObserver(() => {
            checkScrollable()
        })
        resizeObserver.observe(contentRef.value)
    }
})

onUnmounted(() => {
    if (resizeObserver) {
        resizeObserver.disconnect()
    }
})
</script>

<style scoped>
/* Scrollbar Ultra-Moderna */
.overflow-y-auto::-webkit-scrollbar {
    width: 10px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    margin: 12px 0;
    backdrop-filter: blur(10px);
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #3b82f6 100%);
    border-radius: 8px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border: 3px solid transparent;
    background-clip: content-box;
    box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 50%, #1d4ed8 100%);
    box-shadow: 0 4px 16px rgba(139, 92, 246, 0.4);
    transform: scale(1.15);
}

.overflow-y-auto::-webkit-scrollbar-thumb:active {
    background: linear-gradient(135deg, #6d28d9 0%, #4c1d95 50%, #1e40af 100%);
    transform: scale(1.05);
}

/* Indicadores de scroll Ultra-Modernos */
.overflow-y-auto::before {
    content: '';
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    height: 24px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 50%, transparent 100%);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 10;
    backdrop-filter: blur(8px);
}

.overflow-y-auto::after {
    content: '';
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    height: 24px;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 50%, transparent 100%);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 10;
    backdrop-filter: blur(8px);
}

.overflow-y-auto.scrollable::before,
.overflow-y-auto.scrollable::after {
    opacity: 1;
}

/* Animações suaves */
.transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Efeito de glassmorphism no backdrop */
.backdrop-blur-sm {
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
}

/* Sombras modernas */
.shadow-2xl {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Melhorias no scroll */
.overflow-y-auto {
    scroll-behavior: smooth;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
}

/* Garantir que o conteúdo tenha altura mínima para scroll */
.overflow-y-auto>* {
    min-height: 100%;
}

/* Indicadores de scroll melhorados */
.overflow-y-auto.scrollable::before {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%);
    box-shadow: 0 4px 8px rgba(139, 92, 246, 0.1);
}

.overflow-y-auto.scrollable::after {
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%);
    box-shadow: 0 -4px 8px rgba(139, 92, 246, 0.1);
}

/* Efeitos de glassmorphism avançados */
.backdrop-blur-xl {
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
}

/* Sombras modernas com gradientes */
.shadow-2xl {
    box-shadow:
        0 25px 50px -12px rgba(0, 0, 0, 0.25),
        0 0 0 1px rgba(255, 255, 255, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

/* Animações de entrada mais suaves */
.transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Efeitos de hover para botões */
.hover\:scale-110:hover {
    transform: scale(1.1);
}

.hover\:shadow-lg:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>

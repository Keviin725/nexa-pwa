<template>
    <div class="bg-white rounded-xl shadow-sm border" :class="sectionClasses">
        <!-- Header da Seção -->
        <div v-if="title || $slots.header" class="-mx-4 -mt-4 px-4 pt-4 mb-4" :class="headerClasses">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <component :is="icon" v-if="icon" class="w-5 h-5" :class="iconClasses" />
                    <h4 v-if="title" class="text-sm font-semibold" :class="titleClasses">
                        {{ title }}
                    </h4>
                </div>
                <div v-if="$slots.actions" class="flex items-center gap-2">
                    <slot name="actions"></slot>
                </div>
            </div>
            <p v-if="description" class="text-xs text-slate-600 mt-1">{{ description }}</p>
        </div>

        <!-- Conteúdo da Seção -->
        <div class="space-y-4">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    icon: {
        type: [String, Object],
        default: null
    },
    variant: {
        type: String,
        default: 'default',
        validator: (value) => ['default', 'success', 'warning', 'error', 'info'].includes(value)
    },
    padding: {
        type: String,
        default: 'md',
        validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
    },
    rounded: {
        type: Boolean,
        default: true
    },
    shadow: {
        type: Boolean,
        default: true
    },
    border: {
        type: Boolean,
        default: true
    }
})

const sectionClasses = computed(() => {
    const paddingClasses = {
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
        xl: 'p-8'
    }

    const roundedClasses = props.rounded ? 'rounded-xl' : ''
    const shadowClasses = props.shadow ? 'shadow-sm' : ''
    const borderClasses = props.border ? 'border' : ''

    return [
        paddingClasses[props.padding],
        roundedClasses,
        shadowClasses,
        borderClasses
    ].join(' ')
})

const headerClasses = computed(() => {
    const variantClasses = {
        default: 'bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200',
        success: 'bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200',
        warning: 'bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-yellow-200',
        error: 'bg-gradient-to-r from-red-50 to-pink-50 border-b border-red-200',
        info: 'bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200'
    }

    return [
        'mb-4 pb-3',
        variantClasses[props.variant]
    ].join(' ')
})

const contentClasses = computed(() => {
    return 'space-y-4'
})

const iconClasses = computed(() => {
    const variantClasses = {
        default: 'text-slate-600',
        success: 'text-green-600',
        warning: 'text-yellow-600',
        error: 'text-red-600',
        info: 'text-blue-600'
    }

    return variantClasses[props.variant]
})

const titleClasses = computed(() => {
    const variantClasses = {
        default: 'text-slate-700',
        success: 'text-green-700',
        warning: 'text-yellow-700',
        error: 'text-red-700',
        info: 'text-blue-700'
    }

    return variantClasses[props.variant]
})
</script>

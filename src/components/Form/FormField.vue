<template>
    <div class="form-field">
        <label v-if="label" class="block text-sm font-medium text-slate-700 mb-2">
            {{ label }}
            <span v-if="required" class="text-red-500 ml-1">*</span>
        </label>

        <div class="relative">
            <!-- Input Text/Number/Email/Tel -->
            <input v-if="type === 'text' || type === 'number' || type === 'email' || type === 'tel'" :type="type"
                :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :placeholder="placeholder"
                :required="required" :disabled="disabled" :class="inputClasses" />

            <!-- Textarea -->
            <textarea v-else-if="type === 'textarea'" :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)" :placeholder="placeholder" :required="required"
                :disabled="disabled" :rows="rows" :class="inputClasses"></textarea>

            <!-- Select -->
            <select v-else-if="type === 'select'" :value="modelValue"
                @change="$emit('update:modelValue', $event.target.value)" :required="required" :disabled="disabled"
                :class="inputClasses">
                <option v-if="placeholder" value="">{{ placeholder }}</option>
                <option v-for="option in options" :key="option.value" :value="option.value">
                    {{ option.label }}
                </option>
            </select>

            <!-- Date -->
            <input v-else-if="type === 'date'" type="date" :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)" :required="required" :disabled="disabled"
                :class="inputClasses" />

            <!-- Icon -->
            <div v-if="icon" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <component :is="icon" class="h-5 w-5 text-slate-400" />
            </div>
        </div>

        <!-- Error Message -->
        <p v-if="error" class="mt-1 text-sm text-red-600 flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            {{ error }}
        </p>

        <!-- Help Text -->
        <p v-if="help && !error" class="mt-1 text-sm text-slate-500">{{ help }}</p>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: ''
    },
    type: {
        type: String,
        default: 'text',
        validator: (value) => ['text', 'number', 'email', 'tel', 'textarea', 'select', 'date'].includes(value)
    },
    label: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    },
    required: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    error: {
        type: String,
        default: ''
    },
    help: {
        type: String,
        default: ''
    },
    icon: {
        type: [String, Object],
        default: null
    },
    options: {
        type: Array,
        default: () => []
    },
    rows: {
        type: Number,
        default: 3
    },
    size: {
        type: String,
        default: 'md',
        validator: (value) => ['sm', 'md', 'lg'].includes(value)
    },
    variant: {
        type: String,
        default: 'default',
        validator: (value) => ['default', 'success', 'error', 'warning'].includes(value)
    }
})

const emit = defineEmits(['update:modelValue'])

const inputClasses = computed(() => {
    const baseClasses = 'w-full border rounded-lg transition-colors focus:ring-2 focus:outline-none'

    const sizeClasses = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3 text-sm',
        lg: 'px-4 py-4 text-base'
    }

    const variantClasses = {
        default: 'border-slate-300 focus:ring-blue-500 focus:border-blue-500',
        success: 'border-green-300 focus:ring-green-500 focus:border-green-500',
        error: 'border-red-300 focus:ring-red-500 focus:border-red-500',
        warning: 'border-yellow-300 focus:ring-yellow-500 focus:border-yellow-500'
    }

    const disabledClasses = props.disabled ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'bg-white text-slate-900'

    return [
        baseClasses,
        sizeClasses[props.size],
        variantClasses[props.variant],
        disabledClasses,
        props.icon ? 'pl-10' : ''
    ].join(' ')
})
</script>

<style scoped>
.form-field {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}
</style>

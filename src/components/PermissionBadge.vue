<template>
    <div class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium" :class="badgeClass">
        <div class="w-2 h-2 rounded-full" :class="dotClass"></div>
        {{ label }}
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    permission: {
        type: String,
        required: true
    },
    size: {
        type: String,
        default: 'sm' // sm, md, lg
    }
})

const permissionLabels = {
    'sales.create': 'Criar Vendas',
    'sales.edit': 'Editar Vendas',
    'sales.delete': 'Excluir Vendas',
    'sales.view': 'Ver Vendas',
    'products.create': 'Criar Produtos',
    'products.edit': 'Editar Produtos',
    'products.delete': 'Excluir Produtos',
    'products.view': 'Ver Produtos',
    'clients.create': 'Criar Clientes',
    'clients.edit': 'Editar Clientes',
    'clients.delete': 'Excluir Clientes',
    'clients.view': 'Ver Clientes',
    'reports.view': 'Ver Relatórios',
    'reports.export': 'Exportar Relatórios',
    'users.manage': 'Gerenciar Usuários',
    'users.view': 'Ver Usuários',
    'settings.manage': 'Gerenciar Configurações',
    'settings.view': 'Ver Configurações',
    'system.backup': 'Fazer Backup',
    'system.restore': 'Restaurar Backup'
}

const permissionColors = {
    'sales.create': 'bg-green-100 text-green-800',
    'sales.edit': 'bg-blue-100 text-blue-800',
    'sales.delete': 'bg-red-100 text-red-800',
    'sales.view': 'bg-slate-100 text-slate-800',
    'products.create': 'bg-green-100 text-green-800',
    'products.edit': 'bg-blue-100 text-blue-800',
    'products.delete': 'bg-red-100 text-red-800',
    'products.view': 'bg-slate-100 text-slate-800',
    'clients.create': 'bg-green-100 text-green-800',
    'clients.edit': 'bg-blue-100 text-blue-800',
    'clients.delete': 'bg-red-100 text-red-800',
    'clients.view': 'bg-slate-100 text-slate-800',
    'reports.view': 'bg-purple-100 text-purple-800',
    'reports.export': 'bg-purple-100 text-purple-800',
    'users.manage': 'bg-indigo-100 text-indigo-800',
    'users.view': 'bg-indigo-100 text-indigo-800',
    'settings.manage': 'bg-yellow-100 text-yellow-800',
    'settings.view': 'bg-yellow-100 text-yellow-800',
    'system.backup': 'bg-orange-100 text-orange-800',
    'system.restore': 'bg-orange-100 text-orange-800'
}

const dotColors = {
    'sales.create': 'bg-green-500',
    'sales.edit': 'bg-blue-500',
    'sales.delete': 'bg-red-500',
    'sales.view': 'bg-slate-500',
    'products.create': 'bg-green-500',
    'products.edit': 'bg-blue-500',
    'products.delete': 'bg-red-500',
    'products.view': 'bg-slate-500',
    'clients.create': 'bg-green-500',
    'clients.edit': 'bg-blue-500',
    'clients.delete': 'bg-red-500',
    'clients.view': 'bg-slate-500',
    'reports.view': 'bg-purple-500',
    'reports.export': 'bg-purple-500',
    'users.manage': 'bg-indigo-500',
    'users.view': 'bg-indigo-500',
    'settings.manage': 'bg-yellow-500',
    'settings.view': 'bg-yellow-500',
    'system.backup': 'bg-orange-500',
    'system.restore': 'bg-orange-500'
}

const label = computed(() => {
    return permissionLabels[props.permission] || props.permission
})

const badgeClass = computed(() => {
    const baseClass = permissionColors[props.permission] || 'bg-slate-100 text-slate-800'
    const sizeClass = {
        sm: 'text-xs px-2 py-1',
        md: 'text-sm px-3 py-1',
        lg: 'text-base px-4 py-2'
    }
    return `${baseClass} ${sizeClass[props.size]}`
})

const dotClass = computed(() => {
    return dotColors[props.permission] || 'bg-slate-500'
})
</script>

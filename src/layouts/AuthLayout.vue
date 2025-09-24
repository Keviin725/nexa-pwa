<template>
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <!-- Conteúdo da página de autenticação -->
        <main class="flex-1">
            <router-view />
        </main>
    </div>
</template>

<script>
export default {
    name: 'AuthLayout'
}
</script>

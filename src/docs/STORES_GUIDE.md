# Guia de Uso das Stores (Pinia)

Este guia explica como usar as stores do Pinia para gerenciar o estado da aplicação NEXA.

## 📦 **Stores Disponíveis**

### **1. AuthStore** (`@/stores/auth`)
Gerencia autenticação e dados do usuário.

```javascript
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// Login
await authStore.login({ email: 'user@example.com', password: 'password' })

// Logout
await authStore.logout()

// Verificar se está autenticado
if (authStore.isAuthenticated) {
  console.log('Usuário logado:', authStore.user)
}

// Verificar permissões
if (authStore.hasPermission('manage_products')) {
  // Usuário pode gerenciar produtos
}
```

### **2. ProductsStore** (`@/stores/products`)
Gerencia produtos e estoque.

```javascript
import { useProductsStore } from '@/stores/products'

const productsStore = useProductsStore()

// Carregar produtos
await productsStore.loadProducts()

// Criar produto
await productsStore.createProduct({
  name: 'Novo Produto',
  price: 25.50,
  stock: 100,
  category: 'Bebidas'
})

// Atualizar estoque
await productsStore.updateStock(productId, { quantity: 50, operation: 'add' })

// Aplicar filtros
productsStore.setFilters({ search: 'coca', category: 'Bebidas' })
```

### **3. ClientsStore** (`@/stores/clients`)
Gerencia clientes e dívidas.

```javascript
import { useClientsStore } from '@/stores/clients'

const clientsStore = useClientsStore()

// Carregar clientes
await clientsStore.loadClients()

// Criar cliente
await clientsStore.createClient({
  name: 'João Silva',
  phone: '+258 84 123 4567',
  email: 'joao@email.com'
})

// Carregar dívidas do cliente
await clientsStore.loadClientDebts(clientId)
```

### **4. SalesStore** (`@/stores/sales`)
Gerencia vendas e transações.

```javascript
import { useSalesStore } from '@/stores/sales'

const salesStore = useSalesStore()

// Carregar vendas
await salesStore.loadSales()

// Criar venda
await salesStore.createSale({
  clientId: 1,
  products: [
    { productId: 1, quantity: 2, price: 25.00 }
  ],
  paymentMethod: 'cash',
  total: 50.00
})

// Gerar recibo
await salesStore.generateReceipt(saleId)
```

### **5. UsersStore** (`@/stores/users`)
Gerencia usuários e colaboradores.

```javascript
import { useUsersStore } from '@/stores/users'

const usersStore = useUsersStore()

// Carregar usuários
await usersStore.loadUsers()

// Criar usuário
await usersStore.createUser({
  name: 'Novo Colaborador',
  email: 'colaborador@example.com',
  role: 'seller',
  permissions: ['view_products', 'create_sales']
})

// Ações em lote
await usersStore.bulkAction([1, 2, 3], 'activate')
```

### **6. DashboardStore** (`@/stores/dashboard`)
Gerencia métricas e análises.

```javascript
import { useDashboardStore } from '@/stores/dashboard'

const dashboardStore = useDashboardStore()

// Carregar dados do dashboard
await dashboardStore.loadDashboardData()

// Acessar métricas formatadas
console.log(dashboardStore.formattedMetrics.totalRevenue)
console.log(dashboardStore.formattedMetrics.totalSales)

// Carregar análises
await dashboardStore.loadAnalytics()
```

## 🔧 **Configuração da API**

### **Arquivo de Configuração** (`@/config/env.js`)
```javascript
export const config = {
  API_URL: 'http://localhost:3000',
  API_TIMEOUT: 10000,
  DEFAULT_PAGE_SIZE: 10,
}
```

### **Serviço de API** (`@/services/api.js`)
```javascript
import { apiService } from '@/services/api'

// Exemplos de uso
const products = await apiService.products.getAll()
const user = await apiService.users.getById(1)
const sale = await apiService.sales.create(saleData)
```

## 📱 **Exemplos de Uso em Componentes**

### **HomePage com Dashboard**
```vue
<template>
  <div>
    <!-- Loading State -->
    <div v-if="dashboardStore.loading" class="flex justify-center">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="dashboardStore.error" class="text-red-600">
      {{ dashboardStore.error }}
      <button @click="loadDashboard">Tentar Novamente</button>
    </div>

    <!-- Metrics -->
    <div v-else class="grid grid-cols-2 gap-4">
      <div class="bg-green-50 rounded-xl p-4">
        <p class="text-sm text-green-600">Receita Total</p>
        <p class="text-2xl font-bold text-green-800">
          {{ dashboardStore.formattedMetrics.totalRevenue }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'

const dashboardStore = useDashboardStore()

const loadDashboard = async () => {
  await dashboardStore.loadDashboardData()
}

onMounted(() => {
  loadDashboard()
})
</script>
```

### **Lista de Produtos**
```vue
<template>
  <div>
    <!-- Filtros -->
    <div class="mb-4">
      <input v-model="productsStore.filters.search" 
        @input="loadProducts"
        placeholder="Buscar produtos..."
        class="w-full px-3 py-2 border rounded-lg">
    </div>

    <!-- Lista -->
    <div v-if="productsStore.loading" class="flex justify-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>

    <div v-else class="space-y-3">
      <div v-for="product in productsStore.filteredProducts" :key="product.id"
        class="bg-white rounded-lg p-4 shadow">
        <h3 class="font-semibold">{{ product.name }}</h3>
        <p class="text-sm text-gray-600">{{ product.category }}</p>
        <p class="text-lg font-bold text-green-600">
          {{ formatPrice(product.price) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'

const productsStore = useProductsStore()

const loadProducts = async () => {
  await productsStore.loadProducts()
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'MZN'
  }).format(price)
}

onMounted(() => {
  loadProducts()
})
</script>
```

## 🚀 **Boas Práticas**

### **1. Gerenciamento de Estado**
```javascript
// ✅ Bom: Usar stores para estado global
const productsStore = useProductsStore()
await productsStore.loadProducts()

// ❌ Ruim: Estado local para dados que vêm da API
const products = ref([])
```

### **2. Tratamento de Erros**
```javascript
// ✅ Bom: Verificar resultado da operação
const result = await productsStore.createProduct(productData)
if (!result.success) {
  console.error('Erro:', result.error)
  // Mostrar mensagem de erro para o usuário
}
```

### **3. Loading States**
```javascript
// ✅ Bom: Usar loading state da store
<div v-if="store.loading">Carregando...</div>

// ❌ Ruim: Loading state local
const loading = ref(false)
```

### **4. Filtros e Paginação**
```javascript
// ✅ Bom: Usar filtros da store
productsStore.setFilters({ search: 'coca', category: 'Bebidas' })
await productsStore.loadProducts()

// ❌ Ruim: Filtros locais
const filteredProducts = computed(() => {
  return products.value.filter(p => p.name.includes(search.value))
})
```

## 🔄 **Fluxo de Dados**

1. **Componente** chama método da store
2. **Store** faz requisição via API service
3. **API Service** envia requisição HTTP
4. **Backend** processa e retorna dados
5. **Store** atualiza estado
6. **Componente** reage às mudanças

## 📝 **Notas Importantes**

- ✅ **Todas as stores** têm tratamento de erro
- ✅ **Loading states** para melhor UX
- ✅ **Filtros e paginação** integrados
- ✅ **Formatação de dados** automática
- ✅ **Cache** e otimizações
- ✅ **TypeScript ready** (futuro)

## 🎯 **Próximos Passos**

1. **Implementar** stores nos componentes existentes
2. **Testar** integração com backend
3. **Adicionar** validações e sanitização
4. **Implementar** cache e otimizações
5. **Adicionar** testes unitários

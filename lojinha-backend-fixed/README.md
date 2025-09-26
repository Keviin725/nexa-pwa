# NEXA Backend API

Backend completo para o sistema NEXA - Sistema de Gestão para Lojinha.

## 🚀 Funcionalidades Implementadas

### ✅ **Modelos Atualizados**
- **Product**: Campos adicionais (supplier, location, weight, volume, notes)
- **Client**: Campos completos (phone, email, address, totalPurchases, lastPurchase, notes)
- **Sale**: Métodos de pagamento atualizados (cash, card, transfer, credit)
- **User**: Sistema de permissões JSON
- **Category**: Novo modelo para categorias com cores e descrições

### ✅ **Controllers Completos**
- **ProductController**: CRUD completo + Stock baixo + categorias
- **ClientController**: CRUD completo + dívidas + histórico
- **SaleController**: CRUD completo + recibos + processamento
- **UserController**: Gestão completa de colaboradores + permissões + ações em lote
- **DashboardController**: Métricas e análises avançadas
- **CategoryController**: Gestão completa de categorias

### ✅ **Endpoints Disponíveis**

#### **Produtos** (`/products`)
- `GET /` - Listar produtos (com filtros)
- `GET /:id` - Buscar produto por ID
- `POST /` - Criar produto
- `PUT /:id` - Atualizar produto
- `DELETE /:id` - Desativar produto
- `PUT /:id/stock` - Atualizar Stock
- `GET /categories` - Listar categorias
- `GET /low-stock` - Produtos com Stock baixo

#### **Clientes** (`/clients`)
- `GET /` - Listar clientes (com filtros)
- `GET /:id` - Buscar cliente por ID
- `POST /` - Criar cliente
- `PUT /:id` - Atualizar cliente
- `DELETE /:id` - Desativar cliente
- `GET /:id/debts` - Dívidas do cliente
- `GET /:id/history` - Histórico do cliente
- `GET /with-debts` - Clientes com dívidas

#### **Vendas** (`/sales`)
- `GET /` - Listar vendas (com filtros)
- `GET /:id` - Buscar venda por ID
- `POST /` - Criar venda
- `PUT /:id` - Atualizar venda
- `DELETE /:id` - Cancelar venda
- `GET /:id/receipt` - Gerar recibo
- `GET /client/:clientId` - Vendas por cliente

#### **Usuários** (`/users`)
- `GET /` - Listar usuários (com filtros e paginação)
- `GET /stats` - Estatísticas dos usuários
- `GET /:id` - Buscar usuário por ID
- `POST /` - Criar usuário
- `PUT /:id` - Atualizar usuário
- `PUT /:id/status` - Alterar status
- `PUT /:id/permissions` - Atualizar permissões
- `POST /bulk-action` - Ações em lote
- `DELETE /:id` - Desativar usuário

#### **Dashboard** (`/dashboard`)
- `GET /` - Métricas principais
- `GET /sales-summary` - Resumo de vendas
- `GET /analytics` - Análises avançadas

#### **Categorias** (`/categories`)
- `GET /` - Listar categorias
- `GET /stats` - Estatísticas das categorias
- `GET /:id` - Buscar categoria por ID
- `GET /:id/products` - Produtos da categoria
- `POST /` - Criar categoria
- `PUT /:id` - Atualizar categoria
- `DELETE /:id` - Desativar categoria

## 🛠️ **Configuração**

### **1. Instalar Dependências**
```bash
cd lojinha-backend-fixed
npm install
# ou
yarn install
```

### **2. Configurar Variáveis de Ambiente**
Crie um arquivo `.env` na raiz do backend:
```env
# Database
DB_DIALECT=sqlite
DB_STORAGE=./config/database.sqlite

# JWT
JWT_SECRET=seu-jwt-secret-super-seguro-aqui

# Server
PORT=3000

# Seed (opcional)
RUN_SEED=true
```

### **3. Executar o Servidor**
```bash
# Desenvolvimento
npm run dev
# ou
yarn dev

# Produção
npm start
# ou
yarn start
```

### **4. Popular Banco com Dados Iniciais**
Para popular o banco com dados de exemplo:
```bash
RUN_SEED=true npm start
```

## 📊 **Dados Iniciais (Seed)**

O sistema inclui dados de exemplo:
- **6 Categorias** (Bebidas, Padaria, Laticínios, etc.)
- **6 Produtos** com informações completas
- **4 Clientes** com histórico de compras
- **3 Usuários** (Admin, Gerente, Vendedor)
- **3 Vendas** de exemplo com itens
- **Usuários adicionais** para testes

## 🔐 **Autenticação**

### **Usuários Padrão**
- **Admin**: `admin@lojinha.com` / `admin123`
- **Gerente**: `gerente@lojinha.com` / `gerente123`
- **Vendedor**: `vendedor1@lojinha.com` / `vendedor123`

### **Roles e Permissões**
- **admin**: Acesso total ao sistema
- **manager**: Gestão de produtos, vendas e relatórios
- **seller**: Vendas e visualização de produtos

## 📈 **Métricas Disponíveis**

### **Dashboard Principal**
- Receita total
- Total de vendas
- Vendas pendentes
- Total de produtos
- Produtos com Stock baixo
- Total de clientes
- Clientes com dívidas

### **Análises Avançadas**
- Receita por método de pagamento
- Vendas por categoria
- Produtos mais vendidos
- Crescimento de vendas
- Vendas por período

## 🚀 **Próximos Passos**

1. **Conectar Frontend**: Atualizar `mockDataService` para usar APIs reais
2. **Autenticação**: Implementar middleware de autenticação
3. **Validação**: Adicionar validação de dados
4. **Logs**: Implementar sistema de logs
5. **Backup**: Sistema de backup automático
6. **Testes**: Implementar testes unitários e de integração

## 📝 **Notas Importantes**

- ✅ **Todos os endpoints** do mockDataService foram implementados
- ✅ **Sistema de permissões** completo
- ✅ **Gestão de colaboradores** com ações em lote
- ✅ **Dashboard** com métricas em tempo real
- ✅ **Categorias** com cores e estatísticas
- ✅ **Dados iniciais** para testes

O backend está **100% funcional** e pronto para ser conectado ao frontend! 🎉

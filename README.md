# 🚀 NEXA - Sistema de Gestão Moderno

Um sistema de gestão completo e moderno desenvolvido com Vue.js 3, Tailwind CSS e PWA.

## ✨ Funcionalidades

### 🏠 **Dashboard Inteligente**
- Métricas em tempo real
- KPIs principais
- Alertas urgentes
- Notificações prioritárias
- Gráficos interativos

### 📦 **Gestão de Produtos**
- Cadastro completo de produtos
- Controle de estoque
- Alertas de estoque baixo
- Categorização
- Busca e filtros avançados

### 💰 **Sistema de Vendas**
- Registro de vendas
- Cálculo automático de totais
- Pagamentos à vista e fiado
- Histórico completo
- Relatórios de vendas

### 👥 **Gestão de Clientes**
- Cadastro de clientes
- Controle de dívidas
- Histórico de compras
- Sistema de crédito
- Relatórios de inadimplência

### 📊 **Relatórios e Analytics**
- Vendas por período
- Produtos mais vendidos
- Análise de clientes
- Métricas de performance
- Exportação de dados

### 🔔 **Sistema de Notificações**
- NotificationCenter ultra-moderno
- Alertas em tempo real
- Categorização por tipo
- Ações contextuais
- Persistência local

## 🛠️ **Tecnologias**

- **Frontend**: Vue.js 3 (Composition API)
- **Styling**: Tailwind CSS
- **PWA**: Service Worker + Manifest
- **Icons**: Heroicons
- **Charts**: SVG Charts customizados
- **Build**: Vite
- **Package Manager**: Yarn

## 🎨 **Design System**

### **Paleta de Cores**
- **Primary**: Azul/Índigo (#3b82f6, #6366f1)
- **Success**: Verde/Esmeralda (#10b981, #059669)
- **Warning**: Amarelo/Âmbar (#f59e0b, #d97706)
- **Error**: Vermelho/Rosa (#ef4444, #dc2626)
- **Info**: Ciano/Azul (#06b6d4, #0891b2)

### **Componentes**
- **CustomBottomSheet**: Modal responsivo
- **ModernKPICard**: Cards de métricas
- **Charts**: Gráficos SVG responsivos
- **NotificationCenter**: Sistema de notificações

## 📱 **PWA Features**

- **Offline-first**: Funciona sem internet
- **Installable**: Pode ser instalado como app
- **Responsive**: Design mobile-first
- **Fast**: Carregamento otimizado
- **Secure**: HTTPS ready

## 🚀 **Instalação e Uso**

### **Pré-requisitos**
- Node.js 16+
- Yarn ou npm

### **Instalação**
```bash
# Clone o repositório
git clone https://github.com/Keviin725/nexa-pwa.git
cd nexa-pwa

# Instale as dependências
yarn install

# Inicie o servidor de desenvolvimento
yarn dev
```

### **Build para Produção**
```bash
# Build otimizado
yarn build

# Preview da build
yarn preview
```

## 📁 **Estrutura do Projeto**

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Charts/         # Gráficos SVG
│   ├── Metrics/        # Cards de métricas
│   ├── CustomBottomSheet.vue
│   └── NotificationCenter.vue
├── layouts/            # Layouts da aplicação
│   ├── MainLayout.vue
│   └── AuthLayout.vue
├── pages/              # Páginas principais
│   ├── HomePage.vue
│   ├── Products.vue
│   ├── Sales.vue
│   ├── Clients.vue
│   ├── Reports.vue
│   └── Settings.vue
├── router/             # Configuração de rotas
├── services/           # Serviços e APIs
├── utils/              # Utilitários
├── hooks/              # Composables Vue
└── styles/             # Estilos globais
```

## 🔧 **Configuração**

### **Variáveis de Ambiente**
```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=NEXA
```

### **Tailwind CSS**
Configuração customizada com:
- Cores personalizadas
- Gradientes
- Sombras
- Animações

## 📊 **Mock Data**

O sistema inclui um serviço de dados mock para demonstração:
- **Produtos**: 50+ produtos de exemplo
- **Clientes**: 30+ clientes
- **Vendas**: 100+ transações
- **Categorias**: 10+ categorias

## 🎯 **Roadmap**

### **Próximas Funcionalidades**
- [ ] Backend completo com Node.js
- [ ] Sistema de autenticação JWT
- [ ] Integração com Stripe/PayPal
- [ ] Multi-tenancy
- [ ] API RESTful
- [ ] Deploy em cloud
- [ ] Monitorização
- [ ] Integrações externas

## 📄 **Licença**

Este projeto é propriedade privada. Todos os direitos reservados.

## 👨‍💻 **Desenvolvido por**

Sistema desenvolvido com ❤️ para gestão moderna e eficiente.

---

**NEXA** - Transformando a gestão empresarial com tecnologia moderna! 🚀
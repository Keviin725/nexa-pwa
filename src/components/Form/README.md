# Sistema de Formulários Padronizados

Este sistema fornece componentes reutilizáveis e padronizados para todos os formulários da aplicação.

## Componentes Disponíveis

### 1. FormField
Campo de formulário padronizado com validação integrada.

```vue
<FormField
  v-model="form.name"
  type="text"
  label="Nome do Produto"
  placeholder="Digite o nome"
  required
  :error="validation.getError('name')"
  @blur="validation.touchField('name')"
/>
```

**Props:**
- `modelValue`: Valor do campo
- `type`: Tipo do campo (`text`, `number`, `email`, `tel`, `textarea`, `select`, `date`)
- `label`: Rótulo do campo
- `placeholder`: Texto de placeholder
- `required`: Campo obrigatório
- `disabled`: Campo desabilitado
- `error`: Mensagem de erro
- `help`: Texto de ajuda
- `icon`: Ícone do campo
- `options`: Opções para select
- `rows`: Número de linhas para textarea
- `size`: Tamanho (`sm`, `md`, `lg`)
- `variant`: Variante visual (`default`, `success`, `error`, `warning`)

### 2. FormSection
Seção de formulário com header e conteúdo organizados.

```vue
<FormSection
  title="Informações Básicas"
  description="Dados principais do produto"
  icon="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
  variant="success"
>
  <!-- Conteúdo da seção -->
</FormSection>
```

**Props:**
- `title`: Título da seção
- `description`: Descrição da seção
- `icon`: Ícone da seção
- `variant`: Variante visual (`default`, `success`, `warning`, `error`, `info`)
- `padding`: Padding interno (`sm`, `md`, `lg`, `xl`)
- `rounded`: Bordas arredondadas
- `shadow`: Sombra
- `border`: Borda

### 3. FormButtons
Botões de ação padronizados para formulários.

```vue
<FormButtons
  :loading="saving"
  :disabled="!isValid"
  submit-text="Salvar Produto"
  cancel-text="Cancelar"
  variant="success"
  size="lg"
  @cancel="closeModal"
  @submit="saveProduct"
/>
```

**Props:**
- `loading`: Estado de carregamento
- `disabled`: Botão desabilitado
- `submit-text`: Texto do botão principal
- `cancel-text`: Texto do botão cancelar
- `secondary-text`: Texto do botão secundário
- `variant`: Variante visual (`default`, `success`, `warning`, `danger`)
- `size`: Tamanho (`sm`, `md`, `lg`)
- `layout`: Layout (`horizontal`, `vertical`, `centered`)

## Composable de Validação

### useFormStandard
Composable para validação padronizada de formulários.

```javascript
import { useFormStandard } from '@/composables/useFormStandard'

const formValidation = useFormStandard()

// Validar campo individual
formValidation.validateField('name', form.name, { required: true, minLength: 2 })

// Validar formulário completo
const schema = {
  name: { required: true, minLength: 2 },
  price: { required: true, positive: true },
  email: { email: true }
}

formValidation.validateForm(form, schema)

// Verificar erros
formValidation.hasError('name')
formValidation.getError('name')
formValidation.shouldShowError('name')
```

## Exemplos de Uso

### Formulário de Produto
```vue
<template>
  <form @submit.prevent="saveProduct">
    <FormSection title="Informações do Produto" variant="success">
      <FormField
        v-model="form.name"
        type="text"
        label="Nome do Produto"
        required
        :error="validation.getError('name')"
        @blur="validation.touchField('name')"
      />
      
      <div class="grid grid-cols-2 gap-4">
        <FormField
          v-model="form.price"
          type="number"
          label="Preço de Venda"
          step="0.01"
          required
          :error="validation.getError('price')"
        />
        <FormField
          v-model="form.costPrice"
          type="number"
          label="Preço de Custo"
          step="0.01"
        />
      </div>
    </FormSection>
    
    <FormButtons
      :loading="saving"
      submit-text="Salvar Produto"
      variant="success"
      @cancel="closeModal"
      @submit="saveProduct"
    />
  </form>
</template>
```

### Formulário de Cliente
```vue
<template>
  <form @submit.prevent="saveClient">
    <FormSection title="Dados do Cliente" variant="info">
      <FormField
        v-model="form.name"
        type="text"
        label="Nome do Cliente"
        required
        :error="validation.getError('name')"
      />
      
      <FormField
        v-model="form.contact"
        type="tel"
        label="Contato"
        placeholder="Telefone ou email"
        :error="validation.getError('contact')"
      />
      
      <FormField
        v-model="form.creditLimit"
        type="number"
        label="Limite de Crédito (MZN)"
        step="0.01"
        :error="validation.getError('creditLimit')"
      />
    </FormSection>
    
    <FormButtons
      :loading="saving"
      submit-text="Salvar Cliente"
      variant="info"
      @cancel="closeModal"
      @submit="saveClient"
    />
  </form>
</template>
```

## Regras de Validação Disponíveis

- `required`: Campo obrigatório
- `email`: Email válido
- `phone`: Telefone válido
- `minLength(min)`: Tamanho mínimo
- `maxLength(max)`: Tamanho máximo
- `min(min)`: Valor mínimo
- `max(max)`: Valor máximo
- `positive`: Valor positivo
- `integer`: Número inteiro

## Esquemas Pré-definidos

```javascript
// Esquemas disponíveis
const schemas = {
  client: {
    name: { required: true, minLength: 2 },
    contact: { phone: true },
    creditLimit: { positive: true }
  },
  
  product: {
    name: { required: true, minLength: 2 },
    price: { required: true, positive: true },
    costPrice: { positive: true },
    stock: { integer: true, min: 0 }
  },
  
  user: {
    name: { required: true, minLength: 2 },
    email: { required: true, email: true },
    phone: { phone: true },
    password: { required: true, minLength: 6 }
  }
}

// Usar esquema pré-definido
formValidation.validateForm(form, formValidation.schemas.product)
```

## Benefícios

1. **Consistência Visual**: Todos os formulários têm a mesma aparência
2. **Validação Padronizada**: Sistema unificado de validação
3. **Reutilização**: Componentes podem ser usados em qualquer lugar
4. **Manutenibilidade**: Mudanças centralizadas afetam todos os formulários
5. **Acessibilidade**: Componentes seguem padrões de acessibilidade
6. **Responsividade**: Funcionam bem em todos os dispositivos

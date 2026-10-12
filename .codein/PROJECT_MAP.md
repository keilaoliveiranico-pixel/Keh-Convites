# 🗺️ Mapa de Arquitetura e Estrutura — Quero Criar Um

> **Sincronizado automaticamente pelo Code In Engine** em `2026-10-12 19:42:07`
> Este documento é a referência viva e em tempo real da arquitetura, componentes e entidades de negócio do projeto.

---

## 1. Visão Geral do Domínio e Identidade
- **Nome do Projeto**: `Quero Criar Um`
- **Descrição**: Aplicação SPA modular desenvolvida sob medida com Vite, React, TypeScript e Tailwind CSS.
- **Stack Tecnológica**: React 18 + TypeScript + Vite + Tailwind CSS
- **Design Tokens**: Configurados em `src/index.css` e `tailwind.config.js`
- **Utilitários**: `src/lib/utils.ts` (função `cn`)

---

## 2. Fontes de Dados e Entidades de Domínio
- **`src/data/initialData.ts`**: Módulo de dados e mock do domínio

---

## 3. Árvore de Renderização (Hierarquia de Componentes)
- `src/main.tsx` — Host de montagem React DOM da SPA (#root)
  └── `src/App.tsx` — Componente raiz da aplicação (orquestra layout, estado global e todas as seções)
        ├── `src/components/AdminLoginModal.tsx` — Modal/Dialog interativo (AdminLoginModal)
        ├── `src/components/EarningsDashboard.tsx` — Componente React modular (EarningsDashboard)
        │     └── `src/components/index.ts` — Componente React modular (index)
        ├── `src/components/Navbar.tsx` — Cabeçalho e barra de navegação global com links e ações
        ├── `src/components/NewOrderModal.tsx` — Modal/Dialog interativo (NewOrderModal)
        │     └── `src/components/index.ts` — Componente React modular (index)
        ├── `src/components/NewTemplateModal.tsx` — Modal/Dialog interativo (NewTemplateModal)
        │     └── `src/components/index.ts` — Componente React modular (index)
        ├── `src/components/OrdersManager.tsx` — Componente React modular (OrdersManager)
        │     └── `src/components/index.ts` — Componente React modular (index)
        ├── `src/components/TemplatesCatalog.tsx` — Grid/Catálogo interativo de produtos com filtros e cards
        │     └── `src/components/ClientOrderModal.tsx` — Modal/Dialog interativo (ClientOrderModal)
        │     └── `src/components/index.ts` — Componente React modular (index)
        ├── `src/components/initialData.ts` — Componente React modular (initialData)
        │     └── `src/components/index.ts` — Componente React modular (index)
        ├── `src/components/index.ts` — Componente React modular (index)

---

## 4. Catálogo de Componentes e Responsabilidades

### 📦 Componentes da Aplicação (Seções e Features):
- **`src/components/AdminLoginModal.tsx`** (AdminLoginModal): Modal/Dialog interativo (AdminLoginModal)
  - *Importado por*: `src/App.tsx`
  - *Sub-componentes*: `src/components/ui/card.tsx`, `src/components/ui/button.tsx`, `src/components/ui/input.tsx`

- **`src/components/ClientOrderModal.tsx`** (ClientOrderModal): Modal/Dialog interativo (ClientOrderModal)
  - *Importado por*: `src/components/TemplatesCatalog.tsx`
  - *Sub-componentes*: `src/types/index.ts`, `src/components/ui/card.tsx`, `src/components/ui/button.tsx`, `src/components/ui/input.tsx`

- **`src/components/EarningsDashboard.tsx`** (EarningsDashboard): Componente React modular (EarningsDashboard)
  - *Importado por*: `src/App.tsx`
  - *Sub-componentes*: `src/types/index.ts`, `src/components/ui/card.tsx`, `src/components/ui/button.tsx`

- **`src/components/Navbar.tsx`** (Navbar): Cabeçalho e barra de navegação global com links e ações
  - *Importado por*: `src/App.tsx`
  - *Sub-componentes*: `src/components/ui/button.tsx`

- **`src/components/NewOrderModal.tsx`** (NewOrderModal): Modal/Dialog interativo (NewOrderModal)
  - *Importado por*: `src/App.tsx`
  - *Sub-componentes*: `src/types/index.ts`, `src/components/ui/card.tsx`, `src/components/ui/button.tsx`, `src/components/ui/input.tsx`

- **`src/components/NewTemplateModal.tsx`** (NewTemplateModal): Modal/Dialog interativo (NewTemplateModal)
  - *Importado por*: `src/App.tsx`
  - *Sub-componentes*: `src/types/index.ts`, `src/components/ui/card.tsx`, `src/components/ui/button.tsx`, `src/components/ui/input.tsx`

- **`src/components/OrdersManager.tsx`** (OrdersManager): Componente React modular (OrdersManager)
  - *Importado por*: `src/App.tsx`
  - *Sub-componentes*: `src/types/index.ts`, `src/components/ui/card.tsx`, `src/components/ui/button.tsx`, `src/components/ui/badge.tsx`

- **`src/components/TemplatesCatalog.tsx`** (TemplatesCatalog): Grid/Catálogo interativo de produtos com filtros e cards
  - *Importado por*: `src/App.tsx`
  - *Sub-componentes*: `src/types/index.ts`, `src/components/ui/card.tsx`, `src/components/ui/button.tsx`, `src/components/ClientOrderModal.tsx`

### 🎨 Componentes Base de UI (`src/components/ui/`):
- `src/components/ui/badge.tsx`: Componente base de UI reutilizável (badge)
- `src/components/ui/button.tsx`: Componente base de UI reutilizável (button)
- `src/components/ui/card.tsx`: Componente base de UI reutilizável (card)
- `src/components/ui/input.tsx`: Componente base de UI reutilizável (input)

---

## 5. Módulos Utilitários, Funções e Exports Reais
- `src/data/initialData.ts`: Exporta [`initialTemplates`, `initialOrders`]
- `src/lib/utils.ts`: Exporta [`cn`]
- `src/types/index.ts`: Exporta [`OrderStatus`, `PaymentStatus`, `InvitationCategory`, `DigitalFormat`, `InvitationTemplate`, `DigitalPhotoshootExample`, `Order`]

---

## 6. 🚨 Regras Críticas de Desenvolvimento e Modificação (Agent Directives)

1. **INTEGRAÇÃO OBRIGATÓRIA (ZERO COMPONENTES ÓRFÃOS)**:
   - Ao criar qualquer novo componente, animação ou elemento (ex: `DogAnimation.tsx`, `PricingTable.tsx`, `AuthModal.tsx`), **é OBRIGATÓRIO modificar o componente pai correspondente** (ex: `Hero.tsx` ou `App.tsx`) para incluir o `import` e renderizá-lo na árvore JSX.
   - NUNCA devolva apenas o arquivo do componente filho isolado sem atualizar o pai onde ele deve ser exibido.

2. **PREVENÇÃO DE ERROS DE RUNTIME E IMPORTS INEXISTENTES (SyntaxError / Module Not Found)**:
   - NUNCA tente importar funções, variáveis ou mocks de arquivos como `src/utils.ts`, `src/lib/utils.ts` ou `src/data/*` que NÃO estejam explicitamente exportados nesses módulos.
   - Se você precisar de uma constante, lista mockada ou função utilitária que não exista (ex: `pessoasLivres`), **declare-a explicitamente no arquivo do componente** ou crie a exportação com os dados no arquivo correspondente.
   - Use SEMPRE optional chaining (`?.`) e valores padrão (`|| []`, `?? ''`) ao renderizar listas e propriedades aninhadas.

3. **PROTEÇÃO DO CONTAINER SPA**:
   - O arquivo `index.html` é estritamente o host de montagem com `<div id="root"></div>` e `<script type="module" src="/src/main.tsx"></script>`.
   - NUNCA substitua `index.html` por páginas HTML estáticas.

4. **MODULARIDADE E ALTO PADRÃO VISUAL**:
   - Cada seção deve ser um componente independente sob `src/components/` e montado em `src/App.tsx`.
   - Use dados realistas (mockups completos sob `src/data/`), efeitos hover/active, estados de transição e paleta harmônica com tokens Tailwind.

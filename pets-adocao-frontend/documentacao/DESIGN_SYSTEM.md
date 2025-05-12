# Sistema de Design - Pets Adoção

Este documento detalha os elementos de design utilizados na aplicação Pets Adoção, servindo como referência para manter a consistência visual em todo o projeto.

## 1. Princípios de Design

### 1.1 Valores
- **Simplicidade**: Interface limpa e intuitiva
- **Acessibilidade**: Design inclusivo para todos os usuários
- **Consistência**: Padrões visuais uniformes
- **Responsividade**: Adaptação perfeita a todos os dispositivos
- **Performance**: Experiência fluida e rápida

### 1.2 Objetivos
- Facilitar a adoção de pets
- Criar uma experiência agradável e confiável
- Manter a consistência visual em toda a aplicação
- Garantir acessibilidade para todos os usuários
- Otimizar a performance em todos os dispositivos

## 2. Sistema de Cores

### 2.1 Paleta Principal
```css
:root {
  /* Cores Principais */
  --color-primary: #dca879;      /* Marrom dourado - Cor principal */
  --color-primary-dark: #bb8e68; /* Versão escura - Hover e estados ativos */
  --color-primary-light: #f0d5bb;/* Versão clara - Elementos secundários */

  /* Cores de Texto */
  --color-text: #333;            /* Texto principal */
  --color-text-secondary: #666;  /* Texto secundário */
  --color-text-light: #fff;      /* Texto sobre fundo escuro */

  /* Cores de Fundo */
  --color-background: #fff;      /* Fundo principal */
  --color-background-secondary: #f8f8f8; /* Fundo secundário */
  --color-card: #fff;            /* Fundo dos cards */
  --color-card-hover: #f8f8f8;   /* Hover dos cards */

  /* Cores de Borda */
  --color-border: #eee;          /* Bordas padrão */
  --color-border-dark: #ddd;     /* Bordas mais escuras */

  /* Cores de Estado */
  --color-success: #4CAF50;      /* Sucesso */
  --color-error: #f44336;        /* Erro */
  --color-warning: #ff9800;      /* Alerta */
  --color-info: #2196F3;         /* Informação */
}
```

### 2.2 Dark Mode
```css
.darkMode {
  /* Cores de Texto */
  --color-text: #fff;            /* Texto principal invertido */
  --color-text-secondary: #bbb;  /* Texto secundário invertido */
  --color-text-light: #333;      /* Texto sobre fundo claro */

  /* Cores de Fundo */
  --color-background: #1a1a1a;   /* Fundo principal escuro */
  --color-background-secondary: #2d2d2d; /* Fundo secundário escuro */
  --color-card: #2d2d2d;         /* Fundo dos cards escuro */
  --color-card-hover: #363636;   /* Hover dos cards escuro */

  /* Cores de Borda */
  --color-border: #404040;       /* Bordas escuras */
  --color-border-dark: #505050;  /* Bordas mais claras */
}
```

## 3. Tipografia

### 3.1 Família de Fontes
```css
font-family: Arial, sans-serif;
```

### 3.2 Escala Tipográfica
```css
/* Títulos */
--font-size-h1: 2.5rem;    /* 40px */
--font-size-h2: 2rem;      /* 32px */
--font-size-h3: 1.75rem;   /* 28px */
--font-size-h4: 1.5rem;    /* 24px */
--font-size-h5: 1.25rem;   /* 20px */
--font-size-h6: 1.125rem;  /* 18px */

/* Texto */
--font-size-body: 1rem;    /* 16px */
--font-size-small: 0.875rem; /* 14px */
--font-size-xs: 0.75rem;   /* 12px */
```

### 3.3 Pesos de Fonte
```css
--font-weight-light: 300;
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

## 4. Espaçamento

### 4.1 Sistema de Grid
```css
--grid-columns: 12;
--grid-gap: 1.5rem;
--container-max-width: 1200px;
--container-padding: 2rem;
```

### 4.2 Escala de Espaçamento
```css
--spacing-xs: 0.25rem;   /* 4px */
--spacing-sm: 0.5rem;    /* 8px */
--spacing-md: 1rem;      /* 16px */
--spacing-lg: 1.5rem;    /* 24px */
--spacing-xl: 2rem;      /* 32px */
--spacing-xxl: 3rem;     /* 48px */
```

## 5. Componentes

### 5.1 Cards
```css
.card {
  background-color: var(--color-card);
  border-radius: 15px;
  padding: var(--spacing-lg);
  box-shadow: 0 4px 8px var(--shadow-color);
  transition: var(--transition-default);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px var(--shadow-color-hover);
}
```

### 5.2 Botões
```css
.button {
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: 30px;
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-body);
  transition: var(--transition-default);
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}
```

### 5.3 Formulários
```css
.input {
  padding: var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: var(--font-size-body);
  transition: var(--transition-default);
}

.input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary-light);
}
```

## 6. Responsividade

### 6.1 Breakpoints
```css
/* Mobile First */
--breakpoint-sm: 480px;   /* Smartphones */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Laptops */
--breakpoint-xl: 1200px;  /* Desktops */
```

### 6.2 Adaptações Mobile
```css
@media (max-width: 768px) {
  /* Ajustes de Layout */
  .container {
    padding: var(--spacing-md);
  }

  /* Ajustes de Tipografia */
  h1 { font-size: var(--font-size-h2); }
  h2 { font-size: var(--font-size-h3); }
  
  /* Ajustes de Espaçamento */
  .section {
    padding: var(--spacing-lg) var(--spacing-md);
  }
}
```

## 7. Animações e Transições

### 7.1 Durações
```css
--transition-fast: 150ms;
--transition-normal: 300ms;
--transition-slow: 500ms;
```

### 7.2 Curvas de Timing
```css
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
```

### 7.3 Animações Comuns
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
```

## 8. Acessibilidade

### 8.1 Contraste
- Texto principal: mínimo 4.5:1
- Texto grande: mínimo 3:1
- Elementos interativos: mínimo 3:1

### 8.2 Foco
```css
:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

### 8.3 ARIA Labels
- Uso consistente de aria-labels
- Roles semânticos apropriados
- Estados ARIA para componentes interativos

## 9. Performance

### 9.1 Otimizações
- Lazy loading de imagens
- Minificação de assets
- Código modular
- CSS crítico inline

### 9.2 Métricas
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s
- Cumulative Layout Shift < 0.1

## 10. Implementação

### 10.1 Estrutura de Arquivos
```
src/
  ├── styles/
  │   ├── variables.css    /* Variáveis CSS */
  │   ├── reset.css        /* Reset CSS */
  │   └── global.css       /* Estilos globais */
  ├── components/
  │   └── [ComponentName]/
  │       ├── index.js
  │       └── styles.module.css
  └── pages/
      └── [PageName]/
          ├── index.js
          └── styles.module.css
```

### 10.2 Uso de CSS Modules
- Estilos encapsulados por componente
- Nomes de classes únicos
- Evita conflitos de CSS

## 11. Manutenção

### 11.1 Boas Práticas
1. Usar variáveis CSS para valores reutilizáveis
2. Manter consistência na nomenclatura
3. Documentar componentes complexos
4. Seguir o princípio DRY
5. Manter o código organizado e comentado

### 11.2 Checklist de Implementação
- [ ] Seguir a paleta de cores definida
- [ ] Implementar dark mode
- [ ] Garantir responsividade
- [ ] Adicionar animações suaves
- [ ] Testar acessibilidade
- [ ] Otimizar performance
- [ ] Documentar o componente
- [ ] Testar em diferentes dispositivos 
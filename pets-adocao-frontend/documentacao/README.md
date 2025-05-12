# Documentação do Sistema de Adoção de Pets

Esta documentação descreve as principais funcionalidades do sistema de adoção de pets, focando nos processos de registro de usuários e pets.

## Índice

1. [Registro de Usuários](./REGISTRO_USUARIOS.md)
   - Tipos de usuários
   - Processo de registro
   - Validações
   - Fluxo completo

2. [Registro de Pets](./REGISTRO_PETS.md)
   - Quem pode registrar
   - Dados necessários
   - Processo de registro
   - Validações
   - Gerenciamento pós-registro

## Visão Geral

O sistema é uma plataforma completa para adoção de pets, que conecta:
- ONGs e tutores temporários que cuidam de pets
- Pessoas interessadas em adotar
- Pets disponíveis para adoção

## Principais Funcionalidades

1. **Gestão de Usuários**
   - Registro de diferentes tipos de usuários
   - Perfis personalizados
   - Sistema de autenticação seguro

2. **Gestão de Pets**
   - Cadastro detalhado de pets
   - Upload de fotos
   - Histórico de cuidados

3. **Processo de Adoção**
   - Match entre pets e adotantes
   - Acompanhamento do processo
   - Histórico de adoções

## Tecnologias Utilizadas

- Frontend: React.js
- Estilização: CSS Modules
- Gerenciamento de Estado: Context API
- Rotas: React Router
- Ícones: React Icons

## Estrutura do Projeto

```
pets-adocao-frontend/
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── pages/         # Páginas da aplicação
│   ├── contexts/      # Contextos do React
│   ├── services/      # Serviços e APIs
│   └── styles/        # Estilos globais
└── documentacao/      # Documentação do sistema
```

## Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Faça commit das mudanças
4. Faça push para a branch
5. Abra um Pull Request

## Suporte

Para suporte ou dúvidas, entre em contato através dos canais:
- Email: suporte@petsadocao.com
- Issues do GitHub
- Documentação oficial 

# Padrões de Design - Pets Adoção

Este documento estabelece os padrões de design utilizados na aplicação Pets Adoção, servindo como guia para manter a consistência visual em todas as páginas.

## 1. Sistema de Cores

### Light Mode
```css
:root {
  --color-primary: #dca879;      /* Cor principal - marrom dourado */
  --color-primary-dark: #bb8e68; /* Versão mais escura da cor principal */
  --color-primary-light: #f0d5bb;/* Versão mais clara da cor principal */
  --color-text: #333;            /* Texto principal */
  --color-text-secondary: #666;  /* Texto secundário */
  --color-background: #fff;      /* Fundo principal */
  --color-background-secondary: #f8f8f8; /* Fundo secundário */
  --color-card: #fff;            /* Fundo dos cards */
  --color-card-hover: #f8f8f8;   /* Hover dos cards */
  --color-border: #eee;          /* Bordas */
}
```

### Dark Mode
```css
.darkMode {
  --color-text: #fff;            /* Texto principal invertido */
  --color-text-secondary: #bbb;  /* Texto secundário invertido */
  --color-background: #1a1a1a;   /* Fundo principal escuro */
  --color-background-secondary: #2d2d2d; /* Fundo secundário escuro */
  --color-card: #2d2d2d;         /* Fundo dos cards escuro */
  --color-card-hover: #363636;   /* Hover dos cards escuro */
  --color-border: #404040;       /* Bordas escuras */
}
```

## 2. Tipografia

### Hierarquia de Fontes
- Títulos principais: 2.5rem
- Subtítulos: 1.8rem
- Títulos de seção: 1.5rem
- Texto normal: 1rem
- Texto secundário: 0.9rem
- Texto pequeno: 0.8rem

### Família de Fontes
```css
font-family: Arial, sans-serif;
```

## 3. Espaçamento e Layout

### Grid System
- Container principal: max-width: 1200px
- Padding padrão: 2rem
- Gap entre elementos: 1.5rem
- Margem entre seções: 4rem

### Breakpoints
```css
/* Desktop */
@media (min-width: 1024px) {
  /* Layout padrão */
}

/* Tablet */
@media (max-width: 1024px) {
  /* Ajustes para tablets */
}

/* Mobile */
@media (max-width: 768px) {
  /* Ajustes para mobile */
}

/* Mobile pequeno */
@media (max-width: 480px) {
  /* Ajustes para mobile pequeno */
}
```

## 4. Componentes

### Cards
```css
.card {
  background-color: var(--color-card);
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 8px var(--shadow-color);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px var(--shadow-color-hover);
}
```

### Botões
```css
.button {
  padding: 1rem 2.5rem;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}
```

### Seções
```css
.section {
  padding: 4rem 2rem;
  margin-bottom: 4rem;
}

.sectionHeader {
  text-align: center;
  margin-bottom: 3rem;
}
```

## 5. Animações e Transições

### Transições Padrão
```css
--transition-default: all 0.3s ease;
```

### Animações
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
```

## 6. Responsividade

### Princípios
1. Mobile First
2. Layout fluido
3. Imagens responsivas
4. Texto adaptativo
5. Grid flexível

### Adaptações Mobile
- Menus colapsáveis
- Cards em coluna única
- Botões em largura total
- Fontes reduzidas
- Espaçamentos ajustados

## 7. Acessibilidade

### Contraste
- Texto principal: mínimo 4.5:1
- Texto grande: mínimo 3:1
- Elementos interativos: mínimo 3:1

### Navegação
- Foco visível
- Ordem lógica de tabulação
- Textos alternativos em imagens
- Labels em formulários

## 8. Performance

### Otimizações
- Lazy loading de imagens
- Minificação de CSS/JS
- Otimização de assets
- Código modular

## 9. Implementação

### Estrutura de Arquivos
```
src/
  ├── components/
  │   └── [ComponentName]/
  │       ├── [ComponentName].js
  │       └── [ComponentName].module.css
  ├── pages/
  │   └── [PageName]/
  │       ├── [PageName].js
  │       └── [PageName].module.css
  └── styles/
      └── variables.css
```

### Uso de CSS Modules
- Estilos encapsulados
- Nomes de classes únicos
- Evita conflitos de CSS

## 10. Manutenção

### Boas Práticas
1. Usar variáveis CSS para valores reutilizáveis
2. Manter consistência na nomenclatura
3. Documentar componentes complexos
4. Seguir o princípio DRY (Don't Repeat Yourself)
5. Manter o código organizado e comentado

## 11. Checklist de Implementação

Para cada nova página/componente:
- [ ] Seguir a paleta de cores definida
- [ ] Implementar dark mode
- [ ] Garantir responsividade
- [ ] Adicionar animações suaves
- [ ] Testar acessibilidade
- [ ] Otimizar performance
- [ ] Documentar o componente
- [ ] Testar em diferentes dispositivos 
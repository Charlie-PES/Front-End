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
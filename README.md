## 🐾 Pets Adoção - Front-End
Projeto front-end de um sistema de adoção de pets. Desenvolvido em React, com funcionalidades de visualização de pets, filtros, match de compatibilidade, mapa de ONGs, cadastro e login com Google (via Firebase).

## 💻 Requisitos
Node.js v18 ou superior (recomendada v20+)

npm v9 ou superior

## Dependências do projeto:

npm install

npm install react-scripts@5.0.1 eslint@8.56.0 eslint-config-react-app babel-eslint @babel/preset-react @babel/preset-env --save-dev

npm install react-leaflet@4 leaflet

npm install firebase ESSSE VAI SAIR

## 🚀 Rodando o projeto
Inicie o ambiente de desenvolvimento: npm start

A aplicação será iniciada em:📍 http://localhost:3000

## Visão Geral

O frontend foi desenvolvido com React e inclui as seguintes funcionalidades:

- Feed de notícias e posts sociais
- Página de detalhes de pets para adoção
- Formulário de cadastro de pets
- Página de contato
- Suporte a tema claro/escuro
- Design responsivo para dispositivos móveis

## Estrutura do Projeto

```
pets-adocao-frontend/
├── public/                  # Arquivos estáticos
├── src/                     # Código fonte
│   ├── components/          # Componentes reutilizáveis
│   ├── contexts/            # Contextos React (tema, autenticação)
│   ├── hooks/               # Hooks personalizados
│   ├── pages/               # Páginas da aplicação
│   ├── services/            # Serviços para comunicação com API
│   ├── utils/               # Funções utilitárias
│   ├── App.js               # Componente principal
│   └── index.js             # Ponto de entrada
└── package.json             # Dependências e scripts
```

## 📄 Licença
Este projeto está sob a licença MIT.

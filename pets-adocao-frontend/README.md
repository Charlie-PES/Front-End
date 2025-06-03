npm install

npm install react-scripts@5.0.1 eslint@8.56.0 eslint-config-react-app babel-eslint @babel/preset-react @babel/preset-env --save-dev

npm install react-leaflet@4 leaflet

npm install firebase ESSSE VAI SAIR

# Pets Adoção - Frontend

Este é o frontend do projeto Pets Adoção, uma plataforma para adoção de animais de estimação.

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

## Instalação e Execução

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Execute o projeto em modo de desenvolvimento:
   ```
   npm start
   ```
4. Para build de produção:
   ```
   npm run build
   ```

## Integração com Backend

O frontend está preparado para se integrar com um backend. Abaixo estão as instruções para implementar o backend necessário.

### Endpoints da API

O frontend espera que o backend implemente os seguintes endpoints:

#### 1. Autenticação

- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/register` - Registro de usuário
- `GET /api/auth/me` - Obter dados do usuário autenticado

#### 2. Pets

- `GET /api/pets` - Listar todos os pets disponíveis para adoção
- `GET /api/pets/:id` - Obter detalhes de um pet específico
- `POST /api/pets` - Cadastrar um novo pet
- `PUT /api/pets/:id` - Atualizar informações de um pet
- `DELETE /api/pets/:id` - Remover um pet

#### 3. Feed

- `GET /api/feed` - Obter posts do feed (notícias e posts sociais)
- `POST /api/feed` - Criar um novo post
- `GET /api/feed/hashtags` - Obter hashtags populares

#### 4. Contato

- `POST /api/contato` - Enviar mensagem de contato

### Estrutura de Dados

#### Pet

```json
{
  "id": "string",
  "nome": "string",
  "tipo": "string",
  "raca": "string",
  "idade": "number",
  "sexo": "string",
  "cor": "string",
  "porte": "string",
  "castrado": "boolean",
  "vacinas": "string",
  "imagem": "string (URL)",
  "compatibilidade": {
    "criancas": "boolean",
    "outrosPets": "boolean",
    "apartamento": "boolean"
  },
  "historico": "string",
  "responsavel": {
    "nome": "string",
    "telefone": "string",
    "email": "string"
  },
  "dataCadastro": "string (ISO date)",
  "status": "string (disponível, adotado, etc)"
}
```

#### Post do Feed

```json
{
  "id": "string",
  "tipo": "string (noticia, social)",
  "titulo": "string",
  "conteudo": "string",
  "imagem": "string (URL)",
  "autor": {
    "id": "string",
    "nome": "string",
    "avatar": "string (URL)"
  },
  "data": "string (ISO date)",
  "hashtags": ["string"],
  "curtidas": "number",
  "comentarios": "number"
}
```

#### Mensagem de Contato

```json
{
  "nome": "string",
  "email": "string",
  "assunto": "string",
  "mensagem": "string",
  "data": "string (ISO date)"
}
```

## Implementação do Backend

### Tecnologias Recomendadas

- **Node.js** com **Express** para o servidor
- **MongoDB** ou **PostgreSQL** para o banco de dados
- **JWT** para autenticação
- **Multer** para upload de imagens
- **Nodemailer** para envio de emails

### Estrutura do Backend

```
pets-adocao-backend/
├── src/
│   ├── config/              # Configurações (banco de dados, email, etc)
│   ├── controllers/         # Controladores para cada recurso
│   ├── middlewares/         # Middlewares (autenticação, validação, etc)
│   ├── models/              # Modelos de dados
│   ├── routes/              # Rotas da API
│   ├── services/            # Lógica de negócios
│   ├── utils/               # Funções utilitárias
│   └── app.js               # Aplicação Express
├── .env                     # Variáveis de ambiente
└── package.json             # Dependências e scripts
```

### Passos para Implementação

1. **Configuração Inicial**:
   - Crie um novo projeto Node.js
   - Instale as dependências necessárias
   - Configure o banco de dados
   - Configure variáveis de ambiente

2. **Autenticação**:
   - Implemente registro e login de usuários
   - Configure JWT para autenticação
   - Crie middleware de autenticação

3. **Modelos de Dados**:
   - Crie modelos para Pets, Posts, Usuários, etc
   - Configure validações e relacionamentos

4. **Rotas e Controladores**:
   - Implemente as rotas da API conforme documentado acima
   - Crie controladores para processar as requisições

5. **Upload de Imagens**:
   - Configure Multer para upload de imagens
   - Implemente armazenamento local ou em serviço de nuvem

6. **Notificações**:
   - Configure Nodemailer para envio de emails
   - Implemente notificações para novos contatos e adoções

7. **Testes**:
   - Escreva testes para as funcionalidades principais
   - Configure CI/CD para testes automatizados

8. **Deploy**:
   - Configure o servidor para produção
   - Implemente HTTPS e outras medidas de segurança
   - Configure CORS para permitir requisições do frontend

### Exemplo de Implementação Básica

```javascript
// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const petRoutes = require('./src/routes/petRoutes');
const feedRoutes = require('./src/routes/feedRoutes');
const contatoRoutes = require('./src/routes/contatoRoutes');
const authRoutes = require('./src/routes/authRoutes');

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexão com o banco de dados
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Rotas
app.use('/api/pets', petRoutes);
app.use('/api/feed', feedRoutes);
app.use('/api/contato', contatoRoutes);
app.use('/api/auth', authRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
```

## Configuração de Ambiente

Para conectar o frontend ao backend, crie um arquivo `.env` na raiz do projeto frontend com as seguintes variáveis:

```
REACT_APP_API_URL=http://localhost:3001/api
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT.

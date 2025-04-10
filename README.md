🐾 Pets Adoção - Front-End

Projeto front-end de um sistema de adoção de pets. Desenvolvido em React, com funcionalidades de visualização de pets, filtros, match de compatibilidade, mapa de ONGs, cadastro e login com Google (via Firebase).

💻 Requisitos

Node.js v18 ou superior (recomendada v20+)

npm v9 ou superior

Git (para clonar o projeto)
📅 Passo a passo para rodar o projeto

1. Clone o repositório:
git clone https://github.com/seu-usuario/pets-adocao-frontend.git
cd pets-adocao-frontend

2. Instale as dependências do projeto:
npm install

3. Corrija dependências adicionais (caso ocorram erros de ESLint):
npm install react-scripts@5.0.1 eslint@8.56.0 eslint-config-react-app babel-eslint @babel/preset-react @babel/preset-env --save-dev

4. Instale dependências para o mapa (Leaflet):
npm install react-leaflet@4 leaflet

5. Instale Firebase (para login com Google):
npm install firebase

🚀 Rodando o projeto

Inicie o ambiente de desenvolvimento:
npm start

A aplicação será iniciada em:📍 http://localhost:3000

🧐 Estrutura de pastas (resumida)

src/
├── components/         # Header, Footer, SearchBar, etc.
├── pages/              # Home, Adotar, Perfil, Mapa, Cadastro, etc.
├── firebase.js         # Configuração Firebase
└── App.js              # Roteamento principal

🌐 Funcionalidades:
✅ Página inicial com categorias
✅ Lista de pets com filtros (porte, sexo, etc.)
✅ Página do pet com histórico e compatibilidade
✅ Sistema de Match com visual animado
✅ Página de perfil do usuário com ações
✅ Mapa com localização de ONGs e abrigos (Leaflet)
✅ Cadastro de usuário com login via Google (Firebase)

🔒 Configurar Firebase (opcional, para login com Google)
Crie um projeto no Firebase Console
Ative o método de login com Google
Crie o arquivo src/firebase.js com as credenciais:

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'SUA_API_KEY',
  authDomain: 'SEU_DOMINIO.firebaseapp.com',
  projectId: 'SEU_PROJETO_ID',
  appId: 'SEU_APP_ID',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };

🧟‍♂️ Problemas comuns:

❌ react-scripts: not found
Solução:
npm install react-scripts@5.0.1 --save

❌ Failed to load config react-app/jest
Solução:
npm install eslint-config-react-app --save-dev

✨ Sugestão
Se você estiver usando Windows, instale o NVM for Windows para gerenciar diferentes versões do Node.js com mais facilidade.

📄 Licença
Este projeto está sob a licença MIT.

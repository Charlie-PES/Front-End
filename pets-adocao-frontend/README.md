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



README DEFAULT:

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

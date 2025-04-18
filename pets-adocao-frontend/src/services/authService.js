// Serviço de autenticação usando localStorage

// Chave para armazenar usuários no localStorage
const USERS_KEY = 'pets_adocao_users';
const CURRENT_USER_KEY = 'pets_adocao_current_user';

// Inicializa o armazenamento de usuários se não existir
const initializeUsers = () => {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify([]));
  }
};

// Obtém todos os usuários
const getUsers = () => {
  initializeUsers();
  return JSON.parse(localStorage.getItem(USERS_KEY));
};

// Adiciona um novo usuário
const addUser = (user) => {
  const users = getUsers();
  
  // Verifica se o email já existe
  if (users.some(u => u.email === user.email)) {
    throw new Error('Email já cadastrado');
  }
  
  // Adiciona o usuário com um ID único
  const newUser = {
    ...user,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  return newUser;
};

// Autentica um usuário
const login = (email, password) => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('Email ou senha inválidos');
  }
  
  // Armazena o usuário atual
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  
  return user;
};

// Faz logout do usuário atual
const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

// Obtém o usuário atual
const getCurrentUser = () => {
  const userJson = localStorage.getItem(CURRENT_USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
};

// Verifica se o usuário está autenticado
const isAuthenticated = () => {
  return !!getCurrentUser();
};

// Cria contas pré-definidas
const createSeedAccounts = () => {
  initializeUsers();
  const users = getUsers();
  
  // Verifica se as contas já existem
  const adotanteExists = users.some(u => u.email === 'adotante@teste.com');
  const ongExists = users.some(u => u.email === 'ong@teste.com');
  const tutorExists = users.some(u => u.email === 'tutor@teste.com');
  
  const newUsers = [];
  
  // Cria conta de adotante se não existir
  if (!adotanteExists) {
    newUsers.push(addUser({
      email: 'adotante@teste.com',
      password: 'Adotante@123',
      displayName: 'Adotante Teste',
      type: 'adotante'
    }));
  }
  
  // Cria conta de ONG se não existir
  if (!ongExists) {
    newUsers.push(addUser({
      email: 'ong@teste.com',
      password: 'Ong@123456',
      displayName: 'ONG Teste',
      type: 'ong'
    }));
  }
  
  // Cria conta de tutor se não existir
  if (!tutorExists) {
    newUsers.push(addUser({
      email: 'tutor@teste.com',
      password: 'Tutor@123',
      displayName: 'Tutor Teste',
      type: 'tutor'
    }));
  }
  
  return {
    adotante: users.find(u => u.email === 'adotante@teste.com') || newUsers.find(u => u.email === 'adotante@teste.com'),
    ong: users.find(u => u.email === 'ong@teste.com') || newUsers.find(u => u.email === 'ong@teste.com'),
    tutor: users.find(u => u.email === 'tutor@teste.com') || newUsers.find(u => u.email === 'tutor@teste.com')
  };
};

export {
  addUser,
  login,
  logout,
  getCurrentUser,
  isAuthenticated,
  createSeedAccounts
}; 
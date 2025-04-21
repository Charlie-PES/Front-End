import api from './api';

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
const addUser = async (userData) => {
  try {
    // Garante que todos os campos obrigatórios estejam presentes
    const registerData = {
      username: userData.username,
      email: userData.email,
      cpf: userData.cpf,
      tutor: Boolean(userData.tutor),
      adopter: Boolean(userData.adopter),
      password: userData.password
    };

    console.log('Dados de registro:', registerData); // Para debug

    const response = await api.post('/users/auth/register', registerData);
    const { token, user } = response.data;
    
    // Armazena o token e usuário no localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return user;
  } catch (error) {
    console.error('Erro ao registrar usuário:', error.response?.data || error.message);
    throw error;
  }
};

// Autentica um usuário
const login = async (username, password) => {
  try {
    const response = await api.post('/users/auth/login', { username, password });
    const { token, user } = response.data;
    
    // Armazena o token e usuário no localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return user;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

// Faz logout do usuário atual
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Obtém o usuário atual
const getCurrentUser = () => {
  const userJson = localStorage.getItem('user');
  return userJson ? JSON.parse(userJson) : null;
};

// Verifica se o usuário está autenticado
const isAuthenticated = () => {
  return !!localStorage.getItem('token');
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

// Função para atualizar os dados do usuário
const updateUser = async (userData) => {
  try {
    const response = await api.put('/auth/me', userData);
    const updatedUser = response.data;
    
    // Atualiza os dados do usuário no localStorage
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    return updatedUser;
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    throw error;
  }
};

// Função para obter os dados atualizados do usuário do servidor
const fetchCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    const user = response.data;
    
    // Atualiza os dados do usuário no localStorage
    localStorage.setItem('user', JSON.stringify(user));
    
    return user;
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    throw error;
  }
};

// Obtém o perfil do usuário
const getUserProfile = async (userId) => {
  try {
    const response = await api.get(`/users/auth/profile?user_id=${userId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    throw error;
  }
};

export {
  addUser,
  login,
  logout,
  getCurrentUser,
  isAuthenticated,
  createSeedAccounts,
  updateUser,
  fetchCurrentUser,
  getUserProfile
}; 
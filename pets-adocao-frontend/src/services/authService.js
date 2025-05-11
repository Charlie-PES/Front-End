import api from './api';
import { mockAccounts, mockUsers } from '../mocks/authMocks';

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

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
const USE_MOCKS = process.env.REACT_APP_USE_MOCKS === 'true';

// Adiciona um novo usuário
const addUser = async (userData) => {
  if (USE_MOCKS) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if email already exists
    if (mockUsers.some(u => u.email === userData.email)) {
      throw new Error('Email already registered');
    }

    // Create new mock user
    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      createdAt: new Date().toISOString()
    };

    mockUsers.push(newUser);
    return newUser;
  }

  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to register');
    }

    return await response.json();
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Autentica um usuário
const login = async (email, password) => {
  if (USE_MOCKS) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check mock accounts
    const mockAccount = mockAccounts.user.email === email ? mockAccounts.user : 
                       mockAccounts.ong.email === email ? mockAccounts.ong : null;

    if (mockAccount && mockAccount.password === password) {
      // Find corresponding user in mockUsers
      const user = mockUsers.find(u => u.email === email);
      if (user) {
        // Store mock token and user in localStorage
        const mockToken = 'mock-token-' + user.id;
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      }
    }

    throw new Error('Credenciais inválidas');
  }

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to login');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data.user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Faz logout do usuário atual
const logout = async () => {
  if (USE_MOCKS) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return;
  }

  try {
    await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

// Obtém o usuário atual
const getCurrentUser = async () => {
  if (USE_MOCKS) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const userJson = localStorage.getItem('user');
    if (userJson) {
      return JSON.parse(userJson);
    }
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get current user');
    }

    const user = await response.json();
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error) {
    console.error('Get current user error:', error);
    throw error;
  }
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
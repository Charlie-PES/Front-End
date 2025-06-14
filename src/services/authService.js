import api from './api';

// Serviço de autenticação usando a API

// Chave para armazenar usuário atual no localStorage
const CURRENT_USER_KEY = 'pets_adocao_current_user';

// Registra um novo usuário
const register = async (userData) => {
  try {
    const response = await api.post('/owners/register', userData);
    return response.data;
  } catch (error) {
    console.error('Erro no registro:', error);
    throw error;
  }
};

// Autentica um usuário
const login = async (email, password) => {
  try {
    const response = await api.post('/owners/owners/login', { email, password });
    const { message, owner } = response.data;
    
    // Salva o token e os dados do usuário no localStorage
    localStorage.setItem('token', message);
    localStorage.setItem('user', JSON.stringify(owner));
    
    return owner;
  } catch (error) {
    console.error('Erro no login:', error);
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
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Verifica se o usuário está autenticado
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

// Função para atualizar os dados do usuário
const updateUser = async (userData) => {
  try {
    const response = await api.put(`/owners/${userData._id}`, userData);
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
    const currentUser = getCurrentUser();
    if (!currentUser) return null;
    
    const response = await api.get(`/owners/owners/${currentUser._id}`);
    const user = response.data;
    
    // Atualiza os dados do usuário no localStorage
    localStorage.setItem('user', JSON.stringify(user));
    
    return user;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    throw error;
  }
};

export {
  register,
  login,
  logout,
  getCurrentUser,
  isAuthenticated,
  updateUser,
  fetchCurrentUser
}; 
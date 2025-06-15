import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCurrentUser, isAuthenticated, fetchCurrentUser, logout } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verifica se é a primeira vez que a aplicação está sendo carregada
    const isFirstLoad = !sessionStorage.getItem('hasLoaded');
    
    if (isFirstLoad) {
      // Faz logout apenas na primeira carga
      logout();
      sessionStorage.setItem('hasLoaded', 'true');
    } else {
      // Verifica se o usuário está autenticado ao dar refresh
      const checkAuth = async () => {
        try {
          if (isAuthenticated()) {
            const currentUser = getCurrentUser();
            if (currentUser?._id) {
              // Busca os dados atualizados do usuário do servidor
              const userData = await fetchCurrentUser();
              setUser(userData);
            } else {
              setUser(null);
            }
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
          setUser(null);
        } finally {
          setLoading(false);
        }
      };

      checkAuth();
    }
  }, []);

  const value = {
    user,
    setUser,
    loading,
    isAuthenticated: () => isAuthenticated()
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 
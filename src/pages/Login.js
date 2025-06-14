import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { FaUserCircle } from 'react-icons/fa';
import { login } from '../services/authService';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const { setUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(email, password);
      setUser(user);
      
      console.log('Usuário logado:', user);
      console.log('Tipo do usuário:', user.type);

      // Redireciona com base no tipo de usuário
      if (user.type === 'org') {
        console.log('Redirecionando para /ong/perfil');
        navigate('/ong/perfil');
      } else {
        console.log('Redirecionando para /');
        navigate('/'); // Redireciona para a página inicial para outros tipos de usuário
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError(error.response?.data?.detail?.[0]?.msg || 'Usuário ou senha inválidos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.loginContainer} ${darkMode ? styles.dark : ''}`}>  
      <div className={styles.loginForm}>
        <FaUserCircle className={styles.userIcon} />
        <h2>Login</h2>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading} className={styles.loginButton}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; 
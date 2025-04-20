import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { FaUserCircle } from 'react-icons/fa';
import { login } from '../services/authService';
import styles from './Login.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
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
      const userData = await login(username, password);
      setUser(userData);
      navigate('/'); // Redireciona para a página inicial após o login
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError(error.response?.data?.message || 'Usuário ou senha inválidos');
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
            <label htmlFor="username">Usuário</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          <button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; 
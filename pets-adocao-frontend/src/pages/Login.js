import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import { FaUserCircle } from 'react-icons/fa';
import { login } from '../services/authService';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/'); // Redireciona para a página inicial após o login
    } catch (error) {
      setError('Email ou senha inválidos');
    }
  };

  return (
    <div className={`${styles.loginContainer} ${darkMode ? styles.darkMode : ''}`}>
      <div className={styles.loginForm}>
        <FaUserCircle className={styles.userIcon} size={50} />
        <h1>Login</h1>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <form onSubmit={handleEmailLogin}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu email"
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
              placeholder="sua senha"
              required
            />
          </div>
          <button type="submit" className={styles.loginButton}>
            Entrar
          </button>
        </form>
        <p className={styles.registerLink}>
          Não tem uma conta?{' '}
          <button onClick={() => navigate('/cadastro')} className={styles.linkButton}>
            Registre-se
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login; 
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { FaUserCircle, FaUser, FaBuilding, FaHandHoldingHeart } from 'react-icons/fa';
import { login } from '../services/authService';
import { mockUsers } from '../mocks/authMocks';
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
      const response = await login(email, password);
      setUser(response.user);
      navigate('/'); // Redireciona para a página inicial após o login
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError(error.message || 'Usuário ou senha inválidos');
    } finally {
      setLoading(false);
    }
  };

  // Botões de atalho para perfis
  const goToPerfil = () => navigate('/perfil');
  const goToOngPerfil = () => {
    // Simula login da ONG
    const ongUser = mockUsers.find(u => u.email === 'ong@teste.com');
    if (ongUser) {
      localStorage.setItem('user', JSON.stringify(ongUser));
      localStorage.setItem('token', 'mock-token-ong');
    }
    navigate('/ong/perfil');
  };
  const goToTemporaryTutorPerfil = () => {
    // Simula login do tutor temporário
    const temporaryUser = mockUsers.find(u => u.email === 'tutor@teste.com');
    if (temporaryUser) {
      localStorage.setItem('user', JSON.stringify(temporaryUser));
      localStorage.setItem('token', 'mock-token-temporary');
    }
    navigate('/perfil');
  };

  return (
    <div className={`${styles.loginContainer} ${darkMode ? styles.dark : ''}`}>  
      {/* Botões de atalho para perfis */}
      <div style={{ position: 'absolute', top: 64, left: 24, display: 'flex', flexDirection: 'column', gap: 12, zIndex: 100 }}>
        <button
          style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid #dca879', background: '#dca879', color: '#fff', cursor: 'pointer', fontSize: 18, fontWeight: 'bold', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          title="Ir para perfil do usuário"
          onClick={goToPerfil}
        >
          <FaUser size={24} />
        </button>
        <button
          style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid #dca879', background: '#dca879', color: '#fff', cursor: 'pointer', fontSize: 18, fontWeight: 'bold', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          title="Ir para perfil da ONG"
          onClick={goToOngPerfil}
        >
          <FaBuilding size={24} />
        </button>
        <button
          style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid #dca879', background: '#dca879', color: '#fff', cursor: 'pointer', fontSize: 18, fontWeight: 'bold', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          title="Ir para perfil de tutor temporário"
          onClick={goToTemporaryTutorPerfil}
        >
          <FaHandHoldingHeart size={24} />
        </button>
      </div>
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
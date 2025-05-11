import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaBuilding } from 'react-icons/fa';
import styles from '../styles/Login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [mockUsers, setMockUsers] = useState([]);

  useEffect(() => {
    // Simulação de carregamento de usuários
    setMockUsers([
      { email: 'ong@teste.com', password: '123456' },
      { email: 'usuario@teste.com', password: '123456' },
    ]);
  }, []);

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

  return (
    <div className={`${styles.loginContainer} ${darkMode ? styles.dark : ''}`}>  
      {/* Botões de atalho para perfis */}
      <div style={{ position: 'absolute', top: 64, left: 24, display: 'flex', flexDirection: 'column', gap: 12, zIndex: 100, alignItems: 'flex-start' }}>
        <span style={{ color: '#333', fontSize: 14, marginBottom: 2, opacity: 0.7, fontWeight: 500 }}>Acesso rápido para perfis de teste:</span>
        <button
          style={{
            width: 220,
            height: 44,
            borderRadius: '8px',
            border: '2px solid #dca879',
            background: '#dca879',
            color: '#fff',
            cursor: 'pointer',
            fontSize: 16,
            fontWeight: 'bold',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            opacity: 0.7,
            transition: 'opacity 0.2s',
          }}
          title="Ir para perfil do usuário"
          onClick={goToPerfil}
        >
          <FaUser size={20} />
          Ir para página de usuário
        </button>
        <button
          style={{
            width: 220,
            height: 44,
            borderRadius: '8px',
            border: '2px solid #dca879',
            background: '#dca879',
            color: '#fff',
            cursor: 'pointer',
            fontSize: 16,
            fontWeight: 'bold',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            opacity: 0.7,
            transition: 'opacity 0.2s',
          }}
          title="Ir para perfil da ONG"
          onClick={goToOngPerfil}
        >
          <FaBuilding size={20} />
          Ir para página perfil ONG
        </button>
      </div>
      {/* ...restante do código... */}
    </div>
  );
};

export default Login; 
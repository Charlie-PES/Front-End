import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Perfil.module.css';
import { FaUserEdit, FaPlusCircle, FaPaw, FaHeart, FaHistory, FaSignOutAlt, FaCamera, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';
import { logout, fetchCurrentUser } from '../../../services/authService';

const Perfil = () => {
  const { darkMode } = useContext(ThemeContext);
  const { user, setUser } = useAuth();
  const [activeTab, setActiveTab] = useState('info');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await fetchCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        setError('Erro ao carregar dados do usuário. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [setUser]);

  // Função para lidar com o logout
  const handleLogout = () => {
    logout();
    setUser(null);
    navigate('/login');
  };

  if (loading) {
    return (
      <div className={`${styles.container} ${darkMode ? styles.darkMode : ''}`}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Carregando dados do perfil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.container} ${darkMode ? styles.darkMode : ''}`}>
        <div className={styles.errorContainer}>
          <p className={styles.errorMessage}>{error}</p>
          <button onClick={() => window.location.reload()} className={styles.retryButton}>
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  const renderUserInfo = () => (
    <div className={styles.userInfoSection}>
      <div className={styles.avatarContainer}>
        <img src={user.avatar || "/images/default-avatar.png"} alt="Avatar" className={styles.avatar} />
        <button className={styles.changePhotoBtn}>
          <FaCamera />
        </button>
      </div>
      <h2 className={styles.userName}>{user.displayName}</h2>
      <div className={styles.userDetails}>
        <div className={styles.detailItem}>
          <FaMapMarkerAlt className={styles.detailIcon} />
          <span>{user.cidade || 'Cidade não informada'}</span>
        </div>
        <div className={styles.detailItem}>
          <FaEnvelope className={styles.detailIcon} />
          <span>{user.email}</span>
        </div>
        <div className={styles.detailItem}>
          <FaPhone className={styles.detailIcon} />
          <span>{user.telefone || 'Telefone não informado'}</span>
        </div>
      </div>
      <div className={styles.userBio}>
        <h3>Sobre mim</h3>
        <p>{user.bio || 'Nenhuma informação adicional fornecida.'}</p>
      </div>
      <div className={styles.userStats}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{user.petsAdotados || 0}</span>
          <span className={styles.statLabel}>Pets Adotados</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{user.petsFavoritos || 0}</span>
          <span className={styles.statLabel}>Favoritos</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{new Date(user.createdAt).toLocaleDateString('pt-BR')}</span>
          <span className={styles.statLabel}>Membro desde</span>
        </div>
      </div>
    </div>
  );

  const renderActions = () => (
    <div className={styles.actionsSection}>
      <h3>Ações</h3>
      <div className={styles.actionsGrid}>
        <Link to="/editar-perfil" className={styles.actionButton}>
          <FaUserEdit className={styles.actionIcon} />
          <span>Editar Perfil</span>
        </Link>
        {user.type === 'tutor' && (
          <Link to="/cadastro-pet" className={styles.actionButton}>
            <FaPlusCircle className={styles.actionIcon} />
            <span>Cadastrar Pet</span>
          </Link>
        )}
        {user.type === 'adotante' && (
          <Link to="/acompanhamento" className={styles.actionButton}>
            <FaPaw className={styles.actionIcon} />
            <span>Acompanhamento Pós-Adoção</span>
          </Link>
        )}
        <Link to="/historico-adocao" className={styles.actionButton}>
          <FaHistory className={styles.actionIcon} />
          <span>Histórico de Adoções</span>
        </Link>
        <Link to="/favoritos" className={styles.actionButton}>
          <FaHeart className={styles.actionIcon} />
          <span>Pets Favoritos</span>
        </Link>
        <button onClick={handleLogout} className={styles.actionButton}>
          <FaSignOutAlt className={styles.actionIcon} />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className={`${styles.container} ${darkMode ? styles.darkMode : ''}`}>
      <div className={styles.profileHeader}>
        <h1>Meu Perfil</h1>
        <div className={styles.tabs}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'info' ? styles.active : ''}`}
            onClick={() => setActiveTab('info')}
          >
            Informações
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'actions' ? styles.active : ''}`}
            onClick={() => setActiveTab('actions')}
          >
            Ações
          </button>
        </div>
      </div>
      
      <div className={styles.profileContent}>
        {activeTab === 'info' ? renderUserInfo() : renderActions()}
      </div>
    </div>
  );
};

export default Perfil;

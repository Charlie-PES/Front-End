import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Perfil.module.css';
import { FaUserEdit, FaPlusCircle, FaPaw, FaHeart, FaHistory, FaSignOutAlt, FaCamera, FaMapMarkerAlt, FaEnvelope, FaPhone, FaUser, FaEdit, FaHandHoldingHeart } from 'react-icons/fa';
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
      <h2 className={styles.userName}>{user.name} {user.surname}</h2>
      <div className={styles.userDetails}>
        <div className={styles.detailItem}>
          <FaMapMarkerAlt className={styles.detailIcon} />
          <span>{user.address && user.address.length > 0 ? `${user.address[0].city}, ${user.address[0].state}` : 'Endereço não informado'}</span>
        </div>
        <div className={styles.detailItem}>
          <FaEnvelope className={styles.detailIcon} />
          <span>{user.email}</span>
        </div>
        <div className={styles.detailItem}>
          <FaPhone className={styles.detailIcon} />
          <span>{user.phone || 'Telefone não informado'}</span>
        </div>
      </div>
      <div className={styles.userBio}>
        <h3>Sobre mim</h3>
        <p>{user.type === 'org' && user.owner_details && user.owner_details.description ? user.owner_details.description : 'Nenhuma informação adicional fornecida.'}</p>
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
        {(user.ong || user.tipo === 'temporary') && (
          <Link to="/pets/add" className={styles.actionButton}>
            <FaPlusCircle className={styles.actionIcon} />
            <span>Adicionar Pet</span>
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

  const renderTemporaryTutorInfo = () => {
    if (user.tipo !== 'temporary') return null;

    return (
      <div className={styles.temporaryTutorInfo}>
        <h3><FaHandHoldingHeart /> Informações do Tutor Temporário</h3>
        <div className={styles.infoSection}>
          <h4>Sobre Mim</h4>
          <p>{user.bio}</p>
        </div>
        <div className={styles.infoSection}>
          <h4>Experiência</h4>
          <p>{user.experiencia}</p>
        </div>
        <div className={styles.infoSection}>
          <h4>Disponibilidade</h4>
          <p>{user.disponibilidade}</p>
        </div>
        <div className={styles.infoSection}>
          <h4>Preferências</h4>
          <div className={styles.preferences}>
            <div>
              <strong>Tipos de Pets:</strong>
              <ul>
                {user.preferencias.tipo.map(tipo => (
                  <li key={tipo}>{tipo === 'dog' ? 'Cachorro' : 'Gato'}</li>
                ))}
              </ul>
            </div>
            <div>
              <strong>Portes:</strong>
              <ul>
                {user.preferencias.porte.map(porte => (
                  <li key={porte}>
                    {porte === 'small' ? 'Pequeno' : 
                     porte === 'medium' ? 'Médio' : 'Grande'}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <strong>Idades:</strong>
              <ul>
                {user.preferencias.idade.map(idade => (
                  <li key={idade}>
                    {idade === 'filhote' ? 'Filhote' :
                     idade === 'adulto' ? 'Adulto' : 'Idoso'}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <strong>Necessidades Especiais:</strong>
              <p>{user.preferencias.necessidades ? 'Aceito pets com necessidades especiais' : 'Não aceito pets com necessidades especiais'}</p>
            </div>
          </div>
        </div>
        <div className={styles.infoSection}>
          <div className={styles.petsHeader}>
            <h4>Meus Pets</h4>
            <Link to="/pets/add" className={styles.addPetButton}>
              <FaPlusCircle />
              <span>Adicionar Novo Pet</span>
            </Link>
          </div>
          <div className={styles.petsGrid}>
            <div className={styles.petCard}>
              <b>Nome:</b> Rex<br/>
              <b>Espécie:</b> Cachorro<br/>
              <b>Status:</b> <span style={{color:'#00796b', fontWeight:'bold'}}>Disponível</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
        {renderTemporaryTutorInfo()}
      </div>
    </div>
  );
};

export default Perfil;

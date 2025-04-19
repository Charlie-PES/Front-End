import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Perfil.module.css';
import { FaUserEdit, FaPlusCircle, FaPaw, FaHeart, FaHistory, FaSignOutAlt, FaCamera, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import { ThemeContext } from '../../../contexts/ThemeContext';

const Perfil = () => {
  const { darkMode } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState('info');
  
  const usuario = {
    nome: 'Teste',
    email: 'Teste@example.com',
    cidade: 'Porto Alegre - RS',
    telefone: '(51) 91234-5678',
    bio: 'Amante de animais e defensor da adoção responsável. Já adotei 3 pets e continuo ajudando outros a encontrarem um lar amoroso.',
    dataCadastro: '15/03/2023',
    petsAdotados: 3,
    petsFavoritos: 5
  };

  const renderUserInfo = () => (
    <div className={styles.userInfoSection}>
      <div className={styles.avatarContainer}>
        <img src="/images/dog2.png" alt="Avatar" className={styles.avatar} />
        <button className={styles.changePhotoBtn}>
          <FaCamera />
        </button>
      </div>
      <h2 className={styles.userName}>{usuario.nome}</h2>
      <div className={styles.userDetails}>
        <div className={styles.detailItem}>
          <FaMapMarkerAlt className={styles.detailIcon} />
          <span>{usuario.cidade}</span>
        </div>
        <div className={styles.detailItem}>
          <FaEnvelope className={styles.detailIcon} />
          <span>{usuario.email}</span>
        </div>
        <div className={styles.detailItem}>
          <FaPhone className={styles.detailIcon} />
          <span>{usuario.telefone}</span>
        </div>
      </div>
      <div className={styles.userBio}>
        <h3>Sobre mim</h3>
        <p>{usuario.bio}</p>
      </div>
      <div className={styles.userStats}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{usuario.petsAdotados}</span>
          <span className={styles.statLabel}>Pets Adotados</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{usuario.petsFavoritos}</span>
          <span className={styles.statLabel}>Favoritos</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{usuario.dataCadastro}</span>
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
        <Link to="/cadastro-pet" className={styles.actionButton}>
          <FaPlusCircle className={styles.actionIcon} />
          <span>Cadastrar Pet</span>
        </Link>
        <Link to="/acompanhamento" className={styles.actionButton}>
          <FaPaw className={styles.actionIcon} />
          <span>Acompanhamento Pós-Adoção</span>
        </Link>
        <Link to="/historico-adocao" className={styles.actionButton}>
          <FaHistory className={styles.actionIcon} />
          <span>Histórico de Adoções</span>
        </Link>
        <Link to="/favoritos" className={styles.actionButton}>
          <FaHeart className={styles.actionIcon} />
          <span>Pets Favoritos</span>
        </Link>
        <Link to="/login" className={styles.actionButton}>
          <FaSignOutAlt className={styles.actionIcon} />
          <span>Sair</span>
        </Link>
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

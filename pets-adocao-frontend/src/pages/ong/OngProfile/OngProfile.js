import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';
import styles from './OngProfile.module.css';
import { 
  FaBuilding, 
  FaCalendarAlt, 
  FaEnvelope, 
  FaUsers, 
  FaPaw, 
  FaChartLine, 
  FaCog, 
  FaBell,
  FaSignOutAlt
} from 'react-icons/fa';

const OngProfile = () => {
  const { darkMode } = useContext(ThemeContext);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { id: 'dashboard', icon: <FaChartLine />, label: 'Dashboard' },
    { id: 'pets', icon: <FaPaw />, label: 'Pets' },
    { id: 'adocoes', icon: <FaUsers />, label: 'Adoções' },
    { id: 'calendario', icon: <FaCalendarAlt />, label: 'Calendário' },
    { id: 'mensagens', icon: <FaEnvelope />, label: 'Mensagens' },
    { id: 'requisicoes', icon: <FaBell />, label: 'Requisições' },
    { id: 'configuracoes', icon: <FaCog />, label: 'Configurações' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className={styles.dashboardContent}>
            <h2>Dashboard</h2>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <h3>Pets Disponíveis</h3>
                <p className={styles.statNumber}>24</p>
              </div>
              <div className={styles.statCard}>
                <h3>Adoções Pendentes</h3>
                <p className={styles.statNumber}>8</p>
              </div>
              <div className={styles.statCard}>
                <h3>Mensagens Não Lidas</h3>
                <p className={styles.statNumber}>12</p>
              </div>
              <div className={styles.statCard}>
                <h3>Eventos do Mês</h3>
                <p className={styles.statNumber}>5</p>
              </div>
            </div>
          </div>
        );
      case 'pets':
        return (
          <div className={styles.petsContent}>
            <h2>Gerenciamento de Pets</h2>
            <div className={styles.petsGrid}>
              {/* Lista de pets será implementada aqui */}
            </div>
          </div>
        );
      case 'adocoes':
        return (
          <div className={styles.adocoesContent}>
            <h2>Processos de Adoção</h2>
            <div className={styles.adocoesList}>
              {/* Lista de adoções será implementada aqui */}
            </div>
          </div>
        );
      case 'calendario':
        return (
          <div className={styles.calendarioContent}>
            <h2>Calendário de Eventos</h2>
            <div className={styles.calendarioGrid}>
              {/* Calendário será implementado aqui */}
            </div>
          </div>
        );
      case 'mensagens':
        return (
          <div className={styles.mensagensContent}>
            <h2>Caixa de Entrada</h2>
            <div className={styles.mensagensList}>
              {/* Lista de mensagens será implementada aqui */}
            </div>
          </div>
        );
      case 'requisicoes':
        return (
          <div className={styles.requisicoesContent}>
            <h2>Requisições Pendentes</h2>
            <div className={styles.requisicoesList}>
              {/* Lista de requisições será implementada aqui */}
            </div>
          </div>
        );
      case 'configuracoes':
        return (
          <div className={styles.configuracoesContent}>
            <h2>Configurações da ONG</h2>
            <div className={styles.configuracoesForm}>
              {/* Formulário de configurações será implementado aqui */}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`${styles.ongProfile} ${darkMode ? styles.darkMode : ''}`}>
      <aside className={styles.sidebar}>
        <div className={styles.ongInfo}>
          <div className={styles.ongLogo}>
            <FaBuilding size={40} />
          </div>
          <h2>{user?.displayName || 'Nome da ONG'}</h2>
          <p className={styles.ongType}>Organização Não Governamental</p>
        </div>

        <nav className={styles.menu}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`${styles.menuItem} ${activeSection === item.id ? styles.active : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <button className={styles.logoutButton} onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Sair</span>
        </button>
      </aside>

      <main className={styles.content}>
        {renderContent()}
      </main>
    </div>
  );
};

export default OngProfile; 
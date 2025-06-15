import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import { 
    FaSun, 
    FaMoon, 
    FaUserCircle, 
    FaBell, 
    FaEnvelope, 
    FaHandHoldingHeart,
    FaHome,
    FaPaw,
    FaInfoCircle,
    FaMapMarkedAlt,
    FaNewspaper,
    FaHeart
} from 'react-icons/fa';
import { logout } from '../../services/authService';

const Header = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const notificationsRef = useRef(null);

  // Mock notifications - in a real app, these would come from your backend
  const [notifications] = useState([
    { id: 1, message: 'Novo match com um pet!', time: '5 min atrás' },
    { id: 2, message: 'Sua solicitação de adoção foi aprovada', time: '1 hora atrás' },
    { id: 3, message: 'Novo pet disponível para adoção', time: '2 horas atrás' },
  ]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Executa uma vez no carregamento

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    window.location.reload();
  };

  // Close notifications dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className={`${styles.header} ${darkMode ? styles.darkMode : ''} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.logoContainer}>
        <img src="/images/logo.png" alt="Logo" className={styles.logo} />
      </div>

      <nav className={styles.nav}>
        <Link to="/home" className={styles.link}>
          <FaHome className={styles.navIcon} /> Home
        </Link>
        <Link to="/adotar" className={styles.link}>
          <FaPaw className={styles.navIcon} /> Adotar
        </Link>
        <Link to="/sobre" className={styles.link}>
          <FaInfoCircle className={styles.navIcon} /> Sobre
        </Link>
        <Link to="/mapa" className={styles.link}>
          <FaMapMarkedAlt className={styles.navIcon} /> Mapa
        </Link>
        <Link to="/feed" className={styles.link}>
          <FaNewspaper className={styles.navIcon} /> Feed
        </Link>
        <Link to="/doacoes" className={styles.link}>
          <FaHandHoldingHeart className={styles.navIcon} /> Doações
        </Link>
      </nav>

      <div className={styles.authButtons}>
        <div className={styles.notificationContainer}>
          <button
            className={styles.notificationButton}
            onClick={() => navigate('/matchpage')}
            aria-label="Match"
          >
            <FaHeart size={20} />
            <span className={styles.notificationBadge}>2</span>
          </button>
        </div>

        <div className={styles.notificationContainer}>
          <button
            className={styles.notificationButton}
            onClick={() => navigate('/messages')}
            aria-label="Mensagens"
          >
            <FaEnvelope size={20} />
            <span className={styles.notificationBadge}>3</span>
          </button>
        </div>

        <div className={styles.notificationContainer} ref={notificationsRef}>
          <button
            className={styles.notificationButton}
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notificações"
          >
            <FaBell size={20} />
            {notifications.length > 0 && (
              <span className={styles.notificationBadge}>{notifications.length}</span>
            )}
          </button>
          {showNotifications && (
            <div className={styles.notificationDropdown}>
              <div className={styles.notificationHeader}>
                <h3>Notificações</h3>
              </div>
              <div className={styles.notificationList}>
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div key={notification.id} className={styles.notificationItem}>
                      <p>{notification.message}</p>
                      <span>{notification.time}</span>
                    </div>
                  ))
                ) : (
                  <p className={styles.noNotifications}>Nenhuma notificação</p>
                )}
              </div>
            </div>
          )}
        </div>

        {!user ? (
          <>
            <Link to="/login" className={styles.loginButton}>
              Entrar
            </Link>
            <Link to="/account-type" className={styles.registerButton}>
              Registrar
            </Link>
          </>
        ) : (
          <div className={styles.userSection}>
            <Link to={user.type === 'org' ? '/ong/perfil' : '/perfil'} className={styles.profileButton}>
              <FaUserCircle size={24} />
              <span>{user.displayName || user.email}</span>
            </Link>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Sair
            </button>
          </div>
        )}

        <button onClick={toggleTheme} className={styles.themeToggle}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </header>
  );
};

export default Header;

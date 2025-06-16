import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import {
    FaSun,
    FaMoon,
    FaUserCircle,
    FaHome,
    FaPaw,
    FaInfoCircle,
    FaMapMarkedAlt,
    FaNewspaper
} from 'react-icons/fa';
import { logout } from '../../services/authService';

const Header = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

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

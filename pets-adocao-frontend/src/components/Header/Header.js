import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import { FaSun, FaMoon, FaUserCircle } from 'react-icons/fa';
import { logout } from '../../services/authService';

const Header = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    window.location.reload();
  };

  return (
    <header className={`${styles.header} ${darkMode ? styles.darkMode : ''}`}>
      <div className={styles.logoContainer}>
        <img src="/images/logo.png" alt="Logo" className={styles.logo} />
      </div>

      <nav className={styles.nav}>
        <Link to="/home" className={styles.link}>
          Home
        </Link>
        <Link to="/adotar" className={styles.link}>
          Adotar
        </Link>
        <Link to="/sobre" className={styles.link}>
          Sobre
        </Link>
        <Link to="/mapa" className={styles.link}>
          Mapa
        </Link>
        <Link to="/feed" className={styles.link}>
          Feed
        </Link>
        <Link to="/matchpage" className={styles.link}>
          Match
        </Link>
      </nav>

      <div className={styles.authButtons}>
        {!user ? (
          <>
            <Link to="/login" className={styles.loginButton}>
              Entrar
            </Link>
            <Link to="/cadastro" className={styles.registerButton}>
              Registrar
            </Link>
          </>
        ) : (
          <div className={styles.userSection}>
            <Link to="/perfil" className={styles.profileButton}>
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

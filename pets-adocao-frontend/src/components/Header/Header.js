import { Link } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeContext';
import styles from './Header.module.css';
import React, { useContext } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const Header = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={styles.header}>
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

        <Link to="/perfil" className={styles.link}>
          Perfil
        </Link>

        <Link to="/feed" className={styles.link}>
          Feed
        </Link>

        <Link to="/matchpage" className={styles.link}>
          Match
        </Link>
      </nav>

      <div className={styles.rightSection}>
        <Link to="/cadastro" className={styles.loginLink}>
          Logar/Registrar
        </Link>

        <button onClick={toggleTheme} className={styles.themeToggle}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </header>
  );
};

export default Header;

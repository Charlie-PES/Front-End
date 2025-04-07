import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import SearchBar from '../SearchBar/SearchBar';
import React from 'react';

const Header = () => {
    return (
      <header className={styles.header}>

        <div className={styles.logoContainer}>
          <img src="\images\logo.png" alt="Logo" className={styles.logo}/>
        </div>

        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>
            Home
          </Link>
      
          <Link to="/adotar" className={styles.link}>
            Adotar
          </Link>
      
          <Link to="/sobre" className={styles.link}>
            Sobre
          </Link>
        </nav>

        <div className={styles.rightSection}>
          <SearchBar />
          
          <Link to="/login" className={styles.loginLink}>
            Logar/Registrar
          </Link>
        
        </div>
      
      
      </header>
  );
};

export default Header;
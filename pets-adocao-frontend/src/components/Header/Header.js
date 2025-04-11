import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import React from 'react';

const Header = () => {
  return (
    <header className={styles.header}>
     
      <div className={styles.logoContainer}>
        <img src="\images\logo.png" alt="Logo" className={styles.logo}/>
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
      </nav>

      <div className={styles.rightSection}>
        <Link to="/cadastro" className={styles.loginLink}>
          Logar/Registrar
        </Link>
      </div>

      
    </header>
  );
};

export default Header;

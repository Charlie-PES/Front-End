import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.logoContainer}>
                <img src="/images/logo.png" alt="Logo" className={styles.logo} />
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
                <Link to="/cadastro" className={styles.link}>
                    Cadastro
                </Link>
            </nav>

            <div className={styles.socialSection}>
                <FaFacebook className={styles.icon} />
                <FaInstagram className={styles.icon} />
            </div>
        </footer>
    );
};

export default Footer;

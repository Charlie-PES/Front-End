import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            
            <div className={styles.logoContainer}>
                <p>Obrigado por adotar os pets!</p>
                <img src="/images/logo.png" alt="Logo" className={styles.logo} />
            </div>

            <div className={styles.socialSection}>
                <FaFacebook className={styles.icon} />
                <FaInstagram className={styles.icon} />
                <FaLinkedin className={styles.icon} />
            </div>
        </footer>
    );
};

export default Footer;

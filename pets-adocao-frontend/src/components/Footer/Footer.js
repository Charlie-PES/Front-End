import React from 'react';
import styles from './Footer.module.css';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <p>Obrigado por adotar os pets!</p>
        <img src="/images/logo.png" alt="Logo" className={styles.logo} />
      </div>

      <div className={styles.center}>
        <input type="email" placeholder="Insira seu email aqui" className={styles.emailInput} />
        <button className={styles.registerBtn}>Se registre agora</button>

        <div className={styles.links}>
          <div>
            <h4>Ajuda</h4>
            <p>FAQ</p>
            <p>Serviço ao consumidor</p>
            <p>Contate nós</p>
          </div>
          <div>
            <h4>Outros</h4>
            <p>Política de privacidade</p>
            <p>Inscrições</p>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
      </div>
    </footer>
  );
};

export default Footer;

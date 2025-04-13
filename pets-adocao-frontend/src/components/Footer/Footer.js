import React from 'react';
import styles from './Footer.module.css';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // import necessário

const Footer = () => {
  return (
    <footer className={styles.footer}>
      
      <div className={styles.left}>
        <p>Obrigado por adotar os pets!</p>
        <img src="/images/logo.png" alt="Logo" className={styles.logo} />
      </div>

      <div className={styles.center}>
        <div className={styles.links}>
          <div>
            <h4>Ajuda</h4>
            <Link to="/faq">
              FAQ
            </Link>
            <Link to="/servico-consumidor">
              Serviço ao consumidor
            </Link>
            <Link to="/contato">
              Contate nós
            </Link>
          </div>
          
          <div>
            <h4>Outros</h4>
            <Link to="/privacidade">
              Política de privacidade
            </Link>
            <Link to="/inscricoes">
              Inscrições
            </Link>
            <Link to="/depoimentos">
              Depoimentos
            </Link>
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

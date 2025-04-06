import React from 'react';
import styles from './Footer.module.css';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>

                {/* Logo e Redes Sociais */}
                <div className={styles.left}>
                    <p>Obrigado por adotar os pets!</p>
                    <img src="/images/logo.png" alt="Logo" className={styles.logo} /> {/* Certifique-se que sua logo está na pasta public/images */}
                    <div className={styles.socialIcons}>
                        <FaFacebook className={styles.icon} />
                        <FaInstagram className={styles.icon} />
                    </div>
                </div>

                {/* Formulário de Inscrição */}
                <div className={styles.center}>
                    <input type="email" placeholder="Insira seu email aqui" className={styles.emailInput} />
                    <button className={styles.registerButton}>Se registre agora</button>
                </div>

                {/* Links de Ajuda e Outros */}
                <div className={styles.right}>
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
        </footer>
    );
};

export default Footer;

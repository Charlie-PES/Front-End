import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaHandHoldingHeart } from 'react-icons/fa';
import { ThemeContext } from '../../../contexts/ThemeContext';
import styles from './AccountType.module.css';

const AccountType = () => {
    const navigate = useNavigate();
    const { darkMode } = useContext(ThemeContext);

    const handleTypeSelect = (type) => {
        navigate(`/register/${type}`);
    };

    return (
        <div className={`${styles.container} ${darkMode ? styles.darkMode : ''}`}>
            <div className={styles.content}>
                <h1 className={styles.title}>Escolha o Tipo de Conta</h1>
                <p className={styles.subtitle}>
                    Selecione o tipo de conta que melhor se adequa ao seu perfil
                </p>

                <div className={styles.options}>
                    <div 
                        className={styles.option}
                        onClick={() => handleTypeSelect('tutor')}
                    >
                        <div className={styles.iconWrapper}>
                            <FaUser className={styles.icon} />
                        </div>
                        <h2>Tutor</h2>
                        <p>
                            Quero adotar um pet e dar um lar permanente.
                            Ideal para quem busca um companheiro para a vida toda.
                        </p>
                        <button className={styles.selectButton}>
                            Quero ser Tutor
                        </button>
                    </div>

                    <div 
                        className={styles.option}
                        onClick={() => handleTypeSelect('org')}
                    >
                        <div className={styles.iconWrapper}>
                            <FaHandHoldingHeart className={styles.icon} />
                        </div>
                        <h2>ONG</h2>
                        <p>
                            Sou uma organização que cuida de pets e busca encontrar lares para eles.
                            Ideal para ONGs e abrigos que trabalham com adoção de animais.
                        </p>
                        <button className={styles.selectButton}>
                            Quero registrar como ONG
                        </button>
                    </div>
                </div>

                <div className={styles.footer}>
                    <p>Já tem uma conta?</p>
                    <button 
                        className={styles.loginButton}
                        onClick={() => navigate('/login')}
                    >
                        Fazer Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccountType; 
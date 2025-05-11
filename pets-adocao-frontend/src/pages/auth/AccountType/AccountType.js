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
                        onClick={() => handleTypeSelect('adopter')}
                    >
                        <div className={styles.iconWrapper}>
                            <FaUser className={styles.icon} />
                        </div>
                        <h2>Adotante</h2>
                        <p>
                            Quero encontrar um pet para adotar e dar um lar permanente.
                            Ideal para quem busca um companheiro para a vida toda.
                        </p>
                        <button className={styles.selectButton}>
                            Quero Adotar
                        </button>
                    </div>

                    <div 
                        className={styles.option}
                        onClick={() => handleTypeSelect('temporary')}
                    >
                        <div className={styles.iconWrapper}>
                            <FaHandHoldingHeart className={styles.icon} />
                        </div>
                        <h2>Tutor Temporário</h2>
                        <p>
                            Quero ajudar pets que precisam de um lar temporário.
                            Ideal para quem pode oferecer cuidados temporários e ajudar na transição.
                        </p>
                        <button className={styles.selectButton}>
                            Quero ser Tutor Temporário
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
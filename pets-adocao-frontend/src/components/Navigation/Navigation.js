import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaPaw, FaCog, FaSignOutAlt, FaBell, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import styles from './Navigation.module.css';

const Navigation = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showMessages, setShowMessages] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const renderProfileMenu = () => {
        if (!isAuthenticated) return null;

        return (
            <div className={styles.profileMenu}>
                <div className={styles.profileHeader}>
                    <img 
                        src={user.avatar || '/default-avatar.png'} 
                        alt="Avatar" 
                        className={styles.avatar}
                    />
                    <div className={styles.profileInfo}>
                        <span className={styles.name}>{user.nome}</span>
                        <span className={styles.role}>
                            {user.tipo === 'temporary' ? 'Tutor Temporário' : 
                             user.tipo === 'ong' ? 'ONG' : 'Adotante'}
                        </span>
                    </div>
                </div>

                <div className={styles.menuItems}>
                    <Link to="/profile" className={styles.menuItem}>
                        <FaUser className={styles.menuIcon} />
                        Meu Perfil
                    </Link>

                    {user.tipo === 'temporary' && (
                        <Link to="/pets/add" className={styles.menuItem}>
                            <FaPaw className={styles.menuIcon} />
                            Adicionar Pet
                        </Link>
                    )}

                    <Link to="/settings" className={styles.menuItem}>
                        <FaCog className={styles.menuIcon} />
                        Configurações
                    </Link>

                    <button onClick={handleLogout} className={styles.menuItem}>
                        <FaSignOutAlt className={styles.menuIcon} />
                        Sair
                    </button>
                </div>
            </div>
        );
    };

    const renderNotifications = () => {
        if (!showNotifications) return null;

        return (
            <div className={styles.notificationsMenu}>
                <div className={styles.notificationItem}>
                    <p>Novo interesse em adoção do Thor</p>
                    <small>Há 5 minutos</small>
                </div>
                <div className={styles.notificationItem}>
                    <p>Atualização no processo de adoção</p>
                    <small>Há 1 hora</small>
                </div>
                <div className={styles.notificationItem}>
                    <p>Nova mensagem recebida</p>
                    <small>Há 2 horas</small>
                </div>
            </div>
        );
    };

    const renderMessages = () => {
        if (!showMessages) return null;

        return (
            <div className={styles.messagesMenu}>
                <div className={styles.messageItem}>
                    <p>Maria Silva</p>
                    <small>Olá, gostaria de saber mais sobre o Thor...</small>
                </div>
                <div className={styles.messageItem}>
                    <p>João Santos</p>
                    <small>Quando posso visitar o pet?</small>
                </div>
                <div className={styles.messageItem}>
                    <p>Ana Oliveira</p>
                    <small>Obrigada pelo retorno!</small>
                </div>
            </div>
        );
    };

    return (
        <div>
            {renderProfileMenu()}
            <div className={styles.iconsContainer}>
                <div className={styles.iconWrapper}>
                    <button 
                        className={styles.iconButton}
                        onClick={() => {
                            setShowMessages(!showMessages);
                            setShowNotifications(false);
                        }}
                    >
                        <FaEnvelope />
                        <span className={styles.notificationBadge}>3</span>
                    </button>
                    {renderMessages()}
                </div>

                <div className={styles.iconWrapper}>
                    <button 
                        className={styles.iconButton}
                        onClick={() => {
                            setShowNotifications(!showNotifications);
                            setShowMessages(false);
                        }}
                    >
                        <FaBell />
                        <span className={styles.notificationBadge}>2</span>
                    </button>
                    {renderNotifications()}
                </div>
            </div>
        </div>
    );
};

export default Navigation; 
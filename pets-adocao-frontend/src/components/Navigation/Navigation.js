import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaPaw, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import styles from './Navigation.module.css';

const Navigation = () => {
    const { user, isAuthenticated } = useAuth();
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);
    const [showMenu, setShowMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showMessages, setShowMessages] = useState(false);

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

    return (
        <div>
            {renderProfileMenu()}
        </div>
    );
};

export default Navigation; 
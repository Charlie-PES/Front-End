import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Perfil.module.css';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Perfil = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className={styles.container}>
        <h1>Acesso Negado</h1>
        <p>Você precisa estar logado para acessar esta página.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <div className={styles.avatarContainer}>
            <FaUser size={60} className={styles.avatarIcon} />
          </div>
          <h1 className={styles.userName}>{user.displayName || 'Usuário'}</h1>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.infoItem}>
            <FaEnvelope className={styles.icon} />
            <div>
              <h3>Email</h3>
              <p>{user.email}</p>
            </div>
          </div>

          {user.phone && (
            <div className={styles.infoItem}>
              <FaPhone className={styles.icon} />
              <div>
                <h3>Telefone</h3>
                <p>{user.phone}</p>
              </div>
            </div>
          )}

          {user.address && (
            <div className={styles.infoItem}>
              <FaMapMarkerAlt className={styles.icon} />
              <div>
                <h3>Endereço</h3>
                <p>{user.address}</p>
              </div>
            </div>
          )}
        </div>

        {user.type === 'ong' && (
          <div className={styles.ongSection}>
            <h2>Informações da ONG</h2>
            <p><strong>CNPJ:</strong> {user.cnpj}</p>
            <p><strong>Responsável:</strong> {user.responsible}</p>
          </div>
        )}

        {user.type === 'tutor' && (
          <div className={styles.tutorSection}>
            <h2>Informações do Tutor</h2>
            <p><strong>CPF:</strong> {user.cpf}</p>
            <p><strong>Experiência:</strong> {user.experience}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Perfil; 
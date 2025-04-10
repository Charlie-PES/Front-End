import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Perfil.module.css';
import { FaUserEdit, FaPlusCircle, FaPaw, FaHeart, FaHistory, FaSignOutAlt } from 'react-icons/fa';

const Perfil = () => {
  const usuario = {
    nome: 'Ana Beatriz Souza',
    email: 'ana@example.com',
    cidade: 'São Paulo - SP',
    telefone: '(11) 91234-5678',
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.userInfo}>
          <img src="/images/user-avatar.png" alt="Avatar" className={styles.avatar} />
          <h2>{usuario.nome}</h2>
          <p>{usuario.email}</p>
          <p>{usuario.cidade}</p>
          <p>{usuario.telefone}</p>
        </div>

        <div className={styles.actions}>
          <button className={styles.actionButton}>
            <FaUserEdit /> Editar Perfil
          </button>
          <button className={styles.actionButton}>
            <FaPlusCircle /> Cadastrar Pet
          </button>
          <Link to="/acompanhamento" className={styles.actionButton}>
            <FaPaw /> Acompanhamento Pós-Adoção
          </Link>
          <button className={styles.actionButton}>
            <FaHistory /> Histórico de Adoções
          </button>
          <button className={styles.actionButton}>
            <FaHeart /> Pets Favoritados
          </button>
          <button className={`${styles.actionButton} ${styles.logout}`}>
            <FaSignOutAlt /> Sair da Conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Perfil;

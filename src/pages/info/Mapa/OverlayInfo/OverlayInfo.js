import React from 'react';
import styles from './OverlayInfo.module.css';
import { FaClock, FaMapMarkerAlt, FaTimes } from 'react-icons/fa';

const OverlayInfo = ({ ong, onClose }) => {
  if (!ong) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <button className={styles.closeButton} onClick={onClose}>
          <FaTimes />
        </button>

        <img
          src={ong.imagem || '/images/banner-default.jpg'}
          alt={ong.nome}
          className={styles.cover}
        />

        <div className={styles.content}>
          <h2>{ong.nome}</h2>
          <p>{ong.descricao}</p>

          {ong.telefone && (
            <p><strong>Telefone:</strong> {ong.telefone}</p>
          )}

          <div className={styles.visitInfo}>
            <div>
              <FaClock /> Horário de visitas<br />Das 18h até 8h
            </div>
            <div>
              <FaMapMarkerAlt /> Atendemos<br />Fins de semana
            </div>
          </div>

          <button className={styles.contactBtn}>
            📞 Entrar em contato
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverlayInfo;

import React from 'react';
import styles from './OverlayDetalhesONG.module.css';
import { FaTimes, FaClock, FaInfoCircle, FaPhone, FaEnvelope } from 'react-icons/fa';

const OverlayDetalhesONG = ({ ong, onClose }) => {
  if (!ong) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <button className={styles.closeBtn} onClick={onClose}>
          <FaTimes />
        </button>

        <img
          src={ong.picture || '/images/default-cover.jpg'}
          alt="Capa ONG"
          className={styles.cover}
        />

        <div className={styles.gallery}>
          {(ong.galeria || []).map((img, i) => (
            <img key={i} src={img} alt={`galeria-${i}`} />
          ))}
        </div>

        <h2>{ong.name}</h2>
        <p className={styles.descricao}>{ong.owner_details?.description || 'Sem descrição disponível'}</p>

        {ong.address && ong.address.length > 0 && (
          <div className={styles.mapaPreview}>
            <img
              src="https://via.placeholder.com/400x150.png?text=Mapa+da+Localiza%C3%A7%C3%A3o"
              alt="Mapa"
            />
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${ong.address[0].street},${ong.address[0].number},${ong.address[0].neighborhood},${ong.address[0].city},${ong.address[0].state}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver rotas no Google Maps
            </a>
          </div>
        )}

        <div className={styles.visitaBox}>
          <h3>Informações de Contato</h3>
          <div className={styles.infoVisita}>
            <div>
              <FaPhone /> Telefone: {ong.phone}
            </div>
            <div>
              <FaEnvelope /> Email: {ong.email}
            </div>
            {ong.owner_details?.additional_data?.visiting_hours && (
              <div>
                <FaClock /> Horário de visitas: {ong.owner_details.additional_data.visiting_hours}
              </div>
            )}
            {ong.owner_details?.additional_data?.visiting_days && (
              <div>
                <FaInfoCircle /> Atendemos: {ong.owner_details.additional_data.visiting_days}
              </div>
            )}
          </div>
        </div>

        <button className={styles.contatoBtn}>Entrar em contato</button>
      </div>
    </div>
  );
};

export default OverlayDetalhesONG;


import React from 'react';
import styles from './OverlayDetalhesONG.module.css';
import { FaTimes, FaClock, FaInfoCircle } from 'react-icons/fa';

const OverlayDetalhesONG = ({ ong, onClose }) => {
  if (!ong) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <button className={styles.closeBtn} onClick={onClose}>
          <FaTimes />
        </button>

        <img
          src={ong.imagemPrincipal || '/images/default-cover.jpg'}
          alt="Capa ONG"
          className={styles.cover}
        />

        <div className={styles.gallery}>
          {(ong.galeria || []).map((img, i) => (
            <img key={i} src={img} alt={`galeria-${i}`} />
          ))}
        </div>

        <h2>{ong.nome}</h2>
        <p className={styles.descricao}>{ong.descricao}</p>

        <div className={styles.mapaPreview}>
          <img
            src="https://via.placeholder.com/400x150.png?text=Mapa+da+Localiza%C3%A7%C3%A3o"
            alt="Mapa"
          />
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${ong.lat},${ong.lng}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver rotas no Google Maps
          </a>
        </div>

        <div className={styles.visitaBox}>
          <h3>Instruções para visita</h3>
          <p>
            Venha como se sentir à vontade e traga muito amor e paciência para dar.
          </p>

          <div className={styles.infoVisita}>
            <div>
              <FaClock /> Horário de visitas: {ong.horario || 'Das 18h às 8h'}
            </div>
            <div>
              <FaInfoCircle /> Atendemos: {ong.dias || 'Fim de semana'}
            </div>
          </div>
        </div>

        <button className={styles.contatoBtn}>Entrar em contato</button>
      </div>
    </div>
  );
};

export default OverlayDetalhesONG;

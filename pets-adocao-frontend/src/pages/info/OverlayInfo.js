import React from 'react';
import styles from './OverlayInfo.module.css';

const OverlayInfo = ({ ong, onClose }) => {
  if (!ong) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <button className={styles.closeBtn} onClick={onClose}>✖</button>

        <img src="/images/banner-exemplo.jpg" alt="Foto da ONG" className={styles.banner} />
        <h2>{ong.nome}</h2>
        <p className={styles.desc}>{ong.descricao}</p>

        <div className={styles.mapPreview}>
          <iframe
            title="map"
            width="100%"
            height="180"
            style={{ border: 0, borderRadius: "10px" }}
            src={`https://maps.google.com/maps?q=${ong.posicao[0]},${ong.posicao[1]}&z=15&output=embed`}
          ></iframe>
          <a href={`https://www.google.com/maps?q=${ong.posicao[0]},${ong.posicao[1]}`} target="_blank" rel="noreferrer">
            Ver no Google Maps
          </a>
        </div>

        <div className={styles.infos}>
          <h3>Instruções para visita</h3>
          <p>Estamos abertos para visitas com agendamento.</p>
        </div>

        <button className={styles.contatoBtn}>📞 Entrar em contato</button>
      </div>
    </div>
  );
};

export default OverlayInfo;

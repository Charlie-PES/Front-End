import React from 'react';
import styles from './Apoiadores.module.css';

const Apoiadores = () => {
  const logos = [
    { nome: 'PetLovers Inc.', src: '/images/petlovers.png' },
    { nome: 'Vida Animal ONG', src: '/images/vidaanimal.png' },
    { nome: 'Amigos dos Bichos', src: '/images/amigos.png' },
    { nome: 'Pets+ Saúde', src: '/images/petssaude.png' },
  ];

  return (
    <div className={styles.apoiadoresContainer}>
      <h1 className={styles.titulo}>Apoiadores</h1>
      <p className={styles.subtitulo}>Conheça quem acredita e investe nessa causa com a gente!</p>

      <div className={styles.gridLogos}>
        {logos.map((logo, index) => (
          <div className={styles.logoCard} key={index}>
            <img src={logo.src} alt={logo.nome} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apoiadores;

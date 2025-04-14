import React from 'react';
import styles from './Apoiadores.module.css';

const apoiadores = [
  {
    nome: 'PetLovers Inc.',
    imagem: '/images/parceiro1.png',
    link: 'https://www.petlovers.com',
  },
  {
    nome: 'Vida Animal ONG',
    imagem: '/images/parceiro2.png',
    link: 'https://www.vidaanimal.org',
  },
  {
    nome: 'Amigos dos Bichos',
    imagem: '/images/parceiro3.png',
    link: 'https://www.amigosdosbichos.com',
  }
];

const Apoiadores = () => {
  return (
    <section className={styles.apoiadoresContainer}>
      <h2 className={styles.titulo}>Conheça nossos apoiadores 🐾</h2>
      <p className={styles.subtitulo}>
        Empresas e ONGs que acreditam e investem na nossa causa.
      </p>

      <div className={styles.gridLogos}>
        {apoiadores.map((apoio, index) => (
          <a
            key={index}
            href={apoio.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.logoCard}
            aria-label={`Visitar o site de ${apoio.nome}`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <figure>
              <img
                src={apoio.imagem}
                alt={`Logo de ${apoio.nome}`}
                loading="lazy"
              />
              <figcaption>{apoio.nome}</figcaption>
            </figure>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Apoiadores;

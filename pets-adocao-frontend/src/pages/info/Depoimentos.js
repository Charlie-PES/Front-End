import React, { useRef, useEffect, useState } from 'react';
import styles from './Depoimentos.module.css';

const Depoimentos = () => {
  const [mensagem, setMensagem] = useState('');
  const carouselRef = useRef(null);

  const depoimentos = [
    { nome: 'Ana', texto: 'Adotar foi a melhor escolha que fiz na vida!' },
    { nome: 'Carlos', texto: 'A ONG foi super atenciosa no processo!' },
    { nome: 'Beatriz', texto: 'Hoje tenho um companheiro incrível graças à adoção.' },
    { nome: 'João', texto: 'Recomendo muito! Profissionais dedicados e sérios.' },
    { nome: 'Marta', texto: 'Mudou minha vida e a do meu novo amiguinho 🐾' },
  ];

  // Autoplay scroll suave
  useEffect(() => {
    const container = carouselRef.current;
    let scrollAmount = 0;
    const interval = setInterval(() => {
      if (!container) return;
      container.scrollBy({ left: 320, behavior: 'smooth' });
      scrollAmount += 320;
      if (scrollAmount >= container.scrollWidth - container.clientWidth) {
        scrollAmount = 0;
        container.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.testimonialPage}>
      <h1>💬 Depoimentos</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert('Depoimento enviado!');
          setMensagem('');
        }}
        className={styles.testimonialForm}
      >
        <textarea
          placeholder="Escreva seu depoimento..."
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          required
        />
        <button type="submit">Enviar</button>
      </form>

      <div className={styles.carouselWrapper}>
        <div className={styles.carouselTrack} ref={carouselRef}>
          {depoimentos.map((depo, index) => (
            <div className={styles.testimonialCard} key={index}>
              <h4>{depo.nome}</h4>
              <p>"{depo.texto}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Depoimentos;

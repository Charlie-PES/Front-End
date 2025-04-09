import React from 'react';
import styles from './Sobre.module.css';

const Sobre = () => {
  return (
    <div className={styles.sobreContainer}>
      <h1>Sobre o Projeto</h1>
      <p>
        Nosso sistema de adoção de pets foi criado com o objetivo de conectar animais que precisam de um lar com pessoas que estão prontas para oferecer amor e carinho. 🐶🐱
      </p>

      <h2>Missão</h2>
      <p>
        Facilitar o processo de adoção, promovendo a responsabilidade, transparência e cuidado com os animais.
      </p>

      <h2>Quem somos</h2>
      <p>
        Somos um grupo de estudantes apaixonados por tecnologia e pela causa animal. Acreditamos que todos os pets merecem um lar amoroso!
      </p>

      <h2>Entre em contato</h2>
      <p>
        📧 Email: contato@adocaopets.com.br<br />
        📱 WhatsApp: (11) 91234-5678
      </p>

      <div className={styles.imgContainer}>
        <img src="/images/logo.png" alt="Logo do projeto" />
      </div>
    </div>
  );
};

export default Sobre;

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import { FaPaw, FaMapMarkerAlt, FaHeart, FaHandHoldingHeart } from 'react-icons/fa';

const Home = () => {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1>Encontre seu novo melhor amigo</h1>
        <p>Adote um pet e mude uma vida para sempre</p>
      </section>

      <section className={styles.actions}>
        <h2>O que você gostaria de fazer?</h2>
        <div className={styles.actionButtons}>
          <Link to="/adotar" className={styles.actionButton}>
            <FaPaw className={styles.actionIcon} />
            <span>Ver Pets Disponíveis</span>
          </Link>
          <Link to="/mapa" className={styles.actionButton}>
            <FaMapMarkerAlt className={styles.actionIcon} />
            <span>Encontrar Pets Próximos</span>
          </Link>
          <Link to="/matchpage" className={styles.actionButton}>
            <FaHeart className={styles.actionIcon} />
            <span>Fazer Match com Pets</span>
          </Link>
          <Link to="/doacoes" className={styles.actionButton}>
            <FaHandHoldingHeart className={styles.actionIcon} />
            <span>Ajudar com Doações</span>
          </Link>
        </div>
      </section>

      <section className={styles.features}>
        <h2>Por que adotar?</h2>
        <div className={styles.featureGrid}>
          <div className={styles.feature}>
            <h3>Amor Incondicional</h3>
            <p>Pets adotados são conhecidos por serem extremamente gratos e leais aos seus novos tutores.</p>
          </div>
          <div className={styles.feature}>
            <h3>Vida Mais Saudável</h3>
            <p>Ter um pet pode reduzir o estresse e melhorar sua saúde física e mental.</p>
          </div>
          <div className={styles.feature}>
            <h3>Segunda Chance</h3>
            <p>Você estará dando uma nova oportunidade para um animal que precisa de um lar.</p>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <h2>Pronto para começar sua jornada?</h2>
        <p>Encontre o pet perfeito para você e sua família</p>
        <Link to="/adotar" className={styles.ctaButton}>
          Começar Agora
        </Link>
      </section>
    </div>
  );
};

export default Home; 
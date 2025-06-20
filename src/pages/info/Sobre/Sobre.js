import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaHandshake, FaUsers, FaPaw, FaDog, FaCat, FaHome } from 'react-icons/fa';
import styles from './Sobre.module.css';
import { ThemeContext } from '../../../contexts/ThemeContext';

const Sobre = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`${styles.sobreContainer} ${darkMode ? styles.darkMode : ''}`}>
      
      <section className={styles.heroSection}>
        <h1>Sobre Nós</h1>
        <p>
          Somos uma organização dedicada a encontrar lares amorosos para animais abandonados,
          promovendo a adoção responsável e o bem-estar animal.
        </p>
      </section>

      <section className={styles.missionSection}>
        
        <div className={styles.missionCard}>
          <FaHeart className={styles.missionIcon} />
          <h2>Nossa Missão</h2>
          <p>
            Conectar animais abandonados a famílias amorosas, promovendo a adoção responsável
            e o bem-estar animal em nossa comunidade.
          </p>
        </div>

        <div className={styles.missionCard}>
          <FaHandshake className={styles.missionIcon} />
          <h2>Nossa Visão</h2>
          <p>
            Ser referência em adoção de animais, criando uma sociedade mais consciente
            e compassiva com os animais.
          </p>
        </div>

        <div className={styles.missionCard}>
          <FaUsers className={styles.missionIcon} />
          <h2>Nossos Valores</h2>
          <p>
            Compaixão, responsabilidade, transparência e dedicação ao bem-estar
            dos animais e das famílias.
          </p>
        </div>
      </section>

      <section className={styles.valuesSection}>
        <h2>Nossos Valores</h2>
        <div className={styles.valuesGrid}>
          <div className={styles.valueCard}>
            <FaHeart className={styles.valueIcon} />
            <h3>Amor</h3>
            <p>
              Acreditamos que todo animal merece amor e carinho, independentemente
              de sua história ou condição.
            </p>
          </div>

          <div className={styles.valueCard}>
            <FaHandshake className={styles.valueIcon} />
            <h3>Responsabilidade</h3>
            <p>
              Promovemos a adoção responsável, garantindo que cada animal encontre
              um lar adequado às suas necessidades.
            </p>
          </div>

          <div className={styles.valueCard}>
            <FaUsers className={styles.valueIcon} />
            <h3>Comunidade</h3>
            <p>
              Trabalhamos em conjunto com a comunidade para criar um ambiente
              mais acolhedor para os animais.
            </p>
          </div>

          <div className={styles.valueCard}>
            <FaPaw className={styles.valueIcon} />
            <h3>Bem-estar</h3>
            <p>
              Priorizamos o bem-estar dos animais, oferecendo cuidados adequados
              e acompanhamento pós-adoção.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <h2>Faça Parte da Nossa História</h2>
        <p>
          Junte-se a nós nessa jornada de amor e compaixão. Adote um pet e
          transforme não só a vida dele, mas também a sua.
        </p>
        <Link to="/adotar" className={styles.ctaButton}>
          <FaPaw /> Adotar um Pet
        </Link>
      </section>
    
    </div>
  );
};

export default Sobre; 
import React, { useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { FaHeart, FaPaw, FaUsers, FaHandHoldingHeart, FaChartLine, FaGlobe } from 'react-icons/fa';
import styles from './Sobre.module.css';

const Sobre = () => {
  const { darkMode } = useContext(ThemeContext);

  const valores = [
    {
      icone: <FaHeart />,
      titulo: "Amor pelos Animais",
      descricao: "Acreditamos que cada animal merece um lar amoroso e uma família que o ame incondicionalmente."
    },
    {
      icone: <FaPaw />,
      titulo: "Responsabilidade",
      descricao: "Promovemos a adoção responsável, garantindo que cada pet encontre o lar perfeito para suas necessidades."
    },
    {
      icone: <FaUsers />,
      titulo: "Comunidade",
      descricao: "Construímos uma comunidade unida de amantes de animais, protetores e adotantes."
    },
    {
      icone: <FaHandHoldingHeart />,
      titulo: "Compromisso",
      descricao: "Nos dedicamos a fazer a diferença na vida dos animais e das pessoas que os acolhem."
    }
  ];

  const estatisticas = [
    {
      numero: "10K+",
      texto: "Adoções Realizadas",
      icone: <FaChartLine />
    },
    {
      numero: "500+",
      texto: "ONGs Parceiras",
      icone: <FaGlobe />
    },
    {
      numero: "50K+",
      texto: "Usuários Ativos",
      icone: <FaUsers />
    }
  ];

  return (
    <div className={`${styles.sobreContainer} ${darkMode ? styles.darkMode : ''}`}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Nossa História</h1>
          <p>Conectando corações e transformando vidas através da adoção responsável de pets.</p>
        </div>
      </section>

      <section className={styles.missao}>
        <div className={styles.missaoContent}>
          <h2>Nossa Missão</h2>
          <p>Facilitar o processo de adoção de pets, conectando animais que precisam de um lar com pessoas que desejam adotar, promovendo a responsabilidade e o bem-estar animal.</p>
        </div>
      </section>

      <section className={styles.valores}>
        <h2>Nossos Valores</h2>
        <div className={styles.valoresGrid}>
          {valores.map((valor, index) => (
            <div key={index} className={styles.valorCard}>
              <div className={styles.valorIcone}>{valor.icone}</div>
              <h3>{valor.titulo}</h3>
              <p>{valor.descricao}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.estatisticas}>
        <div className={styles.estatisticasGrid}>
          {estatisticas.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statIcone}>{stat.icone}</div>
              <h3>{stat.numero}</h3>
              <p>{stat.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.impacto}>
        <div className={styles.impactoContent}>
          <h2>Nosso Impacto</h2>
          <p>Desde nossa fundação, temos trabalhado incansavelmente para criar um mundo onde cada pet tenha um lar amoroso. Nossa plataforma já ajudou milhares de animais a encontrarem suas famílias perfeitas.</p>
          <div className={styles.impactoGrid}>
            <div className={styles.impactoCard}>
              <h3>Para os Pets</h3>
              <ul>
                <li>Encontram lares amorosos</li>
                <li>Recebem cuidados adequados</li>
                <li>Ganham uma família</li>
              </ul>
            </div>
            <div className={styles.impactoCard}>
              <h3>Para as Famílias</h3>
              <ul>
                <li>Encontram companheiros leais</li>
                <li>Vivenciam momentos especiais</li>
                <li>Fazem parte de uma comunidade</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sobre; 
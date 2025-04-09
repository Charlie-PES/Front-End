import React from 'react';
import styles from './Home.module.css';

const Home = () => {
  const pets = [
    {
      nome: 'Ronaldinho',
      desc: 'Muito fofo, inteligente e educado',
      img: '/images/dog1.png',
    },
    {
      nome: 'Bolinha',
      desc: 'Super simpático, leal e sabe muito',
      img: '/images/dog2.png',
    },
    {
      nome: 'Zezé',
      desc: 'Super carente, simples, ama passeios e queijo',
      img: '/images/dog3.png',
    },
  ];

  const steps = [
    { texto: 'Escolha um animalzinho', img: '/images/dog5.png' },
    { texto: 'Adote ele', img: '/images/dog6.png' },
    { texto: 'Deixam amigos para sempre', img: '/images/dog7.png' },
  ];

  return (
    <div className={styles.homeContainer}>

      {/* Banner principal */}
      <section className={styles.banner}>
        <div className={styles.bannerText}>
          <h1>Seja bem-vindo!</h1>
          <p>Adote doguinhos e gatinhos</p>
          <button className={styles.adoptButton}>Adote agora</button>
        </div>
        <img src="/images/logo.png" alt="Dog Banner" className={styles.bannerImage} />
      </section>

      {/* Categorias */}
      <section className={styles.categories}>
        <div className={styles.categoryCard}>
          <img src="/images/dog1.png" alt="Cachorros" />
          <p>Cachorros</p>
        </div>
        <div className={styles.categoryCard}>
          <img src="/images/cat1.png" alt="Gatos" />
          <p>Gatos</p>
        </div>
        <div className={styles.categoryCard}>
          <img src="/images/misc1.png" alt="Outros" />
          <p>Outros animais</p>
        </div>
      </section>

      {/* Pets para adoção */}
      <section className={styles.petsSection}>
        <h2>Pets para adoção</h2>
        <small>Olhe nossos amiguinhos</small>

        <div className={styles.petCards}>
          {pets.map((pet, i) => (
            <div key={i} className={styles.petCard}>
              <img src={pet.img} alt={pet.nome} />
              <h3>{pet.nome}</h3>
              <p>{pet.desc}</p>
              <button className={styles.adotarBtn}>ME ADOTE</button>
            </div>
          ))}
        </div>
      </section>

      {/* Etapas para adoção */}
      <section className={styles.stepsSection}>
        <h2>Love algum animalzinho?</h2>
        <p>Siga esses passos</p>

        <div className={styles.steps}>
          {steps.map((step, i) => (
            <div key={i} className={styles.stepCard}>
              <img src={step.img} alt={`Passo ${i + 1}`} />
              <p>{step.texto}</p>
            </div>
          ))}
        </div>

        <button className={styles.adoptNowBtn}>ADOTE AGORA</button>
      </section>

    </div>
  );
};

export default Home;

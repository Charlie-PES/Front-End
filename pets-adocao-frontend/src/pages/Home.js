import React from 'react';
import styles from './Home.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
    {
      nome: 'Luna',
      desc: 'Brincalhona e adora correr',
      img: '/images/dog4.png',
    },
  ];

  const steps = [
    { texto: 'Escolha um animalzinho', img: '/images/dog5.png' },
    { texto: 'Adote ele', img: '/images/dog6.png' },
    { texto: 'Sejam amigos para sempre', img: '/images/dog7.png' },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 600,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className={styles.homeContainer}>

      {/* Banner principal */}
      <section className={styles.banner}>
        <div className={styles.bannerText}>
          <h1>Seja bem-vindo!</h1>
          <p>Adote doguinhos e gatinhos</p>
          <a href="#pets" className={styles.adoptButton}>Ver pets</a>
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

      {/* Pets para adoção com carrossel */}
      <section id="pets" className={styles.petsSection}>
        <h2>Pets para adoção</h2>
        <small>Conheça nossos amiguinhos</small>

        <div className={styles.sliderContainer}>
          <Slider {...sliderSettings}>
            {pets.map((pet, i) => (
              <div key={i} className={styles.petCard}>
                <img src={pet.img} alt={pet.nome} />
                <h3>{pet.nome}</h3>
                <p>{pet.desc}</p>
                <button className={styles.adotarBtn}>ME ADOTE</button>
              </div>
            ))}
          </Slider>
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

        <a href="#pets" className={styles.adoptNowBtn}>Ver pets disponíveis</a>
      </section>

    </div>
  );
};

export default Home;

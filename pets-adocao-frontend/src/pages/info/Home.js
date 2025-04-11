import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaPaw, FaHeart, FaSearch } from 'react-icons/fa';

const Home = () => {
  
  const [activeCategory, setActiveCategory] = useState('todos');

  const pets = [
    {
      id: 1,
      nome: 'Ronaldinho',
      desc: 'Muito fofo, inteligente e educado',
      img: '/images/dog1.png',
      categoria: 'cachorro',
      idade: '2 anos',
      porte: 'Médio',
      localizacao: 'São Paulo, SP'
    },
    {
      id: 2,
      nome: 'Bolinha',
      desc: 'Super simpático, leal e sabe muito',
      img: '/images/dog2.png',
      categoria: 'cachorro',
      idade: '1 ano',
      porte: 'Pequeno',
      localizacao: 'Rio de Janeiro, RJ'
    },
    {
      id: 3,
      nome: 'Zezé',
      desc: 'Super carente, simples, ama passeios e queijo',
      img: '/images/dog3.png',
      categoria: 'cachorro',
      idade: '3 anos',
      porte: 'Grande',
      localizacao: 'Belo Horizonte, MG'
    },
    {
      id: 4,
      nome: 'Luna',
      desc: 'Brincalhona e adora correr',
      img: '/images/dog4.png',
      categoria: 'gato',
      idade: '1 ano',
      porte: 'Pequeno',
      localizacao: 'Curitiba, PR'
    },
  ];

  const steps = [
    { 
      texto: 'Escolha um animalzinho', 
      img: '/images/dog5.png',
      desc: 'Navegue pela nossa lista de pets disponíveis para adoção'
    },
    { 
      texto: 'Adote ele', 
      img: '/images/dog6.png',
      desc: 'Preencha o formulário de adoção e aguarde o contato'
    },
    { 
      texto: 'Sejam amigos para sempre', 
      img: '/images/dog7.png',
      desc: 'Dê muito amor e carinho ao seu novo amigo'
    },
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

  const filteredPets = activeCategory === 'todos' 
    ? pets 
    : pets.filter(pet => pet.categoria === activeCategory);

  return (
    
    <div className={styles.homeContainer}>
      
      {/* Banner principal */}
      
      <section className={styles.banner}>
          
          <div className={styles.bannerText}>
              <h1>Encontre seu novo melhor amigo!</h1>
              
              <p>Adote um pet e mude uma vida para sempre</p>
              
              <div className={styles.bannerButtons}>

                <Link to="/adotar" className={styles.adoptButton}>
                  <FaHeart /> Ver pets disponíveis
                </Link>
                
                <Link to="/mapa" className={styles.mapButton}>
                  <FaSearch /> Encontrar pets próximos
                </Link>
              </div>
          </div>
          
          <img src="/images/logo.png" alt="Dog Banner" className={styles.bannerImage} />
      
      </section>

      {/* Categorias */}
      <section className={styles.categories}>
        <button 
          className={`${styles.categoryCard} ${activeCategory === 'todos' ? styles.active : ''}`}
          onClick={() => setActiveCategory('todos')}
        >
          <img src="/images/all.png" alt="Todos" />
          <p>Todos</p>
        </button>
        <button 
          className={`${styles.categoryCard} ${activeCategory === 'cachorro' ? styles.active : ''}`}
          onClick={() => setActiveCategory('cachorro')}
        >
          <img src="/images/dog1.png" alt="Cachorros" />
          <p>Cachorros</p>
        </button>
        <button 
          className={`${styles.categoryCard} ${activeCategory === 'gato' ? styles.active : ''}`}
          onClick={() => setActiveCategory('gato')}
        >
          <img src="/images/cat1.png" alt="Gatos" />
          <p>Gatos</p>
        </button>
        <button 
          className={`${styles.categoryCard} ${activeCategory === 'outros' ? styles.active : ''}`}
          onClick={() => setActiveCategory('outros')}
        >
          <img src="/images/misc1.png" alt="Outros" />
          <p>Outros animais</p>
        </button>
      </section>

      {/* Pets para adoção com carrossel */}
      <section id="pets" className={styles.petsSection}>
        <h2>Pets para adoção</h2>
        <p className={styles.sectionDescription}>Conheça nossos amiguinhos que estão procurando um lar</p>

        <div className={styles.sliderContainer}>
          <Slider {...sliderSettings}>
            {filteredPets.map((pet) => (
              <div key={pet.id} className={styles.petCard}>
                <img src={pet.img} alt={pet.nome} />
                <div className={styles.petInfo}>
                  <h3>{pet.nome}</h3>
                  <p className={styles.petDesc}>{pet.desc}</p>
                  <div className={styles.petDetails}>
                    <span>{pet.idade}</span>
                    <span>{pet.porte}</span>
                    <span>{pet.localizacao}</span>
                  </div>
                  <Link to={`/pet/${pet.id}`} className={styles.adotarBtn}>
                    ME ADOTE
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Etapas para adoção */}
      <section className={styles.stepsSection}>
        <h2>Como adotar um pet?</h2>
        <p className={styles.sectionDescription}>Siga esses passos simples para encontrar seu novo amigo</p>

        <div className={styles.steps}>
          {steps.map((step, i) => (
            <div key={i} className={styles.stepCard}>
              <div className={styles.stepNumber}>{i + 1}</div>
              <img src={step.img} alt={`Passo ${i + 1}`} />
              <h3>{step.texto}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>

        <Link to="/adotar" className={styles.adoptNowBtn}>
          Ver pets disponíveis
        </Link>
      </section>
    </div>
  );
};

export default Home;

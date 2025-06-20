import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaHeart, FaSearch, FaChevronLeft, FaChevronRight, FaBone, FaCat, FaUserFriends, FaCut, FaUser, FaBuilding, FaPaw, FaMapMarkerAlt, FaHandHoldingHeart, FaHeartbeat, FaHome } from 'react-icons/fa';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { login } from '../../../services/authService';
import { useAuth } from '../../../contexts/AuthContext';
import { getAvailablePets } from '../../../services/matchService';
import PetCard from '../../../components/PetCard/PetCard';
import { getPetNews } from '../../../services/newsService';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('todos');
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noticias, setNoticias] = useState([]);
  const [loadingNoticias, setLoadingNoticias] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const data = await getAvailablePets();
        setPets(data);
      } catch (error) {
        console.error('Erro ao buscar pets:', error);
        setError('Erro ao carregar os pets. Por favor, tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    const fetchNoticias = async () => {
      setLoadingNoticias(true);
      const news = await getPetNews();
      setNoticias(news);
      setLoadingNoticias(false);
    };

    fetchPets();
    fetchNoticias();
  }, []);

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

  const parceiros = [
    '/images/parceiro1.png',
    '/images/parceiro2.png',
    '/images/parceiro3.png'
  ];

  const successStats = [
    {
      number: "480",
      text: "Adoções Realizadas",
      icon: <FaBone />
    },
    {
      number: "2283",
      text: "Pets Cadastrados",
      icon: <FaCat />
    },
    {
      number: "3639",
      text: "Usuários Ativos",
      icon: <FaUserFriends />
    },
    {
      number: "4355",
      text: "Pets Cuidados",
      icon: <FaCut />
    }
  ];

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div className={`${styles.sliderArrow} ${styles.nextArrow}`} onClick={onClick}>
        <FaChevronRight />
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className={`${styles.sliderArrow} ${styles.prevArrow}`} onClick={onClick}>
        <FaChevronLeft />
      </div>
    );
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 600,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      }
    ]
  };

  const filteredPets = activeCategory === 'todos' 
    ? pets 
    : pets.filter(pet => pet.traits.species === activeCategory);

  
  // Função utilitária para calcular idade
  function calcularIdade(dataNascimento) {
    if (!dataNascimento) return 'Não informado';
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade + (idade === 1 ? ' ano' : ' anos');
  }

  return (
    <div className={`${styles.homeContainer} ${darkMode ? styles.darkMode : ''}`}>
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

      {/* Pets para adoção */}
      <section id="pets" className={styles.petsSection}>
        <h2>Pets para adoção</h2>
        <p className={styles.sectionDescription}>Conheça nossos amiguinhos que estão procurando um lar</p>
        {loading ? (
          <div className={styles.loading}>Carregando...</div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <div className={styles.sliderContainer}>
            <Slider {...sliderSettings}>
              {filteredPets.slice(0, 5).map((pet) => (
                <PetCard key={pet._id} pet={pet} />
              ))}
            </Slider>
          </div>
        )}
      </section>

      {/* Etapas */}
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
      </section>

      {/* Contador de Sucesso */}
      <section className={styles.successCounter}>
        <div className={styles.testimonialHeader}>
          <span className={styles.sectionTag}>IMPACTO SOCIAL</span>
          <h2>Fazendo a Diferença</h2>
          <p>Juntos estamos transformando a vida de pets e famílias em todo o Brasil</p>
        </div>
        <div className={styles.statsGrid}>
          {successStats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statIcon}>{stat.icon}</div>
              <h3>{stat.number}</h3>
              <p>{stat.text}</p>
            </div>
          ))}
        </div>
      </section>

      <WhyAdopt />

      {/* Parceiros */}
      <section className={styles.partnersSection}>
        <h2>Apoiadores</h2>
        <div className={styles.partnerGrid}>
          {parceiros.map((logo, i) => (
            <div key={i} className={styles.partnerLogo}>
              <img src={logo} alt={`parceiro ${i + 1}`} />
            </div>
          ))}
        </div>
      </section>

          
      {/* Blog/Feed como última seção */}
      <section className={styles.blogSection}>
        <div className={styles.testimonialHeader}>
          <span className={styles.sectionTag}>ÚLTIMAS NOTÍCIAS</span>
          <h2>Fique por dentro das novidades</h2>
          <p>Acompanhe as últimas notícias sobre pets, eventos de adoção e dicas para cuidar do seu melhor amigo.</p>
        </div>
        <div className={styles.blogGrid}>
          {loadingNoticias ? (
            <p>Carregando notícias...</p>
          ) : noticias && noticias.length > 0 ? (
            noticias.map((noticia, index) => (
              <div key={index} className={styles.blogCard}>
                <div className={styles.blogImage}>
                  <img src={noticia.urlToImage || '/images/logo.png'} alt={noticia.title} />
                  <div className={styles.dateTag}>
                    <span>{new Date(noticia.publishedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</span>
                  </div>
                </div>
                <div className={styles.blogContent}>
                  <div className={styles.blogMeta}>
                    <span className={styles.category}>{noticia.source && noticia.source.name}</span>
                    <span className={styles.comments}>Notícia real</span>
                  </div>
                  <h3>{noticia.title}</h3>
                  <p className={styles.blogExcerpt}>{noticia.description}</p>
                  <a href={noticia.url} target="_blank" rel="noopener noreferrer" className={styles.readMore}>
                    Ler mais
                    <span className={styles.readMoreArrow}>→</span>
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p>Nenhuma notícia encontrada.</p>
          )}
        </div>
      </section>

    </div>
  );
};

const WhyAdopt = () => {
  return (
    <section className={styles.whyAdoptSection}>
      <div className={styles.sectionHeader}>
        <h2>Por que adotar?</h2>
        <p className={styles.sectionSubtitle}>Descubra os benefícios de dar um lar a um pet</p>
      </div>

      <div className={styles.benefitsGrid}>
        <div className={styles.benefitCard}>
          <div className={styles.benefitIcon}>
            <FaHeart />
          </div>
          <h3>Amor Incondicional</h3>
          <p>Pets adotados são conhecidos por serem extremamente gratos e leais aos seus novos tutores. O vínculo criado é único e especial.</p>
        </div>

        <div className={styles.benefitCard}>
          <div className={styles.benefitIcon}>
            <FaHeartbeat />
          </div>
          <h3>Vida Mais Saudável</h3>
          <p>Ter um pet pode reduzir o estresse, melhorar sua saúde física e mental, e trazer mais alegria ao seu dia a dia.</p>
        </div>

        <div className={styles.benefitCard}>
          <div className={styles.benefitIcon}>
            <FaHandHoldingHeart />
          </div>
          <h3>Segunda Chance</h3>
          <p>Você estará dando uma nova oportunidade para um animal que precisa de um lar, transformando vidas com amor e cuidado.</p>
        </div>
      </div>

    </section>
  );
};

export default Home;
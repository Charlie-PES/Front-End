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
import chatStyles from '../../../components/ChatButton/ChatButton.module.css';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('todos');
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

    fetchPets();
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

  const noticias = [
    { 
      id: 1,
      titulo: 'Campanha de vacinação gratuita começa em maio', 
      imagem: '/images/feed1.jpg',
      data: '15 Mai',
      categoria: 'SAÚDE PET',
      comentarios: '3 COMENTÁRIOS',
      resumo: 'Diversas clínicas veterinárias participarão da campanha oferecendo vacinação gratuita para cães e gatos.'
    },
    { 
      id: 2,
      titulo: 'Mega feira de adoção acontece neste fim de semana', 
      imagem: '/images/feed2.jpg',
      data: '18 Mai',
      categoria: 'EVENTOS',
      comentarios: '5 COMENTÁRIOS',
      resumo: 'Mais de 200 pets estarão disponíveis para adoção no evento que acontece no Parque Ibirapuera.'
    },
    { 
      id: 3,
      titulo: 'Novo abrigo com capacidade para 500 pets é inaugurado', 
      imagem: '/images/feed3.jpg',
      data: '20 Mai',
      categoria: 'NOVIDADES',
      comentarios: '2 COMENTÁRIOS',
      resumo: 'O espaço conta com área médica, hotel e creche para pets.'
    },
    {
      id: 4,
      titulo: 'Projeto de castração móvel atenderá comunidades carentes',
      imagem: '/images/feed4.jpg',
      data: '22 Mai',
      categoria: 'PROJETOS',
      comentarios: '8 COMENTÁRIOS',
      resumo: 'Unidade móvel percorrerá diferentes bairros oferecendo castração gratuita.'
    },
    {
      id: 5,
      titulo: 'Pesquisa revela: pets ajudam na recuperação de pacientes',
      imagem: '/images/feed5.jpg',
      data: '25 Mai',
      categoria: 'PESQUISA',
      comentarios: '12 COMENTÁRIOS',
      resumo: 'Estudo comprova benefícios da interação com animais durante tratamentos médicos.'
    },
    {
      id: 6,
      titulo: 'Nova lei aumenta punição para maus-tratos a animais',
      imagem: '/images/feed6.jpg',
      data: '27 Mai',
      categoria: 'LEGISLAÇÃO',
      comentarios: '15 COMENTÁRIOS',
      resumo: 'Penas mais severas para casos de abandono e maus-tratos entram em vigor.'
    }
  ];

  const depoimentos = [
    { nome: 'Carlos', texto: 'Adotar mudou minha vida! O Thor é incrível.', foto: '/images/avatar1.jpg' },
    { nome: 'Juliana', texto: 'Muito obrigada por essa plataforma maravilhosa!', foto: '/images/avatar2.jpg' },
    { nome: 'Fernanda', texto: 'Encontrei a Luna e agora somos inseparáveis.', foto: '/images/avatar3.jpg' },
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

  const testimonials = [
    {
      text: "A experiência com o site foi incrível! Encontrei minha Luna e hoje somos inseparáveis. O processo de adoção foi simples e transparente.",
      author: "Maria Silva",
      location: "São Paulo",
      image: "/images/avatar1.jpg"
    },
    {
      text: "Graças a esta plataforma, consegui dar um lar para dois gatinhos maravilhosos. A equipe foi super atenciosa durante todo o processo.",
      author: "João Santos",
      location: "Rio de Janeiro",
      image: "/images/avatar2.jpg"
    },
    {
      text: "Adotar mudou minha vida! O processo foi muito profissional e hoje tenho dois companheiros incríveis que trouxeram mais alegria para minha casa.",
      author: "Ana Oliveira",
      location: "Belo Horizonte",
      image: "/images/avatar3.jpg"
    }
  ];

  const blogPosts = [
    {
      date: "13 Mar",
      category: "PET GROOMING, PET SITTING",
      title: "Some toughly useful much walking before",
      image: "/images/blog1.jpg",
      comments: "0 COMMENT"
    },
    {
      date: "14 Mar",
      category: "PET CARE, PET SITTING",
      title: "Acute yellow re-laid less or affirmatively cats",
      image: "/images/blog2.jpg",
      comments: "5 COMMENTS"
    },
    {
      date: "14 Mar",
      category: "PET CARE",
      title: "Some toughly useful much walking before",
      image: "/images/blog3.jpg",
      comments: "0 COMMENT"
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

  // Função para login rápido mockado
  const handleQuickLogin = async (type) => {
    let email = '';
    let password = '';
    if (type === 'user') {
      email = 'usuario@teste.com';
      password = 'Teste@123';
    } else if (type === 'ong') {
      email = 'ong@teste.com';
      password = 'Teste@123';
    }
    try {
      const user = await login(email, password);
      setUser(user);
      if (type === 'user') {
        navigate('/perfil');
      } else {
        navigate('/ong/perfil');
      }
    } catch (e) {
      alert('Erro ao logar mock: ' + (e.message || e));
    }
  };

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
              {filteredPets.map((pet) => {
                // Tratar campos 'string' como 'Não informado'
                const nome = pet.name && pet.name !== 'string' ? pet.name : 'Não informado';
                const descricao = pet.traits?.description && pet.traits.description !== 'string' ? pet.traits.description : 'Não informado';
                const tamanho = pet.traits?.size && pet.traits.size !== 'string' ? pet.traits.size : 'Não informado';
                const idade = calcularIdade(pet.birthday_date);
                let imagem = '/images/default-pet.png';
                if (pet.picture && pet.picture !== 'string') imagem = pet.picture;
                return (
                  <div key={pet.id || nome + Math.random()} className={styles.petCard}>
                    <img src={imagem} alt={nome} />
                    <div className={styles.petInfo}>
                      <h3>{nome}</h3>
                      <p className={styles.petDesc}>{descricao}</p>
                      <div className={styles.petDetails}>
                        <span>{idade}</span>
                        <span>{tamanho}</span>
                      </div>
                      <Link to={`/pet/${pet.id || ''}`} className={styles.adotarBtn}>ME ADOTE</Link>
                    </div>
                  </div>
                );
              })}
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
        <Link to="/adotar" className={styles.adoptNowBtn}>Ver pets disponíveis</Link>
      </section>

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

      {/* Depoimentos */}
      <section className={styles.testimonialSection}>
        <div className={styles.testimonialHeader}>
          <span className={styles.sectionTag}>DEPOIMENTOS</span>
          <h2>Histórias de Sucesso</h2>
          <p>Descubra como a adoção responsável tem transformado vidas e criado laços eternos entre pets e suas novas famílias.</p>
        </div>
        <div className={styles.testimonialGrid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <p>{testimonial.text}</p>
                <div className={styles.testimonialAuthor}>
                  <span>{testimonial.author}</span>
                  <span className={styles.location}>{testimonial.location}</span>
                </div>
              </div>
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
          {noticias.map((noticia, index) => (
            <div key={index} className={styles.blogCard}>
              <div className={styles.blogImage}>
                <img src={noticia.imagem} alt={noticia.titulo} />
                <div className={styles.dateTag}>
                  <span>{noticia.data}</span>
                </div>
              </div>
              <div className={styles.blogContent}>
                <div className={styles.blogMeta}>
                  <span className={styles.category}>{noticia.categoria}</span>
                  <span className={styles.comments}>{noticia.comentarios}</span>
                </div>
                <h3>{noticia.titulo}</h3>
                <p className={styles.blogExcerpt}>{noticia.resumo}</p>
                <Link to={`/feed/${noticia.id}`} className={styles.readMore}>
                  Ler mais
                  <span className={styles.readMoreArrow}>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Botões escondidos para login mockado */}
      {process.env.REACT_APP_USE_MOCKS === 'true' && (
        <div style={{ position: 'fixed', top: 20, left: 20, zIndex: 1000, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <button
            className={chatStyles.chatButton}
            style={{ width: 60, height: 60 }}
            title="Login rápido usuário"
            onClick={() => handleQuickLogin('user')}
          >
            <FaUser size={28} />
          </button>
          <button
            className={chatStyles.chatButton}
            style={{ width: 60, height: 60 }}
            title="Login rápido ONG"
            onClick={() => handleQuickLogin('ong')}
          >
            <FaBuilding size={28} />
          </button>
        </div>
      )}

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

      <WhyAdopt />
      <WhyDonate />

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

      <div className={styles.ctaContainer}>
        <h3>Pronto para começar sua jornada?</h3>
        <p>Encontre o pet perfeito para você e sua família</p>
        <Link to="/adotar" className={styles.ctaButton}>
          Começar Agora
        </Link>
      </div>
    </section>
  );
};

const WhyDonate = () => {
  return (
    <section className={styles.whyDonateSection}>
      <div className={styles.sectionHeader}>
        <h2>A Importância de Doar</h2>
        <p className={styles.sectionSubtitle}>Sua contribuição faz a diferença na vida de muitos animais</p>
      </div>

      <div className={styles.donationContent}>
        <div className={styles.donationText}>
          <div className={styles.donationPoint}>
            <FaHandHoldingHeart className={styles.donationIcon} />
            <div>
              <h3>Suporte Vital</h3>
              <p>Sua doação ajuda a fornecer alimentos, medicamentos e cuidados veterinários essenciais para animais em situação de vulnerabilidade.</p>
            </div>
          </div>

          <div className={styles.donationPoint}>
            <FaHome className={styles.donationIcon} />
            <div>
              <h3>Lares Temporários</h3>
              <p>Contribui para a manutenção de abrigos e lares temporários, oferecendo um ambiente seguro e acolhedor enquanto os pets aguardam adoção.</p>
            </div>
          </div>

          <div className={styles.donationPoint}>
            <FaHeart className={styles.donationIcon} />
            <div>
              <h3>Segunda Chance</h3>
              <p>Ajuda a dar uma nova oportunidade para animais abandonados, permitindo que eles encontrem famílias amorosas e permanentes.</p>
            </div>
          </div>
        </div>

        <div className={styles.donationCTA}>
          <h3>Faça Parte Desta História</h3>
          <p>Cada doação, por menor que seja, tem um grande impacto na vida desses animais.</p>
          <Link to="/doacoes" className={styles.donateButton}>
            Quero Doar
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;

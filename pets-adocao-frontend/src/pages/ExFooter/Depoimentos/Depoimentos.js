import React, { useRef, useEffect, useState, useContext } from 'react';
import { FaHeart, FaStar, FaQuoteLeft, FaUserCircle, FaThumbsUp, FaShare } from 'react-icons/fa';
import { ThemeContext } from '../../../contexts/ThemeContext';
import styles from './Depoimentos.module.css';

/**
 * Componente Depoimentos
 * 
 * Este componente exibe depoimentos de usuários sobre suas experiências com adoção de pets.
 * Inclui um carrossel de depoimentos e um formulário para envio de novos depoimentos.
 * Implementa um design moderno, responsivo e adaptável ao modo escuro.
 */
const Depoimentos = () => {
  // Contexto de tema para suporte ao modo escuro
  const { darkMode } = useContext(ThemeContext);
  
  // Estados para gerenciar o componente
  const [mensagem, setMensagem] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [depoimentos, setDepoimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Referência para o carrossel
  const carouselRef = useRef(null);

  /**
   * Dados mockados para simular a resposta de uma API
   * Em produção, estes dados serão substituídos por chamadas ao backend
   */
  const mockDepoimentos = [
    { 
      id: 1, 
      nome: 'Ana Silva', 
      texto: 'Adotar o Thor foi a melhor decisão que tomei! Ele trouxe alegria e amor para minha casa. O processo foi simples e a ONG foi super atenciosa.', 
      data: '2023-05-15',
      avatar: null,
      likes: 24,
      compartilhamentos: 5
    },
    { 
      id: 2, 
      nome: 'Carlos Oliveira', 
      texto: 'A experiência de adotar através da plataforma foi incrível. Encontrei meu companheiro perfeito e o processo foi muito bem guiado pelos profissionais.', 
      data: '2023-06-22',
      avatar: null,
      likes: 18,
      compartilhamentos: 3
    },
    { 
      id: 3, 
      nome: 'Beatriz Santos', 
      texto: 'Hoje tenho um companheiro incrível graças à adoção. A Luna mudou completamente minha rotina para melhor. Recomendo a todos!', 
      data: '2023-07-10',
      avatar: null,
      likes: 32,
      compartilhamentos: 7
    },
    { 
      id: 4, 
      nome: 'João Pereira', 
      texto: 'Recomendo muito! Profissionais dedicados e sérios. O Max se adaptou perfeitamente à nossa família e é um amor de cachorro.', 
      data: '2023-08-05',
      avatar: null,
      likes: 15,
      compartilhamentos: 2
    },
    { 
      id: 5, 
      nome: 'Marta Costa', 
      texto: 'Mudou minha vida e a do meu novo amiguinho 🐾. A felicidade que ele traz para casa é indescritível. Obrigada por facilitarem esse processo!', 
      data: '2023-09-12',
      avatar: null,
      likes: 29,
      compartilhamentos: 4
    },
    { 
      id: 6, 
      nome: 'Ricardo Almeida', 
      texto: 'Adotar a Nina foi um presente! Ela é carinhosa, brincalhona e se adaptou perfeitamente à nossa família. O processo foi simples e rápido.', 
      data: '2023-10-18',
      avatar: null,
      likes: 21,
      compartilhamentos: 6
    }
  ];

  /**
   * Função para carregar depoimentos do backend
   * Em produção, esta função fará uma chamada API real
   */
  const carregarDepoimentos = async () => {
    try {
      setLoading(true);
      // Simulando uma chamada API com timeout
      setTimeout(() => {
        setDepoimentos(mockDepoimentos);
        setLoading(false);
      }, 1000);
      
      // Em produção, substituir por:
      // const response = await fetch('/api/depoimentos');
      // const data = await response.json();
      // setDepoimentos(data);
      // setLoading(false);
    } catch (err) {
      setError('Não foi possível carregar os depoimentos. Tente novamente mais tarde.');
      setLoading(false);
      console.error('Erro ao carregar depoimentos:', err);
    }
  };

  /**
   * Função para enviar um novo depoimento
   * Em produção, esta função fará uma chamada API real
   */
  const enviarDepoimento = async (e) => {
    e.preventDefault();
    
    if (!mensagem.trim() || !nome.trim() || !email.trim()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Simulando uma chamada API com timeout
      setTimeout(() => {
        // Adiciona o novo depoimento ao estado local
        const novoDepoimento = {
          id: depoimentos.length + 1,
          nome: nome,
          texto: mensagem,
          data: new Date().toISOString().split('T')[0],
          avatar: null,
          likes: 0,
          compartilhamentos: 0
        };
        
        setDepoimentos([novoDepoimento, ...depoimentos]);
        setMensagem('');
        setNome('');
        setEmail('');
        setIsSubmitting(false);
        alert('Depoimento enviado com sucesso!');
      }, 1000);
      
      // Em produção, substituir por:
      // const response = await fetch('/api/depoimentos', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ nome, email, mensagem })
      // });
      // const data = await response.json();
      // setDepoimentos([data, ...depoimentos]);
      // setMensagem('');
      // setNome('');
      // setEmail('');
      // setIsSubmitting(false);
    } catch (err) {
      setError('Não foi possível enviar seu depoimento. Tente novamente mais tarde.');
      setIsSubmitting(false);
      console.error('Erro ao enviar depoimento:', err);
    }
  };

  /**
   * Função para dar like em um depoimento
   * Em produção, esta função fará uma chamada API real
   */
  const darLike = (id) => {
    setDepoimentos(depoimentos.map(depo => 
      depo.id === id ? { ...depo, likes: depo.likes + 1 } : depo
    ));
    
    // Em produção, substituir por:
    // fetch(`/api/depoimentos/${id}/like`, { method: 'POST' });
  };

  /**
   * Função para compartilhar um depoimento
   */
  const compartilharDepoimento = (id) => {
    const depoimento = depoimentos.find(d => d.id === id);
    if (depoimento) {
      // Em produção, implementar lógica de compartilhamento real
      alert(`Compartilhando depoimento de ${depoimento.nome}`);
    }
  };

  /**
   * Função para formatar a data em formato local
   */
  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  // Carrega os depoimentos ao montar o componente
  useEffect(() => {
    carregarDepoimentos();
  }, []);

  // Autoplay para o carrossel
  useEffect(() => {
    const interval = setInterval(() => {
      if (depoimentos.length > 0) {
        setActiveIndex((prevIndex) => (prevIndex + 1) % depoimentos.length);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [depoimentos]);

  // Atualiza a posição do carrossel quando o índice ativo muda
  useEffect(() => {
    if (carouselRef.current && depoimentos.length > 0) {
      const cardWidth = carouselRef.current.children[0].offsetWidth;
      const gap = 20; // Gap entre os cards
      carouselRef.current.scrollTo({
        left: activeIndex * (cardWidth + gap),
        behavior: 'smooth'
      });
    }
  }, [activeIndex, depoimentos]);

  return (
    <div className={`${styles.testimonialPage} ${darkMode ? styles.darkMode : ''}`}>
      {/* Cabeçalho da página */}
      <header className={styles.pageHeader}>
        <FaHeart className={styles.headerIcon} />
        <h1>Depoimentos</h1>
        <p>Veja o que nossos usuários estão falando sobre suas experiências de adoção</p>
      </header>

      {/* Formulário para enviar novo depoimento */}
      <section className={styles.testimonialFormSection}>
        <h2>Compartilhe sua experiência</h2>
        <form onSubmit={enviarDepoimento} className={styles.testimonialForm}>
          <div className={styles.formGroup}>
            <label htmlFor="nome">Seu nome</label>
            <input
              id="nome"
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="email">Seu e-mail</label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="mensagem">Seu depoimento</label>
            <textarea
              id="mensagem"
              placeholder="Conte-nos sobre sua experiência de adoção..."
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
          
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Depoimento'}
          </button>
        </form>
      </section>

      {/* Seção de depoimentos */}
      <section className={styles.testimonialsSection}>
        <h2>O que dizem nossos usuários</h2>
        
        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p>Carregando depoimentos...</p>
          </div>
        ) : error ? (
          <div className={styles.errorContainer}>
            <p>{error}</p>
            <button onClick={carregarDepoimentos}>Tentar novamente</button>
          </div>
        ) : depoimentos.length === 0 ? (
          <div className={styles.emptyContainer}>
            <p>Nenhum depoimento encontrado. Seja o primeiro a compartilhar sua experiência!</p>
          </div>
        ) : (
          <>
            {/* Carrossel de depoimentos */}
            <div className={styles.carouselWrapper}>
              <div className={styles.carouselTrack} ref={carouselRef}>
                {depoimentos.map((depo) => (
                  <div className={styles.testimonialCard} key={depo.id}>
                    <div className={styles.cardHeader}>
                      {depo.avatar ? (
                        <img src={depo.avatar} alt={depo.nome} className={styles.avatar} />
                      ) : (
                        <FaUserCircle className={styles.avatarPlaceholder} />
                      )}
                      <div className={styles.userInfo}>
                        <h4>{depo.nome}</h4>
                        <span className={styles.date}>{formatarData(depo.data)}</span>
                      </div>
                    </div>
                    
                    <div className={styles.cardContent}>
                      <FaQuoteLeft className={styles.quoteIcon} />
                      <p>"{depo.texto}"</p>
                    </div>
                    
                    <div className={styles.cardActions}>
                      <button 
                        className={styles.actionButton}
                        onClick={() => darLike(depo.id)}
                      >
                        <FaThumbsUp /> {depo.likes}
                      </button>
                      <button 
                        className={styles.actionButton}
                        onClick={() => compartilharDepoimento(depo.id)}
                      >
                        <FaShare />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Indicadores de navegação */}
              <div className={styles.carouselIndicators}>
                {depoimentos.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.indicator} ${index === activeIndex ? styles.active : ''}`}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Ir para depoimento ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Depoimentos;

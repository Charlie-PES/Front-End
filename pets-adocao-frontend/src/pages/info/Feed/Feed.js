import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './Feed.module.css';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { FaHeart, FaComment, FaShare, FaCalendarAlt, FaTag, FaFilter, FaSearch, FaPaw, FaUserCircle, FaImage, FaSmile, FaPaperPlane, FaNewspaper, FaSpinner, FaHashtag, FaTimes, FaDog, FaCat } from 'react-icons/fa';

/**
 * Componente Feed
 * 
 * Este componente exibe um feed de notícias e posts sociais relacionados a pets.
 * Funcionalidades:
 * - Exibição de notícias e posts sociais
 * - Filtragem por tipo de conteúdo
 * - Busca por texto
 * - Criação de novos posts
 * - Visualização detalhada de notícias
 * - Suporte a modo escuro
 * - Design responsivo para dispositivos móveis
 * 
 * Estrutura para integração com backend:
 * - Funções assíncronas para buscar dados
 * - Tratamento de estados de carregamento e erros
 * - Simulação de dados para desenvolvimento
 */
const Feed = () => {
  const { id } = useParams();
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [filtroAtivo, setFiltroAtivo] = useState('todos');
  const [busca, setBusca] = useState('');
  const [novoPost, setNovoPost] = useState('');
  const [posts, setPosts] = useState([]);
  const [noticiaSelecionada, setNoticiaSelecionada] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hashtags, setHashtags] = useState([
    { id: 1, nome: 'Adoção', contador: 156 },
    { id: 2, nome: 'Cães', contador: 243 },
    { id: 3, nome: 'Gatos', contador: 189 },
    { id: 4, nome: 'Veterinário', contador: 98 },
    { id: 5, nome: 'ONGs', contador: 112 },
    { id: 6, nome: 'Eventos', contador: 76 },
    { id: 7, nome: 'Dicas', contador: 145 },
    { id: 8, nome: 'Abrigos', contador: 67 }
  ]);
  const [hashtagAtiva, setHashtagAtiva] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // Simulação de dados para desenvolvimento
  // Em produção, estes dados viriam de uma API
  const postsSociais = [
    {
      id: 'social1',
      tipo: 'social',
      autor: 'Maria Clara',
      autorImagem: '/images/user1.jpg',
      data: '29 Mai 2024',
      conteudo: 'Olha só quem acabou de chegar em casa! 🐶 Depois de meses procurando, finalmente encontrei meu companheiro perfeito no abrigo. Obrigada @PetsAdocao pela ajuda!',
      imagem: '/images/post-social1.jpg',
      likes: 324,
      comentarios: 45,
      compartilhamentos: 12,
      hashtags: ['Adoção', 'Cães']
    },
    {
      id: 'social2',
      tipo: 'social',
      autor: 'ONG Amigos dos Pets',
      autorImagem: '/images/ong1.jpg',
      data: '28 Mai 2024',
      conteudo: 'Mais um dia de sucesso no nosso mutirão de castração! 🐱 Hoje atendemos mais de 50 pets. Agradecemos a todos os voluntários e parceiros que tornaram isso possível. ❤️',
      imagem: '/images/post-social2.jpg',
      likes: 567,
      comentarios: 89,
      compartilhamentos: 134,
      hashtags: ['ONGs', 'Eventos']
    },
    {
      id: 'social3',
      tipo: 'social',
      autor: 'Dr. Paulo Veterinário',
      autorImagem: '/images/vet1.jpg',
      data: '27 Mai 2024',
      conteudo: `Dica importante: Com a chegada do inverno, não se esqueça de proteger seu pet do frio! 🌡️ Aqui vão algumas recomendações essenciais:

      1. Mantenha a casinha em local protegido
      2. Use roupinhas adequadas para passeios
      3. Evite banhos muito frequentes
      4. Mantenha a vacinação em dia`,
      imagem: '/images/post-social3.jpg',
      likes: 892,
      comentarios: 156,
      compartilhamentos: 245,
      hashtags: ['Veterinário', 'Dicas']
    },
    {
      id: 'social4',
      tipo: 'social',
      autor: 'João Silva',
      autorImagem: '/images/user2.jpg',
      data: '26 Mai 2024',
      conteudo: 'Primeiro passeio com minha nova companheira! 🐕 Adotar foi a melhor decisão que já tomei. Ela já conquistou toda a família! #AdoteNãoCompre #PetsAdocao',
      imagem: '/images/post-social4.jpg',
      likes: 423,
      comentarios: 67,
      compartilhamentos: 23,
      hashtags: ['Adoção', 'Cães']
    },
    {
      id: 'social5',
      tipo: 'social',
      autor: 'Ana Veterinária',
      autorImagem: '/images/vet2.jpg',
      data: '25 Mai 2024',
      conteudo: `Pessoal, vamos falar sobre a importância da castração? 🐱🐶

      Benefícios da castração:
      1. Previne doenças
      2. Controla a população de animais
      3. Reduz comportamentos indesejados
      4. Aumenta a expectativa de vida

      Agende já a castração do seu pet! 🏥`,
      imagem: '/images/post-social5.jpg',
      likes: 756,
      comentarios: 134,
      compartilhamentos: 198,
      hashtags: ['Veterinário', 'Dicas']
    },
    {
      id: 'social6',
      tipo: 'social',
      autor: 'Pet Shop Feliz',
      autorImagem: '/images/petshop1.jpg',
      data: '24 Mai 2024',
      conteudo: 'Novidades chegando! 🎉 Nossa nova linha de produtos naturais para pets já está disponível. Venham conferir as opções de shampoos, condicionadores e perfumes. Tudo pensado no bem-estar do seu melhor amigo! 🐾',
      imagem: '/images/post-social6.jpg',
      likes: 245,
      comentarios: 42,
      compartilhamentos: 18,
      hashtags: ['Dicas']
    }
  ];

  const noticias = [
    { 
      id: 'noticia1',
      tipo: 'noticia',
      titulo: 'Campanha de vacinação gratuita começa em maio',
      imagem: '/images/feed1.jpg',
      data: '15 Mai 2024',
      categoria: 'Saúde Pet',
      autor: 'Dr. Carlos Silva',
      autorImagem: '/images/autor1.jpg',
      conteudo: `A campanha de vacinação gratuita para cães e gatos começará no próximo mês em diversas clínicas veterinárias parceiras. A iniciativa visa garantir a saúde dos pets e prevenir doenças comuns.

      As vacinas disponíveis incluirão:
      - V8 e V10 para cães
      - V4 para gatos
      - Antirrábica para ambos

      Para participar, os tutores devem fazer um pré-cadastro em nosso site e apresentar documento de identificação no dia da vacinação.`,
      comentarios: 3,
      likes: 45,
      compartilhamentos: 12,
      hashtags: ['Veterinário', 'Eventos']
    },
    { 
      id: 'noticia2',
      tipo: 'noticia',
      titulo: 'Mega feira de adoção acontece neste fim de semana',
      imagem: '/images/feed2.jpg',
      data: '18 Mai 2024',
      categoria: 'Eventos',
      autor: 'Ana Oliveira',
      autorImagem: '/images/autor2.jpg',
      conteudo: `O Parque Ibirapuera será palco da maior feira de adoção de pets já realizada na cidade. O evento contará com mais de 200 animais disponíveis para adoção, todos vacinados e castrados.

      Além das adoções, o evento oferecerá:
      - Serviços veterinários gratuitos
      - Microchipagem
      - Palestras sobre cuidados com pets
      - Área de alimentação
      - Espaço kids

      Não perca esta oportunidade de encontrar seu novo melhor amigo!`,
      comentarios: 5,
      likes: 89,
      compartilhamentos: 34,
      hashtags: ['Adoção', 'Eventos', 'Abrigos']
    },
    { 
      id: 'noticia3',
      tipo: 'noticia',
      titulo: 'Novo abrigo com capacidade para 500 pets é inaugurado',
      imagem: '/images/feed3.jpg',
      data: '20 Mai 2024',
      categoria: 'Novidades',
      autor: 'Marina Santos',
      autorImagem: '/images/autor3.jpg',
      conteudo: `Um novo e moderno abrigo para pets foi inaugurado hoje, com capacidade para acolher até 500 animais. O espaço conta com instalações de última geração e uma equipe especializada.

      Estrutura do abrigo:
      - Área médica completa
      - Hotel para pets
      - Creche day care
      - Área de adestramento
      - Espaço para banho e tosa
      
      O local já está recebendo doações e voluntários.`,
      comentarios: 2,
      likes: 67,
      compartilhamentos: 23,
      hashtags: ['Abrigos', 'ONGs']
    },
    {
      id: 'noticia4',
      tipo: 'noticia',
      titulo: 'Projeto de castração móvel atenderá comunidades carentes',
      imagem: '/images/logo.png',
      data: '22 Mai 2024',
      categoria: 'Projetos',
      autor: 'Pedro Mendes',
      autorImagem: '/images/logo.png',
      conteudo: `Uma unidade móvel de castração começará a percorrer diferentes bairros da cidade, oferecendo o serviço gratuitamente para famílias de baixa renda. O projeto visa controlar a população de animais de rua de forma humanitária.

      O projeto incluirá:
      - Castração gratuita
      - Avaliação veterinária
      - Orientação sobre cuidados pós-operatórios
      - Medicamentos necessários
      
      Confira o calendário de visitas em nosso site.`,
      comentarios: 8,
      likes: 112,
      compartilhamentos: 45,
      hashtags: ['ONGs', 'Veterinário']
    },
    {
      id: 'noticia5',
      tipo: 'noticia',
      titulo: 'Pesquisa revela: pets ajudam na recuperação de pacientes',
      imagem: '/images/logo.png',
      data: '25 Mai 2024',
      categoria: 'Pesquisa',
      autor: 'Dra. Beatriz Lima',
      autorImagem: '/images/logo.g',
      conteudo: `Um estudo recente comprovou que a interação com animais pode acelerar significativamente a recuperação de pacientes em tratamento. A pesquisa foi realizada em parceria com diversos hospitais.

      Principais benefícios observados:
      - Redução do estresse
      - Melhora do humor
      - Diminuição da pressão arterial
      - Aumento da socialização
      
      O estudo abre portas para novos programas de terapia assistida por animais.`,
      comentarios: 12,
      likes: 156,
      compartilhamentos: 67,
      hashtags: ['Dicas']
    },
    {
      id: 'noticia6',
      tipo: 'noticia',
      titulo: 'Nova lei aumenta punição para maus-tratos a animais',
      imagem: '/images/feed6.jpg',
      data: '27 Mai 2024',
      categoria: 'Legislação',
      autor: 'Dr. Ricardo Alves',
      autorImagem: '/images/autor6.jpg',
      conteudo: `Foi sancionada hoje a lei que aumenta as punições para casos de maus-tratos a animais. As novas penalidades incluem multas mais pesadas e possibilidade de prisão.

      Principais pontos da nova lei:
      - Aumento das multas
      - Penas mais severas
      - Criação de cadastro de agressores
      - Proteção ampliada para animais silvestres
      
      A lei entra em vigor imediatamente.`,
      comentarios: 15,
      likes: 234,
      compartilhamentos: 89,
      hashtags: ['Dicas']
    },
    {
      id: 'noticia7',
      tipo: 'noticia',
      titulo: 'Programa de terapia com pets é expandido para mais hospitais',
      imagem: '/images/feed7.jpg',
      data: '28 Mai 2024',
      categoria: 'Saúde',
      autor: 'Dra. Carla Mendonça',
      autorImagem: '/images/autor7.jpg',
      conteudo: `O programa de terapia assistida por animais será expandido para mais 10 hospitais da rede pública. A iniciativa tem mostrado resultados impressionantes na recuperação de pacientes.

      Benefícios do programa:
      - Redução da ansiedade
      - Melhora do humor
      - Estímulo à socialização
      - Aceleração da recuperação
      
      Os novos hospitais começarão a receber as visitas dos pets terapeutas no próximo mês.`,
      comentarios: 18,
      likes: 289,
      compartilhamentos: 112,
      hashtags: ['Dicas']
    },
    {
      id: 'noticia8',
      tipo: 'noticia',
      titulo: 'Startup desenvolve app para localizar pets perdidos',
      imagem: '/images/feed8.jpg',
      data: '29 Mai 2024',
      categoria: 'Tecnologia',
      autor: 'Lucas Tecnologia',
      autorImagem: '/images/autor8.jpg',
      conteudo: `Uma startup local desenvolveu um aplicativo inovador que utiliza inteligência artificial para ajudar tutores a encontrarem seus pets perdidos.

      Funcionalidades do app:
      - Reconhecimento facial de pets
      - Mapa em tempo real
      - Alertas para a comunidade
      - Integração com clínicas e ONGs
      
      O aplicativo já está disponível para download gratuitamente.`,
      comentarios: 22,
      likes: 345,
      compartilhamentos: 156,
      hashtags: ['Dicas']
    }
  ];

  // Simula carregamento de dados do backend
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simula um atraso de rede
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Em produção, aqui seria uma chamada à API
        // const response = await fetch('/api/posts');
        // const data = await response.json();
        // setPosts(data);
        
        // Por enquanto, usamos os dados simulados
        setPosts([]);
      } catch (err) {
        setError('Erro ao carregar posts. Por favor, tente novamente mais tarde.');
        console.error('Erro ao carregar posts:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Combina todos os posts e ordena por data
  const todosPosts = [...posts, ...postsSociais, ...noticias].sort((a, b) => {
    const dataA = new Date(a.data.split(' ').reverse().join('-'));
    const dataB = new Date(b.data.split(' ').reverse().join('-'));
    return dataB - dataA;
  });

  // Filtra posts com base na busca, no filtro ativo e na hashtag selecionada
  const postsFiltrados = todosPosts.filter(post => {
    if (!post || !post.tipo) return false;

    const matchBusca = busca.toLowerCase() === '' || 
      (post.tipo === 'noticia' ? 
        (post.titulo?.toLowerCase().includes(busca.toLowerCase()) || 
        post.conteudo?.toLowerCase().includes(busca.toLowerCase())) :
        post.conteudo?.toLowerCase().includes(busca.toLowerCase()));
    
    const matchFiltro = filtroAtivo === 'todos' || post.tipo === filtroAtivo;
    
    const matchHashtag = !hashtagAtiva || (post.hashtags && post.hashtags.includes(hashtagAtiva));
    
    return matchBusca && matchFiltro && matchHashtag;
  });

  // Encontra a notícia atual com base no ID da URL
  const noticiaAtual = id ? todosPosts.find(n => n.id?.toString() === id) : null;

  /**
   * Cria um novo post social
   * Em produção, esta função enviaria os dados para o backend
   */
  const handleCriarPost = async () => {
    if (novoPost.trim() === '') return;
    
    setIsSubmitting(true);
    
    try {
      // Simula um atraso de rede
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Em produção, aqui seria uma chamada à API
      // const response = await fetch('/api/posts', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     tipo: 'social',
      //     conteudo: novoPost,
      //     // outros dados necessários
      //   })
      // });
      // const data = await response.json();
      
      const novoPostObj = {
        id: `post-${Date.now()}`,
        tipo: 'social',
        autor: 'Usuário Atual',
        autorImagem: '/images/user-default.jpg',
        data: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
        conteudo: novoPost,
        imagem: '',
        likes: 0,
        comentarios: 0,
        compartilhamentos: 0,
        hashtags: []
      };
      
      setPosts([novoPostObj, ...posts]);
      setNovoPost('');
    } catch (err) {
      setError('Erro ao criar post. Por favor, tente novamente.');
      console.error('Erro ao criar post:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Formata a data para exibição
   * @param {string} dataString - Data no formato "DD MMM YYYY"
   * @returns {string} Data formatada
   */
  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  /**
   * Alterna a visibilidade da sidebar em dispositivos móveis
   */
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  /**
   * Seleciona uma hashtag para filtrar os posts
   * @param {string} hashtag - Nome da hashtag a ser selecionada
   */
  const selecionarHashtag = (hashtag) => {
    setHashtagAtiva(hashtag === hashtagAtiva ? null : hashtag);
  };

  // Renderiza a visualização detalhada de uma notícia selecionada
  if (noticiaSelecionada) {
    return (
      <div className={`${styles.feedContainer} ${darkMode ? styles.darkMode : ''}`}>
        <Link to="/feed" className={styles.voltarLink}>
          <FaNewspaper /> Voltar para o Feed
        </Link>
        <div className={styles.noticiaDetalhada}>
          <div className={styles.noticiaHeader}>
            <h1>{noticiaSelecionada.titulo}</h1>
            <div className={styles.metaInfo}>
              <div className={styles.postInfo}>
                <span>{noticiaSelecionada.autor}</span>
                <span>{formatarData(noticiaSelecionada.data)}</span>
                <span className={styles.categoria}>{noticiaSelecionada.categoria}</span>
              </div>
            </div>
          </div>
          <div className={styles.noticiaImagem}>
            <img src={noticiaSelecionada.imagem} alt={noticiaSelecionada.titulo} />
          </div>
          <div className={styles.noticiaConteudo}>
            <p>{noticiaSelecionada.conteudo}</p>
          </div>
          <div className={styles.noticiaFooter}>
            <div className={styles.interacoes}>
              <button>
                <FaHeart /> {noticiaSelecionada.likes}
              </button>
              <button>
                <FaComment /> {noticiaSelecionada.comentarios}
              </button>
              <button>
                <FaShare /> Compartilhar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Renderiza o feed principal
  return (
    <div className={`${styles.feedContainer} ${darkMode ? styles.darkMode : ''}`}>
      {!noticiaAtual ? (
        <>
          <div className={styles.searchContainer}>
            <div className={styles.searchContainerInner}>
              <div className={styles.searchBar}>
                <FaSearch />
                <input 
                  type="text" 
                  placeholder="Buscar no feed..." 
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
              </div>
              <button 
                className={styles.mobileFilterToggle} 
                onClick={toggleSidebar}
              >
                <FaFilter /> Filtros
              </button>
              <button 
                className={styles.themeToggle}
                onClick={toggleTheme}
                aria-label={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
              >
                {darkMode ? (
                  <FaCat className={`${styles.themeIcon} ${styles.dark}`} />
                ) : (
                  <FaDog className={`${styles.themeIcon} ${styles.light}`} />
                )}
              </button>
            </div>
          </div>

          <div className={styles.feedLayout}>
            {/* Sidebar com filtros e hashtags */}
            <div className={`${styles.sidebar} ${sidebarVisible ? styles.visible : ''}`}>
              <div className={styles.sidebarHeader}>
                <h3>Filtros</h3>
                <button className={styles.closeSidebar} onClick={toggleSidebar}>
                  <FaTimes />
                </button>
              </div>
              
              <div className={styles.filtros}>
                <h4>Tipos de Conteúdo</h4>
                <button 
                  className={`${styles.filtroBtn} ${filtroAtivo === 'todos' ? styles.ativo : ''}`}
                  onClick={() => setFiltroAtivo('todos')}
                >
                  <FaPaw /> Todos
                </button>
                <button 
                  className={`${styles.filtroBtn} ${filtroAtivo === 'noticia' ? styles.ativo : ''}`}
                  onClick={() => setFiltroAtivo('noticia')}
                >
                  <FaTag /> Notícias
                </button>
                <button 
                  className={`${styles.filtroBtn} ${filtroAtivo === 'social' ? styles.ativo : ''}`}
                  onClick={() => setFiltroAtivo('social')}
                >
                  <FaUserCircle /> Posts Sociais
                </button>
              </div>
              
              <div className={styles.hashtagsContainer}>
                <h4>Hashtags Populares</h4>
                <div className={styles.hashtagsList}>
                  {hashtags.map(hashtag => (
                    <button 
                      key={hashtag.id}
                      className={`${styles.hashtagBtn} ${hashtagAtiva === hashtag.nome ? styles.ativo : ''}`}
                      onClick={() => selecionarHashtag(hashtag.nome)}
                    >
                      <FaHashtag /> {hashtag.nome} <span className={styles.hashtagCount}>({hashtag.contador})</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {hashtagAtiva && (
                <button 
                  className={styles.clearFilterBtn}
                  onClick={() => setHashtagAtiva(null)}
                >
                  <FaTimes /> Limpar filtro de hashtag
                </button>
              )}
            </div>

            {/* Conteúdo principal */}
            <div className={styles.mainContent}>
              <div className={styles.criarPostContainer}>
                <div className={styles.criarPostBox}>
                  <div className={styles.criarPostHeader}>
                    <img src="/images/user-default.jpg" alt="Usuário" className={styles.userAvatar} />
                    <textarea 
                      placeholder="O que está acontecendo com seu pet?" 
                      value={novoPost}
                      onChange={(e) => setNovoPost(e.target.value)}
                      className={styles.postTextarea}
                    />
                  </div>
                  <div className={styles.criarPostFooter}>
                    <div className={styles.postActions}>
                      <button className={styles.actionBtn}>
                        <FaImage /> Adicionar foto
                      </button>
                      <button className={styles.actionBtn}>
                        <FaSmile /> Emoji
                      </button>
                    </div>
                    <button 
                      className={styles.postarBtn}
                      onClick={handleCriarPost}
                      disabled={novoPost.trim() === '' || isSubmitting}
                    >
                      {isSubmitting ? <FaSpinner className={styles.spinner} /> : <FaPaperPlane />} 
                      {isSubmitting ? 'Enviando...' : 'Postar'}
                    </button>
                  </div>
                </div>
              </div>

              {isLoading ? (
                <div className={styles.loadingContainer}>
                  <FaSpinner className={styles.spinner} />
                  <p>Carregando posts...</p>
                </div>
              ) : error ? (
                <div className={styles.errorContainer}>
                  <p>{error}</p>
                  <button onClick={() => window.location.reload()} className={styles.retryButton}>
                    Tentar Novamente
                  </button>
                </div>
              ) : postsFiltrados.length === 0 ? (
                <div className={styles.emptyContainer}>
                  <p>Nenhum post encontrado. Tente ajustar seus filtros ou busca.</p>
                </div>
              ) : (
                <div className={styles.feedCascata}>
                  {postsFiltrados.map(post => {
                    if (!post) return null;
                    
                    return (
                      <article key={post.id} className={styles.feedCard}>
                        <Link to={`/feed/${post.id}`} className={styles.cardLink} onClick={(e) => {
                          e.preventDefault();
                          setNoticiaSelecionada(post);
                        }}>
                          <div className={styles.cardHeader}>
                            <div className={styles.autorInfo}>
                              <img src={post.autorImagem} alt={post.autor} />
                              <div>
                                <span className={styles.autorNome}>{post.autor}</span>
                                <span className={styles.postData}>{post.data}</span>
                              </div>
                            </div>
                            {post.tipo === 'noticia' && (
                              <span className={styles.categoria}>{post.categoria}</span>
                            )}
                          </div>
                          
                          {post.tipo === 'noticia' ? (
                            <div className={styles.cardContent}>
                              <h2>{post.titulo}</h2>
                              <p>{post.conteudo.split('\n\n')[0]}</p>
                              {post.imagem && (
                                <div className={styles.cardImagem}>
                                  <img src={post.imagem} alt={post.titulo} />
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className={styles.cardContent}>
                              <p className={styles.postSocialPreview}>{post.conteudo}</p>
                              {post.imagem && (
                                <div className={styles.cardImagem}>
                                  <img src={post.imagem} alt="Post" />
                                </div>
                              )}
                            </div>
                          )}
                          
                          <div className={styles.cardFooter}>
                            <div className={styles.interacoes}>
                              <button><FaHeart /> {post.likes}</button>
                              <button><FaComment /> {post.comentarios}</button>
                              <button><FaShare /> {post.compartilhamentos}</button>
                            </div>
                            {post.hashtags && post.hashtags.length > 0 && (
                              <div className={styles.postHashtags}>
                                {post.hashtags.map((tag, index) => (
                                  <span key={index} className={styles.postHashtag}>
                                    <FaHashtag /> {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </Link>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <article className={styles.noticiaDetalhada}>
          <Link to="/feed" className={styles.voltarLink}>
            <FaPaw /> Voltar ao Feed
          </Link>
          <header className={styles.noticiaHeader}>
            {noticiaAtual.tipo === 'noticia' ? (
              <>
                <h1>{noticiaAtual.titulo}</h1>
                <div className={styles.metaInfo}>
                  <div className={styles.autorInfo}>
                    <img src={noticiaAtual.autorImagem} alt={noticiaAtual.autor} />
                    <span>{noticiaAtual.autor}</span>
                  </div>
                  <div className={styles.postInfo}>
                    <span><FaCalendarAlt /> {noticiaAtual.data}</span>
                    <span><FaTag /> {noticiaAtual.categoria}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.postSocialHeader}>
                <div className={styles.autorInfo}>
                  <img src={noticiaAtual.autorImagem} alt={noticiaAtual.autor} />
                  <div>
                    <h2>{noticiaAtual.autor}</h2>
                    <span className={styles.data}><FaCalendarAlt /> {noticiaAtual.data}</span>
                  </div>
                </div>
              </div>
            )}
          </header>
          <div className={styles.noticiaImagem}>
            <img src={noticiaAtual.imagem} alt={noticiaAtual.tipo === 'noticia' ? noticiaAtual.titulo : 'Post'} />
          </div>
          <div className={styles.noticiaConteudo}>
            {noticiaAtual.tipo === 'noticia' ? 
              noticiaAtual.conteudo.split('\n\n').map((paragrafo, index) => (
                <p key={index}>{paragrafo}</p>
              )) : 
              <p className={styles.postSocialConteudo}>{noticiaAtual.conteudo}</p>
            }
          </div>
          <footer className={styles.noticiaFooter}>
            <div className={styles.interacoes}>
              <button><FaHeart /> {noticiaAtual.likes}</button>
              <button><FaComment /> {noticiaAtual.comentarios}</button>
              <button><FaShare /> {noticiaAtual.compartilhamentos}</button>
            </div>
            {noticiaAtual.hashtags && noticiaAtual.hashtags.length > 0 && (
              <div className={styles.postHashtags}>
                {noticiaAtual.hashtags.map((tag, index) => (
                  <span key={index} className={styles.postHashtag}>
                    <FaHashtag /> {tag}
                  </span>
                ))}
              </div>
            )}
          </footer>
        </article>
      )}
    </div>
  );
};

export default Feed; 
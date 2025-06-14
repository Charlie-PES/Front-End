import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { FaPaw, FaHeart, FaCalendarAlt, FaDog, FaCat, FaSearch, FaFilter, FaSort, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from './HistoricoAdocao.module.css';

/**
 * Componente de Histórico de Adoções
 * 
 * Este componente exibe o histórico de adoções do usuário, permitindo
 * visualizar, filtrar e ordenar os pets adotados.
 * 
 * Estrutura preparada para integração com backend:
 * - Função loadAdoptions para carregar dados do servidor
 * - Estado para gerenciar dados, filtros e paginação
 * - Funções para manipulação de dados (filterAdoptions, sortAdoptions)
 */
const HistoricoAdocao = () => {
  // Hooks para navegação e contexto de tema
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  
  // Estados para gerenciar dados e UI
  const [adoptions, setAdoptions] = useState([]);
  const [filteredAdoptions, setFilteredAdoptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados para filtros e ordenação
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  
  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  
  // Dados simulados para demonstração
  const mockAdoptions = [
    {
      id: '1',
      nome: 'Luna',
      especie: 'Gato',
      raca: 'SRD',
      dataAdocao: '2024-01-15',
      imagem: '/images/cat1.png',
      status: 'ativo',
      descricao: 'Luna é uma gata muito carinhosa e brincalhona.',
      idade: '2 anos',
      cor: 'Cinza',
      peso: '3.5 kg'
    },
    {
      id: '2',
      nome: 'Thor',
      especie: 'Cachorro',
      raca: 'Labrador',
      dataAdocao: '2023-11-08',
      imagem: '/images/dog1.png',
      status: 'ativo',
      descricao: 'Thor é um labrador muito dócil e adora crianças.',
      idade: '1 ano',
      cor: 'Preto',
      peso: '25 kg'
    },
    {
      id: '3',
      nome: 'Nina',
      especie: 'Cachorro',
      raca: 'Poodle',
      dataAdocao: '2022-06-25',
      imagem: '/images/dog2.png',
      status: 'ativo',
      descricao: 'Nina é uma poodle muito inteligente e obediente.',
      idade: '3 anos',
      cor: 'Branca',
      peso: '8 kg'
    },
    {
      id: '4',
      nome: 'Felix',
      especie: 'Gato',
      raca: 'Siamês',
      dataAdocao: '2023-03-10',
      imagem: '/images/cat2.png',
      status: 'ativo',
      descricao: 'Felix é um gato siamês muito elegante e independente.',
      idade: '1 ano',
      cor: 'Marrom claro',
      peso: '4 kg'
    },
    {
      id: '5',
      nome: 'Max',
      especie: 'Cachorro',
      raca: 'Golden Retriever',
      dataAdocao: '2021-09-15',
      imagem: '/images/dog3.png',
      status: 'ativo',
      descricao: 'Max é um golden retriever muito amigável e leal.',
      idade: '4 anos',
      cor: 'Dourado',
      peso: '30 kg'
    },
    {
      id: '6',
      nome: 'Mia',
      especie: 'Gato',
      raca: 'Persa',
      dataAdocao: '2023-07-22',
      imagem: '/images/cat3.png',
      status: 'ativo',
      descricao: 'Mia é uma gata persa muito tranquila e carinhosa.',
      idade: '2 anos',
      cor: 'Branca',
      peso: '3 kg'
    }
  ];

  /**
   * Carrega os dados de adoções do backend
   * Esta função seria implementada para buscar os dados do servidor
   */
  const loadAdoptions = async () => {
    try {
      setLoading(true);
      // Simulação de chamada à API
      // const response = await fetch('/api/adoptions');
      // const data = await response.json();
      
      // Usando dados simulados para demonstração
      setTimeout(() => {
        setAdoptions(mockAdoptions);
        setFilteredAdoptions(mockAdoptions);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('Erro ao carregar adoções:', error);
      setError('Não foi possível carregar o histórico de adoções. Tente novamente mais tarde.');
      setLoading(false);
    }
  };

  /**
   * Filtra as adoções com base nos critérios selecionados
   */
  const filterAdoptions = () => {
    let result = [...adoptions];
    
    // Filtrar por termo de busca
    if (searchTerm) {
      result = result.filter(pet => 
        pet.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.raca.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.descricao.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filtrar por tipo de animal
    if (filterType !== 'all') {
      result = result.filter(pet => 
        pet.especie.toLowerCase() === filterType.toLowerCase()
      );
    }
    
    // Ordenar resultados
    result.sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc' 
          ? new Date(a.dataAdocao) - new Date(b.dataAdocao)
          : new Date(b.dataAdocao) - new Date(a.dataAdocao);
      } else if (sortBy === 'name') {
        return sortOrder === 'asc'
          ? a.nome.localeCompare(b.nome)
          : b.nome.localeCompare(a.nome);
      }
      return 0;
    });
    
    setFilteredAdoptions(result);
    setCurrentPage(1); // Resetar para a primeira página ao filtrar
  };

  /**
   * Alterna a ordem de classificação
   */
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  /**
   * Navega para a página de detalhes do pet
   * @param {string} petId - ID do pet
   */
  const navigateToPetDetails = (petId) => {
    navigate(`/pet/${petId}`);
  };

  // Carregar dados ao montar o componente
  useEffect(() => {
    loadAdoptions();
  }, []);

  // Aplicar filtros quando os critérios mudarem
  useEffect(() => {
    filterAdoptions();
  }, [searchTerm, filterType, sortBy, sortOrder, adoptions]);

  // Calcular dados de paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAdoptions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAdoptions.length / itemsPerPage);

  /**
   * Formata a data para exibição
   * @param {string} dateString - Data no formato ISO
   * @returns {string} - Data formatada
   */
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  return (
    <div className={`${styles.container} ${darkMode ? styles.darkMode : ''}`}>
      {/* Cabeçalho da página */}
      <header className={styles.header}>
        <h1>
          <FaPaw className={styles.icon} />
          Histórico de Adoções
        </h1>
        <p className={styles.subtitle}>
          Veja todos os pets que você adotou e acompanhe seu progresso
        </p>
      </header>

      {/* Mensagem de erro */}
      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}

      {/* Controles de filtro e busca */}
      <div className={styles.controls}>
        <div className={styles.searchContainer}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar por nome, raça..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.filterContainer}>
          <FaFilter className={styles.filterIcon} />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">Todos</option>
            <option value="cachorro">Cachorros</option>
            <option value="gato">Gatos</option>
            <option value="outro">Outros</option>
          </select>
        </div>
        
        <div className={styles.sortContainer}>
          <FaSort className={styles.sortIcon} />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="date">Data de Adoção</option>
            <option value="name">Nome</option>
          </select>
          <button 
            className={styles.sortButton}
            onClick={toggleSortOrder}
            title={sortOrder === 'asc' ? 'Ordenar Crescente' : 'Ordenar Decrescente'}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      {/* Estado de carregamento */}
      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Carregando histórico de adoções...</p>
        </div>
      ) : (
        <>
          {/* Mensagem quando não há adoções */}
          {filteredAdoptions.length === 0 ? (
            <div className={styles.emptyContainer}>
              <FaHeart className={styles.emptyIcon} />
              <h3>Nenhuma adoção encontrada</h3>
              <p>
                {searchTerm || filterType !== 'all' 
                  ? 'Tente ajustar seus filtros de busca.'
                  : 'Você ainda não adotou nenhum pet.'}
              </p>
              <button 
                className={styles.browseButton}
                onClick={() => navigate('/adotar')}
              >
                Explorar Pets para Adoção
              </button>
            </div>
          ) : (
            <>
              {/* Grid de cards de adoção */}
              <div className={styles.cards}>
                {currentItems.map((pet) => (
                  <div 
                    key={pet.id} 
                    className={styles.card}
                    onClick={() => navigateToPetDetails(pet.id)}
                  >
                    <div className={styles.imageContainer}>
                      <img src={pet.imagem} alt={pet.nome} className={styles.petImage} />
                      <div className={styles.speciesIcon}>
                        {pet.especie.toLowerCase() === 'cachorro' ? <FaDog /> : <FaCat />}
                      </div>
                    </div>
                    <div className={styles.petInfo}>
                      <h3>{pet.nome}</h3>
                      <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Raça:</span>
                        <span className={styles.infoValue}>{pet.raca}</span>
                      </div>
                      <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Idade:</span>
                        <span className={styles.infoValue}>{pet.idade}</span>
                      </div>
                      <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Data da Adoção:</span>
                        <span className={styles.infoValue}>
                          <FaCalendarAlt className={styles.dateIcon} />
                          {formatDate(pet.dataAdocao)}
                        </span>
                      </div>
                      <p className={styles.description}>{pet.descricao}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Paginação */}
              {totalPages > 1 && (
                <div className={styles.pagination}>
                  <button 
                    className={styles.paginationButton}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <FaChevronLeft />
                  </button>
                  
                  <div className={styles.pageInfo}>
                    Página {currentPage} de {totalPages}
                  </div>
                  
                  <button 
                    className={styles.paginationButton}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    <FaChevronRight />
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default HistoricoAdocao;

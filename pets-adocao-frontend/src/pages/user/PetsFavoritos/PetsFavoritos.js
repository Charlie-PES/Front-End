import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { FaHeart, FaSearch, FaFilter, FaSort, FaDog, FaCat, FaTrash, FaShare, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from './PetsFavoritos.module.css';

/**
 * Componente PetsFavoritos
 * 
 * Este componente exibe os pets favoritados pelo usuário, permitindo
 * visualizar, filtrar, ordenar e gerenciar os favoritos.
 * 
 * Estrutura preparada para integração com backend:
 * - Função loadFavorites para carregar dados do servidor
 * - Função removeFavorite para remover um pet dos favoritos
 * - Função sharePet para compartilhar um pet
 * - Estados para gerenciar dados, filtros e paginação
 */
const PetsFavoritos = () => {
  // Hooks para navegação e contexto de tema
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  
  // Estados para gerenciar dados e UI
  const [favorites, setFavorites] = useState([]);
  const [filteredFavorites, setFilteredFavorites] = useState([]);
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
  const mockFavorites = [
    {
      id: '1',
      nome: 'Luna',
      especie: 'Gato',
      raca: 'SRD',
      dataFavoritado: '2024-01-15',
      imagem: '/images/cat1.png',
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
      dataFavoritado: '2023-11-08',
      imagem: '/images/dog1.png',
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
      dataFavoritado: '2022-06-25',
      imagem: '/images/dog2.png',
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
      dataFavoritado: '2023-03-10',
      imagem: '/images/cat2.png',
      descricao: 'Felix é um gato siamês muito elegante e independente.',
      idade: '1 ano',
      cor: 'Marrom claro',
      peso: '4 kg'
    }
  ];

  /**
   * Carrega os dados de favoritos do backend
   * Esta função seria implementada para buscar os dados do servidor
   */
  const loadFavorites = async () => {
    try {
      setLoading(true);
      // Simulação de chamada à API
      // const response = await fetch('/api/favorites');
      // const data = await response.json();
      
      // Usando dados simulados para demonstração
      setTimeout(() => {
        setFavorites(mockFavorites);
        setFilteredFavorites(mockFavorites);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
      setError('Não foi possível carregar seus pets favoritos. Tente novamente mais tarde.');
      setLoading(false);
    }
  };

  /**
   * Remove um pet dos favoritos
   * @param {string} petId - ID do pet a ser removido
   */
  const removeFavorite = async (petId) => {
    try {
      // Simulação de chamada à API
      // await fetch(`/api/favorites/${petId}`, { method: 'DELETE' });
      
      // Atualização local para demonstração
      const updatedFavorites = favorites.filter(pet => pet.id !== petId);
      setFavorites(updatedFavorites);
      setFilteredFavorites(updatedFavorites);
      
      // Feedback visual (em produção, usar um sistema de notificações)
      alert('Pet removido dos favoritos com sucesso!');
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
      alert('Não foi possível remover o pet dos favoritos. Tente novamente mais tarde.');
    }
  };

  /**
   * Compartilha um pet
   * @param {string} petId - ID do pet a ser compartilhado
   */
  const sharePet = (petId) => {
    // Implementação de compartilhamento (em produção, usar Web Share API ou similar)
    alert('Funcionalidade de compartilhamento será implementada em breve!');
  };

  /**
   * Filtra os favoritos com base nos critérios selecionados
   */
  const filterFavorites = () => {
    let result = [...favorites];
    
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
          ? new Date(a.dataFavoritado) - new Date(b.dataFavoritado)
          : new Date(b.dataFavoritado) - new Date(a.dataFavoritado);
      } else if (sortBy === 'name') {
        return sortOrder === 'asc'
          ? a.nome.localeCompare(b.nome)
          : b.nome.localeCompare(a.nome);
      }
      return 0;
    });
    
    setFilteredFavorites(result);
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
    loadFavorites();
  }, []);

  // Aplicar filtros quando os critérios mudarem
  useEffect(() => {
    filterFavorites();
  }, [searchTerm, filterType, sortBy, sortOrder, favorites]);

  // Calcular dados de paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFavorites.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFavorites.length / itemsPerPage);

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
          <FaHeart className={styles.icon} />
          Meus Pets Favoritos
        </h1>
        <p className={styles.subtitle}>
          Gerencie seus pets favoritos e encontre seu próximo companheiro
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
            <option value="date">Data de Favorito</option>
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
          <p>Carregando seus pets favoritos...</p>
        </div>
      ) : (
        <>
          {/* Mensagem quando não há favoritos */}
          {filteredFavorites.length === 0 ? (
            <div className={styles.emptyContainer}>
              <FaHeart className={styles.emptyIcon} />
              <h3>Nenhum pet favoritado</h3>
              <p>
                {searchTerm || filterType !== 'all' 
                  ? 'Tente ajustar seus filtros de busca.'
                  : 'Você ainda não favoritou nenhum pet.'}
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
              {/* Grid de cards de favoritos */}
              <div className={styles.cards}>
                {currentItems.map((pet) => (
                  <div 
                    key={pet.id} 
                    className={styles.card}
                  >
                    <div 
                      className={styles.imageContainer}
                      onClick={() => navigateToPetDetails(pet.id)}
                    >
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
                        <span className={styles.infoLabel}>Favoritado em:</span>
                        <span className={styles.infoValue}>
                          {formatDate(pet.dataFavoritado)}
                        </span>
                      </div>
                      <p className={styles.description}>{pet.descricao}</p>
                      
                      {/* Ações do card */}
                      <div className={styles.cardActions}>
                        <button 
                          className={styles.actionButton}
                          onClick={() => navigateToPetDetails(pet.id)}
                        >
                          Ver Detalhes
                        </button>
                        <div className={styles.iconActions}>
                          <button 
                            className={styles.iconButton}
                            onClick={() => sharePet(pet.id)}
                            title="Compartilhar"
                          >
                            <FaShare />
                          </button>
                          <button 
                            className={styles.iconButton}
                            onClick={() => removeFavorite(pet.id)}
                            title="Remover dos favoritos"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
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

export default PetsFavoritos;

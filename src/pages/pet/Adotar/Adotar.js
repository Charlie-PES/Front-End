import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaPaw, FaHeart, FaShare, FaMapMarkerAlt, FaDog, FaCat, FaTimes } from 'react-icons/fa';
import styles from './Adotar.module.css';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { getAvailablePets } from '../../../services/matchService';

const Adotar = () => {
  const { darkMode } = useContext(ThemeContext);
  const [filtros, setFiltros] = useState({
    comportamento: '',
    tamanho: '',
    sexo: [],
    especial: '',
    tipo: 'todos'
  });
  const [busca, setBusca] = useState('');
  const [selectedPet, setSelectedPet] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  const toggleSexo = (valor) => {
    setFiltros((prev) => ({
      ...prev,
      sexo: prev.sexo.includes(valor)
        ? prev.sexo.filter((s) => s !== valor)
        : [...prev.sexo, valor],
    }));
  };

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetarFiltros = () => {
    setFiltros({
      comportamento: '',
      tamanho: '',
      sexo: [],
      especial: '',
      tipo: 'todos'
    });
    setBusca('');
  };

  const petsFiltrados = pets.filter((pet) => {
    const sexoMatch = filtros.sexo.length === 0 || filtros.sexo.includes(pet.traits.gender);
    const porteMatch = !filtros.tamanho || pet.traits.size === filtros.tamanho;
    const comportamentoMatch = !filtros.comportamento || pet.traits.temperament === filtros.comportamento;
    const especialMatch = !filtros.especial || (pet.traits.special_needs === (filtros.especial === 'Sim'));
    const tipoMatch = filtros.tipo === 'todos' || pet.traits.species === filtros.tipo;
    const buscaMatch = !busca || 
      pet.name.toLowerCase().includes(busca.toLowerCase()) || 
      pet.traits.description?.toLowerCase().includes(busca.toLowerCase());
    
    return sexoMatch && porteMatch && comportamentoMatch && especialMatch && tipoMatch && buscaMatch;
  });

  const handlePetClick = (pet) => {
    setSelectedPet(pet);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closePetDetails = () => {
    setSelectedPet(null);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={`${styles.adotarContainer} ${darkMode ? styles.darkMode : ''}`}>
      <div className={styles.searchContainer}>
        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Buscar pets por nome ou características..." 
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            aria-label="Buscar pets"
          />
        </div>
        <button 
          className={styles.filterToggleBtn}
          onClick={toggleSidebar}
          aria-label="Abrir filtros"
        >
          <FaPaw />
        </button>
      </div>

      <div className={styles.mainContent}>
        <aside className={`${styles.sidebar} ${sidebarOpen ? styles.active : ''}`}>
          <div className={styles.sidebarHeader}>
            <h2>Filtrar</h2>
            <button 
              className={styles.closeFiltersBtn}
              onClick={toggleSidebar}
              aria-label="Fechar filtros"
            >
              <FaTimes />
            </button>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="tipo">Tipo</label>
            <div className={styles.tipoButtons}>
              <button 
                className={`${styles.tipoButton} ${filtros.tipo === 'todos' ? styles.active : ''}`}
                onClick={() => handleFiltroChange({ target: { name: 'tipo', value: 'todos' } })}
              >
                Todos
              </button>
              <button 
                className={`${styles.tipoButton} ${filtros.tipo === 'dog' ? styles.active : ''}`}
                onClick={() => handleFiltroChange({ target: { name: 'tipo', value: 'dog' } })}
              >
                <FaDog /> Cachorros
              </button>
              <button 
                className={`${styles.tipoButton} ${filtros.tipo === 'cat' ? styles.active : ''}`}
                onClick={() => handleFiltroChange({ target: { name: 'tipo', value: 'cat' } })}
              >
                <FaCat /> Gatos
              </button>
            </div>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="tamanho">Tamanho</label>
            <select 
              name="tamanho" 
              value={filtros.tamanho}
              onChange={handleFiltroChange}
            >
              <option value="">Todos</option>
              <option value="small">Pequeno</option>
              <option value="medium">Médio</option>
              <option value="large">Grande</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Comportamento</label>
            <select 
              name="comportamento" 
              value={filtros.comportamento}
              onChange={handleFiltroChange}
            >
              <option value="">Todos</option>
              <option value="calm">Calmo</option>
              <option value="energetic">Energético</option>
              <option value="aggressive">Agressivo</option>
              <option value="friendly">Amigável</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Necessidades Especiais</label>
            <select 
              name="especial" 
              value={filtros.especial}
              onChange={handleFiltroChange}
            >
              <option value="">Todos</option>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </select>
          </div>

          <button 
            className={styles.resetButton}
            onClick={resetarFiltros}
          >
            Limpar Filtros
          </button>
        </aside>

        <main className={styles.petsGrid}>
          {petsFiltrados.map((pet) => (
            <div 
              key={pet._id} 
              className={styles.petCard}
              onClick={() => handlePetClick(pet)}
            >
              <img src={pet.picture} alt={pet.name} />
              <div className={styles.petInfo}>
                <h3>{pet.name}</h3>
                <p className={styles.breed}>{pet.traits.breed || 'Raça não especificada'}</p>
                <div className={styles.details}>
                  <span>{pet.traits.size}</span>
                  <span>{pet.traits.temperament}</span>
                </div>
                <p className={styles.location}>
                  <FaMapMarkerAlt /> {pet.owner_id?.address?.[0]?.city || 'Localização não disponível'}
                </p>
              </div>
            </div>
          ))}
        </main>
      </div>

      {selectedPet && (
        <div className={styles.petDetails}>
          <button 
            className={styles.closeButton}
            onClick={closePetDetails}
            aria-label="Fechar detalhes"
          >
            <FaTimes />
          </button>
          <div className={styles.petDetailsContent}>
            <img src={selectedPet.picture} alt={selectedPet.name} />
            <div className={styles.petDetailsInfo}>
              <h2>{selectedPet.name}</h2>
              <p className={styles.description}>{selectedPet.traits.description}</p>
              <div className={styles.details}>
                <div className={styles.detail}>
                  <strong>Raça:</strong> {selectedPet.traits.breed || 'Não especificada'}
                </div>
                <div className={styles.detail}>
                  <strong>Tamanho:</strong> {selectedPet.traits.size}
                </div>
                <div className={styles.detail}>
                  <strong>Temperamento:</strong> {selectedPet.traits.temperament}
                </div>
                <div className={styles.detail}>
                  <strong>Pelagem:</strong> {selectedPet.traits.fur_type}
                </div>
                <div className={styles.detail}>
                  <strong>Treinado:</strong> {selectedPet.traits.trained ? 'Sim' : 'Não'}
                </div>
              </div>
              <div className={styles.actions}>
                <button className={styles.actionButton}>
                  <FaHeart /> Favoritar
                </button>
                <button className={styles.actionButton}>
                  <FaShare /> Compartilhar
                </button>
                <Link to={`/pet/${selectedPet._id}`} className={styles.actionButton}>
                  Ver Mais Detalhes
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Adotar;

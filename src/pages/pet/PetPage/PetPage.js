import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { FaHeart, FaPaw, FaDog, FaCat, FaHome, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaCheck, FaTimes, FaSpinner, FaArrowLeft } from 'react-icons/fa';
import styles from './PetPage.module.css';
import { getPet, getAvailablePets, createAdoptionRequest } from '../../../services/matchService';
import { useAuth } from '../../../contexts/AuthContext';

/**
 * Componente PetPage
 * 
 * Este componente exibe informações detalhadas sobre um pet específico,
 * incluindo suas características, histórico de rastreabilidade e informações do responsável.
 * 
 * Funcionalidades:
 * - Exibição de detalhes do pet
 * - Indicador de compatibilidade
 * - Histórico de rastreabilidade
 * - Informações do responsável
 * - Sugestões de outros pets para adoção
 * - Suporte a modo escuro
 * - Design responsivo para dispositivos móveis
 * 
 * Estrutura para integração com backend:
 * - Funções assíncronas para buscar dados
 * - Tratamento de estados de carregamento e erros
 * - Simulação de dados para desenvolvimento
 */
const PetPage = () => {
  const { id } = useParams();
  const { darkMode } = useContext(ThemeContext);
  const { user } = useAuth();
  const [pet, setPet] = useState(null);
  const [outrosPets, setOutrosPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdotando, setIsAdotando] = useState(false);
  const [adocaoSucesso, setAdocaoSucesso] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Busca os dados do pet
        const petData = await getPet(id);
        setPet(petData);
        
        // Busca outros pets para sugestão
        const outrosData = await getAvailablePets();
        const outros = outrosData
          .filter((p) => p._id !== id)
          .slice(0, 3);
        
        setOutrosPets(outros);
      } catch (err) {
        setError('Erro ao carregar dados do pet. Por favor, tente novamente mais tarde.');
        console.error('Erro ao carregar dados:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  const handleAdotar = async () => {
    if (!user) {
      setError('Você precisa estar logado para adotar um pet.');
      return;
    }

    setIsAdotando(true);
    
    try {
      await createAdoptionRequest(id, user._id);
      setAdocaoSucesso(true);
    } catch (err) {
      setError('Erro ao processar a adoção. Por favor, tente novamente.');
      console.error('Erro ao processar adoção:', err);
    } finally {
      setIsAdotando(false);
    }
  };

  if (isLoading) {
    return (
      <div className={`${styles.container} ${darkMode ? styles.darkMode : ''}`}>
        <div className={styles.loadingContainer}>
          <FaSpinner className={styles.spinner} />
          <p>Carregando informações do pet...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.container} ${darkMode ? styles.darkMode : ''}`}>
        <div className={styles.errorContainer}>
          <h2>Pet não encontrado 😿</h2>
          <p>{error}</p>
          <Link to="/pets" className={styles.voltarLink}>
            <FaArrowLeft /> Voltar para lista de pets
          </Link>
        </div>
      </div>
    );
  }

  if (adocaoSucesso) {
    return (
      <div className={`${styles.container} ${darkMode ? styles.darkMode : ''}`}>
        <div className={styles.sucessoContainer}>
          <div className={styles.sucessoIcon}>
            <FaHeart />
          </div>
          <h2>Adoção iniciada com sucesso!</h2>
          <p>Parabéns! Seu processo de adoção do {pet.name} foi iniciado.</p>
          <p>Entraremos em contato em breve para agendar uma visita.</p>
          <Link to="/pets" className={styles.voltarLink}>
            <FaArrowLeft /> Voltar para lista de pets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${darkMode ? styles.darkMode : ''}`}>
      <Link to="/pets" className={styles.voltarLink}>
        <FaArrowLeft /> Voltar para lista de pets
      </Link>
      
      <div className={styles.main}>
        <div className={styles.leftColumn}>
          <div className={styles.imageContainer}>
            <img src={pet.picture} alt={pet.name} />
          </div>
          
          <div className={styles.petInfo}>
            <h1>{pet.name}</h1>
            <div className={styles.petType}>
              {pet.traits.species === 'dog' ? <FaDog /> : <FaCat />}
              <span>{pet.traits.species === 'dog' ? 'Cachorro' : 'Gato'}</span>
            </div>
            
            <div className={styles.details}>
              <div className={styles.detail}>
                <strong>Raça:</strong> {pet.traits.breed || 'Não especificada'}
              </div>
              <div className={styles.detail}>
                <strong>Idade:</strong> {pet.traits.age} anos
              </div>
              <div className={styles.detail}>
                <strong>Tamanho:</strong> {pet.traits.size}
              </div>
              <div className={styles.detail}>
                <strong>Pelagem:</strong> {pet.traits.fur_type}
              </div>
              <div className={styles.detail}>
                <strong>Temperamento:</strong> {pet.traits.temperament}
              </div>
              <div className={styles.detail}>
                <strong>Treinado:</strong> {pet.traits.trained ? 'Sim' : 'Não'}
              </div>
              <div className={styles.detail}>
                <strong>Necessidades Especiais:</strong> {pet.traits.special_needs ? 'Sim' : 'Não'}
              </div>
            </div>

            <div className={styles.description}>
              <h3>Sobre {pet.name}</h3>
              <p>{pet.traits.description}</p>
            </div>

            <div className={styles.ownerInfo}>
              <h3>Informações do Responsável</h3>
              <div className={styles.ownerDetails}>
                <div className={styles.ownerDetail}>
                  <FaHome /> {pet.owner_id?.type === 'org' ? 'ONG' : 'Tutor Temporário'}
                </div>
                <div className={styles.ownerDetail}>
                  <FaPhone /> {pet.owner_id?.phone}
                </div>
                <div className={styles.ownerDetail}>
                  <FaMapMarkerAlt /> {pet.owner_id?.address?.[0]?.city || 'Localização não disponível'}
                </div>
              </div>
            </div>

            <button 
              className={styles.adotarButton}
              onClick={handleAdotar}
              disabled={isAdotando}
            >
              {isAdotando ? (
                <>
                  <FaSpinner className={styles.spinner} />
                  Processando...
                </>
              ) : (
                <>
                  <FaHeart /> Adotar {pet.name}
                </>
              )}
            </button>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <h3>Outros pets para adoção</h3>
          <div className={styles.outrosPets}>
            {outrosPets.map((outroPet) => (
              <Link 
                key={outroPet._id} 
                to={`/pet/${outroPet._id}`}
                className={styles.outroPetCard}
              >
                <img src={outroPet.picture} alt={outroPet.name} />
                <div className={styles.outroPetInfo}>
                  <h4>{outroPet.name}</h4>
                  <p>{outroPet.traits.breed || 'Raça não especificada'}</p>
                  <div className={styles.outroPetDetails}>
                    <span>{outroPet.traits.size}</span>
                    <span>{outroPet.traits.temperament}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetPage;

import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPaw, FaHeart, FaDog, FaCat, FaHome, FaClock, FaCheck, FaTimes, FaUser } from 'react-icons/fa';
import { ThemeContext } from '../../../contexts/ThemeContext';
import styles from './PetMatch.module.css';

/**
 * Componente PetMatch
 * 
 * Este componente exibe a compatibilidade entre um usuário e um pet específico.
 * Funcionalidades:
 * - Exibição de informações do pet
 * - Comparação de parâmetros de compatibilidade
 * - Cálculo de porcentagem de match
 * - Suporte a modo escuro
 * - Design responsivo para dispositivos móveis
 * 
 * Estrutura para integração com backend:
 * - Funções assíncronas para buscar dados do pet e do usuário
 * - Tratamento de estados de carregamento e erros
 * - Cálculo de compatibilidade baseado em parâmetros
 */
const PetMatch = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  
  // Estados para controle de UI e dados
  const [pet, setPet] = useState(null);
  const [userPreferences, setUserPreferences] = useState(null);
  const [compatibilityScore, setCompatibilityScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Efeito para animação de entrada
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  // Efeito para carregar dados do pet e preferências do usuário
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Em produção, estas seriam chamadas à API
        // const petResponse = await api.get(`/pets/${id}`);
        // const userResponse = await api.get('/user/preferences');
        
        // Simula dados do pet
        const petData = {
          id: id,
          name: 'Max',
          type: 'cachorro',
          breed: 'Labrador',
          age: 2,
          gender: 'macho',
          size: 'médio',
          temperament: 'brincalhão',
          energyLevel: 'alto',
          goodWithChildren: true,
          goodWithOtherPets: true,
          needsExercise: true,
          image: '/images/logo.png'
        };
        
        // Simula preferências do usuário
        const userData = {
          name: 'João',
          age: 28,
          residenceType: 'casa',
          availableTime: 'muito',
          hasOtherPets: 'sim',
          preferredSize: 'médio',
          preferredGender: 'macho',
          desiredTemperament: 'brincalhão'
        };
        
        // Simula um atraso de rede
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setPet(petData);
        setUserPreferences(userData);
        
        // Calcula a compatibilidade
        calculateCompatibility(petData, userData);
      } catch (err) {
        setError('Erro ao carregar dados. Por favor, tente novamente mais tarde.');
        console.error('Erro ao carregar dados:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [id]);
  
  /**
   * Calcula a porcentagem de compatibilidade entre o usuário e o pet
   * @param {Object} petData - Dados do pet
   * @param {Object} userData - Preferências do usuário
   */
  const calculateCompatibility = (petData, userData) => {
    if (!petData || !userData) return;
    
    let score = 0;
    let totalParameters = 0;
    
    // Compara o tipo de residência com as necessidades do pet
    if (petData.needsExercise && userData.residenceType === 'casa') {
      score += 20;
    } else if (petData.needsExercise && userData.residenceType === 'apartamento') {
      score += 10;
    } else {
      score += 15;
    }
    totalParameters++;
    
    // Compara o tempo disponível com o nível de energia do pet
    if (petData.energyLevel === 'alto' && userData.availableTime === 'muito') {
      score += 20;
    } else if (petData.energyLevel === 'alto' && userData.availableTime === 'medio') {
      score += 15;
    } else if (petData.energyLevel === 'medio' && userData.availableTime === 'muito') {
      score += 15;
    } else {
      score += 10;
    }
    totalParameters++;
    
    // Compara se o usuário tem outros pets com a compatibilidade do pet
    if (petData.goodWithOtherPets && userData.hasOtherPets === 'sim') {
      score += 20;
    } else if (!petData.goodWithOtherPets && userData.hasOtherPets === 'nao') {
      score += 20;
    } else {
      score += 10;
    }
    totalParameters++;
    
    // Compara o porte preferido com o porte do pet
    if (petData.size === userData.preferredSize) {
      score += 20;
    } else {
      score += 10;
    }
    totalParameters++;
    
    // Compara o sexo preferido com o sexo do pet
    if (petData.gender === userData.preferredGender || userData.preferredGender === 'tantoFaz') {
      score += 20;
    } else {
      score += 10;
    }
    totalParameters++;
    
    // Calcula a porcentagem final
    const finalScore = Math.round((score / (totalParameters * 20)) * 100);
    setCompatibilityScore(finalScore);
  };
  
  /**
   * Navega para a página de detalhes do pet
   */
  const handleGoToPetPage = () => {
    navigate(`/pet/${id}`);
  };
  
  /**
   * Renderiza os parâmetros de compatibilidade
   * @returns {Array} Array de elementos JSX
   */
  const renderCompatibilityParameters = () => {
    if (!pet || !userPreferences) return null;
    
    const parameters = [
      { 
        name: 'Residência', 
        userValue: userPreferences.residenceType === 'casa' ? 'Casa com quintal' : 'Apartamento',
        petValue: pet.needsExercise ? 'Necessita espaço' : 'Adapta-se bem',
        color: pet.needsExercise && userPreferences.residenceType === 'casa' ? '#36d17c' : 
               pet.needsExercise && userPreferences.residenceType === 'apartamento' ? '#ffb3b3' : '#c0f2cc'
      },
      { 
        name: 'Tempo Disponível', 
        userValue: userPreferences.availableTime === 'muito' ? 'Muito tempo' : 
                  userPreferences.availableTime === 'medio' ? 'Tempo médio' : 'Pouco tempo',
        petValue: pet.energyLevel === 'alto' ? 'Alta energia' : 
                 pet.energyLevel === 'medio' ? 'Energia média' : 'Baixa energia',
        color: (pet.energyLevel === 'alto' && userPreferences.availableTime === 'muito') || 
               (pet.energyLevel === 'medio' && userPreferences.availableTime === 'muito') ? '#36d17c' : 
               (pet.energyLevel === 'alto' && userPreferences.availableTime === 'medio') ? '#c0f2cc' : '#ffb3b3'
      },
      { 
        name: 'Outros Pets', 
        userValue: userPreferences.hasOtherPets === 'sim' ? 'Possui outros pets' : 'Não possui outros pets',
        petValue: pet.goodWithOtherPets ? 'Bom com outros pets' : 'Prefere ser único',
        color: (pet.goodWithOtherPets && userPreferences.hasOtherPets === 'sim') || 
               (!pet.goodWithOtherPets && userPreferences.hasOtherPets === 'nao') ? '#36d17c' : '#ffb3b3'
      },
      { 
        name: 'Porte', 
        userValue: userPreferences.preferredSize === 'pequeno' ? 'Pequeno' : 
                  userPreferences.preferredSize === 'medio' ? 'Médio' : 'Grande',
        petValue: pet.size === 'pequeno' ? 'Pequeno' : 
                 pet.size === 'medio' ? 'Médio' : 'Grande',
        color: pet.size === userPreferences.preferredSize ? '#36d17c' : '#c0f2cc'
      },
      { 
        name: 'Sexo', 
        userValue: userPreferences.preferredGender === 'macho' ? 'Macho' : 
                  userPreferences.preferredGender === 'femea' ? 'Fêmea' : 'Tanto faz',
        petValue: pet.gender === 'macho' ? 'Macho' : 'Fêmea',
        color: pet.gender === userPreferences.preferredGender || userPreferences.preferredGender === 'tantoFaz' ? '#36d17c' : '#ffb3b3'
      },
      { 
        name: 'Comportamento', 
        userValue: userPreferences.desiredTemperament === 'calmo' ? 'Calmo' : 
                  userPreferences.desiredTemperament === 'brincalhao' ? 'Brincalhão' : 'Protetor',
        petValue: pet.temperament === 'calmo' ? 'Calmo' : 
                 pet.temperament === 'brincalhao' ? 'Brincalhão' : 'Protetor',
        color: pet.temperament === userPreferences.desiredTemperament ? '#36d17c' : '#c0f2cc'
      }
    ];
    
    return parameters.map((param, index) => (
      <div key={index} className={styles.parametroRow}>
        <div className={styles.parametroInfo}>
          <span className={styles.parametroName}>{param.name}</span>
          <div className={styles.parametroValues}>
            <div className={styles.userValue}>
              <FaUser className={styles.valueIcon} />
              <span>{param.userValue}</span>
            </div>
            <div className={styles.petValue}>
              <FaPaw className={styles.valueIcon} />
              <span>{param.petValue}</span>
            </div>
          </div>
        </div>
        <div className={styles.parametroBar} style={{ backgroundColor: param.color }}>
          <div className={styles.barLabel}>
            {param.color === '#36d17c' ? <FaCheck className={styles.matchIcon} /> : 
             param.color === '#ffb3b3' ? <FaTimes className={styles.matchIcon} /> : 
             <FaPaw className={styles.matchIcon} />}
          </div>
        </div>
      </div>
    ));
  };
  
  // Renderiza o indicador de carregamento
  if (isLoading) {
    return (
      <div className={`${styles.matchContainer} ${darkMode ? styles.darkMode : ''}`}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Carregando compatibilidade...</p>
        </div>
      </div>
    );
  }
  
  // Renderiza a mensagem de erro
  if (error) {
    return (
      <div className={`${styles.matchContainer} ${darkMode ? styles.darkMode : ''}`}>
        <div className={styles.errorContainer}>
          <FaTimes className={styles.errorIcon} />
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className={styles.retryButton}>
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`${styles.matchContainer} ${darkMode ? styles.darkMode : ''}`}>
      <div className={`${styles.matchContent} ${isVisible ? styles.visible : ''}`}>
        <h1 className={styles.title}>
          <FaHeart className={styles.titleIcon} />
          Deu Match?
        </h1>
        <p className={styles.subtitle}>
          Veja a compatibilidade entre você e {pet?.name || 'seu próximo aumigo'}!
        </p>
        
        <div className={styles.matchScore}>
          <div className={styles.scoreCircle} style={{ 
            background: `conic-gradient(var(--light-accent) ${compatibilityScore}%, var(--light-secondary) 0)`,
            ...(darkMode && { 
              background: `conic-gradient(var(--dark-accent) ${compatibilityScore}%, var(--dark-secondary) 0)` 
            })
          }}>
            <div className={styles.scoreInner}>
              <span className={styles.scoreValue}>{compatibilityScore}%</span>
              <span className={styles.scoreLabel}>Match</span>
            </div>
          </div>
          <p className={styles.scoreDescription}>
            {compatibilityScore >= 80 ? 'Excelente compatibilidade! Este pet pode ser perfeito para você!' :
             compatibilityScore >= 60 ? 'Boa compatibilidade! Este pet pode ser uma ótima escolha.' :
             compatibilityScore >= 40 ? 'Compatibilidade média. Considere os pontos de atenção.' :
             'Compatibilidade baixa. Este pet pode não ser o ideal para seu perfil.'}
          </p>
        </div>
        
        <div className={styles.petInfo}>
          <div className={styles.petCard}>
            <img src={pet?.image || '/images/logo.png'} alt={pet?.name || 'Pet'} className={styles.petImage} />
            <div className={styles.petDetails}>
              <h2 className={styles.petName}>{pet?.name || 'Pet'}</h2>
              <p className={styles.petType}>
                {pet?.type === 'cachorro' ? <FaDog className={styles.petTypeIcon} /> : <FaCat className={styles.petTypeIcon} />}
                {pet?.breed || 'Raça não especificada'}
              </p>
              <p className={styles.petAge}>{pet?.age || '?'} {pet?.age === 1 ? 'ano' : 'anos'}</p>
            </div>
          </div>
        </div>
        
        <div className={styles.compatibilitySection}>
          <h3 className={styles.sectionTitle}>Parâmetros de Compatibilidade</h3>
          <div className={styles.parametros}>
            {renderCompatibilityParameters()}
          </div>
        </div>
        
        <button className={styles.goButton} onClick={handleGoToPetPage}>
          Ver Detalhes do Pet
        </button>
      </div>
    </div>
  );
};

export default PetMatch;

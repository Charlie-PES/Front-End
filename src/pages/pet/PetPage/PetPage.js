import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { FaHeart, FaPaw, FaDog, FaCat, FaHome, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaCheck, FaTimes, FaSpinner, FaArrowLeft } from 'react-icons/fa';
import styles from './PetPage.module.css';
import { getPet, getAvailablePets, createAdoptionRequest } from '../../../services/matchService';
import { useAuth } from '../../../contexts/AuthContext';
import api from '../../../services/api';

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
  const [responsavel, setResponsavel] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Busca os dados do pet
        const petData = await getPet(id);
        setPet(petData);
        
        // Busca os dados do responsável se houver owner_id
        if (petData.owner_id) {
          try {
            const resp = await api.get(`/owners/owners/${petData.owner_id}`);
            setResponsavel(resp.data);
          } catch (err) {
            setResponsavel(null);
          }
        } else {
          setResponsavel(null);
        }
        
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

  // Função utilitária para calcular idade
  function calcularIdade(dataNascimento) {
    if (!dataNascimento || dataNascimento === 'string') return '';
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade + (idade === 1 ? ' ano' : ' anos');
  }

  // Preparar dados do pet de forma resiliente
  const nome = pet?.name && pet.name !== 'string' ? pet.name : 'Não informado';
  const especie = pet?.traits?.species && pet.traits.species !== 'string' ? pet.traits.species : '';
  const raca = pet?.traits?.breed && pet.traits.breed !== 'string' ? pet.traits.breed : '';
  const tamanho = pet?.traits?.size && pet.traits.size !== 'string' ? pet.traits.size : '';
  const cor = pet?.traits?.color && pet.traits.color !== 'string' ? pet.traits.color : '';
  const pelagem = pet?.traits?.fur_type && pet.traits.fur_type !== 'string' ? pet.traits.fur_type : '';
  const temperamento = pet?.traits?.temperament && pet.traits.temperament !== 'string' ? pet.traits.temperament : '';
  const treinado = pet?.traits?.trained ? 'Sim' : 'Não';
  const necessidades = pet?.traits?.special_needs ? 'Sim' : 'Não';
  const descricao = pet?.traits?.description && pet.traits.description !== 'string' ? pet.traits.description : '';
  const idade = calcularIdade(pet?.birthday_date);
  let imagem = '/images/default-pet.png';
  if (pet?.picture && pet.picture !== 'string') imagem = pet.picture;
  // Vacinas
  const vacinas = pet?.additional_data?.vacinas || [];

  // Responsável
  const tipoResponsavel = responsavel?.type === 'org' ? 'ONG' : 'Tutor Temporário';
  const nomeResponsavel = responsavel?.name || '';
  const telefone = responsavel?.phone || '';
  const cidade = responsavel?.address?.[0]?.city || '';

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
          <Link to="/adotar" className={styles.voltarLink}>
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
          <p>Parabéns! Seu processo de adoção do {nome} foi iniciado.</p>
          <p>Entraremos em contato em breve para agendar uma visita.</p>
          <Link to="/adotar" className={styles.voltarLink}>
            <FaArrowLeft /> Voltar para lista de pets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${darkMode ? styles.darkMode : ''}`}>
      <Link to="/adotar" className={styles.voltarLink}>
        <FaArrowLeft /> Voltar para lista de pets
      </Link>
      <div className={styles.main}>
        <div className={styles.imageContainer}>
          <img src={imagem} alt={nome} />
        </div>
        <div className={styles.petInfo}>
          <h1>{nome}</h1>
          {especie && (
            <div className={styles.petType}>
              {especie === 'dog' ? <FaDog /> : <FaCat />}
              <span>{especie === 'dog' ? 'Cachorro' : especie === 'cat' ? 'Gato' : especie}</span>
            </div>
          )}
          <ul className="caracteristicas">
            {raca && <li><strong>Raça:</strong> {raca}</li>}
            {idade && <li><strong>Idade:</strong> {idade}</li>}
            {tamanho && <li><strong>Tamanho:</strong> {tamanho}</li>}
            {cor && <li><strong>Cor:</strong> {cor}</li>}
            {pelagem && <li><strong>Pelagem:</strong> {pelagem}</li>}
            {temperamento && <li><strong>Temperamento:</strong> {temperamento}</li>}
            <li><strong>Treinado:</strong> {treinado}</li>
            <li><strong>Necessidades Especiais:</strong> {necessidades}</li>
            {vacinas.length > 0 && (
              <li><strong>Vacinas:</strong> {vacinas.join(', ')}</li>
            )}
          </ul>
          {descricao && (
            <div className={styles.description}>
              <p>{descricao}</p>
            </div>
          )}
          {responsavel && (
            <div className={styles.ownerInfo}>
              <div className="sectionTitle">Informações do Responsável</div>
              <div className={styles.ownerDetails}>
                <div className={styles.ownerDetail}>
                  <FaHome /> {tipoResponsavel} {nomeResponsavel && `- ${nomeResponsavel}`}
                </div>
                {telefone && <div className={styles.ownerDetail}><FaPhone /> {telefone}</div>}
                {cidade && <div className={styles.ownerDetail}><FaMapMarkerAlt /> {cidade}</div>}
              </div>
            </div>
          )}
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
                <FaHeart /> Adotar {nome}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetPage;
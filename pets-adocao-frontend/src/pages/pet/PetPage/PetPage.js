import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { FaHeart, FaPaw, FaDog, FaCat, FaHome, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaCheck, FaTimes, FaSpinner, FaArrowLeft } from 'react-icons/fa';
import styles from './PetPage.module.css';

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
  const [pet, setPet] = useState(null);
  const [outrosPets, setOutrosPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdotando, setIsAdotando] = useState(false);
  const [adocaoSucesso, setAdocaoSucesso] = useState(false);

  // Simulação de dados para desenvolvimento
  // Em produção, estes dados viriam de uma API
  const petsData = [
    {
      id: 1,
      nome: 'Thor',
      sexo: 'Macho',
      raca: 'SRD',
      cor: 'Branco e Marrom',
      idade: '3 meses',
      vacinas: 'V10',
      porte: 'Médio',
      castrado: 'Não',
      imagem: '/images/dog1.png',
      compatibilidade: 90,
      historico: [
        { icone: '📅', texto: 'Resgatado em: 02/01/2024' },
        { icone: '🏠', texto: 'Abrigo Amor Animal (02/01 até 15/02)' },
        { icone: '👩‍🦰', texto: 'Lar temporário (Ana) – 15/02 até hoje' }
      ],
      responsavel: {
        nome: 'Ana Beatriz Souza',
        tipo: 'Lar temporário',
        telefone: '(11) 98765-4321',
        localizacao: 'São Paulo - SP'
      },
      tempoCuidado: '2 meses e 10 dias'
    },
    {
      id: 2,
      nome: 'Luna',
      sexo: 'Fêmea',
      raca: 'SRD',
      cor: 'Branco',
      idade: '5 meses',
      vacinas: 'V8, Raiva',
      porte: 'Pequeno',
      castrado: 'Sim',
      imagem: '/images/dog2.png',
      compatibilidade: 75,
      historico: [
        { icone: '📅', texto: 'Resgatado em: 15/03/2024' },
        { icone: '🏠', texto: 'Abrigo Cão Feliz (15/03 até 10/04)' },
        { icone: '👨‍🦱', texto: 'Lar temporário (Carlos) – 10/04 até hoje' }
      ],
      responsavel: {
        nome: 'Carlos Eduardo Silva',
        tipo: 'Lar temporário',
        telefone: '(11) 91234-5678',
        localizacao: 'São Paulo - SP'
      },
      tempoCuidado: '1 mês e 15 dias'
    },
    {
      id: 3,
      nome: 'Nina',
      sexo: 'Fêmea',
      raca: 'Poodle',
      cor: 'Cinza',
      idade: '1 ano',
      vacinas: 'V10, Raiva',
      porte: 'Pequeno',
      castrado: 'Sim',
      imagem: '/images/dog3.png',
      compatibilidade: 85,
      historico: [
        { icone: '📅', texto: 'Resgatado em: 10/02/2024' },
        { icone: '🏠', texto: 'Abrigo Gato Amigo (10/02 até 05/03)' },
        { icone: '👩‍🦳', texto: 'Lar temporário (Mariana) – 05/03 até hoje' }
      ],
      responsavel: {
        nome: 'Mariana Oliveira',
        tipo: 'Lar temporário',
        telefone: '(11) 99876-5432',
        localizacao: 'São Paulo - SP'
      },
      tempoCuidado: '3 meses e 5 dias'
    },
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
        // const response = await fetch(`/api/pets/${id}`);
        // const data = await response.json();
        // setPet(data);
        
        // Por enquanto, usamos os dados simulados
        const petEncontrado = petsData.find((p) => p.id === Number(id));
        
        if (!petEncontrado) {
          setError('Pet não encontrado');
          return;
        }
        
        setPet(petEncontrado);
        
        // Busca outros pets para sugestão
        // Em produção, aqui seria uma chamada à API
        // const outrosResponse = await fetch('/api/pets/sugestoes');
        // const outrosData = await outrosResponse.json();
        // setOutrosPets(outrosData);
        
        // Por enquanto, usamos os dados simulados
        const outros = petsData
          .filter((p) => p.id !== Number(id))
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

  /**
   * Simula o processo de adoção
   * Em produção, esta função enviaria os dados para o backend
   */
  const handleAdotar = async () => {
    setIsAdotando(true);
    
    try {
      // Simula um atraso de rede
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Em produção, aqui seria uma chamada à API
      // const response = await fetch('/api/adocoes', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     petId: pet.id,
      //     // outros dados necessários
      //   })
      // });
      // const data = await response.json();
      
      setAdocaoSucesso(true);
    } catch (err) {
      setError('Erro ao processar a adoção. Por favor, tente novamente.');
      console.error('Erro ao processar adoção:', err);
    } finally {
      setIsAdotando(false);
    }
  };

  // Renderiza o estado de carregamento
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

  // Renderiza o estado de erro
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

  // Renderiza o estado de sucesso na adoção
  if (adocaoSucesso) {
    return (
      <div className={`${styles.container} ${darkMode ? styles.darkMode : ''}`}>
        <div className={styles.sucessoContainer}>
          <div className={styles.sucessoIcon}>
            <FaHeart />
          </div>
          <h2>Adoção iniciada com sucesso!</h2>
          <p>Parabéns! Seu processo de adoção do {pet.nome} foi iniciado.</p>
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
            <img src={pet.imagem} alt={pet.nome} className={styles.petImage} />
            <div className={styles.petBadge}>
              {pet.sexo === 'Macho' ? <FaDog /> : <FaCat />}
            </div>
          </div>
          
          <div className={styles.compatibilidadeBox}>
            <h3>Compatibilidade</h3>
            <div className={styles.compatibilidadeInfo}>
              <div className={styles.compatibilidadeValor}>
                <span className={styles.valor}>{pet.compatibilidade}%</span>
                <span className={styles.label}>compatível</span>
              </div>
              <div className={styles.barra}>
                <div
                  className={styles.preenchido}
                  style={{ width: `${pet.compatibilidade}%` }}
                >
                </div>
              </div>
            </div>
            <button 
              className={styles.adotarBtn}
              onClick={handleAdotar}
              disabled={isAdotando}
            >
              {isAdotando ? (
                <>
                  <FaSpinner className={styles.spinner} /> Processando...
                </>
              ) : (
                <>
                  <FaHeart /> Adotar {pet.nome}
                </>
              )}
            </button>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.section}>
            <h3>Informações do Pet</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Nome</span>
                <span className={styles.infoValue}>{pet.nome}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Sexo</span>
                <span className={styles.infoValue}>{pet.sexo}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Raça</span>
                <span className={styles.infoValue}>{pet.raca}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Cor</span>
                <span className={styles.infoValue}>{pet.cor}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Idade</span>
                <span className={styles.infoValue}>{pet.idade}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Vacinas</span>
                <span className={styles.infoValue}>{pet.vacinas}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Porte</span>
                <span className={styles.infoValue}>{pet.porte}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Castrado(a)</span>
                <span className={styles.infoValue}>
                  {pet.castrado === 'Sim' ? (
                    <span className={styles.statusSim}><FaCheck /> Sim</span>
                  ) : (
                    <span className={styles.statusNao}><FaTimes /> Não</span>
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h3>Histórico de Rastreabilidade</h3>
            <ul className={styles.historico}>
              {pet.historico.map((item, i) => (
                <li key={i} className={styles.historicoItem}>
                  <span className={styles.historicoIcone}>{item.icone}</span>
                  <span className={styles.historicoTexto}>{item.texto}</span>
                </li>
              ))}
            </ul>
            <div className={styles.tempoCuidado}>
              <FaCalendarAlt />
              <span><strong>Total de tempo sob cuidado:</strong> {pet.tempoCuidado}</span>
            </div>
          </div>

          <div className={styles.section}>
            <h3>Responsável</h3>
            <div className={styles.responsavelInfo}>
              <div className={styles.responsavelItem}>
                <span className={styles.responsavelLabel}>Nome</span>
                <span className={styles.responsavelValue}>{pet.responsavel.nome}</span>
              </div>
              <div className={styles.responsavelItem}>
                <span className={styles.responsavelLabel}>Tipo de responsável</span>
                <span className={styles.responsavelValue}>{pet.responsavel.tipo}</span>
              </div>
              <div className={styles.responsavelItem}>
                <span className={styles.responsavelLabel}>Contato</span>
                <span className={styles.responsavelValue}>
                  <FaPhone className={styles.icone} /> {pet.responsavel.telefone}
                </span>
              </div>
              <div className={styles.responsavelItem}>
                <span className={styles.responsavelLabel}>Localização</span>
                <span className={styles.responsavelValue}>
                  <FaMapMarkerAlt className={styles.icone} /> {pet.responsavel.localizacao}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.outros}>
        <h3>Outros pets disponíveis para adoção</h3>
        <div className={styles.outrosGrid}>
          {outrosPets.map((p) => (
            <div key={p.id} className={styles.outroCard}>
              <div className={styles.outroImagemContainer}>
                <img src={p.imagem} alt={p.nome} className={styles.outroImagem} />
                <div className={styles.outroBadge}>
                  {p.sexo === 'Macho' ? <FaDog /> : <FaCat />}
                </div>
              </div>
              <div className={styles.outroInfo}>
                <h4>{p.nome}</h4>
                <p>{p.raca} • {p.idade}</p>
                <div className={styles.outroCompatibilidade}>
                  <div className={styles.outroBarra}>
                    <div
                      className={styles.outroPreenchido}
                      style={{ width: `${p.compatibilidade}%` }}
                    ></div>
                  </div>
                  <span>{p.compatibilidade}%</span>
                </div>
              </div>
              <Link to={`/pet/${p.id}`} className={styles.verMaisBtn}>
                Ver mais
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PetPage;

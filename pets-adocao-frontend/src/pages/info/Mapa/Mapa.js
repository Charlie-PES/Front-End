import React, { useState, useEffect, useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { FaMapMarkerAlt, FaSearch, FaFilter, FaPlus, FaTimes, FaInfoCircle, FaPaw, FaDog, FaCat, FaHospital, FaMapPin, FaMapMarkedAlt, FaMapMarker, FaHeart, FaHome, FaStethoscope } from 'react-icons/fa';
import { ThemeContext } from '../../../contexts/ThemeContext';
import styles from './Mapa.module.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import OverlayInfo from './OverlayInfo/OverlayInfo';
import NovoLocalOverlay from './NovoLocalOverlay/NovoLocalOverlay';

/**
 * Configuração dos ícones padrão do Leaflet
 * Necessário para evitar problemas com os marcadores padrão
 */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

/**
 * Componente Mapa
 * 
 * Este componente exibe um mapa interativo com locais de adoção de pets.
 * Permite visualizar ONGs, abrigos e outros locais relacionados à adoção.
 * Inclui funcionalidades de filtro, busca e adição de novos locais.
 * 
 * Funcionalidades:
 * - Visualização de locais no mapa
 * - Filtros por cidade, estado, bairro e nome
 * - Adição de novos locais
 * - Visualização detalhada de cada local
 * - Suporte a modo escuro
 * - Design responsivo para dispositivos móveis
 */

/**
 * Dados iniciais para simulação de locais no mapa
 * Em produção, estes dados viriam de uma API
 */
const locaisIniciais = [
  {
    id: 1,
    nome: 'ONG Amor Animal',
    posicao: [-30.0331, -51.23],
    descricao: 'Ajuda animais em situação de rua e promove adoções!',
    cidade: 'Porto Alegre',
    estado: 'RS',
    bairro: 'Centro',
    telefone: '(51) 9999-9999',
    email: 'contato@amoranimal.org',
    horario: 'Seg-Sex: 9h-18h',
    fotos: ['/images/ong1.jpg', '/images/ong2.jpg'],
    animais: ['Cães', 'Gatos', 'Pássaros'],
    redesSociais: {
      facebook: 'https://facebook.com/amoranimal',
      instagram: 'https://instagram.com/amoranimal'
    },
    tipo: 'ong' // Tipo de local para personalização do marcador
  },
  {
    id: 2,
    nome: 'Abrigo Patinhas',
    posicao: [-30.0400, -51.20],
    descricao: 'Adote com responsabilidade. 🐾',
    cidade: 'Porto Alegre',
    estado: 'RS',
    bairro: 'Vila Nova',
    telefone: '(51) 8888-8888',
    email: 'contato@abrigopatinhas.org',
    horario: 'Ter-Dom: 10h-17h',
    fotos: ['/images/abrigo1.jpg', '/images/abrigo2.jpg'],
    animais: ['Cães', 'Gatos'],
    redesSociais: {
      facebook: 'https://facebook.com/abrigopatinhas',
      instagram: 'https://instagram.com/abrigopatinhas'
    },
    tipo: 'abrigo'
  },
  {
    id: 3,
    nome: 'Clínica Veterinária PetCare',
    posicao: [-30.0271, -51.22],
    descricao: 'Cuidados veterinários de qualidade para seu pet.',
    cidade: 'Porto Alegre',
    estado: 'RS',
    bairro: 'Moinhos de Vento',
    telefone: '(51) 7777-7777',
    email: 'contato@petcare.com',
    horario: 'Seg-Sab: 8h-20h',
    fotos: ['/images/clinica1.jpg', '/images/clinica2.jpg'],
    animais: ['Cães', 'Gatos', 'Exóticos'],
    redesSociais: {
      facebook: 'https://facebook.com/petcare',
      instagram: 'https://instagram.com/petcare'
    },
    tipo: 'clinica'
  }
];

/**
 * Componente principal do mapa
 * @returns {JSX.Element} Componente de mapa renderizado
 */
const Mapa = () => {
  // Contexto de tema para suporte a modo escuro
  const { darkMode } = useContext(ThemeContext);
  
  // Estados para gerenciar os locais e interações
  const [locais, setLocais] = useState(locaisIniciais);
  const [novoLocal, setNovoLocal] = useState({ 
    nome: '', 
    descricao: '', 
    posicao: null,
    cidade: '',
    estado: '',
    bairro: '',
    telefone: '',
    email: '',
    horario: '',
    fotos: [],
    animais: [],
    redesSociais: {},
    tipo: 'ong' // Tipo padrão para novos locais
  });
  
  // Estados para filtros e visualização
  const [filtros, setFiltros] = useState({ 
    cidade: '', 
    estado: '', 
    bairro: '', 
    nome: '',
    tipo: 'todos' // 'todos', 'ong', 'abrigo', 'clinica'
  });
  
  // Estados para controle de UI
  const [ongSelecionada, setOngSelecionada] = useState(null);
  const [overlayNovoLocal, setOverlayNovoLocal] = useState(false);
  const [ultimoAdicionadoId, setUltimoAdicionadoId] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modoAdicionar, setModoAdicionar] = useState(false); // Novo estado para controlar o modo de adição
  
  /**
   * Efeito para carregar os locais ao montar o componente
   * Simula uma chamada à API
   */
  useEffect(() => {
    const fetchLocais = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simula um delay de rede
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Em produção, aqui seria uma chamada à API
        setLocais(locaisIniciais);
      } catch (err) {
        setError('Erro ao carregar os locais. Tente novamente mais tarde.');
        console.error('Erro ao carregar locais:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLocais();
  }, []);
  
  /**
   * Manipula o clique no mapa para adicionar um novo local
   * @param {Object} e - Evento de clique do Leaflet
   */
  const handleMapClick = (e) => {
    // Só processa o clique se estiver no modo de adição
    if (modoAdicionar) {
      setNovoLocal({ 
        ...novoLocal, 
        posicao: [e.latlng.lat, e.latlng.lng] 
      });
      setModoAdicionar(false); // Desativa o modo de adição
      setOverlayNovoLocal(true); // Abre o overlay para adicionar detalhes
    }
  };
  
  /**
   * Ativa o modo de adição de novo local
   */
  const ativarModoAdicionar = () => {
    setModoAdicionar(true);
  };
  
  /**
   * Adiciona um novo local ao mapa
   * Simula uma chamada à API para salvar o local
   */
  const handleAddNovoLocal = async () => {
    if (novoLocal.nome && novoLocal.descricao && novoLocal.posicao) {
      setIsLoading(true);
      
      try {
        // Simula um delay de rede
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Em produção, aqui seria uma chamada à API
        const novoId = locais.length + 1;
        const novo = { ...novoLocal, id: novoId };
        setLocais([...locais, novo]);
        setUltimoAdicionadoId(novoId);
        
        // Fecha o overlay e reseta o formulário
        setOverlayNovoLocal(false);
        setNovoLocal({ 
          nome: '', 
          descricao: '', 
          posicao: null,
          cidade: '',
          estado: '',
          bairro: '',
          telefone: '',
          email: '',
          horario: '',
          fotos: [],
          animais: [],
          redesSociais: {},
          tipo: 'ong'
        });
      } catch (err) {
        setError('Erro ao adicionar local. Tente novamente mais tarde.');
        console.error('Erro ao adicionar local:', err);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  /**
   * Atualiza o estado do formulário quando um campo é alterado
   * @param {string} field - Nome do campo
   * @param {any} value - Novo valor do campo
   */
  const handleInputChange = (field, value) => {
    setNovoLocal((prev) => ({ ...prev, [field]: value }));
  };
  
  /**
   * Filtra os locais com base nos critérios de busca
   * @returns {Array} Locais filtrados
   */
  const filteredLocais = locais.filter((local) => {
    const matchNome = local.nome.toLowerCase().includes(filtros.nome.toLowerCase());
    const matchCidade = local.cidade.toLowerCase().includes(filtros.cidade.toLowerCase());
    const matchEstado = local.estado.toLowerCase().includes(filtros.estado.toLowerCase());
    const matchBairro = local.bairro.toLowerCase().includes(filtros.bairro.toLowerCase());
    
    let matchTipo = true;
    if (filtros.tipo !== 'todos') {
      matchTipo = local.tipo === filtros.tipo;
    }
    
    return matchNome && matchCidade && matchEstado && matchBairro && matchTipo;
  });
  
  /**
   * Componente para capturar eventos de clique no mapa
   * @returns {null} Não renderiza nada
   */
  const MapClickHandler = () => {
    useMapEvents({ click: handleMapClick });
    return null;
  };
  
  /**
   * Cria um marcador personalizado com base no tipo de local
   * @param {string} tipo - Tipo do local (ong, abrigo, clinica)
   * @param {boolean} isNew - Se é um local recém-adicionado
   * @returns {L.Icon} Ícone personalizado do Leaflet
   */
  const createCustomIcon = (tipo, isNew = false) => {
    // Cores para os marcadores
    const colors = {
      ong: '#d35400', // Laranja escuro
      abrigo: '#3498db', // Azul
      clinica: '#2ecc71', // Verde
      default: '#9b59b6' // Roxo
    };
    
    // Seleciona a cor com base no tipo
    const color = colors[tipo] || colors.default;
    
    // Ícones específicos para cada tipo
    const icons = {
      ong: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`,
      abrigo: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
      clinica: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>`,
      default: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>`
    };
    
    // Seleciona o ícone com base no tipo
    const iconSvg = icons[tipo] || icons.default;
    
    // Cria o HTML do ícone com a patinha
    const iconHtml = `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        ${isNew ? 'animation: pulse 1.5s infinite;' : ''}
      ">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
          <line x1="9" y1="9" x2="9.01" y2="9"></line>
          <line x1="15" y1="9" x2="15.01" y2="9"></line>
        </svg>
      </div>
    `;
    
    // Cria o ícone do Leaflet
    return L.divIcon({
      className: isNew ? styles.markerDrop : '',
      html: iconHtml,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [0, -15]
    });
  };
  
  return (
    <div className={`${styles.mapaContainer} ${darkMode ? styles.darkMode : ''}`}>
      {/* Cabeçalho do mapa */}
      <div className={styles.mapaHeader}>
        <h2 className={styles.mapaTitle}>
          <FaMapMarkerAlt className={styles.mapIcon} />
          Encontre uma ONG ou Abrigo
        </h2>
        <p className={styles.mapaSubtitle}>
          Descubra locais para adoção na sua região
        </p>
      </div>

      {/* Layout principal do mapa */}
      <div className={styles.mapaLayout}>
        {/* Sidebar de filtros */}
        <div className={`${styles.sidebarContainer} ${showFilters ? styles.showFilters : ''}`}>
          <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <h3>Filtros</h3>
              <button 
                className={styles.closeFiltersBtn}
                onClick={() => setShowFilters(false)}
                aria-label="Fechar filtros"
              >
                <FaTimes />
              </button>
            </div>
            
            {/* Campo de busca */}
            <div className={styles.searchContainer}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Buscar por nome"
                value={filtros.nome}
                onChange={(e) => setFiltros({ ...filtros, nome: e.target.value })}
                className={styles.searchInput}
              />
            </div>
            
            {/* Filtro por tipo de local */}
            <div className={styles.filterGroup}>
              <label>Tipo de Local</label>
              <select 
                value={filtros.tipo}
                onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
                className={styles.filterSelect}
              >
                <option value="todos">Todos</option>
                <option value="ong">ONGs</option>
                <option value="abrigo">Abrigos</option>
                <option value="clinica">Clínicas</option>
              </select>
            </div>
            
            {/* Filtro por cidade */}
            <div className={styles.filterGroup}>
              <label>Cidade</label>
              <input
                type="text"
                placeholder="Cidade"
                value={filtros.cidade}
                onChange={(e) => setFiltros({ ...filtros, cidade: e.target.value })}
                className={styles.filterInput}
              />
            </div>
            
            {/* Filtro por estado */}
            <div className={styles.filterGroup}>
              <label>Estado</label>
              <input
                type="text"
                placeholder="Estado"
                value={filtros.estado}
                onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })}
                className={styles.filterInput}
              />
            </div>
            
            {/* Filtro por bairro */}
            <div className={styles.filterGroup}>
              <label>Bairro</label>
              <input
                type="text"
                placeholder="Bairro"
                value={filtros.bairro}
                onChange={(e) => setFiltros({ ...filtros, bairro: e.target.value })}
                className={styles.filterInput}
              />
            </div>
            
            {/* Botão para limpar filtros */}
            <button 
              className={styles.clearFiltersBtn}
              onClick={() => setFiltros({ 
                cidade: '', 
                estado: '', 
                bairro: '', 
                nome: '',
                tipo: 'todos'
              })}
            >
              Limpar Filtros
            </button>
          </div>
        </div>

        {/* Container do mapa */}
        <div className={styles.mapContainer}>
          {/* Controles do mapa */}
          <div className={styles.mapControls}>
            <button 
              className={styles.filterToggleBtn}
              onClick={() => setShowFilters(!showFilters)}
              aria-label="Mostrar/ocultar filtros"
            >
              <FaFilter />
              <span>Filtros</span>
            </button>
          </div>
          
          {/* Botão de adicionar local (agora no canto inferior direito) */}
          <div className={styles.addLocationButton}>
            <button
              className={`${styles.addButton} ${modoAdicionar ? styles.active : ''}`}
              onClick={ativarModoAdicionar}
              title="Adicionar nova ONG ou Abrigo"
              aria-label="Adicionar novo local"
            >
              <FaPlus />
              <span className={styles.addButtonText}>Adicionar Local</span>
            </button>
          </div>
          
          {/* Área do mapa */}
          <div className={styles.mapArea}>
            {isLoading ? (
              <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Carregando mapa...</p>
              </div>
            ) : error ? (
              <div className={styles.errorContainer}>
                <FaInfoCircle className={styles.errorIcon} />
                <p>{error}</p>
                <button 
                  className={styles.retryButton}
                  onClick={() => window.location.reload()}
                >
                  Tentar Novamente
                </button>
              </div>
            ) : (
              <MapContainer
                center={[-30.0331, -51.23]}
                zoom={13}
                scrollWheelZoom={true}
                className={styles.map}
              >
                <TileLayer
                  attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapClickHandler />
                
                {/* Renderiza os marcadores no mapa */}
                {filteredLocais.map((local) => {
                  const isNew = local.id === ultimoAdicionadoId;
                  const customIcon = createCustomIcon(local.tipo, isNew);

                  return (
                    <Marker
                      key={local.id}
                      position={local.posicao}
                      icon={customIcon}
                      eventHandlers={{
                        click: () => setOngSelecionada(local),
                      }}
                    >
                      <Popup>
                        <div className={styles.popupContent}>
                          <h3>{local.nome}</h3>
                          <p>{local.descricao}</p>
                          <p><strong>Endereço:</strong> {local.bairro}, {local.cidade} - {local.estado}</p>
                          <button 
                            className={styles.viewDetailsBtn}
                            onClick={() => setOngSelecionada(local)}
                          >
                            Ver Detalhes
                          </button>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
            )}
          </div>
        </div>
      </div>

      {/* Overlay de detalhes do local */}
      {ongSelecionada && (
        <OverlayInfo ong={ongSelecionada} onClose={() => setOngSelecionada(null)} />
      )}

      {/* Overlay para adicionar novo local */}
      {overlayNovoLocal && (
        <NovoLocalOverlay
          local={novoLocal}
          onChange={handleInputChange}
          onSubmit={(e) => {
            e.preventDefault();
            handleAddNovoLocal();
          }}
          onClose={() => setOverlayNovoLocal(false)}
        />
      )}
      
      {/* Indicador de modo de adição */}
      {modoAdicionar && (
        <div className={styles.addModeIndicator}>
          <FaPaw className={styles.addModeIcon} />
          <p>Clique no mapa para adicionar um novo local</p>
        </div>
      )}
    </div>
  );
};

export default Mapa;

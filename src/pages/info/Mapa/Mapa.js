import React, { useState, useEffect, useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { FaMapMarkerAlt, FaSearch, FaFilter, FaPlus, FaTimes, FaInfoCircle, FaPaw, FaDog, FaCat, FaHospital, FaMapPin, FaMapMarkedAlt, FaMapMarker, FaHeart, FaHome, FaStethoscope } from 'react-icons/fa';
import { ThemeContext } from '../../../contexts/ThemeContext';
import styles from './Mapa.module.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import OverlayInfo from './OverlayInfo/OverlayInfo';
import NovoLocalOverlay from './NovoLocalOverlay/NovoLocalOverlay';
import { getOngs, geocodeAddress } from '../../../services/ongService';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


const Mapa = () => {
  const { darkMode } = useContext(ThemeContext);
  
  const [locais, setLocais] = useState([]);
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
  
  useEffect(() => {
    const fetchLocais = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Busca ONGs reais do backend
        const ongs = await getOngs();
        // Filtra apenas ONGs (type === 'org')
        const onlyOngs = ongs.filter(ong => ong.type === 'org');
        // Geocodifica endereços
        const geocodedOngs = await Promise.all(
          onlyOngs.map(async (ong) => {
            const address = ong.address && ong.address[0];
            if (!address) return null;
            const coords = await geocodeAddress(address);
            if (!coords) return null;
            return {
              id: ong._id,
              nome: ong.name || ong.surname || 'ONG',
              descricao: ong.owner_details?.description || '',
              posicao: [coords.lat, coords.lon],
              cidade: address.city || '',
              estado: address.state || '',
              bairro: address.neighborhood || '',
              telefone: ong.phone || '',
              email: ong.email || '',
              tipo: 'ong',
            };
          })
        );
        // Remove nulos e usa apenas as ONGs reais
        setLocais(geocodedOngs.filter(Boolean));
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
            </div>
            
            {/* Campo de busca */}
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Buscar por nome"
                value={filtros.nome}
                onChange={(e) => setFiltros({ ...filtros, nome: e.target.value })}
                className={styles.searchInput}
              />
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

      
    </div>
  );
};

export default Mapa;

import React, { useState } from 'react';
import styles from './Mapa.module.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import OverlayInfo from '../OverlayInfo/OverlayInfo';
import NovoLocalOverlay from '../NovoLocalOverlay/NovoLocalOverlay';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const locaisIniciais = [
  {
    id: 1,
    nome: 'ONG Amor Animal',
    posicao: [-30.0331, -51.23],
    descricao: 'Ajuda animais em situação de rua e promove adoções!',
  },
  {
    id: 2,
    nome: 'Abrigo Patinhas',
    posicao: [-30.0400, -51.20],
    descricao: 'Adote com responsabilidade. 🐾',
  },
];

const Mapa = () => {
  const [locais, setLocais] = useState(locaisIniciais);
  const [novoLocal, setNovoLocal] = useState({ nome: '', descricao: '', posicao: null });
  const [filtros, setFiltros] = useState({ cidade: '', estado: '', bairro: '', nome: '' });
  const [ongSelecionada, setOngSelecionada] = useState(null);
  const [overlayNovoLocal, setOverlayNovoLocal] = useState(false);
  const [ultimoAdicionadoId, setUltimoAdicionadoId] = useState(null);

  const handleMapClick = (e) => {
    setNovoLocal({ ...novoLocal, posicao: [e.latlng.lat, e.latlng.lng] });
    setOverlayNovoLocal(true);
  };

  const handleAddNovoLocal = () => {
    if (novoLocal.nome && novoLocal.descricao && novoLocal.posicao) {
      const novoId = locais.length + 1;
      const novo = { ...novoLocal, id: novoId };
      setLocais([...locais, novo]);
      setUltimoAdicionadoId(novoId);
      setOverlayNovoLocal(false);
      setNovoLocal({ nome: '', descricao: '', posicao: null });
    }
  };

  const handleInputChange = (field, value) => {
    setNovoLocal((prev) => ({ ...prev, [field]: value }));
  };

  const filteredLocais = locais.filter((local) =>
    local.nome.toLowerCase().includes(filtros.nome.toLowerCase())
  );

  const MapClickHandler = () => {
    useMapEvents({ click: handleMapClick });
    return null;
  };

  return (
    <div className={styles.mapaContainer}>
      <h2 className={styles.mapaHeader}>📍 Encontre uma ONG ou Abrigo</h2>

      <div className={styles.mapaLayout}>
        <div className={styles.sidebarContainer}>
          <div className={styles.sidebar}>
            <h2>Filtros</h2>
            <p>Busque locais para adoção na sua região</p>
            <input
              type="text"
              placeholder="Buscar por nome"
              value={filtros.nome}
              onChange={(e) => setFiltros({ ...filtros, nome: e.target.value })}
            />
            <input
              type="text"
              placeholder="Cidade"
              value={filtros.cidade}
              onChange={(e) => setFiltros({ ...filtros, cidade: e.target.value })}
            />
            <input
              type="text"
              placeholder="Estado"
              value={filtros.estado}
              onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })}
            />
            <input
              type="text"
              placeholder="Bairro"
              value={filtros.bairro}
              onChange={(e) => setFiltros({ ...filtros, bairro: e.target.value })}
            />
          </div>
        </div>

        <div className={styles.mapContainer}>
          <div className={styles.mapArea}>
            <MapContainer
              center={[-30.0331, -51.23]}
              zoom={13}
              scrollWheelZoom={true}
              className={styles.map}
              style={{ height: '600px', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapClickHandler />
              {filteredLocais.map((local) => {
                const isNew = local.id === ultimoAdicionadoId;
                const icon = isNew
                  ? L.divIcon({
                      className: 'marker-drop',
                      html: `<img src="${require('leaflet/dist/images/marker-icon.png')}" alt="" />`,
                      iconSize: [25, 41],
                      iconAnchor: [12, 41],
                    })
                  : new L.Icon.Default();

                return (
                  <Marker
                    key={local.id}
                    position={local.posicao}
                    icon={icon}
                    eventHandlers={{
                      click: () => setOngSelecionada(local),
                    }}
                  >
                    <Popup>
                      <strong>{local.nome}</strong><br />
                      {local.descricao}
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>

            <button
              className={styles.addButton}
              onClick={() => setOverlayNovoLocal(true)}
              title="Adicionar nova ONG ou Abrigo"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {ongSelecionada && (
        <OverlayInfo ong={ongSelecionada} onClose={() => setOngSelecionada(null)} />
      )}

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
    </div>
  );
};

export default Mapa;

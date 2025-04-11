import React, { useState } from 'react';
import styles from './Mapa.module.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Corrige ícones padrão do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const locaisIniciais = [
  {
    nome: 'ONG Amor Animal',
    posicao: [-30.0331, -51.23],
    descricao: 'Ajuda animais em situação de rua e promove adoções!',
  },
  {
    nome: 'Abrigo Patinhas',
    posicao: [-30.0400, -51.20],
    descricao: 'Adote com responsabilidade. 🐾',
  },
];

const Mapa = () => {
  const [locais, setLocais] = useState(locaisIniciais);
  const [novoLocal, setNovoLocal] = useState({ nome: '', descricao: '', posicao: null });
  const [formVisivel, setFormVisivel] = useState(false);
  const [filtros, setFiltros] = useState({ cidade: '', estado: '', bairro: '', nome: '' });

  const handleMapClick = (e) => {
    setNovoLocal({ ...novoLocal, posicao: [e.latlng.lat, e.latlng.lng] });
    setFormVisivel(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (novoLocal.nome && novoLocal.descricao && novoLocal.posicao) {
      setLocais([...locais, novoLocal]);
      setNovoLocal({ nome: '', descricao: '', posicao: null });
      setFormVisivel(false);
    }
  };

  const filteredLocais = locais.filter((local) =>
    local.nome.toLowerCase().includes(filtros.nome.toLowerCase())
  );

  const MapClickHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  return (
    <div className={styles.page}>
      <div className={styles.sidebar}>
        <h2>Escolha um local de adoção</h2>
        <p>Muitos pets estão esperando por você! 🐾</p>

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

      <div className={styles.mapArea}>
        <MapContainer center={[-30.0331, -51.23]} zoom={13} className={styles.map}>
          <TileLayer
            attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapClickHandler />

          {filteredLocais.map((local, i) => (
            <Marker key={i} position={local.posicao}>
              <Popup>
                <strong>{local.nome}</strong><br />
                {local.descricao}
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <button
          className={styles.addButton}
          onClick={() => setFormVisivel(!formVisivel)}
          title="Adicionar nova ONG ou Abrigo"
        >
          +
        </button>

        {formVisivel && (
          <form className={styles.formulario} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nome da ONG/Abrigo"
              value={novoLocal.nome}
              onChange={(e) => setNovoLocal({ ...novoLocal, nome: e.target.value })}
              required
            />
            <textarea
              placeholder="Descrição"
              value={novoLocal.descricao}
              onChange={(e) => setNovoLocal({ ...novoLocal, descricao: e.target.value })}
              required
            />
            <button type="submit">Adicionar</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Mapa;

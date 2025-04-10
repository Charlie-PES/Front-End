import React from 'react';
import styles from './Mapa.module.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Corrige ícones do leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const locais = [
  {
    nome: 'ONG Amor Animal',
    posicao: [-23.5505, -46.6333],
    descricao: 'Ajuda animais em situação de rua e promove adoções!',
  },
  {
    nome: 'Abrigo Patinhas',
    posicao: [-23.5650, -46.6510],
    descricao: 'Adote com responsabilidade. 🐾',
  },
];

const Mapa = () => {
  return (
    <div className={styles.mapaContainer}>
      <h1>Encontre um local de adoção próximo 🗺️</h1>
      <MapContainer center={[-23.5505, -46.6333]} zoom={13} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="http://openstreetmap.org">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locais.map((local, i) => (
          <Marker key={i} position={local.posicao}>
            <Popup>
              <strong>{local.nome}</strong><br />
              {local.descricao}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Mapa;

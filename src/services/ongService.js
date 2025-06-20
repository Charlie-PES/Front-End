import api from './api';

export async function getOngs() {
  const response = await api.get('/owners/owners');
  return response.data;
}

// Função para geocodificar endereço usando Nominatim (OpenStreetMap)
export async function geocodeAddress(address) {
  const query = encodeURIComponent(
    `${address.street}, ${address.number}, ${address.city}, ${address.state}, ${address.zip_code}`
  );
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data && data.length > 0) {
    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon)
    };
  }
  return null;
} 
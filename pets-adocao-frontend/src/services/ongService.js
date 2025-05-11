import api from './api';

export const ongService = {
  // Buscar dados da ONG
  getOngProfile: async (ongId) => {
    try {
      const response = await api.get(`/ongs/${ongId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Atualizar dados da ONG
  updateOngProfile: async (ongId, data) => {
    try {
      const response = await api.put(`/ongs/${ongId}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Buscar pets da ONG
  getOngPets: async (ongId) => {
    try {
      const response = await api.get(`/ongs/${ongId}/pets`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Buscar adoções da ONG
  getOngAdocoes: async (ongId) => {
    try {
      const response = await api.get(`/ongs/${ongId}/adocoes`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Buscar eventos da ONG
  getOngEventos: async (ongId) => {
    try {
      const response = await api.get(`/ongs/${ongId}/eventos`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Buscar mensagens da ONG
  getOngMensagens: async (ongId) => {
    try {
      const response = await api.get(`/ongs/${ongId}/mensagens`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Buscar requisições da ONG
  getOngRequisicoes: async (ongId) => {
    try {
      const response = await api.get(`/ongs/${ongId}/requisicoes`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Atualizar status de uma adoção
  updateAdocaoStatus: async (ongId, adocaoId, status) => {
    try {
      const response = await api.put(`/ongs/${ongId}/adocoes/${adocaoId}`, { status });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Atualizar status de uma requisição
  updateRequisicaoStatus: async (ongId, requisicaoId, status) => {
    try {
      const response = await api.put(`/ongs/${ongId}/requisicoes/${requisicaoId}`, { status });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}; 
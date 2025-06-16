import api from './api';

const registerPet = async (petData) => {
  try {
    const response = await api.post('/pets', petData);
    return response.data;
  } catch (error) {
    console.error('Erro no registro do pet:', error);
    throw error;
  }
};

const deletePet = async (petId) => {
  try {
    const response = await api.delete(`/pets/${petId}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao excluir pet ${petId}:`, error);
    throw error;
  }
};

export {
  registerPet,
  deletePet,
}; 
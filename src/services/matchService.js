import api from './api';

// Pesos para cada critério de matching
const MATCH_WEIGHTS = {
    species: 20,          // Espécie (cão/gato)
    size: 15,            // Tamanho
    age: 15,             // Idade
    energy: 10,          // Nível de energia
    temperament: 10,     // Temperamento
    specialNeeds: 10,    // Necessidades especiais
    environment: 10,     // Ambiente ideal
    compatibility: 10,   // Compatibilidade com outros animais
    residenceType: 15,   // Tipo de residência
    availableTime: 15,   // Tempo disponível
    existingPets: 10,    // Compatibilidade com pets existentes
    lifestyle: 10        // Estilo de vida
};

// Mapeamento de níveis de energia para valores numéricos
const ENERGY_LEVELS = {
    'low': 1,
    'medium': 2,
    'high': 3
};

// Mapeamento de tamanhos
const SIZE_MAPPING = {
    'small': 'pequeno',
    'medium': 'medio',
    'large': 'grande'
};

// Mapeamento de espécies
const SPECIES_MAPPING = {
    'dog': 'cachorro',
    'cat': 'gato'
};

// Mapeamento de ambientes
const ENVIRONMENT_MAPPING = {
    'apartment': 'apartamento',
    'house': 'casa',
    'both': 'ambos'
};

// Novos mapeamentos
const RESIDENCE_TYPES = {
    'apartamento': {
        suitableFor: ['small', 'medium'],
        spaceScore: 0.8
    },
    'casa': {
        suitableFor: ['small', 'medium', 'large'],
        spaceScore: 1.0
    },
    'sítio': {
        suitableFor: ['small', 'medium', 'large'],
        spaceScore: 1.2
    }
};

const TIME_AVAILABILITY = {
    'pouco': {
        score: 0.5,
        suitableFor: ['low']
    },
    'medio': {
        score: 0.8,
        suitableFor: ['low', 'medium']
    },
    'muito': {
        score: 1.0,
        suitableFor: ['low', 'medium', 'high']
    }
};

// Função para validar e normalizar os dados
const validateAndNormalizeData = (pet, userPreferences) => {
    if (!pet || !userPreferences) return false;
    
    const requiredPetFields = ['species', 'size', 'age', 'energy', 'temperament', 'specialNeeds', 'environment', 'compatibility'];
    const requiredUserFields = ['species', 'size', 'age', 'energy', 'temperament', 'specialNeeds', 'environment', 'compatibility', 'residenceType', 'availableTime', 'lifestyle'];
    
    // Verifica se todos os campos obrigatórios existem
    const hasAllFields = requiredPetFields.every(field => pet[field] !== undefined) &&
                        requiredUserFields.every(field => userPreferences[field] !== undefined);
    
    if (!hasAllFields) return false;

    // Normaliza os dados do pet
    const normalizedPet = {
        ...pet,
        species: pet.species.toLowerCase(),
        size: pet.size.toLowerCase(),
        energy: pet.energy.toLowerCase(),
        temperament: Array.isArray(pet.temperament) ? pet.temperament.map(t => t.toLowerCase()) : [pet.temperament.toLowerCase()],
        environment: pet.environment.toLowerCase(),
        compatibility: pet.compatibility.toLowerCase()
    };

    // Normaliza as preferências do usuário
    const normalizedPreferences = {
        ...userPreferences,
        species: userPreferences.species.toLowerCase(),
        size: userPreferences.size.toLowerCase(),
        energy: userPreferences.energy.toLowerCase(),
        temperament: Array.isArray(userPreferences.temperament) ? userPreferences.temperament.map(t => t.toLowerCase()) : [userPreferences.temperament.toLowerCase()],
        environment: userPreferences.environment.toLowerCase(),
        compatibility: userPreferences.compatibility.toLowerCase(),
        residenceType: userPreferences.residenceType.toLowerCase(),
        availableTime: userPreferences.availableTime.toLowerCase(),
        lifestyle: userPreferences.lifestyle.toLowerCase()
    };

    return { normalizedPet, normalizedPreferences };
};

// Novas funções auxiliares
const calculateResidenceScore = (residenceType, petSize, petEnergy) => {
    const residence = RESIDENCE_TYPES[residenceType];
    if (!residence) return 0;

    let score = residence.spaceScore;
    
    // Ajusta o score baseado no tamanho do pet
    if (!residence.suitableFor.includes(petSize)) {
        score *= 0.7;
    }

    // Ajusta o score baseado no nível de energia
    if (petEnergy === 'high' && residenceType === 'apartamento') {
        score *= 0.8;
    }

    return score;
};

const calculateTimeScore = (availableTime, petEnergy) => {
    const time = TIME_AVAILABILITY[availableTime];
    if (!time) return 0;

    let score = time.score;
    
    // Ajusta o score baseado no nível de energia do pet
    if (!time.suitableFor.includes(petEnergy)) {
        score *= 0.7;
    }

    return score;
};

const calculateExistingPetsScore = (existingPets, petCompatibility) => {
    if (!existingPets || existingPets.length === 0) return 1;

    // Verifica se o pet é compatível com outros animais
    if (petCompatibility === 'yes') {
        return 1;
    } else if (petCompatibility === 'selective') {
        return 0.7;
    } else {
        return 0.3;
    }
};

const calculateLifestyleScore = (lifestyle, petTemperament) => {
    const lifestyleTemperamentMap = {
        'active': ['energetic', 'playful'],
        'calm': ['calm', 'quiet'],
        'balanced': ['balanced', 'friendly']
    };

    const suitableTemperaments = lifestyleTemperamentMap[lifestyle] || [];
    const matchingTemperaments = petTemperament.filter(t => 
        suitableTemperaments.includes(t)
    );

    return matchingTemperaments.length / suitableTemperaments.length;
};

// Função para calcular a pontuação de compatibilidade
const calculateMatchScore = (pet, userPreferences) => {
    const normalizedData = validateAndNormalizeData(pet, userPreferences);
    if (!normalizedData) {
        return {
            score: 0,
            percentage: 0,
            details: {}
        };
    }

    const { normalizedPet, normalizedPreferences } = normalizedData;
    let totalScore = 0;
    let maxPossibleScore = 0;

    // Espécie (match exato)
    if (normalizedPet.species === normalizedPreferences.species) {
        totalScore += MATCH_WEIGHTS.species;
    }
    maxPossibleScore += MATCH_WEIGHTS.species;

    // Tamanho
    if (normalizedPet.size === normalizedPreferences.size) {
        totalScore += MATCH_WEIGHTS.size;
    }
    maxPossibleScore += MATCH_WEIGHTS.size;

    // Idade (com tolerância)
    const ageDifference = Math.abs(normalizedPet.age - normalizedPreferences.age);
    if (ageDifference <= 2) {
        totalScore += MATCH_WEIGHTS.age;
    } else if (ageDifference <= 4) {
        totalScore += MATCH_WEIGHTS.age * 0.5;
    }
    maxPossibleScore += MATCH_WEIGHTS.age;

    // Nível de energia (usando mapeamento numérico)
    const petEnergyLevel = ENERGY_LEVELS[normalizedPet.energy];
    const userEnergyLevel = ENERGY_LEVELS[normalizedPreferences.energy];
    if (petEnergyLevel === userEnergyLevel) {
        totalScore += MATCH_WEIGHTS.energy;
    } else if (Math.abs(petEnergyLevel - userEnergyLevel) === 1) {
        totalScore += MATCH_WEIGHTS.energy * 0.5;
    }
    maxPossibleScore += MATCH_WEIGHTS.energy;

    // Temperamento
    if (normalizedPreferences.temperament.length > 0) {
        const temperamentMatch = normalizedPet.temperament.filter(t => 
            normalizedPreferences.temperament.includes(t)
        ).length;
        totalScore += (temperamentMatch / normalizedPreferences.temperament.length) * MATCH_WEIGHTS.temperament;
    }
    maxPossibleScore += MATCH_WEIGHTS.temperament;

    // Necessidades especiais
    if (normalizedPet.specialNeeds === normalizedPreferences.specialNeeds) {
        totalScore += MATCH_WEIGHTS.specialNeeds;
    }
    maxPossibleScore += MATCH_WEIGHTS.specialNeeds;

    // Ambiente ideal
    if (normalizedPet.environment === normalizedPreferences.environment) {
        totalScore += MATCH_WEIGHTS.environment;
    }
    maxPossibleScore += MATCH_WEIGHTS.environment;

    // Compatibilidade com outros animais
    if (normalizedPet.compatibility === normalizedPreferences.compatibility) {
        totalScore += MATCH_WEIGHTS.compatibility;
    }
    maxPossibleScore += MATCH_WEIGHTS.compatibility;

    // Novos cálculos
    // Tipo de Residência
    const residenceScore = calculateResidenceScore(
        normalizedPreferences.residenceType,
        normalizedPet.size,
        normalizedPet.energy
    );
    totalScore += residenceScore * MATCH_WEIGHTS.residenceType;
    maxPossibleScore += MATCH_WEIGHTS.residenceType;

    // Tempo Disponível
    const timeScore = calculateTimeScore(
        normalizedPreferences.availableTime,
        normalizedPet.energy
    );
    totalScore += timeScore * MATCH_WEIGHTS.availableTime;
    maxPossibleScore += MATCH_WEIGHTS.availableTime;

    // Pets Existentes
    const existingPetsScore = calculateExistingPetsScore(
        normalizedPreferences.existingPets,
        normalizedPet.compatibility
    );
    totalScore += existingPetsScore * MATCH_WEIGHTS.existingPets;
    maxPossibleScore += MATCH_WEIGHTS.existingPets;

    // Estilo de Vida
    const lifestyleScore = calculateLifestyleScore(
        normalizedPreferences.lifestyle,
        normalizedPet.temperament
    );
    totalScore += lifestyleScore * MATCH_WEIGHTS.lifestyle;
    maxPossibleScore += MATCH_WEIGHTS.lifestyle;

    return {
        score: totalScore,
        percentage: Math.round((totalScore / maxPossibleScore) * 100),
        details: {
            species: normalizedPet.species === normalizedPreferences.species,
            size: normalizedPet.size === normalizedPreferences.size,
            age: ageDifference <= 2,
            energy: petEnergyLevel === userEnergyLevel,
            temperament: normalizedPreferences.temperament.length > 0 && 
                        normalizedPet.temperament.some(t => normalizedPreferences.temperament.includes(t)),
            specialNeeds: normalizedPet.specialNeeds === normalizedPreferences.specialNeeds,
            environment: normalizedPet.environment === normalizedPreferences.environment,
            compatibility: normalizedPet.compatibility === normalizedPreferences.compatibility,
            residence: residenceScore,
            time: timeScore,
            existingPets: existingPetsScore,
            lifestyle: lifestyleScore
        }
    };
};

// Função para encontrar o pet ideal
export const findIdealPet = async (userPreferences) => {
    try {
        // Buscar todos os pets disponíveis
        const response = await api.get('/pets');
        const availablePets = response.data.filter(pet => pet.status === 'available');

        // Calcular score para cada pet
        const petsWithScores = availablePets.map(pet => ({
            ...pet,
            matchScore: calculateMatchScore(pet, userPreferences)
        }));

        // Filtrar pets com score mínimo de 30%
        const validMatches = petsWithScores.filter(pet => pet.matchScore.percentage >= 30);

        // Ordenar pets por score (do maior para o menor)
        const sortedPets = validMatches.sort((a, b) => 
            b.matchScore.percentage - a.matchScore.percentage
        );

        // Retornar os top 3 matches
        return sortedPets.slice(0, 3);
    } catch (error) {
        console.error('Erro ao buscar pets para matching:', error);
        throw error;
    }
};

// Função para salvar as preferências do usuário
export const saveUserPreferences = async (userId, preferences) => {
    try {
        const response = await api.post(`/users/${userId}/preferences`, preferences);
        return response.data;
    } catch (error) {
        console.error('Erro ao salvar preferências:', error);
        throw error;
    }
};

// Função para obter as preferências do usuário
export const getUserPreferences = async (userId) => {
    try {
        const response = await api.get(`/users/${userId}/preferences`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar preferências:', error);
        throw error;
    }
};

// Serviço para gerenciar pets e adoções

// Lista todos os pets disponíveis
const getAvailablePets = async () => {
  try {
    const response = await api.get('/pets', {
      params: { is_available: true }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar pets disponíveis:', error);
    throw error;
  }
};

// Adaptação da função getPet para o novo endpoint
const getPet = async (petId) => {
    try {
        const response = await api.get(`/pets/${petId}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar pet ${petId}:`, error);
        throw error;
    }
};

// Cria uma solicitação de adoção
const createAdoptionRequest = async (petId, ownerId) => {
  try {
    const response = await api.post(`/adoptions/request/pet_id/${petId}/owner_id/${ownerId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar solicitação de adoção:', error);
    throw error;
  }
};

// Registra uma adoção
const registerAdoption = async (petId, ownerId) => {
  try {
    const response = await api.post(`/adoptions/register/pet_id/${petId}/owner_id/${ownerId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao registrar adoção:', error);
    throw error;
  }
};

// Lista todas as adoções
const getAdoptions = async () => {
  try {
    const response = await api.get('/adoptions');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar adoções:', error);
    throw error;
  }
};

// Remove uma adoção
const deleteAdoption = async (petId, ownerId) => {
  try {
    await api.delete(`/adoptions/pet_id/${petId}/owner_id/${ownerId}`);
  } catch (error) {
    console.error('Erro ao remover adoção:', error);
    throw error;
  }
};

const getPetsByOwnerId = async (ownerId) => {
    try {
        const allPets = await getAvailablePets(); // Obtém todos os pets
        const filteredPets = allPets.filter(pet => pet.owner_id === ownerId); // Filtra por owner_id
        return filteredPets;
    } catch (error) {
        console.error(`Erro ao buscar e filtrar pets para o proprietário ${ownerId}:`, error);
        throw error;
    }
};

const createPet = async (petData) => {
  try {
    const response = await api.post('/pets', petData);
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar pet:', error);
    throw error;
  }
};

const deletePet = async (petId) => {
  try {
    const response = await api.delete(`/pets/${petId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao remover pet:', error);
    throw error;
  }
};

export {
  getAvailablePets,
  getPet,
  createPet,
  deletePet,
  createAdoptionRequest,
  registerAdoption,
  getAdoptions,
  deleteAdoption,
  getPetsByOwnerId,
}; 
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
    compatibility: 10    // Compatibilidade com outros animais
};

// Função para calcular a pontuação de compatibilidade
const calculateMatchScore = (pet, userPreferences) => {
    let totalScore = 0;
    let maxPossibleScore = 0;

    // Espécie (match exato)
    if (pet.species === userPreferences.species) {
        totalScore += MATCH_WEIGHTS.species;
    }
    maxPossibleScore += MATCH_WEIGHTS.species;

    // Tamanho
    if (pet.size === userPreferences.size) {
        totalScore += MATCH_WEIGHTS.size;
    }
    maxPossibleScore += MATCH_WEIGHTS.size;

    // Idade (com tolerância)
    const ageDifference = Math.abs(pet.age - userPreferences.age);
    if (ageDifference <= 2) {
        totalScore += MATCH_WEIGHTS.age;
    } else if (ageDifference <= 4) {
        totalScore += MATCH_WEIGHTS.age * 0.5;
    }
    maxPossibleScore += MATCH_WEIGHTS.age;

    // Nível de energia
    if (pet.energy === userPreferences.energy) {
        totalScore += MATCH_WEIGHTS.energy;
    } else if (Math.abs(pet.energy - userPreferences.energy) === 1) {
        totalScore += MATCH_WEIGHTS.energy * 0.5;
    }
    maxPossibleScore += MATCH_WEIGHTS.energy;

    // Temperamento
    const temperamentMatch = pet.temperament.filter(t => 
        userPreferences.temperament.includes(t)
    ).length;
    totalScore += (temperamentMatch / userPreferences.temperament.length) * MATCH_WEIGHTS.temperament;
    maxPossibleScore += MATCH_WEIGHTS.temperament;

    // Necessidades especiais
    if (pet.specialNeeds === userPreferences.specialNeeds) {
        totalScore += MATCH_WEIGHTS.specialNeeds;
    }
    maxPossibleScore += MATCH_WEIGHTS.specialNeeds;

    // Ambiente ideal
    if (pet.environment === userPreferences.environment) {
        totalScore += MATCH_WEIGHTS.environment;
    }
    maxPossibleScore += MATCH_WEIGHTS.environment;

    // Compatibilidade com outros animais
    if (pet.compatibility === userPreferences.compatibility) {
        totalScore += MATCH_WEIGHTS.compatibility;
    }
    maxPossibleScore += MATCH_WEIGHTS.compatibility;

    // Calcular porcentagem de match
    const matchPercentage = (totalScore / maxPossibleScore) * 100;
    return {
        score: totalScore,
        percentage: Math.round(matchPercentage),
        details: {
            species: pet.species === userPreferences.species,
            size: pet.size === userPreferences.size,
            age: ageDifference <= 2,
            energy: pet.energy === userPreferences.energy,
            temperament: temperamentMatch > 0,
            specialNeeds: pet.specialNeeds === userPreferences.specialNeeds,
            environment: pet.environment === userPreferences.environment,
            compatibility: pet.compatibility === userPreferences.compatibility
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

        // Ordenar pets por score (do maior para o menor)
        const sortedPets = petsWithScores.sort((a, b) => 
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
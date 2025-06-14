import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { findIdealPet, saveUserPreferences } from '../services/matchService';
import { useAuth } from '../contexts/AuthContext';
import MatchTransition from '../components/MatchTransition/MatchTransition';
import '../styles/MatchPage.css';

const MatchPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [matches, setMatches] = useState([]);
    const [showTransition, setShowTransition] = useState(false);
    const [preferences, setPreferences] = useState({
        species: '',
        size: '',
        age: '',
        energy: '',
        temperament: [],
        specialNeeds: false,
        environment: '',
        compatibility: ''
    });

    const handlePreferenceChange = (field, value) => {
        setPreferences(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleTemperamentChange = (value) => {
        setPreferences(prev => ({
            ...prev,
            temperament: prev.temperament.includes(value)
                ? prev.temperament.filter(t => t !== value)
                : [...prev.temperament, value]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowTransition(true);

        try {
            setLoading(true);
            
            // Salvar preferências do usuário
            if (user) {
                await saveUserPreferences(user.id, preferences);
            }

            // Encontrar pets ideais
            const idealPets = await findIdealPet(preferences);
            setMatches(idealPets);
        } catch (error) {
            console.error('Erro ao processar matching:', error);
            alert('Ocorreu um erro ao processar o matching. Por favor, tente novamente.');
            setShowTransition(false);
        } finally {
            setLoading(false);
        }
    };

    const handleTransitionComplete = () => {
        setShowTransition(false);
        // Redirecionar para a página do pet com maior compatibilidade
        if (matches.length > 0) {
            const bestMatch = matches[0];
            navigate(`/pets/${bestMatch.id}`);
        }
    };

    return (
        <div className="match-page">
            <form onSubmit={handleSubmit} className="match-form">
                <h2>Encontre seu Pet Ideal</h2>
                <p>Responda algumas perguntas para encontrarmos o pet perfeito para você!</p>

                <div className="form-group">
                    <label>Espécie</label>
                    <select
                        value={preferences.species}
                        onChange={(e) => handlePreferenceChange('species', e.target.value)}
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="dog">Cachorro</option>
                        <option value="cat">Gato</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Tamanho</label>
                    <select
                        value={preferences.size}
                        onChange={(e) => handlePreferenceChange('size', e.target.value)}
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="small">Pequeno</option>
                        <option value="medium">Médio</option>
                        <option value="large">Grande</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Idade Preferida (anos)</label>
                    <input
                        type="number"
                        min="0"
                        max="20"
                        value={preferences.age}
                        onChange={(e) => handlePreferenceChange('age', parseInt(e.target.value))}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Nível de Energia</label>
                    <select
                        value={preferences.energy}
                        onChange={(e) => handlePreferenceChange('energy', e.target.value)}
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="low">Baixo</option>
                        <option value="medium">Médio</option>
                        <option value="high">Alto</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Temperamento</label>
                    <div className="checkbox-group">
                        {['calmo', 'brincalhao', 'protetor', 'independente', 'afetuoso'].map(trait => (
                            <label key={trait} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={preferences.temperament.includes(trait)}
                                    onChange={() => handleTemperamentChange(trait)}
                                />
                                {trait.charAt(0).toUpperCase() + trait.slice(1)}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label>Necessidades Especiais</label>
                    <select
                        value={preferences.specialNeeds}
                        onChange={(e) => handlePreferenceChange('specialNeeds', e.target.value === 'true')}
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="false">Não</option>
                        <option value="true">Sim</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Ambiente Ideal</label>
                    <select
                        value={preferences.environment}
                        onChange={(e) => handlePreferenceChange('environment', e.target.value)}
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="apartment">Apartamento</option>
                        <option value="house">Casa</option>
                        <option value="both">Ambos</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Compatibilidade com Outros Animais</label>
                    <select
                        value={preferences.compatibility}
                        onChange={(e) => handlePreferenceChange('compatibility', e.target.value)}
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="yes">Sim</option>
                        <option value="no">Não</option>
                        <option value="depends">Depende</option>
                    </select>
                </div>

                <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? 'Processando...' : 'Encontrar Pet Ideal'}
                </button>
            </form>

            {showTransition && (
                <MatchTransition 
                    preferences={preferences} 
                    onComplete={handleTransitionComplete}
                />
            )}
        </div>
    );
};

export default MatchPage; 
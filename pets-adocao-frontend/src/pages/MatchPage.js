import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { findIdealPet, saveUserPreferences } from '../services/matchService';
import { useAuth } from '../contexts/AuthContext';
import '../styles/MatchPage.css';

const MatchPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [matches, setMatches] = useState([]);
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
        setLoading(true);

        try {
            // Salvar preferências do usuário
            await saveUserPreferences(user.id, preferences);

            // Encontrar pets compatíveis
            const matchedPets = await findIdealPet(preferences);
            setMatches(matchedPets);
            setStep(2);
        } catch (error) {
            console.error('Erro ao processar matching:', error);
            alert('Ocorreu um erro ao processar suas preferências. Por favor, tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const renderStep1 = () => (
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
                    {['Calmo', 'Brincalhão', 'Protetor', 'Independente', 'Afetuoso'].map(trait => (
                        <label key={trait} className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={preferences.temperament.includes(trait)}
                                onChange={() => handleTemperamentChange(trait)}
                            />
                            {trait}
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
    );

    const renderStep2 = () => (
        <div className="matches-container">
            <h2>Seus Matches</h2>
            <p>Encontramos alguns pets que combinam com suas preferências!</p>

            <div className="matches-grid">
                {matches.map((pet, index) => (
                    <div key={pet.id} className="match-card">
                        <div className="match-score">
                            <div className="score-circle">
                                <span>{pet.matchScore.percentage}%</span>
                                <small>Match</small>
                            </div>
                        </div>
                        <img src={pet.image} alt={pet.name} className="pet-image" />
                        <div className="pet-info">
                            <h3>{pet.name}</h3>
                            <p>{pet.breed}</p>
                            <div className="match-details">
                                <h4>Por que combinamos:</h4>
                                <ul>
                                    {Object.entries(pet.matchScore.details).map(([key, value]) => (
                                        value && (
                                            <li key={key}>
                                                {key === 'species' && 'Espécie compatível'}
                                                {key === 'size' && 'Tamanho ideal'}
                                                {key === 'age' && 'Idade adequada'}
                                                {key === 'energy' && 'Nível de energia compatível'}
                                                {key === 'temperament' && 'Temperamento compatível'}
                                                {key === 'specialNeeds' && 'Necessidades especiais compatíveis'}
                                                {key === 'environment' && 'Ambiente ideal'}
                                                {key === 'compatibility' && 'Compatível com outros animais'}
                                            </li>
                                        )
                                    ))}
                                </ul>
                            </div>
                            <button
                                className="view-profile-button"
                                onClick={() => navigate(`/pets/${pet.id}`)}
                            >
                                Ver Perfil
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button
                className="back-button"
                onClick={() => setStep(1)}
            >
                Voltar e Ajustar Preferências
            </button>
        </div>
    );

    return (
        <div className="match-page">
            {step === 1 ? renderStep1() : renderStep2()}
        </div>
    );
};

export default MatchPage; 
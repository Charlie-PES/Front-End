import React, { useState, useEffect } from 'react';
import './MatchTransition.css';

const MatchTransition = ({ preferences, onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [showTraits, setShowTraits] = useState(false);
    const [showMatchFound, setShowMatchFound] = useState(false);

    useEffect(() => {
        // Simular progresso
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    setShowTraits(true);
                    return 100;
                }
                return prev + 2;
            });
        }, 50);

        return () => clearInterval(progressInterval);
    }, []);

    useEffect(() => {
        if (showTraits) {
            const timer = setTimeout(() => {
                setShowMatchFound(true);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [showTraits]);

    useEffect(() => {
        if (showMatchFound) {
            const timer = setTimeout(() => {
                onComplete();
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [showMatchFound, onComplete]);

    const getTraitIcon = (trait) => {
        switch (trait) {
            case 'species':
                return preferences.species === 'dog' ? '🐕' : '🐱';
            case 'size':
                return '📏';
            case 'age':
                return '🎂';
            case 'energy':
                return '⚡';
            case 'temperament':
                return '❤️';
            case 'specialNeeds':
                return preferences.specialNeeds ? '🦮' : '🐾';
            case 'environment':
                return '🏠';
            case 'compatibility':
                return '🤝';
            default:
                return '✨';
        }
    };

    const getTraitLabel = (trait) => {
        switch (trait) {
            case 'species':
                return `Espécie: ${preferences.species === 'dog' ? 'Cachorro' : 'Gato'}`;
            case 'size':
                return `Tamanho: ${preferences.size === 'small' ? 'Pequeno' : preferences.size === 'medium' ? 'Médio' : 'Grande'}`;
            case 'age':
                return `Idade: ${preferences.age} anos`;
            case 'energy':
                return `Energia: ${preferences.energy === 'low' ? 'Baixa' : preferences.energy === 'medium' ? 'Média' : 'Alta'}`;
            case 'temperament':
                return `Temperamento: ${preferences.temperament.map(t => 
                    t.charAt(0).toUpperCase() + t.slice(1)
                ).join(', ')}`;
            case 'specialNeeds':
                return `Necessidades Especiais: ${preferences.specialNeeds ? 'Sim' : 'Não'}`;
            case 'environment':
                return `Ambiente: ${preferences.environment === 'apartment' ? 'Apartamento' : preferences.environment === 'house' ? 'Casa' : 'Ambos'}`;
            case 'compatibility':
                return `Compatibilidade: ${preferences.compatibility === 'yes' ? 'Sim' : preferences.compatibility === 'no' ? 'Não' : 'Depende'}`;
            default:
                return trait;
        }
    };

    return (
        <div className="match-transition-overlay">
            <div className="match-transition">
                {!showTraits && !showMatchFound && (
                    <div className="loading-animation">
                        <div className="loading-circle">
                            <div className="progress-circle" style={{ transform: `rotate(${progress * 3.6}deg)` }}></div>
                            <div className="progress-text">{progress}%</div>
                        </div>
                        <p>Analisando suas preferências...</p>
                    </div>
                )}

                {showTraits && !showMatchFound && (
                    <div className="traits-display">
                        <h3>Suas Preferências</h3>
                        <div className="traits-grid">
                            {Object.keys(preferences).map(trait => (
                                <div key={trait} className="trait-item">
                                    <span className="trait-icon">{getTraitIcon(trait)}</span>
                                    <span className="trait-label">{getTraitLabel(trait)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {showMatchFound && (
                    <div className="match-found">
                        <div className="match-icon">🎉</div>
                        <h2>Pet Encontrado!</h2>
                        <p>Encontramos o pet ideal para você!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MatchTransition; 
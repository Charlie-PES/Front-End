import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPaw, FaUpload, FaSave } from 'react-icons/fa';
import { ThemeContext } from '../../../contexts/ThemeContext';
import styles from './AddPet.module.css';

const AddPet = () => {
    const navigate = useNavigate();
    const { darkMode } = useContext(ThemeContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const [petData, setPetData] = useState({
        nome: '',
        tipo: '',
        raca: '',
        cor: '',
        idade: '',
        sexo: '',
        porte: '',
        energia: '',
        temperamento: [],
        comportamento: '',
        vacinas: false,
        castrado: false,
        necessidades: false,
        specialNeeds: '',
        environment: '',
        compatibility: '',
        goodWithOtherPets: false,
        imagem: null,
        descricao: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        
        if (type === 'file') {
            const file = files[0];
            if (file) {
                setPetData(prev => ({
                    ...prev,
                    imagem: file
                }));
                setImagePreview(URL.createObjectURL(file));
            }
        } else if (type === 'checkbox') {
            setPetData(prev => ({
                ...prev,
                [name]: checked
            }));
        } else {
            setPetData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleTemperamentChange = (value) => {
        setPetData(prev => ({
            ...prev,
            temperamento: prev.temperamento.includes(value)
                ? prev.temperamento.filter(t => t !== value)
                : [...prev.temperamento, value]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Criar FormData para enviar a imagem
            const formData = new FormData();
            Object.keys(petData).forEach(key => {
                if (key === 'temperamento') {
                    formData.append(key, JSON.stringify(petData[key]));
                } else {
                    formData.append(key, petData[key]);
                }
            });

            // Enviar dados para o backend
            const response = await fetch('/api/pets', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar pet');
            }

            setSuccess(true);
            setTimeout(() => {
                navigate('/pets');
            }, 2000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`${styles.container} ${darkMode ? styles.darkMode : ''}`}>
            <div className={styles.content}>
                <h1 className={styles.title}>
                    <FaPaw className={styles.icon} />
                    Cadastrar Novo Pet
                </h1>

                {error && (
                    <div className={styles.error}>
                        {error}
                    </div>
                )}

                {success && (
                    <div className={styles.success}>
                        Pet cadastrado com sucesso!
                    </div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.imageUpload}>
                        <div 
                            className={styles.imagePreview}
                            style={{ backgroundImage: imagePreview ? `url(${imagePreview})` : 'none' }}
                        >
                            {!imagePreview && <FaUpload className={styles.uploadIcon} />}
                        </div>
                        <input
                            type="file"
                            name="imagem"
                            accept="image/*"
                            onChange={handleChange}
                            className={styles.fileInput}
                        />
                    </div>

                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label>Nome</label>
                            <input
                                type="text"
                                name="nome"
                                value={petData.nome}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Espécie</label>
                            <select
                                name="tipo"
                                value={petData.tipo}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione</option>
                                <option value="dog">Cachorro</option>
                                <option value="cat">Gato</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Raça</label>
                            <input
                                type="text"
                                name="raca"
                                value={petData.raca}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Cor</label>
                            <input
                                type="text"
                                name="cor"
                                value={petData.cor}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Idade (anos)</label>
                            <input
                                type="number"
                                name="idade"
                                value={petData.idade}
                                onChange={handleChange}
                                min="0"
                                max="30"
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Sexo</label>
                            <select
                                name="sexo"
                                value={petData.sexo}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione</option>
                                <option value="macho">Macho</option>
                                <option value="femea">Fêmea</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Porte</label>
                            <select
                                name="porte"
                                value={petData.porte}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione</option>
                                <option value="small">Pequeno</option>
                                <option value="medium">Médio</option>
                                <option value="large">Grande</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Nível de Energia</label>
                            <select
                                name="energia"
                                value={petData.energia}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione</option>
                                <option value="low">Baixo</option>
                                <option value="medium">Médio</option>
                                <option value="high">Alto</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Temperamento</label>
                        <div className={styles.checkboxGroup}>
                            {['calmo', 'brincalhao', 'protetor', 'independente', 'afetuoso'].map(trait => (
                                <label key={trait} className={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        checked={petData.temperamento.includes(trait)}
                                        onChange={() => handleTemperamentChange(trait)}
                                    />
                                    {trait.charAt(0).toUpperCase() + trait.slice(1)}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Comportamento</label>
                        <textarea
                            name="comportamento"
                            value={petData.comportamento}
                            onChange={handleChange}
                            rows="3"
                            required
                        />
                    </div>

                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    name="vacinas"
                                    checked={petData.vacinas}
                                    onChange={handleChange}
                                />
                                Vacinado
                            </label>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    name="castrado"
                                    checked={petData.castrado}
                                    onChange={handleChange}
                                />
                                Castrado
                            </label>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    name="necessidades"
                                    checked={petData.necessidades}
                                    onChange={handleChange}
                                />
                                Possui Necessidades Especiais
                            </label>
                        </div>
                    </div>

                    {petData.necessidades && (
                        <div className={styles.formGroup}>
                            <label>Detalhes das Necessidades Especiais</label>
                            <textarea
                                name="specialNeeds"
                                value={petData.specialNeeds}
                                onChange={handleChange}
                                rows="3"
                                required
                            />
                        </div>
                    )}

                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label>Ambiente Ideal</label>
                            <select
                                name="environment"
                                value={petData.environment}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione</option>
                                <option value="apartment">Apartamento</option>
                                <option value="house">Casa</option>
                                <option value="both">Ambos</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Compatibilidade com Outros Animais</label>
                            <select
                                name="compatibility"
                                value={petData.compatibility}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione</option>
                                <option value="yes">Sim</option>
                                <option value="no">Não</option>
                                <option value="depends">Depende</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    name="goodWithOtherPets"
                                    checked={petData.goodWithOtherPets}
                                    onChange={handleChange}
                                />
                                Bom com Outros Pets
                            </label>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Descrição</label>
                        <textarea
                            name="descricao"
                            value={petData.descricao}
                            onChange={handleChange}
                            rows="4"
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className={styles.submitButton}
                        disabled={loading}
                    >
                        {loading ? (
                            'Salvando...'
                        ) : (
                            <>
                                <FaSave className={styles.buttonIcon} />
                                Cadastrar Pet
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddPet; 
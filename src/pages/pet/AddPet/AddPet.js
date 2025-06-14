import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPaw, FaUpload, FaSpinner } from 'react-icons/fa';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';
import styles from './AddPet.module.css';

const AddPet = () => {
    const { darkMode } = useContext(ThemeContext);
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [petData, setPetData] = useState({
        nome: '',
        especie: '',
        raca: '',
        cor: '',
        idade: '',
        genero: '',
        porte: '',
        nivelEnergia: '',
        temperamento: '',
        comportamento: '',
        vacinado: false,
        castrado: false,
        necessidadesEspeciais: false,
        ambienteIdeal: '',
        compatibilidade: '',
        descricao: '',
        imagens: [],
        tutorId: user?.id,
        tutorType: user?.ong ? 'ong' : user?.tipo === 'temporary' ? 'temporary' : null
    });

    useEffect(() => {
        // Verifica se o usuário tem permissão para adicionar pets
        if (!user || (!user.ong && user.tipo !== 'temporary')) {
            navigate('/');
            return;
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPetData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setPetData(prev => ({
            ...prev,
            imagens: [...prev.imagens, ...files]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // Cria um FormData para enviar os arquivos
            const formData = new FormData();
            
            // Adiciona os dados do pet ao FormData
            Object.keys(petData).forEach(key => {
                if (key === 'imagens') {
                    petData.imagens.forEach((image, index) => {
                        formData.append(`imagens`, image);
                    });
                } else {
                    formData.append(key, petData[key]);
                }
            });

            // Faz a requisição para o backend
            const response = await fetch('/api/pets', {
                method: 'POST',
                body: formData,
                headers: {
                    // Não incluir Content-Type aqui, pois o FormData já define o header correto
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar pet');
            }

            const data = await response.json();
            setSuccess('Pet cadastrado com sucesso!');
            
            // Redireciona para a página do pet após 2 segundos
            setTimeout(() => {
                navigate(`/pets/${data.id}`);
            }, 2000);

        } catch (err) {
            setError(err.message || 'Erro ao cadastrar pet. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    if (!user || (!user.ong && user.tipo !== 'temporary')) {
        return null;
    }

    return (
        <div className={`${styles.container} ${darkMode ? styles.darkMode : ''}`}>
            <div className={styles.content}>
                <h1 className={styles.title}>
                    <FaPaw className={styles.icon} />
                    Adicionar Novo Pet
                </h1>

                {error && <div className={styles.error}>{error}</div>}
                {success && <div className={styles.success}>{success}</div>}

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.imageUpload}>
                        <label htmlFor="imagens" className={styles.uploadLabel}>
                            <FaUpload />
                            <span>Adicionar Fotos</span>
                            <input
                                type="file"
                                id="imagens"
                                name="imagens"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                                className={styles.fileInput}
                            />
                        </label>
                        {petData.imagens.length > 0 && (
                            <div className={styles.imagePreview}>
                                {petData.imagens.map((image, index) => (
                                    <img
                                        key={index}
                                        src={URL.createObjectURL(image)}
                                        alt={`Preview ${index + 1}`}
                                        className={styles.previewImage}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label htmlFor="nome">Nome</label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                value={petData.nome}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="especie">Espécie</label>
                            <select
                                id="especie"
                                name="especie"
                                value={petData.especie}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione</option>
                                <option value="dog">Cachorro</option>
                                <option value="cat">Gato</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="raca">Raça</label>
                            <input
                                type="text"
                                id="raca"
                                name="raca"
                                value={petData.raca}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="cor">Cor</label>
                            <input
                                type="text"
                                id="cor"
                                name="cor"
                                value={petData.cor}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="idade">Idade</label>
                            <input
                                type="number"
                                id="idade"
                                name="idade"
                                value={petData.idade}
                                onChange={handleChange}
                                required
                                min="0"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="genero">Gênero</label>
                            <select
                                id="genero"
                                name="genero"
                                value={petData.genero}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione</option>
                                <option value="macho">Macho</option>
                                <option value="femea">Fêmea</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="porte">Porte</label>
                            <select
                                id="porte"
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
                            <label htmlFor="nivelEnergia">Nível de Energia</label>
                            <select
                                id="nivelEnergia"
                                name="nivelEnergia"
                                value={petData.nivelEnergia}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione</option>
                                <option value="low">Baixo</option>
                                <option value="medium">Médio</option>
                                <option value="high">Alto</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="temperamento">Temperamento</label>
                            <input
                                type="text"
                                id="temperamento"
                                name="temperamento"
                                value={petData.temperamento}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="comportamento">Comportamento</label>
                            <input
                                type="text"
                                id="comportamento"
                                name="comportamento"
                                value={petData.comportamento}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="ambienteIdeal">Ambiente Ideal</label>
                            <input
                                type="text"
                                id="ambienteIdeal"
                                name="ambienteIdeal"
                                value={petData.ambienteIdeal}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="compatibilidade">Compatibilidade com Outros Animais</label>
                            <input
                                type="text"
                                id="compatibilidade"
                                name="compatibilidade"
                                value={petData.compatibilidade}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="descricao">Descrição</label>
                            <textarea
                                id="descricao"
                                name="descricao"
                                value={petData.descricao}
                                onChange={handleChange}
                                required
                                rows="4"
                            />
                        </div>

                        <div className={styles.checkboxGroup}>
                            <label>
                                <input
                                    type="checkbox"
                                    name="vacinado"
                                    checked={petData.vacinado}
                                    onChange={handleChange}
                                />
                                Vacinado
                            </label>

                            <label>
                                <input
                                    type="checkbox"
                                    name="castrado"
                                    checked={petData.castrado}
                                    onChange={handleChange}
                                />
                                Castrado
                            </label>

                            <label>
                                <input
                                    type="checkbox"
                                    name="necessidadesEspeciais"
                                    checked={petData.necessidadesEspeciais}
                                    onChange={handleChange}
                                />
                                Possui Necessidades Especiais
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <FaSpinner className={styles.spinner} />
                                Cadastrando...
                            </>
                        ) : (
                            'Cadastrar Pet'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddPet; 
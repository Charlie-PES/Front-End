import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaHome, FaPhone, FaEnvelope, FaLock } from 'react-icons/fa';
import { ThemeContext } from '../../../contexts/ThemeContext';
import styles from './RegisterTemporary.module.css';

const RegisterTemporary = () => {
    const navigate = useNavigate();
    const { darkMode } = useContext(ThemeContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        telefone: '',
        endereco: '',
        cidade: '',
        estado: '',
        cep: '',
        experiencia: '',
        disponibilidade: '',
        preferencias: {
            tipo: [],
            porte: [],
            idade: [],
            necessidades: false
        }
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (name.startsWith('preferencias.')) {
            const prefField = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                preferencias: {
                    ...prev.preferencias,
                    [prefField]: type === 'checkbox' ? checked : value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handlePreferenceChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            preferencias: {
                ...prev.preferencias,
                [field]: prev.preferencias[field].includes(value)
                    ? prev.preferencias[field].filter(v => v !== value)
                    : [...prev.preferencias[field], value]
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (formData.senha !== formData.confirmarSenha) {
            setError('As senhas não coincidem');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/register/temporary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Erro ao criar conta');
            }

            navigate('/login', { 
                state: { 
                    message: 'Conta criada com sucesso! Faça login para continuar.' 
                }
            });
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
                    <FaUser className={styles.icon} />
                    Cadastro de Tutor Temporário
                </h1>

                {error && (
                    <div className={styles.error}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label>Nome Completo</label>
                            <div className={styles.inputWrapper}>
                                <FaUser className={styles.inputIcon} />
                                <input
                                    type="text"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Email</label>
                            <div className={styles.inputWrapper}>
                                <FaEnvelope className={styles.inputIcon} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Telefone</label>
                            <div className={styles.inputWrapper}>
                                <FaPhone className={styles.inputIcon} />
                                <input
                                    type="tel"
                                    name="telefone"
                                    value={formData.telefone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Endereço</label>
                            <div className={styles.inputWrapper}>
                                <FaHome className={styles.inputIcon} />
                                <input
                                    type="text"
                                    name="endereco"
                                    value={formData.endereco}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Cidade</label>
                            <input
                                type="text"
                                name="cidade"
                                value={formData.cidade}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Estado</label>
                            <input
                                type="text"
                                name="estado"
                                value={formData.estado}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>CEP</label>
                            <input
                                type="text"
                                name="cep"
                                value={formData.cep}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Experiência com Pets</label>
                        <textarea
                            name="experiencia"
                            value={formData.experiencia}
                            onChange={handleChange}
                            rows="3"
                            required
                            placeholder="Conte-nos sobre sua experiência com animais..."
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Disponibilidade</label>
                        <textarea
                            name="disponibilidade"
                            value={formData.disponibilidade}
                            onChange={handleChange}
                            rows="3"
                            required
                            placeholder="Descreva sua disponibilidade para cuidar dos pets..."
                        />
                    </div>

                    <div className={styles.preferences}>
                        <h2>Preferências</h2>
                        
                        <div className={styles.preferenceGroup}>
                            <label>Tipos de Pets</label>
                            <div className={styles.checkboxGroup}>
                                {['dog', 'cat'].map(tipo => (
                                    <label key={tipo} className={styles.checkboxLabel}>
                                        <input
                                            type="checkbox"
                                            checked={formData.preferencias.tipo.includes(tipo)}
                                            onChange={() => handlePreferenceChange('tipo', tipo)}
                                        />
                                        {tipo === 'dog' ? 'Cachorros' : 'Gatos'}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className={styles.preferenceGroup}>
                            <label>Porte</label>
                            <div className={styles.checkboxGroup}>
                                {['small', 'medium', 'large'].map(porte => (
                                    <label key={porte} className={styles.checkboxLabel}>
                                        <input
                                            type="checkbox"
                                            checked={formData.preferencias.porte.includes(porte)}
                                            onChange={() => handlePreferenceChange('porte', porte)}
                                        />
                                        {porte === 'small' ? 'Pequeno' : 
                                         porte === 'medium' ? 'Médio' : 'Grande'}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className={styles.preferenceGroup}>
                            <label>Idade</label>
                            <div className={styles.checkboxGroup}>
                                {['filhote', 'adulto', 'idoso'].map(idade => (
                                    <label key={idade} className={styles.checkboxLabel}>
                                        <input
                                            type="checkbox"
                                            checked={formData.preferencias.idade.includes(idade)}
                                            onChange={() => handlePreferenceChange('idade', idade)}
                                        />
                                        {idade.charAt(0).toUpperCase() + idade.slice(1)}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className={styles.preferenceGroup}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    name="preferencias.necessidades"
                                    checked={formData.preferencias.necessidades}
                                    onChange={handleChange}
                                />
                                Aceito pets com necessidades especiais
                            </label>
                        </div>
                    </div>

                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label>Senha</label>
                            <div className={styles.inputWrapper}>
                                <FaLock className={styles.inputIcon} />
                                <input
                                    type="password"
                                    name="senha"
                                    value={formData.senha}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Confirmar Senha</label>
                            <div className={styles.inputWrapper}>
                                <FaLock className={styles.inputIcon} />
                                <input
                                    type="password"
                                    name="confirmarSenha"
                                    value={formData.confirmarSenha}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className={styles.submitButton}
                        disabled={loading}
                    >
                        {loading ? 'Criando Conta...' : 'Criar Conta'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterTemporary; 
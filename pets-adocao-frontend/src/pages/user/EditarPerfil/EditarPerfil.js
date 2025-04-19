import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './EditarPerfil.module.css';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { FaCamera, FaSave, FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa';

const EditarPerfil = () => {
  // Obtém o contexto de tema para suporte ao modo escuro
  const { darkMode } = useContext(ThemeContext);
  
  // Hook para navegação entre páginas
  const navigate = useNavigate();
  
  // Estado para controlar o carregamento da página
  const [isLoading, setIsLoading] = useState(true);
  
  // Estado para controlar mensagens de feedback
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Estado para armazenar os dados do usuário
  const [userData, setUserData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cidade: '',
    bio: '',
    avatar: null,
    avatarPreview: null
  });
  
  // Estado para controlar erros de validação
  const [errors, setErrors] = useState({});
  
  // Simula o carregamento dos dados do usuário
  useEffect(() => {
    // Aqui seria feita uma chamada à API para buscar os dados do usuário
    // Por enquanto, usamos dados mockados
    const fetchUserData = async () => {
      try {
        // Simula um delay de rede
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Dados mockados para demonstração
        setUserData({
          nome: 'Teste',
          email: 'Teste@example.com',
          telefone: '(51) 91234-5678',
          cidade: 'Porto Alegre - RS',
          bio: 'Amante de animais e defensor da adoção responsável. Já adotei 3 pets e continuo ajudando outros a encontrarem um lar amoroso.',
          avatar: null,
          avatarPreview: '/images/dog2.png'
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        setMessage({ type: 'error', text: 'Erro ao carregar dados do usuário. Tente novamente.' });
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, []);
  
  // Função para lidar com mudanças nos campos de entrada
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Atualiza o estado com o novo valor
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpa o erro do campo quando o usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  // Função para lidar com a mudança de avatar
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Verifica o tipo e tamanho do arquivo
      if (!file.type.includes('image/')) {
        setMessage({ type: 'error', text: 'Por favor, selecione uma imagem válida.' });
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB
        setMessage({ type: 'error', text: 'A imagem deve ter no máximo 5MB.' });
        return;
      }
      
      // Cria uma URL para preview da imagem
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData(prev => ({
          ...prev,
          avatar: file,
          avatarPreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Função para validar os dados do formulário
  const validateForm = () => {
    const newErrors = {};
    
    // Validação do nome
    if (!userData.nome.trim()) {
      newErrors.nome = 'O nome é obrigatório';
    }
    
    // Validação do email
    if (!userData.email.trim()) {
      newErrors.email = 'O email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    // Validação do telefone
    if (!userData.telefone.trim()) {
      newErrors.telefone = 'O telefone é obrigatório';
    }
    
    // Validação da cidade
    if (!userData.cidade.trim()) {
      newErrors.cidade = 'A cidade é obrigatória';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Valida o formulário
    if (!validateForm()) {
      setMessage({ type: 'error', text: 'Por favor, corrija os erros no formulário.' });
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Aqui seria feita uma chamada à API para salvar os dados
      // Por enquanto, simulamos um delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simula sucesso
      setMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' });
      
      // Redireciona para a página de perfil após 1.5 segundos
      setTimeout(() => {
        navigate('/perfil');
      }, 1500);
      
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      setMessage({ type: 'error', text: 'Erro ao atualizar perfil. Tente novamente.' });
      setIsLoading(false);
    }
  };
  
  // Função para voltar à página anterior
  const handleBack = () => {
    navigate('/perfil');
  };
  
  // Renderiza um indicador de carregamento
  if (isLoading && !userData.nome) {
    return (
      <div className={`${styles.container} ${darkMode ? styles.darkMode : ''}`}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Carregando dados do perfil...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`${styles.container} ${darkMode ? styles.darkMode : ''}`}>
      {/* Cabeçalho da página */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
          <FaArrowLeft /> Voltar
        </button>
        <h1>Editar Perfil</h1>
      </div>
      
      {/* Mensagem de feedback */}
      {message.text && (
        <div className={`${styles.message} ${styles[message.type]}`}>
          {message.text}
        </div>
      )}
      
      {/* Formulário de edição */}
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Seção de avatar */}
        <div className={styles.avatarSection}>
          <div className={styles.avatarContainer}>
            <img 
              src={userData.avatarPreview || '/images/default-avatar.png'} 
              alt="Avatar" 
              className={styles.avatar} 
            />
            <label className={styles.avatarChangeButton} htmlFor="avatar-input">
              <FaCamera />
            </label>
            <input 
              id="avatar-input" 
              type="file" 
              accept="image/*" 
              onChange={handleAvatarChange} 
              className={styles.avatarInput} 
            />
          </div>
          <p className={styles.avatarHint}>Clique para alterar sua foto</p>
        </div>
        
        {/* Campos de informação */}
        <div className={styles.formGroup}>
          <label htmlFor="nome" className={styles.label}>
            <FaUser className={styles.labelIcon} /> Nome
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={userData.nome}
            onChange={handleChange}
            className={`${styles.input} ${errors.nome ? styles.inputError : ''}`}
            placeholder="Seu nome completo"
          />
          {errors.nome && <span className={styles.errorMessage}>{errors.nome}</span>}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            <FaEnvelope className={styles.labelIcon} /> Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            placeholder="seu.email@exemplo.com"
          />
          {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="telefone" className={styles.label}>
            <FaPhone className={styles.labelIcon} /> Telefone
          </label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            value={userData.telefone}
            onChange={handleChange}
            className={`${styles.input} ${errors.telefone ? styles.inputError : ''}`}
            placeholder="(00) 00000-0000"
          />
          {errors.telefone && <span className={styles.errorMessage}>{errors.telefone}</span>}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="cidade" className={styles.label}>
            <FaMapMarkerAlt className={styles.labelIcon} /> Cidade
          </label>
          <input
            type="text"
            id="cidade"
            name="cidade"
            value={userData.cidade}
            onChange={handleChange}
            className={`${styles.input} ${errors.cidade ? styles.inputError : ''}`}
            placeholder="Sua cidade e estado"
          />
          {errors.cidade && <span className={styles.errorMessage}>{errors.cidade}</span>}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="bio" className={styles.label}>
            <FaInfoCircle className={styles.labelIcon} /> Biografia
          </label>
          <textarea
            id="bio"
            name="bio"
            value={userData.bio}
            onChange={handleChange}
            className={styles.textarea}
            placeholder="Conte um pouco sobre você e sua experiência com animais..."
            rows="4"
          />
        </div>
        
        {/* Botões de ação */}
        <div className={styles.formActions}>
          <button 
            type="button" 
            className={styles.cancelButton} 
            onClick={handleBack}
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            className={styles.saveButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.loadingSpinner}></span>
            ) : (
              <>
                <FaSave /> Salvar Alterações
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarPerfil;

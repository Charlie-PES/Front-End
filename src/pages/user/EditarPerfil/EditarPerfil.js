import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './EditarPerfil.module.css';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';
import { FaCamera, FaSave, FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa';
import { updateUser, fetchCurrentUser } from '../../../services/authService';

const EditarPerfil = () => {
  // Obtém o contexto de tema para suporte ao modo escuro
  const { darkMode } = useContext(ThemeContext);
  const { user, setUser } = useAuth();
  
  // Hook para navegação entre páginas
  const navigate = useNavigate();
  
  // Estado para controlar o carregamento da página
  const [isLoading, setIsLoading] = useState(true);
  
  // Estado para controlar mensagens de feedback
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Estado para armazenar os dados do usuário
  const [userData, setUserData] = useState({
    first_name: '',
    surname: '',
    email: '',
    phone: '',
    address: {
      city: '',
      state: '',
      neighborhood: '',
      street: '',
      number: '',
      zip_code: '',
      complement: ''
    },
    owner_details: {
      description: '',
      additional_data: {}
    },
    picture: '',
    type: '',
  });
  
  // Estado para controlar erros de validação
  const [errors, setErrors] = useState({});
  
  const states = [
    { uf: 'AC', name: 'Acre' },
    { uf: 'AL', name: 'Alagoas' },
    { uf: 'AP', name: 'Amapá' },
    { uf: 'AM', name: 'Amazonas' },
    { uf: 'BA', name: 'Bahia' },
    { uf: 'CE', name: 'Ceará' },
    { uf: 'DF', name: 'Distrito Federal' },
    { uf: 'ES', name: 'Espírito Santo' },
    { uf: 'GO', name: 'Goiás' },
    { uf: 'MA', name: 'Maranhão' },
    { uf: 'MT', name: 'Mato Grosso' },
    { uf: 'MS', name: 'Mato Grosso do Sul' },
    { uf: 'MG', name: 'Minas Gerais' },
    { uf: 'PA', name: 'Pará' },
    { uf: 'PB', name: 'Paraíba' },
    { uf: 'PR', name: 'Paraná' },
    { uf: 'PE', name: 'Pernambuco' },
    { uf: 'PI', name: 'Piauí' },
    { uf: 'RJ', name: 'Rio de Janeiro' },
    { uf: 'RN', name: 'Rio Grande do Norte' },
    { uf: 'RS', name: 'Rio Grande do Sul' },
    { uf: 'RO', name: 'Rondônia' },
    { uf: 'RR', name: 'Roraima' },
    { uf: 'SC', name: 'Santa Catarina' },
    { uf: 'SP', name: 'São Paulo' },
    { uf: 'SE', name: 'Sergipe' },
    { uf: 'TO', name: 'Tocantins' },
  ];
  
  // Função para buscar endereço por CEP
  const fetchAddressByCep = async (cep) => {
    const cleanedCep = cep.replace(/\D/g, '');
    if (cleanedCep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);
        const data = await response.json();

        if (!data.erro) {
          setUserData(prevData => ({
            ...prevData,
            address: {
              ...prevData.address,
              street: data.logradouro,
              neighborhood: data.bairro,
              city: data.localidade,
              state: data.uf,
              zip_code: data.cep.replace(/\D/g, '')
            }
          }));
          setErrors(prevErrors => ({
            ...prevErrors,
            address: {
              ...prevErrors.address,
              street: '',
              neighborhood: '',
              city: '',
              state: '',
              zip_code: ''
            }
          }));
        } else {
          setErrors(prevErrors => ({
            ...prevErrors,
            address: {
              ...prevErrors.address,
              zip_code: 'CEP não encontrado.'
            }
          }));
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        setErrors(prevErrors => ({
          ...prevErrors,
          address: {
            ...prevErrors.address,
            zip_code: 'Erro ao buscar CEP. Tente novamente.'
          }
        }));
      }
    }
  };

  // Função para formatar o CEP enquanto digita
  const formatZipCode = (value) => {
    if (!value) return '';
    const cleanedValue = value.replace(/\D/g, '');
    if (cleanedValue.length > 5) {
      return `${cleanedValue.slice(0, 5)}-${cleanedValue.slice(5, 8)}`;
    }
    return cleanedValue;
  };
  
  // Carrega os dados do usuário
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const currentUser = await fetchCurrentUser();
        setUserData({
          first_name: currentUser.name || '',
          surname: currentUser.surname || '',
          email: currentUser.email || '',
          phone: currentUser.phone || '',
          address: currentUser.address && currentUser.address.length > 0 ? currentUser.address[0] : { city: '', state: '', neighborhood: '', street: '', number: '', zip_code: '', complement: '' },
          owner_details: currentUser.type === 'org' && currentUser.owner_details ? currentUser.owner_details : { description: '', additional_data: {} },
          picture: currentUser.picture || '',
          type: currentUser.type || '',
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        setMessage({ type: 'error', text: 'Erro ao carregar dados do usuário. Tente novamente.' });
        setIsLoading(false);
      }
    };
    
    loadUserData();
  }, [user]);
  
  // Função para lidar com mudanças nos campos de entrada
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Lidar com campos aninhados (ex: address.city, owner_details.description)
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setUserData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      // Lidar com campos de nível superior
      setUserData(prev => ({
        ...prev,
        [name]: value
      }));
    }

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
    
    // Validação do primeiro nome
    if (!userData.first_name.trim()) {
      newErrors.first_name = 'O primeiro nome é obrigatório';
    }

    // Validação do sobrenome
    if (!userData.surname.trim()) {
      newErrors.surname = 'O sobrenome é obrigatório';
    }
    
    // Validação do email
    if (!userData.email.trim()) {
      newErrors.email = 'O email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    // Validação do telefone
    if (!userData.phone.trim()) {
      newErrors.phone = 'O telefone é obrigatório';
    }
    
    // Validação dos campos de endereço
    if (!userData.address.state.trim()) {
      newErrors.address = { ...newErrors.address, state: 'O estado é obrigatório' };
    }
    if (!userData.address.city.trim()) {
      newErrors.address = { ...newErrors.address, city: 'A cidade é obrigatória' };
    }
    if (!userData.address.zip_code.trim()) {
      newErrors.address = { ...newErrors.address, zip_code: 'O CEP é obrigatório' };
    }
    if (!userData.address.neighborhood.trim()) {
      newErrors.address = { ...newErrors.address, neighborhood: 'O bairro é obrigatório' };
    }
    if (!userData.address.street.trim()) {
      newErrors.address = { ...newErrors.address, street: 'A rua é obrigatória' };
    }
    if (!userData.address.number.trim()) {
      newErrors.address = { ...newErrors.address, number: 'O número é obrigatório' };
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
      
      // Prepara os dados para atualização
      const dataToSend = {
        _id: user._id,
        name: userData.first_name,
        surname: userData.surname,
        email: userData.email,
        phone: userData.phone.replace(/\D/g, ''),
        address: [userData.address],
        picture: userData.picture,
        type: userData.type,
        owner_details: userData.type === 'org' ? { description: userData.owner_details.description, additional_data: {} } : undefined,
      };

      // Atualiza os dados do usuário
      const updatedUser = await updateUser(dataToSend);
      
      // Atualiza o contexto com os novos dados
      setUser(updatedUser);
      
      setMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' });
      
      // Redireciona para a página de perfil após 1.5 segundos
      setTimeout(() => {
        navigate('/perfil');
      }, 1500);
      
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Erro ao atualizar perfil. Tente novamente.' 
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Função para voltar à página anterior
  const handleBack = () => {
    navigate('/perfil');
  };
  
  // Renderiza um indicador de carregamento
  if (isLoading && !userData.first_name) {
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
        <button className={styles.backButton} onClick={handleBack} disabled={isLoading}>
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
        {/* Seção de avatar removida, pois não é mais relevante para o fluxo de edição */}
        
        {/* Campos de informação */}
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="first_name" className={styles.label}>
              <FaUser className={styles.labelIcon} /> Primeiro nome
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={userData.first_name}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
            {errors.first_name && <span className={styles.error}>{errors.first_name}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="surname" className={styles.label}>
              Sobrenome
            </label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={userData.surname}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
            {errors.surname && <span className={styles.error}>{errors.surname}</span>}
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
              required
              disabled={isLoading}
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>
              <FaPhone className={styles.labelIcon} /> Telefone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
            {errors.phone && <span className={styles.error}>{errors.phone}</span>}
          </div>

          <div className={styles.formGroup} style={{ gridColumn: '1 / 3', marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '10px', color: 'var(--text-color-dark)' }}>Informações de Endereço</h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="address.state">Estado</label>
                <select
                  id="address.state"
                  name="address.state"
                  value={userData.address.state}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                >
                  <option value="">Selecione o Estado</option>
                  {states.map((state) => (
                    <option key={state.uf} value={state.uf}>
                      {state.name}
                    </option>
                  ))}
                </select>
                {errors.address && errors.address.state && <span className={styles.error}>{errors.address.state}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="address.zip_code">CEP</label>
                <input
                  type="text"
                  id="address.zip_code"
                  name="address.zip_code"
                  value={formatZipCode(userData.address.zip_code)}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => fetchAddressByCep(e.target.value)}
                  maxLength="9"
                  required
                  disabled={isLoading}
                />
                {errors.address && errors.address.zip_code && <span className={styles.error}>{errors.address.zip_code}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="address.city">Cidade</label>
                <input
                  type="text"
                  id="address.city"
                  name="address.city"
                  value={userData.address.city}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
                {errors.address && errors.address.city && <span className={styles.error}>{errors.address.city}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="address.neighborhood">Bairro</label>
                <input
                  type="text"
                  id="address.neighborhood"
                  name="address.neighborhood"
                  value={userData.address.neighborhood}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
                {errors.address && errors.address.neighborhood && <span className={styles.error}>{errors.address.neighborhood}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="address.street">Rua</label>
                <input
                  type="text"
                  id="address.street"
                  name="address.street"
                  value={userData.address.street}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
                {errors.address && errors.address.street && <span className={styles.error}>{errors.address.street}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="address.number">Número</label>
                <input
                  type="text"
                  id="address.number"
                  name="address.number"
                  value={userData.address.number}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
                {errors.address && errors.address.number && <span className={styles.error}>{errors.address.number}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="address.complement">Complemento (Opcional)</label>
                <input
                  type="text"
                  id="address.complement"
                  name="address.complement"
                  value={userData.address.complement}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                {errors.address && errors.address.complement && <span className={styles.error}>{errors.address.complement}</span>}
              </div>
            </div>
          </div>

          <div className={styles.formGroup} style={{ gridColumn: '1 / 3' }}>
            <label htmlFor="owner_details.description" className={styles.label}>
              <FaInfoCircle className={styles.labelIcon} /> Sobre mim
            </label>
            <textarea
              id="owner_details.description"
              name="owner_details.description"
              value={userData.owner_details.description}
              onChange={handleChange}
              rows="5"
              disabled={isLoading}
            ></textarea>
            {errors.owner_details && errors.owner_details.description && <span className={styles.error}>{errors.owner_details.description}</span>}
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.saveButton} disabled={isLoading}>
              <FaSave /> Salvar Alterações
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditarPerfil;

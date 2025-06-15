import React, { useState, useContext } from 'react';
import styles from './Cadastro.module.css';
import { FaUserCircle, FaBuilding } from 'react-icons/fa';
import { ThemeContext } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { register } from '../../services/authService';

const Cadastro = () => {
  const { darkMode } = useContext(ThemeContext);
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const { type } = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    identifier: '', // CPF para tutor, CNPJ para org
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
    }
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    identifier: '',
    address: {
      city: '',
      state: '',
      neighborhood: '',
      street: '',
      number: '',
      zip_code: '',
      complement: ''
    },
    owner_details: {}
  });

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

  // Função para validar CPF
  const validateCPF = (cpf) => {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]/g, '');
    
    // Verifica se tem 11 dígitos
    if (cpf.length !== 11) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    
    // Validação dos dígitos verificadores
    let sum = 0;
    let remainder;
    
    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(cpf.substring(i-1, i)) * (11 - i);
    }
    
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;
    
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(cpf.substring(i-1, i)) * (12 - i);
    }
    
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;
    
    return true;
  };

  // Função para validar CNPJ
  const validateCNPJ = (cnpj) => {
    cnpj = cnpj.replace(/[^\d]/g, '');
    
    if (cnpj.length !== 14) return false;
    
    if (/^(\d)\1{13}$/.test(cnpj)) return false;
    
    let size = cnpj.length - 2;
    let numbers = cnpj.substring(0, size);
    let digits = cnpj.substring(size);
    let sum = 0;
    let pos = size - 7;
    
    for (let i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--;
      if (pos < 2) pos = 9;
    }
    
    let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result !== parseInt(digits.charAt(0))) return false;
    
    size = size + 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;
    
    for (let i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--;
      if (pos < 2) pos = 9;
    }
    
    result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result !== parseInt(digits.charAt(1))) return false;
    
    return true;
  };

  // Função para validar senha
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return password.length >= minLength && hasUpperCase && hasLowerCase && hasSpecialChar;
  };

  // Função para validar email
  const validateEmail = (email) => {
    // Remove espaços em branco no início e no fim do email
    const trimmedEmail = email.trim();
    // Expressão regular para validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(trimmedEmail);
  };

  // Função para buscar endereço por CEP
  const fetchAddressByCep = async (cep) => {
    const cleanedCep = cep.replace(/\D/g, '');
    if (cleanedCep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);
        const data = await response.json();

        if (!data.erro) {
          setFormData(prevData => ({
            ...prevData,
            address: {
              ...prevData.address,
              street: data.logradouro,
              neighborhood: data.bairro,
              city: data.localidade,
              state: data.uf,
              zip_code: data.cep.replace(/\D/g, '') // Salvar sem o hífen
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

  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    const newValue = inputType === 'checkbox' ? checked : value;

    // Lida com campos de CEP separadamente para formatação
    if (name === 'address.zip_code') {
      const formattedValue = formatZipCode(newValue);
      setFormData(prevData => ({
        ...prevData,
        address: {
          ...prevData.address,
          zip_code: formattedValue
        }
      }));
      setErrors(prevErrors => ({
        ...prevErrors,
        address: {
          ...prevErrors.address,
          zip_code: ''
        }
      }));
      // O fetch será acionado no onBlur, ou se o CEP for digitado completamente aqui.
      if (formattedValue.replace(/\D/g, '').length === 8) {
        fetchAddressByCep(formattedValue);
      }
      return;
    }

    // Lida com campos aninhados como address.city
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prevData => ({
        ...prevData,
        [parent]: {
          ...prevData[parent],
          [child]: newValue
        }
      }));
      setErrors(prevErrors => ({
        ...prevErrors,
        [parent]: {
          ...prevErrors[parent],
          [child]: '' // Limpa o erro para o campo específico
        }
      }));
    } else {
      // Lida com campos de nível superior
      setFormData({
        ...formData,
        [name]: newValue,
      });

      // Validações em tempo real para campos de nível superior
      let error = '';

      switch (name) {
        case 'identifier': // Trata CPF e CNPJ
          if (type === 'tutor' && newValue && !validateCPF(newValue)) {
            error = 'CPF inválido';
          } else if (type === 'org' && newValue && !validateCNPJ(newValue)) {
            error = 'CNPJ inválido';
          }
          break;
        case 'email':
          if (newValue && !validateEmail(newValue)) {
            error = 'Email inválido. Verifique o formato.';
          }
          break;
        case 'password':
          if (newValue && !validatePassword(newValue)) {
            error = 'A senha deve ter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula e um caractere especial';
          }
          break;
        case 'confirmPassword':
          if (newValue && newValue !== formData.password) {
            error = 'As senhas não coincidem';
          }
          break;
        default:
          break;
      }
      setErrors({
        ...errors,
        [name]: error,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validações finais antes do envio
    const newErrors = {};
    let hasErrors = false;

    if (type === 'tutor') {
      if (!validateCPF(formData.identifier)) {
        newErrors.identifier = 'CPF inválido';
        hasErrors = true;
      }
    } else if (type === 'org') {
      if (!validateCNPJ(formData.identifier)) {
        newErrors.identifier = 'CNPJ inválido';
        hasErrors = true;
      }
      if (!formData.address.city) {
        newErrors.address = {
          ...newErrors.address,
          city: 'Cidade é obrigatória'
        };
        hasErrors = true;
      }
      if (!formData.phone) {
        newErrors.phone = 'Telefone é obrigatório';
        hasErrors = true;
      }
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido. Verifique o formato.';
      hasErrors = true;
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = 'A senha deve ter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula e um caractere especial';
      hasErrors = true;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      
      // Formatar os dados para o backend
      const userData = {
        username: formData.name.toLowerCase().replace(/\s+/g, ''),
        email: formData.email,
        phone: formData.phone.replace(/\D/g, ''),
        identifier: formData.identifier.replace(/\D/g, ''),
        password: formData.password,
        type: type,
        displayName: formData.name,
        address: type === 'org' ? formData.address : undefined,
        owner_details: type === 'org' ? { description: formData.owner_details.description, additional_data: {} } : undefined,
        // cpf e cnpj são gerenciados pelo identifier e tipo
      };

      if (type === 'tutor') {
        userData.cpf = userData.identifier;
        userData.cnpj = null; // Garante que CNPJ seja nulo para tutor
      } else if (type === 'org') {
        userData.cnpj = userData.identifier;
        userData.cpf = null; // Garante que CPF seja nulo para org
      }

      console.log('Enviando dados:', userData);

      const response = await register(userData);
      setUser(response);
      navigate('/');
    } catch (error) {
      console.error('Erro no registro:', error);
      let errorMessage = 'Erro ao criar conta';
      if (error.response && error.response.data && error.response.data.detail) {
        if (typeof error.response.data.detail === 'string') {
          errorMessage = error.response.data.detail;
        } else if (Array.isArray(error.response.data.detail) && error.response.data.detail.length > 0 && error.response.data.detail[0].msg) {
          errorMessage = error.response.data.detail[0].msg; // Pega a primeira mensagem de erro de um array
        } else if (error.response.data.detail.msg) {
          errorMessage = error.response.data.detail.msg; // Pega a mensagem de erro de um objeto
        }
      }
      setErrors({
        ...errors,
        submit: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.container} ${darkMode ? styles.darkMode : ''}`}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          {type === 'tutor' ? (
            <>
              <FaUserCircle className={styles.icon} />
              Cadastro de Tutor
            </>
          ) : (
            <>
              <FaBuilding className={styles.icon} />
              Cadastro de ONG
            </>
          )}
        </h1>

        {errors.submit && (
          <div className={styles.error}>
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Nome {type === 'org' ? 'da Organização' : 'Completo'}</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <span className={styles.error}>{errors.name}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>

            {type === 'tutor' ? (
              <div className={styles.formGroup}>
                <label>CPF</label>
                <input
                  type="text"
                  name="identifier"
                  value={formData.identifier}
                  onChange={handleChange}
                  required
                />
                {errors.identifier && <span className={styles.error}>{errors.identifier}</span>}
              </div>
            ) : (
              <>
                <div className={styles.formGroup}>
                  <label>CNPJ</label>
                  <input
                    type="text"
                    name="identifier"
                    value={formData.identifier}
                    onChange={handleChange}
                    required
                  />
                  {errors.identifier && <span className={styles.error}>{errors.identifier}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label>Telefone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    inputMode="numeric"
                  />
                  {errors.phone && <span className={styles.error}>{errors.phone}</span>}
                </div>

                <div className={styles.formGroup} style={{ gridColumn: '1 / 3', marginBottom: '1.5rem' }}>
                  <h3 style={{ marginBottom: '10px', color: 'var(--text-color-dark)' }}>Informações de Endereço</h3>
                
                  <div className={styles.formGrid}>
                    {/* Campos de Endereço - Ordem de Macro para Micro */}
                    <div className={styles.formGroup}>
                      <label>Estado</label>
                      <select
                        name="address.state"
                        value={formData.address.state}
                        onChange={handleChange}
                        required
                        readOnly={!!formData.address.zip_code.replace(/\D/g, '').length}
                        disabled={!!formData.address.zip_code.replace(/\D/g, '').length}
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
                      <label>CEP</label>
                      <input
                        type="text"
                        name="address.zip_code"
                        value={formData.address.zip_code}
                        onChange={handleChange}
                        onBlur={(e) => fetchAddressByCep(e.target.value)}
                        maxLength="9"
                        required
                      />
                      {errors.address && errors.address.zip_code && <span className={styles.error}>{errors.address.zip_code}</span>}
                    </div>

                    <div className={styles.formGroup}>
                      <label>Cidade</label>
                      <input
                        type="text"
                        name="address.city"
                        value={formData.address.city}
                        onChange={handleChange}
                        required
                        readOnly={!!formData.address.zip_code.replace(/\D/g, '').length}
                        disabled={!!formData.address.zip_code.replace(/\D/g, '').length}
                      />
                      {errors.address && errors.address.city && <span className={styles.error}>{errors.address.city}</span>}
                    </div>

                    <div className={styles.formGroup}>
                      <label>Bairro</label>
                      <input
                        type="text"
                        name="address.neighborhood"
                        value={formData.address.neighborhood}
                        onChange={handleChange}
                        required
                        readOnly={!!formData.address.zip_code.replace(/\D/g, '').length}
                        disabled={!!formData.address.zip_code.replace(/\D/g, '').length}
                      />
                      {errors.address && errors.address.neighborhood && <span className={styles.error}>{errors.address.neighborhood}</span>}
                    </div>

                    <div className={styles.formGroup}>
                      <label>Rua</label>
                      <input
                        type="text"
                        name="address.street"
                        value={formData.address.street}
                        onChange={handleChange}
                        required
                        readOnly={!!formData.address.zip_code.replace(/\D/g, '').length}
                        disabled={!!formData.address.zip_code.replace(/\D/g, '').length}
                      />
                      {errors.address && errors.address.street && <span className={styles.error}>{errors.address.street}</span>}
                    </div>

                    <div className={styles.formGroup}>
                      <label>Número</label>
                      <input
                        type="text"
                        name="address.number"
                        value={formData.address.number}
                        onChange={handleChange}
                        required
                      />
                      {errors.address && errors.address.number && <span className={styles.error}>{errors.address.number}</span>}
                    </div>

                    <div className={styles.formGroup}>
                      <label>Complemento (Opcional)</label>
                      <input
                        type="text"
                        name="address.complement"
                        value={formData.address.complement}
                        onChange={handleChange}
                      />
                      {errors.address && errors.address.complement && <span className={styles.error}>{errors.address.complement}</span>}
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className={styles.formGroup}>
              <label>Senha</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && <span className={styles.error}>{errors.password}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>Confirmar Senha</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
            </div>
          </div>

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? 'Criando conta...' : 'Criar Conta'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;

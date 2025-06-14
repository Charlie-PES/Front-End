import React, { useState, useContext } from 'react';
import styles from './Cadastro.module.css';
import { FaUserCircle, FaBuilding } from 'react-icons/fa';
import { ThemeContext } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../../services/authService';

const Cadastro = () => {
  const { darkMode } = useContext(ThemeContext);
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    queroAdotar: false,
    queroSerTutor: false,
    queroSerOng: false,
    cnpj: '',
    razaoSocial: '',
    endereco: '',
    telefone: ''
  });

  const [errors, setErrors] = useState({
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    cnpj: '',
    razaoSocial: '',
    endereco: '',
    telefone: ''
  });

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.includes('.com');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData({
      ...formData,
      [name]: newValue,
    });

    // Validações em tempo real
    let error = '';
    
    switch (name) {
      case 'cpf':
        if (value && !validateCPF(value)) {
          error = 'CPF inválido';
        }
        break;
      case 'cnpj':
        if (value && !validateCNPJ(value)) {
          error = 'CNPJ inválido';
        }
        break;
      case 'email':
        if (value && !validateEmail(value)) {
          error = 'Email inválido (deve conter @ e .com)';
        }
        break;
      case 'senha':
        if (value && !validatePassword(value)) {
          error = 'A senha deve ter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula e um caractere especial';
        }
        break;
      case 'confirmarSenha':
        if (value && value !== formData.senha) {
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validações finais antes do envio
    const newErrors = {};
    let hasErrors = false;

    if (!formData.queroSerOng) {
      if (!validateCPF(formData.cpf)) {
        newErrors.cpf = 'CPF inválido';
        hasErrors = true;
      }
    } else {
      if (!validateCNPJ(formData.cnpj)) {
        newErrors.cnpj = 'CNPJ inválido';
        hasErrors = true;
      }
      if (!formData.razaoSocial) {
        newErrors.razaoSocial = 'Razão social é obrigatória';
        hasErrors = true;
      }
      if (!formData.endereco) {
        newErrors.endereco = 'Endereço é obrigatório';
        hasErrors = true;
      }
      if (!formData.telefone) {
        newErrors.telefone = 'Telefone é obrigatório';
        hasErrors = true;
      }
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido (deve conter @ e .com)';
      hasErrors = true;
    }

    if (!validatePassword(formData.senha)) {
      newErrors.senha = 'A senha deve ter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula e um caractere especial';
      hasErrors = true;
    }

    if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = 'As senhas não coincidem';
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
        username: formData.nome.toLowerCase().replace(/\s+/g, ''),
        email: formData.email,
        cpf: formData.queroSerOng ? null : formData.cpf.replace(/\D/g, ''),
        cnpj: formData.queroSerOng ? formData.cnpj.replace(/\D/g, '') : null,
        razaoSocial: formData.queroSerOng ? formData.razaoSocial : null,
        endereco: formData.queroSerOng ? formData.endereco : null,
        telefone: formData.queroSerOng ? formData.telefone : null,
        tutor: formData.queroSerTutor,
        adopter: formData.queroAdotar,
        ong: formData.queroSerOng,
        password: formData.senha
      };

      console.log('Enviando dados:', userData); // Para debug

      // Criar usuário
      const user = await addUser(userData);

      // Atualiza o contexto com os dados do usuário
      setUser(user);

      // Redirecionar para a página inicial
      navigate('/');
    } catch (error) {
      console.error('Erro ao criar conta:', error);
      setErrors({
        ...errors,
        email: error.response?.data?.message || 'Erro ao criar conta. Tente novamente.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.cadastroContainer} ${darkMode ? styles.darkMode : ''}`}>
      <div className={styles.cadastroForm}>
        {formData.queroSerOng ? (
          <FaBuilding className={styles.userIcon} size={50} />
        ) : (
          <FaUserCircle className={styles.userIcon} size={50} />
        )}
        <h1>Cadastre-se!</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Nome completo</label>
            <input 
              type="text" 
              name="nome" 
              placeholder="nome completo" 
              onChange={handleChange} 
              required 
              className={errors.nome ? styles.inputError : ''}
              disabled={loading}
            />
            {errors.nome && <span className={styles.errorMessage}>{errors.nome}</span>}
          </div>

          {!formData.queroSerOng ? (
            <div className={styles.formGroup}>
              <label>CPF</label>
              <input 
                type="text" 
                name="cpf" 
                placeholder="ex: 123.123.123-12" 
                onChange={handleChange} 
                required 
                className={errors.cpf ? styles.inputError : ''}
                disabled={loading}
              />
              {errors.cpf && <span className={styles.errorMessage}>{errors.cpf}</span>}
            </div>
          ) : (
            <>
              <div className={styles.formGroup}>
                <label>CNPJ</label>
                <input 
                  type="text" 
                  name="cnpj" 
                  placeholder="ex: 12.345.678/0001-90" 
                  onChange={handleChange} 
                  required 
                  className={errors.cnpj ? styles.inputError : ''}
                  disabled={loading}
                />
                {errors.cnpj && <span className={styles.errorMessage}>{errors.cnpj}</span>}
              </div>

              <div className={styles.formGroup}>
                <label>Razão Social</label>
                <input 
                  type="text" 
                  name="razaoSocial" 
                  placeholder="Razão social da ONG" 
                  onChange={handleChange} 
                  required 
                  className={errors.razaoSocial ? styles.inputError : ''}
                  disabled={loading}
                />
                {errors.razaoSocial && <span className={styles.errorMessage}>{errors.razaoSocial}</span>}
              </div>

              <div className={styles.formGroup}>
                <label>Endereço</label>
                <input 
                  type="text" 
                  name="endereco" 
                  placeholder="Endereço completo" 
                  onChange={handleChange} 
                  required 
                  className={errors.endereco ? styles.inputError : ''}
                  disabled={loading}
                />
                {errors.endereco && <span className={styles.errorMessage}>{errors.endereco}</span>}
              </div>

              <div className={styles.formGroup}>
                <label>Telefone</label>
                <input 
                  type="text" 
                  name="telefone" 
                  placeholder="ex: (11) 99999-9999" 
                  onChange={handleChange} 
                  required 
                  className={errors.telefone ? styles.inputError : ''}
                  disabled={loading}
                />
                {errors.telefone && <span className={styles.errorMessage}>{errors.telefone}</span>}
              </div>
            </>
          )}

          <div className={styles.formGroup}>
            <label>Email</label>
            <input 
              type="email" 
              name="email" 
              placeholder="email da conta" 
              onChange={handleChange} 
              required 
              className={errors.email ? styles.inputError : ''}
              disabled={loading}
            />
            {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Senha</label>
            <input 
              type="password" 
              name="senha" 
              placeholder="senha da conta" 
              onChange={handleChange} 
              required 
              className={errors.senha ? styles.inputError : ''}
              disabled={loading}
            />
            {errors.senha && <span className={styles.errorMessage}>{errors.senha}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Confirmar a senha</label>
            <input 
              type="password" 
              name="confirmarSenha" 
              placeholder="confirme sua senha" 
              onChange={handleChange} 
              required 
              className={errors.confirmarSenha ? styles.inputError : ''}
              disabled={loading}
            />
            {errors.confirmarSenha && <span className={styles.errorMessage}>{errors.confirmarSenha}</span>}
          </div>

          <div className={styles.checkboxGroup}>
            {!formData.queroSerOng && (
              <>
                <div className={styles.checkboxItem}>
                  <input 
                    type="checkbox" 
                    name="queroAdotar" 
                    id="queroAdotar" 
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <label htmlFor="queroAdotar">Quero adotar um pet</label>
                </div>
                <div className={styles.checkboxItem}>
                  <input 
                    type="checkbox" 
                    name="queroSerTutor" 
                    id="queroSerTutor" 
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <label htmlFor="queroSerTutor">Quero ser tutor temporário</label>
                </div>
              </>
            )}
            <div className={styles.checkboxItem}>
              <input 
                type="checkbox" 
                name="queroSerOng" 
                id="queroSerOng" 
                onChange={handleChange}
                disabled={loading}
              />
              <label htmlFor="queroSerOng">Quero registrar como ONG</label>
            </div>
          </div>

          <button type="submit" className={styles.registerButton} disabled={loading}>
            {loading ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;

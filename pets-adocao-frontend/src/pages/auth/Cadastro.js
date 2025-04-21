import React, { useState, useContext } from 'react';
import styles from './Cadastro.module.css';
import { FaUserCircle } from 'react-icons/fa';
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
  });

  const [errors, setErrors] = useState({
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    confirmarSenha: '',
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

    if (!validateCPF(formData.cpf)) {
      newErrors.cpf = 'CPF inválido';
      hasErrors = true;
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
        cpf: formData.cpf.replace(/\D/g, ''),
        tutor: formData.queroSerTutor,
        adopter: formData.queroAdotar,
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
        <FaUserCircle className={styles.userIcon} size={50} />
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
          </div>

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;

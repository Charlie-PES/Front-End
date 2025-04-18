import React, { useState } from 'react';
import styles from './Cadastro.module.css';
import { FaUserCircle } from 'react-icons/fa';
import { auth, googleProvider, signInWithPopup } from '../../firebase.js'; // ajuste o caminho conforme seu projeto

const Cadastro = () => {
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

  const handleSubmit = (e) => {
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

    // Se não houver erros, prossegue com o cadastro
    console.log('Dados enviados:', formData);
    alert('Cadastro realizado com sucesso!');
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      alert(`Bem-vindo, ${user.displayName}!`);
      console.log('Usuário Google:', user);
    } catch (error) {
      console.error('Erro no login com Google:', error);
      alert('Erro ao registrar com o Google. Tente novamente.');
    }
  };

  return (
    <div className={styles.cadastroContainer}>
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
            />
            {errors.confirmarSenha && <span className={styles.errorMessage}>{errors.confirmarSenha}</span>}
          </div>

          <div className={styles.checkboxContainer}>
            <label>
              <input type="checkbox" name="queroAdotar" onChange={handleChange} /> Quero adotar
            </label>
            <label>
              <input type="checkbox" name="queroSerTutor" onChange={handleChange} /> Quero ser tutor
            </label>
          </div>

          <button type="submit" className={styles.registerButton}>Registre-se</button>
          <button type="button" className={styles.googleButton} onClick={handleGoogleRegister}>
            Registre-se pelo Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;

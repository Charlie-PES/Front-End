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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
          <label>Nome completo</label>
          <input type="text" name="nome" placeholder="nome completo" onChange={handleChange} required />

          <label>CPF</label>
          <input type="text" name="cpf" placeholder="ex: 123.123.123-12" onChange={handleChange} required />

          <label>Email</label>
          <input type="email" name="email" placeholder="email da conta" onChange={handleChange} required />

          <label>Senha</label>
          <input type="password" name="senha" placeholder="senha da conta" onChange={handleChange} required />

          <label>Confirmar a senha</label>
          <input type="password" name="confirmarSenha" placeholder="confirme sua senha" onChange={handleChange} required />

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

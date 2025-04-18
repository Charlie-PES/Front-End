import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider, signInWithPopup } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); // Redireciona para a página inicial após o login
    } catch (error) {
      setError('Email ou senha inválidos');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/'); // Redireciona para a página inicial após o login
    } catch (error) {
      setError('Erro ao fazer login com Google');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleEmailLogin}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>
        <div className="divider">
          <span>ou</span>
        </div>
        <button onClick={handleGoogleLogin} className="google-button">
          Entrar com Google
        </button>
        <p className="register-link">
          Não tem uma conta?{' '}
          <button onClick={() => navigate('/cadastro')} className="link-button">
            Registre-se
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login; 
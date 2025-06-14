import React, { useState } from 'react';
import { register } from '../../services/authService';
import styles from './AdminPage.module.css';

const AdminPage = () => {
  const [accounts, setAccounts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateAccounts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Criar conta de adotante
      const adotante = await register({
        username: 'adotante',
        email: 'adotante@teste.com',
        password: 'Teste@123',
        displayName: 'Adotante Teste',
        adopter: true
      });

      // Criar conta de ONG
      const ong = await register({
        username: 'ong',
        email: 'ong@teste.com',
        password: 'Teste@123',
        displayName: 'ONG Teste',
        ong: true,
        cnpj: '12345678901234',
        razaoSocial: 'ONG Teste',
        endereco: 'Rua Teste, 123',
        telefone: '11999999999'
      });

      // Criar conta de tutor
      const tutor = await register({
        username: 'tutor',
        email: 'tutor@teste.com',
        password: 'Teste@123',
        displayName: 'Tutor Teste',
        tutor: true
      });

      setAccounts({
        adotante: {
          email: adotante.email,
          password: 'Teste@123',
          displayName: adotante.displayName
        },
        ong: {
          email: ong.email,
          password: 'Teste@123',
          displayName: ong.displayName
        },
        tutor: {
          email: tutor.email,
          password: 'Teste@123',
          displayName: tutor.displayName
        }
      });
    } catch (err) {
      setError('Erro ao criar contas: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.adminContainer}>
      <h1>Página de Administração</h1>
      
      <div className={styles.section}>
        <h2>Criar Contas Pré-definidas</h2>
        <p>Clique no botão abaixo para criar contas de teste pré-definidas.</p>
        
        <button 
          onClick={handleCreateAccounts} 
          className={styles.createButton}
          disabled={loading}
        >
          {loading ? 'Criando...' : 'Criar Contas Pré-definidas'}
        </button>
        
        {error && <p className={styles.error}>{error}</p>}
        
        {accounts && (
          <div className={styles.accountsList}>
            <h3>Contas Criadas:</h3>
            
            <div className={styles.accountCard}>
              <h4>Conta de Adotante</h4>
              <p><strong>Email:</strong> {accounts.adotante.email}</p>
              <p><strong>Senha:</strong> {accounts.adotante.password}</p>
              <p><strong>Nome:</strong> {accounts.adotante.displayName}</p>
            </div>
            
            <div className={styles.accountCard}>
              <h4>Conta de ONG</h4>
              <p><strong>Email:</strong> {accounts.ong.email}</p>
              <p><strong>Senha:</strong> {accounts.ong.password}</p>
              <p><strong>Nome:</strong> {accounts.ong.displayName}</p>
            </div>
            
            <div className={styles.accountCard}>
              <h4>Conta de Tutor</h4>
              <p><strong>Email:</strong> {accounts.tutor.email}</p>
              <p><strong>Senha:</strong> {accounts.tutor.password}</p>
              <p><strong>Nome:</strong> {accounts.tutor.displayName}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage; 
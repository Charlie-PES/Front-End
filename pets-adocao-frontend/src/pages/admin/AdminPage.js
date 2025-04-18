import React, { useState } from 'react';
import { createSeedAccounts } from '../../services/authService';
import styles from './AdminPage.module.css';

const AdminPage = () => {
  const [accounts, setAccounts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateAccounts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const createdAccounts = createSeedAccounts();
      setAccounts(createdAccounts);
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
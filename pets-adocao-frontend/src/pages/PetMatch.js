import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './PetMatch.module.css'; // Crie esse CSS ou comente para testar

const PetMatch = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleGoToPetPage = () => {
    navigate(`/pet/${id}`);
  };

  return (
    <div className={styles.matchContainer || ''}>
      <h1>Deu Match? 🐾</h1>
      <p>Esse pet parece ideal para você!</p>

      {/* Exemplo de conteúdo simples */}
      <div className={styles.petBox || ''}>
        <img src="/images/logo.png" alt="Pet" width="150" />
        <h3>Pet ID: {id}</h3>
      </div>

      <button onClick={handleGoToPetPage} className={styles.goButton || ''}>
        Ver detalhes do pet
      </button>
    </div>
  );
};

export default PetMatch;

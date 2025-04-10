import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './PetMatch.module.css';

const PetMatch = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleGoToPetPage = () => {
    navigate(`/pet/${id}`);
  };

  const parametros = [
    { nome: 'Parâmetro 1', cor: '#c0f2cc' },
    { nome: 'Parâmetro 2', cor: '#ffb3b3' },
    { nome: 'Parâmetro 3', cor: '#36d17c' },
    { nome: 'Parâmetro 4', cor: '#c0f2cc' },
    { nome: 'Parâmetro 5', cor: '#c22a2a' },
    { nome: 'Parâmetro 6', cor: '#36d17c' }
  ];

  return (
    <div className={styles.matchContainer}>
      <h1>Deu Match?</h1>
      <p className={styles.subtitle}>Faça o teste de compatibilidade entre você e seu próximo aumigo!</p>

      <div className={styles.matchBox}>
        <div className={styles.petInfo}>
          <div className={styles.petCard}>
            <img src="/images/logo.png" alt="Pet" />
            <p><strong>Adotar</strong><br />Quantidade: 1</p>
          </div>
          <p className={styles.detailTitle}>Detalhes</p>
          {[1, 2, 3, 4].map(i => (
            <input key={i} type="text" placeholder="🧡 ...." className={styles.inputField} />
          ))}
        </div>

        <div className={styles.parametros}>
          {parametros.map((param, index) => (
            <div key={index} className={styles.parametroRow}>
              <img src="/images/logo.png" alt="user-icon" className={styles.sideIcon} />
              <div className={styles.parametroBar} style={{ backgroundColor: param.cor }}>
                {param.nome}
              </div>
              <img src="/images/logo.png" alt="pet-icon" className={styles.sideIcon} />
            </div>
          ))}
        </div>
      </div>

      <button className={styles.goButton} onClick={handleGoToPetPage}>
        Encontrar seu próximo amigo
      </button>
    </div>
  );
};

export default PetMatch;

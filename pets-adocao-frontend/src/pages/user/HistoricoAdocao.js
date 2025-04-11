import React from 'react';
import styles from './HistoricoAdocao.module.css';

const HistoricoAdocao = () => {
  const historico = [
    {
      nome: 'Luna',
      especie: 'Gato',
      raca: 'SRD',
      dataAdocao: '2024-01-15',
      imagem: '/images/cat1.png',
    },
    {
      nome: 'Thor',
      especie: 'Cachorro',
      raca: 'Labrador',
      dataAdocao: '2023-11-08',
      imagem: '/images/dog1.png',
    },
    {
      nome: 'Nina',
      especie: 'Cachorro',
      raca: 'Poodle',
      dataAdocao: '2022-06-25',
      imagem: '/images/dog2.png',
    },
  ];

  return (
    <div className={styles.container}>
      <h2>🐾 Histórico de Adoções</h2>

      {historico.length === 0 ? (
        <p className={styles.empty}>Você ainda não adotou nenhum pet.</p>
      ) : (
        <div className={styles.cards}>
          {historico.map((pet, index) => (
            <div key={index} className={styles.card}>
              <img src={pet.imagem} alt={pet.nome} className={styles.petImage} />
              <div className={styles.petInfo}>
                <h3>{pet.nome}</h3>
                <p><strong>Espécie:</strong> {pet.especie}</p>
                <p><strong>Raça:</strong> {pet.raca}</p>
                <p><strong>Data da Adoção:</strong> {new Date(pet.dataAdocao).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoricoAdocao;

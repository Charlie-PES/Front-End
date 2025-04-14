import React from 'react';
import styles from './PetsFavoritos.module.css';

const PetsFavoritos = () => {
  const favoritos = [
    {
      nome: 'Mel',
      especie: 'Cachorro',
      raca: 'SRD',
      idade: '1 ano',
      imagem: '/images/dog3.png',
    },
    {
      nome: 'Tigrinho',
      especie: 'Gato',
      raca: 'Persa',
      idade: '6 meses',
      imagem: '/images/cat2.png',
    },
    {
      nome: 'Pingo',
      especie: 'Cachorro',
      raca: 'Beagle',
      idade: '2 anos',
      imagem: '/images/dog4.png',
    },
  ];

  return (
    <div className={styles.container}>
      <h2>🧡 Pets Favoritos</h2>

      {favoritos.length === 0 ? (
        <p className={styles.empty}>Você ainda não favoritou nenhum pet.</p>
      ) : (
        <div className={styles.cards}>
          {favoritos.map((pet, index) => (
            <div key={index} className={styles.card}>
              <img src={pet.imagem} alt={pet.nome} className={styles.petImage} />
              <div className={styles.petInfo}>
                <h3>{pet.nome}</h3>
                <p><strong>Espécie:</strong> {pet.especie}</p>
                <p><strong>Raça:</strong> {pet.raca}</p>
                <p><strong>Idade:</strong> {pet.idade}</p>
              </div>
              <button className={styles.removeBtn}>Remover</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PetsFavoritos;

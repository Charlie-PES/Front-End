import React, { useState } from 'react';
import styles from './Adotar.module.css';

const Adotar = () => {
  const [filtros, setFiltros] = useState({
    comportamento: '',
    tamanho: '',
    sexo: []
  });

  const pets = [
    { id: 1, nome: 'Green Tea', imagem: '/images/pet1.jpg' },
    { id: 2, nome: 'White Tea', imagem: '/images/pet2.jpg' },
    { id: 3, nome: 'Super Matcha', imagem: '/images/pet3.jpg' },
    { id: 4, nome: 'Rooibos Fruit Tea', imagem: '/images/pet4.jpg' },
    { id: 5, nome: 'Black Tea', imagem: '/images/pet5.jpg' },
    { id: 6, nome: 'Green Jasmine Tea', imagem: '/images/pet6.jpg' },
    { id: 7, nome: 'Christmas Rooibos', imagem: '/images/pet7.jpg' },
    // ... repita ou gere dinamicamente mais pets se quiser
  ];

  const toggleSexo = (valor) => {
    setFiltros((prev) => ({
      ...prev,
      sexo: prev.sexo.includes(valor)
        ? prev.sexo.filter((s) => s !== valor)
        : [...prev.sexo, valor],
    }));
  };

  return (
    <div className={styles.adotarContainer}>
      <aside className={styles.sidebar}>
        <h2>Filter</h2>
        <select>
          <option>Comportamento</option>
        </select>
        <select>
          <option>Tamanho</option>
        </select>
        <select>
          <option>Strength</option>
        </select>
        <div className={styles.checkboxGroup}>
          <label>Sexo</label>
          <label>
            <input
              type="checkbox"
              onChange={() => toggleSexo('Fêmea')}
              checked={filtros.sexo.includes('Fêmea')}
            />
            Fêmea
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => toggleSexo('Macho')}
              checked={filtros.sexo.includes('Macho')}
            />
            Macho
          </label>
        </div>
        <select>
          <option>...</option>
        </select>
      </aside>

      <main className={styles.petsGrid}>
        {pets.map((pet) => (
          <div key={pet.id} className={styles.petCard}>
            <img src={pet.imagem} alt={pet.nome} />
            <h3>{pet.nome}</h3>
            <button className={styles.adotarBtn}>ME ADOTE</button>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Adotar;

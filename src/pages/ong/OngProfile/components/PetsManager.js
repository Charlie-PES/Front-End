import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import styles from './PetsManager.module.css';

const PetsManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pets, setPets] = useState([
    {
      id: 1,
      name: 'Rex',
      type: 'Cachorro',
      breed: 'Labrador',
      age: '2 anos',
      status: 'Disponível',
      image: 'https://via.placeholder.com/150'
    },
    // Adicione mais pets aqui
  ]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPets = pets.filter(pet =>
    pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.petsManager}>
      <div className={styles.header}>
        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar pets..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <button className={styles.addButton}>
          <FaPlus />
          <span>Adicionar Pet</span>
        </button>
      </div>

      <div className={styles.petsGrid}>
        {filteredPets.map(pet => (
          <div key={pet.id} className={styles.petCard}>
            <div className={styles.petImage}>
              <img src={pet.image} alt={pet.name} />
              <div className={styles.statusBadge} data-status={pet.status.toLowerCase()}>
                {pet.status}
              </div>
            </div>
            <div className={styles.petInfo}>
              <h3>{pet.name}</h3>
              <p className={styles.breed}>{pet.breed}</p>
              <p className={styles.type}>{pet.type}</p>
              <p className={styles.age}>{pet.age}</p>
            </div>
            <div className={styles.actions}>
              <button className={styles.editButton}>
                <FaEdit />
              </button>
              <button className={styles.deleteButton}>
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetsManager; 
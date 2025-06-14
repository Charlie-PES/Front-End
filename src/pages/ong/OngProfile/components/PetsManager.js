import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import styles from './PetsManager.module.css';
import { Link } from 'react-router-dom';

// Função utilitária para calcular idade (copiada de PetPage.js para consistência)
function calcularIdade(dataNascimento) {
  if (!dataNascimento || dataNascimento === 'string') return '';
  const nascimento = new Date(dataNascimento);
  const hoje = new Date();
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const m = hoje.getMonth() - nascimento.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  return idade + (idade === 1 ? ' ano' : ' anos');
}

const PetsManager = ({ pets: initialPets = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pets, setPets] = useState(initialPets);

  useEffect(() => {
    setPets(initialPets);
  }, [initialPets]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPets = pets.filter(pet =>
    (pet.name && pet.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (pet.traits?.breed && pet.traits.breed.toLowerCase().includes(searchTerm.toLowerCase()))
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
        <Link to="/pets/add" className={styles.addButton}>
          <FaPlus />
          <span>Adicionar Pet</span>
        </Link>
      </div>

      <div className={styles.petsGrid}>
        {filteredPets.length > 0 ? (
          filteredPets.map(pet => {
            const nome = pet.name && pet.name !== 'string' ? pet.name : 'Não informado';
            const especie = pet.traits?.species && pet.traits.species !== 'string' ? pet.traits.species : '';
            const raca = pet.traits?.breed && pet.traits.breed !== 'string' ? pet.traits.breed : '';
            const idade = calcularIdade(pet.birthday_date);
            const imagem = (pet.picture && pet.picture !== 'string') ? pet.picture : '/images/default-pet.png';
            const status = pet.is_available ? 'Disponível' : 'Adotado';
            const statusColor = pet.is_available ? '#00796b' : '#e65100';

            return (
              <div key={pet._id} className={styles.petCard}>
                <div className={styles.petImage}>
                  <img src={imagem} alt={nome} />
                  <div className={styles.statusBadge} style={{backgroundColor: statusColor}}>
                    {status}
                  </div>
                </div>
                <div className={styles.petInfo}>
                  <h3>{nome}</h3>
                  {raca && <p className={styles.breed}>{raca}</p>}
                  {especie && <p className={styles.type}>{especie === 'dog' ? 'Cachorro' : especie === 'cat' ? 'Gato' : especie}</p>}
                  {idade && idade !== '0 anos' && <p className={styles.age}>{idade}</p>}
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
            );
          })
        ) : (
          <p className={styles.noPetsMessage}>Nenhum pet encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default PetsManager; 
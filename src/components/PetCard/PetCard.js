import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PetCard.module.css';
import { FaHeart, FaRegHeart, FaBuilding, FaUser } from 'react-icons/fa';

const PetCard = ({ pet, onFavoriteClick, isFavorite }) => {
  // Calcula a idade do pet em anos
  const calculateAge = (birthdayDate) => {
    const birthDate = new Date(birthdayDate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  // Função para truncar a descrição
  const truncateDescription = (text, maxLength) => {
    if (!text) return 'Descrição não disponível';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Determina o tipo de proprietário
  const getOwnerType = (type) => {
    return type === 'org' ? 'ONG' : 'Tutor Temporário';
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={pet.picture} alt={pet.name} className={styles.image} />
        <button 
          className={styles.favoriteButton}
          onClick={(e) => {
            e.preventDefault();
            onFavoriteClick(pet._id);
          }}
          aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3>{pet.name}</h3>
          <span className={styles.origin}>
            {pet.owner_id ? (
              <>
                <FaBuilding className={styles.originIcon} />
                {getOwnerType(pet.owner_id.type)}
              </>
            ) : (
              <>
                <FaUser className={styles.originIcon} />
                Sem Tutor
              </>
            )}
          </span>
        </div>
        <p className={styles.breed}>{pet.traits.breed || 'Raça não especificada'}</p>
        <div className={styles.details}>
          <span>{calculateAge(pet.birthday_date)} anos</span>
          <span>{pet.traits.size}</span>
          <span>{pet.traits.fur_type}</span>
        </div>
        <p className={styles.description}>
          {truncateDescription(pet.description, 100)}
        </p>
        <p className={styles.location}>
          {pet.owner_id?.address?.[0]?.city || 'Localização não disponível'}
        </p>
        <Link to={`/pet/${pet._id}`} className={styles.button}>
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
};

export default PetCard; 
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PetCard.module.css';
import { FaHeart, FaRegHeart, FaBuilding, FaUser } from 'react-icons/fa';

const PetCard = ({ pet, onFavoriteClick, isFavorite }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={pet.imageUrl} alt={pet.name} className={styles.image} />
        <button 
          className={styles.favoriteButton}
          onClick={(e) => {
            e.preventDefault();
            onFavoriteClick(pet.id);
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
            {pet.isFromOng ? (
              <>
                <FaBuilding className={styles.originIcon} />
                ONG
              </>
            ) : (
              <>
                <FaUser className={styles.originIcon} />
                Tutor Temporário
              </>
            )}
          </span>
        </div>
        <p className={styles.breed}>{pet.breed}</p>
        <div className={styles.details}>
          <span>{pet.age} anos</span>
          <span>{pet.gender}</span>
          <span>{pet.size}</span>
        </div>
        <p className={styles.location}>{pet.location}</p>
        <Link to={`/pet/${pet.id}`} className={styles.button}>
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
};

export default PetCard; 
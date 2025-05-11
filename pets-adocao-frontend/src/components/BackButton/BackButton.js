import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import styles from './BackButton.module.css';

const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <button 
      className={styles.backButton}
      onClick={handleGoBack}
      aria-label="Voltar para página anterior"
    >
      <FaArrowLeft />
    </button>
  );
};

export default BackButton; 
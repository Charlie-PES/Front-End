import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import styles from './BackButton.module.css';

const BackButton = () => {
  const navigate = useNavigate();
  const [buttonStyle, setButtonStyle] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const footerTop = footerRect.top;
        
        // Se o footer estiver visível na tela
        if (footerTop < windowHeight) {
          // Calcula a distância do botão até o footer
          const distanceToFooter = windowHeight - footerTop;
          // Ajusta a posição do botão para ficar acima do footer
          setButtonStyle({
            bottom: `${distanceToFooter + 20}px`
          });
        } else {
          // Se o footer não estiver visível, mantém a posição padrão
          setButtonStyle({
            bottom: '100px'
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Executa uma vez no carregamento

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <button 
      className={styles.backButton}
      onClick={handleGoBack}
      aria-label="Voltar para página anterior"
      style={buttonStyle}
    >
      <FaArrowLeft />
    </button>
  );
};

export default BackButton; 
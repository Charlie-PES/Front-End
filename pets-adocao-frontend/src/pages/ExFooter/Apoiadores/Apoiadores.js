import React, { useState, useEffect, useContext } from 'react';
import { FaHeart, FaHandHoldingHeart, FaBuilding, FaGlobe } from 'react-icons/fa';
import { ThemeContext } from '../../../contexts/ThemeContext';
import styles from './Apoiadores.module.css';

/**
 * Componente Apoiadores
 * 
 * Este componente exibe uma seção de apoiadores/parceiros da plataforma.
 * Inclui um carrossel de logos com efeitos de hover e animações.
 * Implementa um design moderno, responsivo e adaptável ao modo escuro.
 */
const Apoiadores = () => {
  // Contexto de tema para suporte ao modo escuro
  const { darkMode } = useContext(ThemeContext);
  
  // Estado para controlar a animação de entrada
  const [isVisible, setIsVisible] = useState(false);
  
  // Dados dos apoiadores - em produção, estes dados viriam de uma API
  const apoiadores = [
    {
      id: 1,
      nome: 'PetLovers Inc.',
      imagem: '/images/parceiro1.png',
      link: 'https://www.petlovers.com',
      tipo: 'Empresa',
      descricao: 'Especialistas em produtos para pets há mais de 15 anos.'
    },
    {
      id: 2,
      nome: 'Vida Animal ONG',
      imagem: '/images/parceiro2.png',
      link: 'https://www.vidaanimal.org',
      tipo: 'ONG',
      descricao: 'Dedicada ao resgate e adoção de animais abandonados.'
    },
    {
      id: 3,
      nome: 'Amigos dos Bichos',
      imagem: '/images/parceiro3.png',
      link: 'https://www.amigosdosbichos.com',
      tipo: 'Clínica Veterinária',
      descricao: 'Cuidados veterinários de qualidade para todos os pets.'
    },
    {
      id: 4,
      nome: 'PetCare Brasil',
      imagem: '/images/parceiro4.png',
      link: 'https://www.petcarebrasil.com',
      tipo: 'Empresa',
      descricao: 'Rede de pet shops com serviços completos para seu pet.'
    },
    {
      id: 5,
      nome: 'Proteção Animal',
      imagem: '/images/parceiro5.png',
      link: 'https://www.protecaoanimal.org',
      tipo: 'ONG',
      descricao: 'Trabalhando pela proteção e bem-estar dos animais.'
    },
    {
      id: 6,
      nome: 'VetPlus',
      imagem: '/images/parceiro6.png',
      link: 'https://www.vetplus.com',
      tipo: 'Clínica Veterinária',
      descricao: 'Atendimento veterinário 24 horas para emergências.'
    }
  ];

  // Efeito para animar a entrada dos elementos
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Função para renderizar o ícone baseado no tipo de apoiador
  const renderIcon = (tipo) => {
    switch (tipo) {
      case 'ONG':
        return <FaHeart className={styles.tipoIcon} />;
      case 'Clínica Veterinária':
        return <FaHandHoldingHeart className={styles.tipoIcon} />;
      case 'Empresa':
        return <FaBuilding className={styles.tipoIcon} />;
      default:
        return <FaGlobe className={styles.tipoIcon} />;
    }
  };

  return (
    <section className={`${styles.apoiadoresContainer} ${darkMode ? styles.darkMode : ''}`}>
      <div className={styles.headerSection}>
        <h2 className={styles.titulo}>Conheça nossos apoiadores <span className={styles.emoji}>🐾</span></h2>
        <p className={styles.subtitulo}>
          Empresas e ONGs que acreditam e investem na nossa causa.
        </p>
      </div>

      <div className={`${styles.gridLogos} ${isVisible ? styles.visible : ''}`}>
        {apoiadores.map((apoio, index) => (
          <a
            key={apoio.id}
            href={apoio.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.logoCard}
            aria-label={`Visitar o site de ${apoio.nome}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={styles.logoWrapper}>
              <img
                src={apoio.imagem}
                alt={`Logo de ${apoio.nome}`}
                loading="lazy"
                className={styles.logoImage}
              />
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{apoio.nome}</h3>
              <div className={styles.cardType}>
                {renderIcon(apoio.tipo)}
                <span>{apoio.tipo}</span>
              </div>
              <p className={styles.cardDescription}>{apoio.descricao}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Apoiadores;

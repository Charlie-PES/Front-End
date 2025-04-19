/**
 * ContateNos.js
 * 
 * Componente de página de contato que exibe várias formas de entrar em contato.
 * Recursos:
 * - Exibição de informações de contato (telefone, WhatsApp, email, endereço)
 * - Suporte a modo escuro
 * - Design responsivo
 * - Elementos interativos
 * - Estados de carregamento
 * - Tratamento de erros
 */

import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import styles from './ContateNos.module.css';
import { FaEnvelope, FaPhoneAlt, FaWhatsapp, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';

const ContateNos = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });

  // Simula o carregamento das informações de contato
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Manipula mudanças nos inputs do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manipula o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ type: 'loading', message: 'Enviando mensagem...' });
    
    // Simula uma chamada de API
    setTimeout(() => {
      setFormStatus({ 
        type: 'success', 
        message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.' 
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  // Dados de informações de contato
  const contactInfo = [
    {
      icon: <FaPhoneAlt />,
      title: 'Telefone',
      value: '(11) 4002-8922',
      link: 'tel:+551140028922',
      description: 'Atendimento de segunda a sexta, das 9h às 18h'
    },
    {
      icon: <FaWhatsapp />,
      title: 'WhatsApp',
      value: '(11) 91234-5678',
      link: 'https://wa.me/5511912345678',
      description: 'Resposta rápida via WhatsApp'
    },
    {
      icon: <FaEnvelope />,
      title: 'E-mail',
      value: 'contato@adocaopets.com.br',
      link: 'mailto:contato@adocaopets.com.br',
      description: 'Envie-nos um e-mail a qualquer momento'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Endereço',
      value: 'Rua dos Pets, 123 - São Paulo/SP',
      link: 'https://maps.google.com/?q=Rua+dos+Pets,+123+-+São+Paulo/SP',
      description: 'Visite nossa sede'
    },
    {
      icon: <FaClock />,
      title: 'Horário de Funcionamento',
      value: 'Segunda a Sexta: 9h às 18h',
      link: null,
      description: 'Fechado aos finais de semana e feriados'
    }
  ];

  if (isLoading) {
    return (
      <div className={`${styles.container} ${isDarkMode ? styles.darkMode : ''}`}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Carregando informações de contato...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.container} ${isDarkMode ? styles.darkMode : ''}`}>
        <div className={styles.errorContainer}>
          <h2>Ops! Algo deu errado</h2>
          <p>{error}</p>
          <button 
            className={styles.retryButton}
            onClick={() => window.location.reload()}
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.darkMode : ''}`}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Contate Nós</h1>
          <p className={styles.subtitle}>
            Estamos aqui para te ajudar! Entre em contato por qualquer um dos canais abaixo.
          </p>
        </div>

        <div className={styles.contactGrid}>
          {contactInfo.map((item, index) => (
            <div key={index} className={styles.contactCard}>
              <div className={styles.iconContainer}>
                {item.icon}
              </div>
              <div className={styles.infoContainer}>
                <h3>{item.title}</h3>
                {item.link ? (
                  <a href={item.link} target={item.link.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer">
                    {item.value}
                  </a>
                ) : (
                  <p>{item.value}</p>
                )}
                <p className={styles.description}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.formSection}>
          <h2>Envie-nos uma mensagem</h2>
          <p>Preencha o formulário abaixo e entraremos em contato o mais breve possível.</p>
          
          {formStatus.type === 'success' ? (
            <div className={styles.successMessage}>
              <FaPaperPlane />
              <p>{formStatus.message}</p>
            </div>
          ) : (
            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Nome</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Seu nome completo"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="seu.email@exemplo.com"
                  />
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="subject">Assunto</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Assunto da sua mensagem"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="message">Mensagem</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Digite sua mensagem aqui..."
                  rows="5"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={formStatus.type === 'loading'}
              >
                {formStatus.type === 'loading' ? (
                  <>
                    <div className={styles.spinner}></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Enviar Mensagem
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContateNos;

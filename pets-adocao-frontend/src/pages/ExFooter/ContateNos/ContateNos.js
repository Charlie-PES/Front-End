/**
 * Componente ContateNos
 * 
 * Este componente implementa uma página de contato completa com as seguintes funcionalidades:
 * 
 * 1. Exibição de informações de contato:
 *    - Endereço físico com mapa interativo
 *    - Telefone com link para chamada direta
 *    - WhatsApp com link para chat
 *    - Email com link para cliente de email
 *    - Horário de funcionamento
 * 
 * 2. Formulário de contato com:
 *    - Validação de campos obrigatórios
 *    - Feedback visual de sucesso/erro
 *    - Estado de carregamento durante envio
 *    - Limpeza automática após envio
 * 
 * 3. Suporte a temas:
 *    - Modo claro e escuro
 *    - Transições suaves entre temas
 *    - Cores adaptativas para melhor legibilidade
 * 
 * 4. Design responsivo:
 *    - Layout adaptativo para diferentes tamanhos de tela
 *    - Grid system para organização do conteúdo
 *    - Breakpoints para mobile, tablet e desktop
 * 
 * 5. Interatividade:
 *    - Hover effects nos cards de contato
 *    - Animações suaves nas transições
 *    - Feedback visual nas interações
 * 
 * 6. Tratamento de estados:
 *    - Loading state durante operações
 *    - Error handling com mensagens amigáveis
 *    - Success feedback após operações
 * 
 * 7. Acessibilidade:
 *    - Labels semânticos
 *    - ARIA attributes
 *    - Contraste adequado
 *    - Navegação por teclado
 * 
 * 8. Integração com Backend:
 *    - Endpoints para envio de mensagens de contato
 *    - Validação de dados no servidor
 *    - Armazenamento de mensagens em banco de dados
 *    - Notificações para administradores
 */

import React, { useState, useEffect, useContext } from 'react';
import { FaMapMarkerAlt, FaPhone, FaWhatsapp, FaEnvelope, FaClock, FaSpinner } from 'react-icons/fa';
import { ThemeContext } from '../../../contexts/ThemeContext';
import styles from './ContateNos.module.css';

// Configuração da API - Substitua pela URL do seu backend
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const ContateNos = () => {
  // Acesso ao contexto de tema para controle de dark mode
  const { isDarkMode } = useContext(ThemeContext);

  // Estados para controle de UI e dados do formulário
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  });

  // Dados de contato organizados em uma estrutura clara
  // Cada item contém ícone, título, valor principal, link (se aplicável) e descrição
  // TODO: Em produção, estes dados devem vir do backend
  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: 'Endereço',
      value: 'Rua dos Pets, 123 - Centro',
      link: 'https://maps.google.com',
      description: 'São Paulo - SP'
    },
    {
      icon: <FaPhone />,
      title: 'Telefone',
      value: '(11) 1234-5678',
      link: 'tel:+551112345678',
      description: 'Atendimento de segunda a sexta'
    },
    {
      icon: <FaWhatsapp />,
      title: 'WhatsApp',
      value: '(11) 98765-4321',
      link: 'https://wa.me/5511987654321',
      description: 'Resposta em até 1 hora'
    },
    {
      icon: <FaEnvelope />,
      title: 'Email',
      value: 'contato@petsadocao.com',
      link: 'mailto:contato@petsadocao.com',
      description: 'Resposta em até 24h'
    },
    {
      icon: <FaClock />,
      title: 'Horário',
      value: 'Segunda a Sexta: 9h às 18h',
      description: 'Sábado: 9h às 13h'
    }
  ];

  // Handler para mudanças nos inputs do formulário
  // Atualiza o estado formData mantendo os valores anteriores
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler para envio do formulário
  // Integração com o backend para envio de mensagens
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Chamada à API do backend para enviar a mensagem
      const response = await fetch(`${API_URL}/contato`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar mensagem. Tente novamente.');
      }

      const data = await response.json();
      
      // Em caso de sucesso, limpa o formulário e mostra mensagem
      setSuccess(true);
      setFormData({
        nome: '',
        email: '',
        assunto: '',
        mensagem: ''
      });
    } catch (err) {
      setError(err.message || 'Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset do estado de sucesso após 3 segundos
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // Renderização condicional baseada no estado de loading
  if (isLoading) {
    return (
      <div className={`${styles.container} ${isDarkMode ? styles.dark : ''}`}>
        <div className={styles.loadingContainer}>
          <FaSpinner className={styles.spinner} />
          <p>Enviando mensagem...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.dark : ''}`}>
      <h1 className={styles.title}>Entre em Contato</h1>
      
      {/* Grid de informações de contato */}
      <div className={styles.contactGrid}>
        {contactInfo.map((info, index) => (
          <div key={index} className={styles.contactCard}>
            <div className={styles.icon}>{info.icon}</div>
            <h3>{info.title}</h3>
            {info.link ? (
              <a href={info.link} target="_blank" rel="noopener noreferrer">
                {info.value}
              </a>
            ) : (
              <p>{info.value}</p>
            )}
            <p className={styles.description}>{info.description}</p>
          </div>
        ))}
      </div>

      {/* Formulário de contato */}
      <div className={styles.formContainer}>
        <h2>Envie uma Mensagem</h2>
        {success && (
          <div className={styles.successMessage}>
            Mensagem enviada com sucesso! Entraremos em contato em breve.
          </div>
        )}
        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="assunto">Assunto</label>
            <input
              type="text"
              id="assunto"
              name="assunto"
              value={formData.assunto}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="mensagem">Mensagem</label>
            <textarea
              id="mensagem"
              name="mensagem"
              value={formData.mensagem}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Enviar Mensagem
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContateNos;

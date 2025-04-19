import React, { useContext, useState } from 'react';
import styles from './ServicoConsumidor.module.css';
import { FaEnvelope, FaPhone, FaClock, FaWhatsapp, FaQuestionCircle, FaPaw, FaUserEdit, FaSearch, FaArrowRight } from 'react-icons/fa';
import { ThemeContext } from '../../../contexts/ThemeContext';

/**
 * Componente ServicoConsumidor
 * 
 * Este componente exibe informações de atendimento ao consumidor, incluindo:
 * - Central de atendimento com contatos
 * - Horários de funcionamento
 * - Dúvidas frequentes com links para FAQ
 * 
 * Características:
 * - Design responsivo para diferentes tamanhos de tela
 * - Suporte a modo claro e escuro
 * - Animações e transições suaves
 * - Layout moderno com cards interativos
 */
const ServicoConsumidor = () => {
  const { darkMode } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState('contato');
  
  // Dados para as abas
  const tabs = [
    { id: 'contato', label: 'Contato', icon: <FaPhone /> },
    { id: 'horario', label: 'Horários', icon: <FaClock /> },
    { id: 'duvidas', label: 'Dúvidas', icon: <FaQuestionCircle /> }
  ];
  
  // Dados para as dúvidas frequentes
  const faqs = [
    { 
      question: 'Como adotar um pet?', 
      icon: <FaPaw />,
      link: '/faq#adocao'
    },
    { 
      question: 'Como cadastrar meu pet para adoção?', 
      icon: <FaPaw />,
      link: '/faq#cadastro'
    },
    { 
      question: 'Como editar minhas informações?', 
      icon: <FaUserEdit />,
      link: '/faq#editar'
    },
    { 
      question: 'Onde posso acompanhar a adoção?', 
      icon: <FaSearch />,
      link: '/faq#acompanhar'
    }
  ];

  return (
    <div className={`${styles.container} ${darkMode ? styles.darkMode : ''}`}>
      <h2>Serviço ao Consumidor</h2>
      
      {/* Navegação por abas */}
      <div className={styles.tabsContainer}>
        {tabs.map(tab => (
          <button 
            key={tab.id}
            className={`${styles.tabButton} ${activeTab === tab.id ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>
      
      {/* Conteúdo das abas */}
      <div className={styles.tabContent}>
        {/* Aba de Contato */}
        {activeTab === 'contato' && (
          <div className={styles.card}>
            <h3>Central de Atendimento</h3>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <div className={styles.iconWrapper}>
                  <FaPhone />
                </div>
                <div className={styles.contactDetails}>
                  <h4>Telefone</h4>
                  <p>(11) 4002-8922</p>
                </div>
              </div>
              
              <div className={styles.contactItem}>
                <div className={styles.iconWrapper}>
                  <FaWhatsapp />
                </div>
                <div className={styles.contactDetails}>
                  <h4>WhatsApp</h4>
                  <p>(11) 91234-5678</p>
                </div>
              </div>
              
              <div className={styles.contactItem}>
                <div className={styles.iconWrapper}>
                  <FaEnvelope />
                </div>
                <div className={styles.contactDetails}>
                  <h4>E-mail</h4>
                  <p>suporte@adocaopets.com.br</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Aba de Horários */}
        {activeTab === 'horario' && (
          <div className={styles.card}>
            <h3>Horário de Atendimento</h3>
            <div className={styles.scheduleInfo}>
              <div className={styles.scheduleItem}>
                <div className={styles.day}>Segunda a Sexta</div>
                <div className={styles.time}>09:00 às 18:00</div>
              </div>
              
              <div className={styles.scheduleItem}>
                <div className={styles.day}>Sábados</div>
                <div className={styles.time}>09:00 às 13:00</div>
              </div>
              
              <div className={styles.scheduleItem}>
                <div className={styles.day}>Domingos e feriados</div>
                <div className={styles.time}>Fechado</div>
              </div>
            </div>
          </div>
        )}
        
        {/* Aba de Dúvidas */}
        {activeTab === 'duvidas' && (
          <div className={styles.card}>
            <h3>Dúvidas Frequentes</h3>
            <div className={styles.faqList}>
              {faqs.map((faq, index) => (
                <a href={faq.link} key={index} className={styles.faqItem}>
                  <div className={styles.faqIcon}>{faq.icon}</div>
                  <div className={styles.faqQuestion}>{faq.question}</div>
                  <div className={styles.faqArrow}><FaArrowRight /></div>
                </a>
              ))}
            </div>
            <div className={styles.faqFooter}>
              <p>Para mais respostas, consulte nossa <a href="/faq">página de FAQ</a></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicoConsumidor;

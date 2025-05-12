import React, { useContext, useState, useRef, useEffect } from 'react';
import styles from './ChatButton.module.css';
import { ThemeContext } from '../../contexts/ThemeContext';
import { FaComments, FaTimes } from 'react-icons/fa';

const ChatButton = () => {
  const { darkMode } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [buttonStyle, setButtonStyle] = useState({});
  const [windowStyle, setWindowStyle] = useState({});
  const chatRef = useRef(null);

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
          // Ajusta a posição da janela do chat
          setWindowStyle({
            bottom: `${distanceToFooter + 100}px`
          });
        } else {
          // Se o footer não estiver visível, mantém a posição padrão
          setButtonStyle({
            bottom: '100px'
          });
          setWindowStyle({
            bottom: '180px'
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

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.chatContainer} ref={chatRef}>
      <button
        className={`${styles.chatButton} ${darkMode ? styles.darkMode : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat com Assistente Virtual"
        style={buttonStyle}
      >
        {isOpen ? <FaTimes size={20} /> : <FaComments size={20} />}
      </button>
      
      {isOpen && (
        <div 
          className={`${styles.chatWindow} ${darkMode ? styles.darkMode : ''}`}
          style={windowStyle}
        >
          <div className={styles.chatHeader}>
            <h3>Assistente Virtual</h3>
          </div>
          <div className={styles.chatMessages}>
            <div className={`${styles.message} ${styles.assistant}`}>
              <p>Olá! Como posso ajudar você hoje?</p>
            </div>
          </div>
          <div className={styles.chatInput}>
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              className={darkMode ? styles.darkMode : ''}
            />
            <button className={styles.sendButton}>
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatButton; 
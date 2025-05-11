import React, { useContext, useState, useRef, useEffect } from 'react';
import styles from './ChatButton.module.css';
import { ThemeContext } from '../../contexts/ThemeContext';
import { FaComments, FaTimes } from 'react-icons/fa';

const ChatButton = () => {
  const { darkMode } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const chatRef = useRef(null);

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
      >
        {isOpen ? <FaTimes size={20} /> : <FaComments size={20} />}
      </button>
      
      {isOpen && (
        <div className={`${styles.chatWindow} ${darkMode ? styles.darkMode : ''}`}>
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
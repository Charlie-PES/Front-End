import React, { useState } from 'react';
import { FaSearch, FaPaperPlane, FaTrash, FaUser, FaEnvelope } from 'react-icons/fa';
import styles from './MensagensManager.module.css';

const MensagensManager = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: {
        name: 'Maria Silva',
        email: 'maria@email.com',
        avatar: 'https://via.placeholder.com/40'
      },
      subject: 'Interesse em adoção',
      content: 'Olá, tenho interesse em adotar um cachorro. Poderia me enviar mais informações?',
      date: '2024-03-15T10:30:00',
      read: false,
      type: 'adoção'
    },
    {
      id: 2,
      sender: {
        name: 'João Santos',
        email: 'joao@email.com',
        avatar: 'https://via.placeholder.com/40'
      },
      subject: 'Doação de ração',
      content: 'Gostaria de doar algumas sacas de ração para a ONG. Como posso fazer isso?',
      date: '2024-03-14T15:45:00',
      read: true,
      type: 'doação'
    },
    // Adicione mais mensagens aqui
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [newMessage, setNewMessage] = useState({
    recipient: '',
    subject: '',
    content: ''
  });

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMessages = messages.filter(message =>
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.sender.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    if (!message.read) {
      setMessages(messages.map(msg =>
        msg.id === message.id ? { ...msg, read: true } : msg
      ));
    }
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    // Implementar lógica de envio de mensagem
    setNewMessage({ recipient: '', subject: '', content: '' });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={styles.mensagensManager}>
      <div className={styles.header}>
        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar mensagens..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.messagesList}>
          {filteredMessages.map(message => (
            <div
              key={message.id}
              className={`${styles.messageItem} ${!message.read ? styles.unread : ''} ${selectedMessage?.id === message.id ? styles.selected : ''}`}
              onClick={() => handleMessageClick(message)}
            >
              <div className={styles.messageHeader}>
                <div className={styles.senderInfo}>
                  <img src={message.sender.avatar} alt={message.sender.name} className={styles.avatar} />
                  <div>
                    <h4>{message.sender.name}</h4>
                    <p className={styles.subject}>{message.subject}</p>
                  </div>
                </div>
                <span className={styles.date}>{formatDate(message.date)}</span>
              </div>
              <p className={styles.preview}>{message.content.substring(0, 100)}...</p>
              <span className={`${styles.type} ${styles[message.type]}`}>
                {message.type}
              </span>
            </div>
          ))}
        </div>

        <div className={styles.messageContent}>
          {selectedMessage ? (
            <div className={styles.messageDetail}>
              <div className={styles.messageDetailHeader}>
                <div className={styles.senderInfo}>
                  <img src={selectedMessage.sender.avatar} alt={selectedMessage.sender.name} className={styles.avatar} />
                  <div>
                    <h3>{selectedMessage.sender.name}</h3>
                    <p>{selectedMessage.sender.email}</p>
                  </div>
                </div>
                <span className={styles.date}>{formatDate(selectedMessage.date)}</span>
              </div>
              <div className={styles.messageBody}>
                <h4>{selectedMessage.subject}</h4>
                <p>{selectedMessage.content}</p>
              </div>
              <div className={styles.replySection}>
                <form onSubmit={handleSendMessage}>
                  <textarea
                    placeholder="Digite sua resposta..."
                    value={newMessage.content}
                    onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                  />
                  <button type="submit" className={styles.sendButton}>
                    <FaPaperPlane />
                    Enviar
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className={styles.noMessageSelected}>
              <FaEnvelope size={48} />
              <p>Selecione uma mensagem para visualizar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MensagensManager; 
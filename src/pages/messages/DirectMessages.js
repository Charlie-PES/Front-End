import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { FaPaperPlane, FaSearch, FaEllipsisV, FaImage, FaSmile } from 'react-icons/fa';
import styles from './DirectMessages.module.css';

const DirectMessages = () => {
  const { darkMode } = useContext(ThemeContext);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Mock data for conversations
  const [conversations] = useState([
    {
      id: 1,
      user: {
        id: 2,
        name: 'Maria Silva',
        avatar: '/images/avatar1.jpg',
        online: true
      },
      lastMessage: 'Olá! Gostei muito do seu pet!',
      timestamp: '10:30',
      unread: 2
    },
    {
      id: 2,
      user: {
        id: 3,
        name: 'João Santos',
        avatar: '/images/avatar2.jpg',
        online: false
      },
      lastMessage: 'Podemos marcar uma visita?',
      timestamp: 'Ontem',
      unread: 0
    },
    {
      id: 3,
      user: {
        id: 4,
        name: 'ONG Amigos dos Pets',
        avatar: '/images/avatar3.jpg',
        online: true
      },
        lastMessage: 'Sua solicitação foi aprovada!',
        timestamp: '2 dias atrás',
        unread: 1
    }
  ]);

  // Mock data for messages
  const [messages, setMessages] = useState({
    1: [
      { id: 1, sender: 2, text: 'Olá! Gostei muito do seu pet!', timestamp: '10:30', status: 'read' },
      { id: 2, sender: 'me', text: 'Oi Maria! Que bom que gostou!', timestamp: '10:31', status: 'read' },
      { id: 3, sender: 2, text: 'Podemos conversar mais sobre ele?', timestamp: '10:32', status: 'read' }
    ],
    2: [
      { id: 1, sender: 3, text: 'Podemos marcar uma visita?', timestamp: 'Ontem', status: 'read' },
      { id: 2, sender: 'me', text: 'Claro! Qual horário seria melhor?', timestamp: 'Ontem', status: 'read' }
    ],
    3: [
      { id: 1, sender: 4, text: 'Sua solicitação foi aprovada!', timestamp: '2 dias atrás', status: 'read' },
      { id: 2, sender: 'me', text: 'Que ótimo! Obrigado!', timestamp: '2 dias atrás', status: 'read' }
    ]
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat, messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedChat) return;

    const newMessage = {
      id: Date.now(),
      sender: 'me',
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setMessages(prev => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMessage]
    }));

    setMessage('');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !selectedChat) return;

    // Here you would typically upload the file to your server
    // For now, we'll just add a mock message
    const newMessage = {
      id: Date.now(),
      sender: 'me',
      text: `Imagem enviada: ${file.name}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setMessages(prev => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMessage]
    }));
  };

  const filteredConversations = conversations.filter(conv =>
    conv.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`${styles.container} ${darkMode ? styles.darkMode : ''}`}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Mensagens</h2>
          <div className={styles.searchContainer}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Pesquisar conversas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={darkMode ? styles.darkMode : ''}
            />
          </div>
        </div>
        <div className={styles.conversationList}>
          {filteredConversations.map(conv => (
            <div
              key={conv.id}
              className={`${styles.conversationItem} ${selectedChat === conv.id ? styles.active : ''}`}
              onClick={() => setSelectedChat(conv.id)}
            >
              <div className={styles.avatarContainer}>
                <img src={conv.user.avatar} alt={conv.user.name} />
                {conv.user.online && <span className={styles.onlineIndicator} />}
              </div>
              <div className={styles.conversationInfo}>
                <div className={styles.conversationHeader}>
                  <h3>{conv.user.name}</h3>
                  <span className={styles.timestamp}>{conv.timestamp}</span>
                </div>
                <p className={styles.lastMessage}>{conv.lastMessage}</p>
              </div>
              {conv.unread > 0 && (
                <span className={styles.unreadBadge}>{conv.unread}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.chatArea}>
        {selectedChat ? (
          <>
            <div className={styles.chatHeader}>
              <div className={styles.chatUserInfo}>
                <img
                  src={conversations.find(c => c.id === selectedChat)?.user.avatar}
                  alt="User avatar"
                />
                <div>
                  <h3>{conversations.find(c => c.id === selectedChat)?.user.name}</h3>
                  <span className={styles.status}>
                    {conversations.find(c => c.id === selectedChat)?.user.online ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
              <button className={styles.menuButton}>
                <FaEllipsisV />
              </button>
            </div>

            <div className={styles.messagesContainer}>
              {messages[selectedChat]?.map(msg => (
                <div
                  key={msg.id}
                  className={`${styles.message} ${msg.sender === 'me' ? styles.sent : styles.received}`}
                >
                  {msg.sender !== 'me' && (
                    <img
                      src={conversations.find(c => c.id === selectedChat)?.user.avatar}
                      alt="User avatar"
                      className={styles.messageAvatar}
                    />
                  )}
                  <div className={styles.messageContent}>
                    <p>{msg.text}</p>
                    <span className={styles.messageTime}>{msg.timestamp}</span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form className={styles.messageInput} onSubmit={handleSendMessage}>
              <button
                type="button"
                className={styles.attachButton}
                onClick={() => fileInputRef.current?.click()}
              >
                <FaImage />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                accept="image/*"
              />
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                className={darkMode ? styles.darkMode : ''}
              />
              <button type="button" className={styles.emojiButton}>
                <FaSmile />
              </button>
              <button type="submit" className={styles.sendButton}>
                <FaPaperPlane />
              </button>
            </form>
          </>
        ) : (
          <div className={styles.noChatSelected}>
            <h2>Selecione uma conversa</h2>
            <p>Escolha uma conversa para começar a trocar mensagens</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DirectMessages; 
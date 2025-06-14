import React, { useState } from 'react';
import './DirectMessages.css';

const DirectMessages = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState('');

    // Mock data - replace with real data from your backend
    const conversations = [
        {
            id: 1,
            user: {
                name: 'João Silva',
                avatar: 'https://via.placeholder.com/50',
                online: true
            },
            lastMessage: 'Olá, gostaria de saber mais sobre o cachorro...',
            timestamp: '10:30',
            unread: 2
        },
        {
            id: 2,
            user: {
                name: 'Maria Santos',
                avatar: 'https://via.placeholder.com/50',
                online: false
            },
            lastMessage: 'Obrigada pelo contato!',
            timestamp: 'Ontem',
            unread: 0
        },
        // Add more conversations as needed
    ];

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            // Add message sending logic here
            setMessage('');
        }
    };

    return (
        <div className="dm-container">
            <div className="dm-sidebar">
                <div className="dm-header">
                    <h2>Mensagens</h2>
                </div>
                <div className="conversations-list">
                    {conversations.map((chat) => (
                        <div
                            key={chat.id}
                            className={`conversation-item ${selectedChat?.id === chat.id ? 'active' : ''}`}
                            onClick={() => setSelectedChat(chat)}
                        >
                            <div className="avatar-container">
                                <img src={chat.user.avatar} alt={chat.user.name} />
                                {chat.user.online && <span className="online-indicator"></span>}
                            </div>
                            <div className="conversation-info">
                                <div className="conversation-header">
                                    <h3>{chat.user.name}</h3>
                                    <span className="timestamp">{chat.timestamp}</span>
                                </div>
                                <p className="last-message">{chat.lastMessage}</p>
                            </div>
                            {chat.unread > 0 && (
                                <div className="unread-badge">{chat.unread}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="dm-chat">
                {selectedChat ? (
                    <>
                        <div className="chat-header">
                            <div className="chat-user-info">
                                <img src={selectedChat.user.avatar} alt={selectedChat.user.name} />
                                <h3>{selectedChat.user.name}</h3>
                                {selectedChat.user.online && <span className="online-status">Online</span>}
                            </div>
                        </div>

                        <div className="messages-container">
                            {/* Add your messages here */}
                            <div className="message-date">Hoje</div>
                            <div className="message received">
                                <p>Olá! Como posso ajudar?</p>
                                <span className="message-time">10:30</span>
                            </div>
                            <div className="message sent">
                                <p>Gostaria de saber mais sobre o processo de adoção</p>
                                <span className="message-time">10:31</span>
                            </div>
                        </div>

                        <form className="message-input-container" onSubmit={handleSendMessage}>
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Digite sua mensagem..."
                            />
                            <button type="submit">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                                </svg>
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="no-chat-selected">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
                        </svg>
                        <h3>Selecione uma conversa</h3>
                        <p>Escolha uma conversa para começar a trocar mensagens</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DirectMessages; 
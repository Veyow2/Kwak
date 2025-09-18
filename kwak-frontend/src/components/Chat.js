import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Chat = ({ user, socket, onLogout }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Réinitialiser l'état
    setMessages([]);
    setConnectedUsers([]);
    setLoading(true);

    // Authentification Socket
    const token = localStorage.getItem('token');
    if (token) {
      socket.emit('authenticate', token);
    }

    // Charger les messages existants
    loadMessages();

    // Écouter les événements Socket
    socket.on('newMessage', (message) => {
      setMessages(prev => [...prev, message]);
    });

    socket.on('userJoined', (data) => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        content: data.message,
        user: { username: 'Système' },
        createdAt: new Date().toISOString(),
        isSystem: true
      }]);
    });

    socket.on('userLeft', (data) => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        content: data.message,
        user: { username: 'Système' },
        createdAt: new Date().toISOString(),
        isSystem: true
      }]);
    });

    socket.on('connectedUsers', (users) => {
      setConnectedUsers(users);
    });

    socket.on('authError', (error) => {
      console.error('Erreur d\'authentification:', error);
      onLogout();
    });

    return () => {
      socket.off('newMessage');
      socket.off('userJoined');
      socket.off('userLeft');
      socket.off('connectedUsers');
      socket.off('authError');
    };
  }, [user, socket, onLogout]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Aucun token trouvé');
        setLoading(false);
        return;
      }
      
      const response = await axios.get('/api/messages', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(response.data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des messages:', error);
      if (error.response?.status === 401) {
        onLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && socket) {
      socket.emit('sendMessage', { content: newMessage.trim() });
      setNewMessage('');
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getInitials = (username) => {
    return username.charAt(0).toUpperCase();
  };

  if (loading) {
    return (
      <div className="chat-container">
        <div className="chat-main">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh',
            fontSize: '1.2rem',
            color: '#8b5cf6'
          }}>
            Chargement des messages...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <div className="sidebar-section">
          <h3 className="sidebar-title">Utilisateurs connectés</h3>
          <div className="connected-users">
            {connectedUsers.map((user, index) => (
              <div key={index} className="user-item">
                <div className="user-status"></div>
                <span>{user.username}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="chat-main">
        <div className="chat-header">
          <h1 className="chat-title">Kwak Chat</h1>
          <div className="user-info">
            <div className="user-avatar">
              {getInitials(user.username)}
            </div>
            <span>{user.username}</span>
            <button onClick={onLogout} className="logout-btn">
              Déconnexion
            </button>
          </div>
        </div>

        <div className="messages-container">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${
                message.user.id === user.id ? 'message-own' : 'message-other'
              }`}
            >
              <div className="message-info">
                <span className="message-username">
                  {message.user.username}
                </span>
                <span className="message-time">
                  {formatTime(message.createdAt)}
                </span>
              </div>
              <div 
                className={`message-bubble ${
                  message.isSystem ? 'system-message' : ''
                }`}
                style={{
                  background: message.isSystem ? '#f3f4f6' : undefined,
                  color: message.isSystem ? '#6b7280' : undefined,
                  fontStyle: message.isSystem ? 'italic' : undefined,
                  textAlign: 'center'
                }}
              >
                {message.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="message-input-container">
          <form onSubmit={handleSendMessage} className="message-input-form">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="message-input"
              placeholder="Tapez votre message..."
              rows="1"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
            />
            <button
              type="submit"
              className="send-btn"
              disabled={!newMessage.trim()}
            >
              ➤
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;

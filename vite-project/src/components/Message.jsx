import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import styles from '../css/Message.module.css';

const Message = () => {
  const [allMessages, setAllMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { id } = useParams();
  const location = useLocation();
  const {recipient_id, currentUserId} = location.state;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/messages/${id}`);
        setAllMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [id]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      const response = await axios.post('http://localhost:3001/api/messages', {
        content: newMessage,
        sender_id: currentUserId,
        conversation_id: id,
        recipient_id: recipient_id
      });

      setAllMessages([...allMessages, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <div className={styles.container}>
        <button onClick={goBack} className={styles.backButton}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <ul>
          {allMessages.map(message => (
            <li
              key={message.message_id}
              className={message.sender_id == currentUserId ? styles.sentMessage : styles.receivedMessage}
            >
              <p>{message.content}</p>
              <p className={styles.date}>{new Date(message.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Typing..."
            className={styles.inputTyping}
          />
          <button onClick={handleSendMessage} className={styles.sendButton}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Message;

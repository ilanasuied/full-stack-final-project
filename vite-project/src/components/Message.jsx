import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../css/Message.module.css';

const Message = () => {
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/messages/1');
        
        // Fusionner les messages envoyés et reçus
        const mergedMessages = [...response.data.sentMessages, ...response.data.receivedMessages];
        
        // Trier les messages fusionnés par ordre croissant de created_at
        const sortedMessages = mergedMessages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        
        setAllMessages(sortedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className={styles.container}>
      <ul>
        {allMessages.map(message => (
          <li 
            key={message.message_id} 
            className={message.sender_username ? styles.receivedMessage : styles.sentMessage}
          >
            <p>{message.content}</p>
            <p>{new Date(message.created_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Message;

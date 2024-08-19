import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../css/MessagePage.module.css';


function MessagePage() {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/messages');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const userHandle = (conversation_id, user_id) => {
    navigate(`/messages/${conversation_id}`, { state: user_id});
  }


  return (
    <div>
      <h1>Users Who Started a Conversation</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index} onClick={() => userHandle(message.conversation_id, message.user_id)} className={styles.liCont}>{message.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default MessagePage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import styles from '../css/Message.module.css';

const Message = () => {
  const [allMessages, setAllMessages] = useState([]);
  const { id } = useParams();
  const currentUser = 1;
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/messages/${id}`);
        setAllMessages(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

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
              className={message.sender_id != currentUser ? styles.sentMessage : styles.receivedMessage}
            >
              <p>{message.content}</p>
              <p className={styles.date}>{new Date(message.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Typing..."
            className={styles.inputTyping}
          />
          <button className={styles.sendButton}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Message;

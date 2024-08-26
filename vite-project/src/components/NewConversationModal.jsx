import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import styles from '../css/NewConversationModal.module.css';

const NewConversationModal = ({ isOpen, onRequestClose, onStartConversation }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const {id} = useParams();

  const handleStartConversation = async () => {
    if (username.trim() === '') return;

    try {
      const response = await axios.get(`http://localhost:3001/api/users/username/${username}`);
      if (!response.data) {

        // Trigger reflow to restart the animation
        const inputField = document.querySelector(`.${styles.inputField}`);
        inputField.classList.remove(styles.shake);

        setTimeout(() => {
          inputField.classList.add(styles.shake);
      }, 100);

      } else {
        const recipient_id = response.data.user_id;
        const currentUserId = id;
        console.log(`the recipientId is ${recipient_id} and the currentUser is ${id}`);

        // navigate(`/messages/${conversation_id}`, { state: {recipient_id, currentUserId} });
        onRequestClose();
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }

    setUsername('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="New Conversation"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h2>New Conversation With:</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={styles.inputField}
      />
      <button onClick={handleStartConversation} className={styles.startButton}>
        Start
      </button>
      <button onClick={onRequestClose} className={styles.closeButton}>
        Close
      </button>
    </Modal>
  );
};

export default NewConversationModal;

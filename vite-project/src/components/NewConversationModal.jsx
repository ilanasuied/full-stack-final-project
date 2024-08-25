import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from '../css/NewConversationModal.module.css';

const NewConversationModal = ({ isOpen, onRequestClose, onStartConversation }) => {
  const [username, setUsername] = useState('');

  const handleStartConversation = () => {
    if (username.trim() === '') return;
    onStartConversation(username);
    setUsername('');
    onRequestClose();
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

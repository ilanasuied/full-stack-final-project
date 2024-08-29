import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import styles from '../css/NewConversationModal.module.css';

const NewConversationModal = ({ isOpen, onRequestClose }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const {id} = useParams();

  const handleStartConversation = async () => {
    if (username.trim() === '') return;

    try {
      const response = await axios.get(`http://localhost:3001/api/users/username/${username}`);
      
      //check if this username exist
      if (!response.data) {

        // Trigger reflow to restart the animation
        const inputField = document.querySelector(`.${styles.inputField}`);
        inputField.classList.remove(styles.shake);

        setTimeout(() => {
          inputField.classList.add(styles.shake);
      }, 100);

      } 

      //check if a conversation has already been started with this user
      else {
        onRequestClose();

        const recipient_id = response.data.user_id;
        const currentUserId = id;

        const responseConversationId = await axios.get(`http://localhost:3001/api/message/conversation/${currentUserId}/${recipient_id}`);
        const conversationId = responseConversationId.data[0];
        
        //if a conversation has already been started, just go to the coversation
        if(conversationId){
          navigate(`/messages/${conversationId.conversation_id}`, { state: {recipient_id, currentUserId} });
        }
        
        //else, create a new conversation
        else{
          const responseCreateConversation = await axios.post('http://localhost:3001/api/conversation',{recipient_id});
          responseCreateConversation.data.user_id = recipient_id;

          const newdata = responseCreateConversation.data;
          const databefore = JSON.parse(localStorage.getItem('conversationsList'));
          localStorage.setItem('conversationsList', JSON.stringify([newdata, ...databefore]));
          navigate(`/messages/${responseCreateConversation.data.conversation_id}`, { state: {recipient_id, currentUserId} });
        }
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

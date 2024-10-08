import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from '../css/MessagePage.module.css';
import NewConversationModal from '../components/NewConversationModal';

function MessagePage() {
  const [messages, setMessages] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (localStorage.getItem('conversationsList') === null) {
          const response = await axios.get(`http://localhost:3001/api/messages/all/${id}`);
          setMessages(response.data);
          localStorage.setItem('conversationsList', JSON.stringify(response.data));
        } else {
          setMessages(JSON.parse(localStorage.getItem('conversationsList')));
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }

    };

    fetchMessages();
  }, []);

  const userHandle = (conversation_id, recipient_id, currentUserId) => {
    navigate(`/messages/${conversation_id}`, { state: { recipient_id, currentUserId } });
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };


  return (
    <div>
      <div className={styles.messageIconContainer}>
        <FontAwesomeIcon icon={faComments} className={styles.messageIcon} />
      </div>
      <ul className={styles.ulMessagePage}>
        {messages.map((message, index) => (
          <li key={index} onClick={() => userHandle(message.conversation_id, message.user_id, id)} className={styles.liCont}>
            {message.username}
          </li>
        ))}
      </ul>
      <div onClick={openModal} className={styles.messageIconContainer}>
        <FontAwesomeIcon icon={faPlus} className={styles.messageIcon} />
      </div>

      <NewConversationModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      />
    </div>
  );
}

export default MessagePage;

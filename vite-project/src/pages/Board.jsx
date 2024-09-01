import React, { useState, useEffect } from 'react';
import MessagePage from './MessagePage';
import PostPage from './PostPage';
import NavbarFirst from '../components/NavbarFirst';
import styles from '../css/Board.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

function Board() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [currentPage, setCurrentPage] = useState('post');

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 900);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const togglePage = () => {
    setCurrentPage((prevPage) => (prevPage === 'post' ? 'message' : 'post'));
  };

  return (
    <div>
      <NavbarFirst />
      <div className={styles.container}>
      {isSmallScreen && (
        <div className={styles.toggleButton}>
          <button onClick={togglePage}>
            <FontAwesomeIcon icon={faExchangeAlt} />
          </button>
        </div>
      )}
        {!isSmallScreen && (
          <>
            <div className={styles.sidebar}>
              <MessagePage />
            </div>
            <div className={styles.content}>
              <h1>Board</h1>
              <PostPage />
            </div>
          </>
        )}
        {isSmallScreen && (
          <div className={styles.singleContent}>
            {currentPage === 'post' && <PostPage />}
            {currentPage === 'message' && <MessagePage />}
          </div>
        )}
      </div>
    </div>
  );
}

export default Board;

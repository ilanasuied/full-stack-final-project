import React from 'react';
import MessagePage from './MessagePage';
import PostPage from './PostPage';
import styles from '../css/Board.module.css';

function Board() {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <MessagePage />
      </div>
      <div className={styles.content}>
        <h1>Tableau de bord principal</h1>
        <PostPage />
      </div>
    </div>
  );
}

export default Board;

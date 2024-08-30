import React from 'react';
import MessagePage from './MessagePage';
import PostPage from './PostPage';
import NavbarFirst from '../components/NavbarFirst';
import styles from '../css/Board.module.css';



function Board() {
  return (
    <div>
    <NavbarFirst />
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <MessagePage />
      </div>
      <div className={styles.content}>
        <h1>Board</h1>
        <PostPage />
      </div>
    </div>
    </div>
  );
}

export default Board;

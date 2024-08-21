import React from 'react';
import MessagePage from './MessagePage';
import styles from '../css/Board.module.css';

function Board() {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <MessagePage />
      </div>
      <div className={styles.content}>
        <h1>Tableau de bord principal</h1>
        <p>Bienvenue sur votre tableau de bord. Sélectionnez un utilisateur à partir de la liste pour voir les messages.</p>
      </div>
    </div>
  );
}

export default Board;

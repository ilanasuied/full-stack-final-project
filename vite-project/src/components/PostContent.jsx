import React from 'react';
import styles from '../css/PostContent.module.css';

const PostContent = ({ content }) => {
  // Fonction pour vérifier si le contenu est une URL
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <div className={styles.contentContainer}>
      {isValidUrl(content) ? (
        <img src={content} alt="Post content" className={styles.contentImage}/>
      ) : (
        <p className={styles.contentText}>{content}</p>
      )}
    </div>
  );
};

export default PostContent;

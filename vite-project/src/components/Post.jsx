import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import PostContent from './PostContent';
import styles from '../css/Post.module.css';

const Post = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className={styles.post}>
      <p className={styles.author}>{post.author}</p>
      <div className={styles.postContent}>
        <h2>{post.title}</h2>
        <PostContent content={post.content} />
      </div>
      
      {showComments && (
        <ul className={styles.comments}>
          {post.comments.map((comment, index) => (
            <li key={index} className={styles.comment}>
              <b>{comment.commenter}</b>: {comment.content} 
            </li>
          ))}
        </ul>
      )}
      <div className={styles.likes}>
        ❤️ {post.likes.length}
      </div>
      <div className={styles.actions}>
        <FontAwesomeIcon 
          icon={faThumbsUp} 
          className={`${styles.icon} ${isLiked ? styles.liked : ''}`} 
          onClick={handleLike} 
        />
        <FontAwesomeIcon icon={faCommentAlt} className={styles.icon} onClick={toggleComments} />
      </div>
    </div>
  );
}

export default Post;

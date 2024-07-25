import React, { useState } from 'react';
import styles from './Post.module.css';

const Post = ({ post }) => {
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className={styles.post}>
      <h2>{post.title}</h2>
      <p className={styles.author}>Author: {post.author}</p>
      <p>{post.content}</p>
      <button onClick={toggleComments}>
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </button>
      {showComments && (
        <ul className={styles.comments}>
          {post.comments.map((comment, index) => (
            <li key={index} className={styles.comment}>
              {comment.content} by {comment.commenter}
            </li>
          ))}
        </ul>
      )}
      <div className={styles.likes}>
        ❤️ {post.likes.length}
      </div>
    </div>
  );
}

export default Post;

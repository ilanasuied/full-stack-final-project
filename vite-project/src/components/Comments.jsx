import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from '../css/Comments.module.css';

const Comments = ({ initialComments, createComment }) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');

  

  const handleCreateComment = async () => {
    try {
      const newCommentData = await createComment(newComment);
      setComments(newCommentData);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div>
        <ul className={styles.comments}>
          {comments.map((comment, index) => (
            <li key={index} className={styles.comment}>
              <b>{comment.commenter}:</b> {comment.content}
            </li>
          ))}
          <li>
            <input
              type="text"
              placeholder=" new comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className={styles.newCommentInput}
            />
            <button onClick={handleCreateComment} className={styles.createCommentButton}>
              Send
            </button>
          </li>
        </ul>
    </div>
  );
};

export default Comments;

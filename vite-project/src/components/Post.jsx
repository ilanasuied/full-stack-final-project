import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import PostContent from './PostContent';
import styles from '../css/Post.module.css';

const Post = ({ post, alreadyLiked }) => {
  const { id } = useParams();
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(alreadyLiked);
  const [likeCount, setLikeCount] = useState(post.likes.length);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleLike = async() => {
    try {
      if (isLiked) {
        setLikeCount(likeCount - 1);
        //delete the like from the db
        const response = await axios.delete(`http://localhost:3001/api/like/${id}/${post.post_id}`);
  
      } else {
        setLikeCount(likeCount + 1);
        //add the like to the db
        const response = await axios.post('http://localhost:3001/api/like',
          {
            user_id: id,
            post_id: post.post_id,
            comment_id: 'NULL'
          }
        );
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error(error);
    }
    
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
              <b>{comment.commenter}:</b> {comment.content}
            </li>
          ))}
        </ul>
      )}
      <div className={styles.likes}>
        ❤️ {likeCount}
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

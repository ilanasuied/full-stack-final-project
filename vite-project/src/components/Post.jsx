import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faTrash } from '@fortawesome/free-solid-svg-icons';
import PostContent from './PostContent';
import Comments from './Comments';  // Import du nouveau composant
import styles from '../css/Post.module.css';

const Post = ({ post, alreadyLiked }) => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(alreadyLiked);
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments);


  const handleLike = async () => {
    try {
      if (isLiked) {
        setLikeCount(likeCount - 1);
        await axios.delete(`http://localhost:3001/api/like/${id}/${post.post_id}`);
      } else {
        setLikeCount(likeCount + 1);
        await axios.post('http://localhost:3001/api/like', {
          user_id: id,
          post_id: post.post_id,
          comment_id: 'NULL'
        });
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error(error);
    }
  };


  const toggleComments = () => {
    setShowComments(!showComments);
  };


  //function to create a new comment
  const createComment = async(newComment) => {
    try {
      if (newComment.trim() === '') {
        return;
      }

      const response = await axios.post('http://localhost:3001/api/comment', {
        user_id: id,
        post_id: post.post_id,
        content: newComment
      });

      setComments(response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };


  // function to delete a comment
  const  deleteComment  = async(commentToDelete) => {
    try {
      
      await axios.delete(`http://localhost:3001/api/comment/${commentToDelete}`);
      setComments(comments.filter(comment => comment.comment_id !== commentToDelete));
      return (comments.filter(comment => comment.comment_id !== commentToDelete));
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  return (
    <div className={styles.post}>
      <p className={styles.author}>{post.author}</p>
      <div className={styles.postContent}>
        <h2>{post.title}</h2>
        <PostContent content={post.content} />
      </div>

      <div className={styles.likes}>
        ❤️ {likeCount}
      </div>
      <div className={styles.actions}>
        <FontAwesomeIcon
          icon={faThumbsUp}
          className={`${styles.icon} ${isLiked ? styles.liked : ''}`}
          onClick={handleLike}
        />
        <FontAwesomeIcon icon={faComment} className={styles.icon} onClick={toggleComments} />
        <FontAwesomeIcon icon={faTrash}/>

      </div>
      {showComments && <Comments initialComments={comments} createComment={createComment} deleteComment={deleteComment} currentUserId={id}/>}
    </div>
  );
}

export default Post;

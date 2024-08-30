import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faTrash } from '@fortawesome/free-solid-svg-icons';
import PostContent from './PostContent';
import Comments from './Comments';  // Import du nouveau composant
import styles from '../css/Post.module.css';

const Post = ({ post, alreadyLiked, deletePost, DELETE_AUTHORIZATION }) => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(alreadyLiked);
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments);


  //function to delete a post from the database
  const handleDeletePost = async () => {
    deletePost(post.post_id);
  };


  //add and delete likes from posts
  const handleLike = async () => {
    try {
      if (isLiked) {
        setLikeCount(likeCount - 1);
        await axios.delete(`http://localhost:3001/api/like/${id}/${post.post_id}`);

        //update the data in the localStorage
        //update in all post
        if (localStorage.getItem('allPostsData') != null) {
          const data = JSON.parse(localStorage.getItem('allPostsData'));
          const postIndex = data.find(p => p.post_id === post.post_id);
          if (postIndex) {
            postIndex.likes = postIndex.likes.filter(l => l !== parseInt(id));
          }
          localStorage.setItem('allPostsData', JSON.stringify(data));
        }

        //update in my post
        if (localStorage.getItem('userPostsData') != null) {
          const data = JSON.parse(localStorage.getItem('userPostsData'));
          const postIndex = data.find(p => p.post_id === post.post_id);
          if (postIndex) {
            postIndex.likes = postIndex.likes.filter(l => l !== parseInt(id));
          }
          localStorage.setItem('userPostsData', JSON.stringify(data));
        }
      } else {
        setLikeCount(likeCount + 1);
        await axios.post('http://localhost:3001/api/like', {
          user_id: id,
          post_id: post.post_id,
          comment_id: 'NULL'
        });

        //update the data in the localStorage
        if (localStorage.getItem('allPostsData') != null) {
          const data = JSON.parse(localStorage.getItem('allPostsData'));
          const postIndex = data.find(p => p.post_id === post.post_id);
          if (postIndex) {
            postIndex.likes.push(parseInt(id));
          }
          localStorage.setItem('allPostsData', JSON.stringify(data));
        }

        //update in my post
        if (localStorage.getItem('userPostsData') != null) {
          const data = JSON.parse(localStorage.getItem('userPostsData'));
          const postIndex = data.find(p => p.post_id === post.post_id);
          if (postIndex) {
            postIndex.likes.push(parseInt(id));
          }
          localStorage.setItem('userPostsData', JSON.stringify(data));
        }
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
  const createComment = async (newComment) => {
    try {
      if (newComment.trim() === '') {
        return;
      }

      const response = await axios.post('http://localhost:3001/api/comment', {
        user_id: id,
        post_id: post.post_id,
        content: newComment
      });

      setComments([...comments, response.data[0]]);

      //update the data in the localStorage
      if (localStorage.getItem('allPostsData') != null) {
        const data = JSON.parse(localStorage.getItem('allPostsData'));
        const postIndex = data.find(p => p.post_id === post.post_id);
        if (postIndex) {
          postIndex.comments.push(response.data[0]);
        }
        localStorage.setItem('allPostsData', JSON.stringify(data));
      }

      //update the data in the localStorage
      if (localStorage.getItem('userPostsData') != null) {
        const data = JSON.parse(localStorage.getItem('userPostsData'));
        const postIndex = data.find(p => p.post_id === post.post_id);
        if (postIndex) {
          postIndex.comments.push(response.data[0]);
        }
        localStorage.setItem('userPostsData', JSON.stringify(data));
      }

      return [...comments, response.data[0]];
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };


  // function to delete a comment
  const deleteComment = async (commentToDelete) => {
    try {

      await axios.delete(`http://localhost:3001/api/comment/${commentToDelete}`);
      setComments(comments.filter(comment => comment.comment_id !== commentToDelete));

      //update the data in the localStorage
      if (localStorage.getItem('allPostsData') != null) {
        const data = JSON.parse(localStorage.getItem('allPostsData'));
        const postIndex = data.find(p => p.post_id === post.post_id);
        if (postIndex) {
          postIndex.comments = postIndex.comments.filter(c => c.comment_id !== commentToDelete);
        }
        localStorage.setItem('allPostsData', JSON.stringify(data));
      }


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
        {DELETE_AUTHORIZATION && <FontAwesomeIcon icon={faTrash} onClick={handleDeletePost} />}

      </div>
      {showComments && <Comments initialComments={comments} createComment={createComment} deleteComment={deleteComment} currentUserId={id} DELETE_AUTHORIZATION={DELETE_AUTHORIZATION} />}
    </div>
  );
}

export default Post;

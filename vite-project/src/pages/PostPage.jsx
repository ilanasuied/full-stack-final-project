import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import Post from '../components/Post';
import Navbar from '../components/Navbar';
import styles from '../css/PostPage.module.css';
function PostsPage() {
  const { id } = useParams();
  const [userPosts, setUserPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [allPostsFlag, setAllPostsFlag] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (allPostsFlag) {
          if (allPosts.length == 0) {
            const response = await axios.get('http://localhost:3001/api/posts');
            setAllPosts(response.data);
          }
        }
        else {
          if (userPosts.length == 0) {
            const response = await axios.get(`http://localhost:3001/api/posts/${id}`);
            setUserPosts(response.data);
          }
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [allPostsFlag]);


  //this function change the flag allPosts everytime the user change the tab
  const onAllPosts = () => {
    setAllPostsFlag(!allPostsFlag);
  };


  const handleCreatePost = async () => {
    try {
      if (newPostContent.trim() === '' || newPostTitle.trim() === '') {
        alert("The title and the content cannot be empty");
        return;
      }

      const response = await axios.post('http://localhost:3001/api/posts', {
        user_id: id,
        title: newPostTitle,
        content: newPostContent
      });



      setAllPosts([response.data, ...allPosts]);
      setUserPosts([response.data, ...userPosts]);


      setNewPostContent('');
    } catch (error) {
      console.error('Error creating post :', error);
    }
  };


  const handleShowCreatePost = () => {
    setShowCreatePost(!showCreatePost);
  };



  return (
    <div>
      <Navbar onChangeTab={onAllPosts} />

      <div className={styles.addPostContainer}>
        <FontAwesomeIcon
          icon={showCreatePost ? faXmark : faPlus}
          className={styles.addPostIcon}
          onClick={handleShowCreatePost}
        />
      </div>

      {showCreatePost && (
        <div className={styles.createPostForm}>
          <input
            type="text"
            placeholder="Title..."
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            className={styles.newPostInput}
          />
          <input
            type="text"
            placeholder=" new post or url..."
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            className={styles.newPostInput}
          />
          <button onClick={handleCreatePost} className={styles.createPostButton}>
            Post
          </button>
        </div>
      )}

      <div className={styles.container}>
        {allPostsFlag ?
          allPosts.map(post => (
            <Post key={post.post_id} post={post} alreadyLiked={post.likes.length === 0 ? false : post.likes.includes(parseInt(id, 10))} />
          ))
          :
          userPosts.map(post => (
            <Post key={post.post_id} post={post} alreadyLiked={post.likes.length === 0 ? false : post.likes.includes(parseInt(id, 10))} />
          ))}
      </div>
    </div>
  );

}

export default PostsPage;


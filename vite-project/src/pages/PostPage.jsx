import React, { useEffect, useState } from 'react';
import { json, useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark, faRefresh } from '@fortawesome/free-solid-svg-icons';
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
  const [allowed_fetching, setAllowed_fetching] = useState(false);
  const [page, setPage] = useState(localStorage.getItem('currentPage')=== null ? 1: JSON.parse(localStorage.getItem('currentPage')));
  const limit = 3;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (allPostsFlag) {
          if (allowed_fetching || (localStorage.getItem('allPostsData') === null)) {
            const response = await axios.get('http://localhost:3001/api/posts', {
              params: {
                page,
                limit
              }
            });
            setAllPosts(prevPosts => [...prevPosts, ...response.data]);
            localStorage.setItem('allPostsData', JSON.stringify([...allPosts, ...response.data]));
          } else {
            setAllPosts(JSON.parse(localStorage.getItem('allPostsData')));
          }
        }
        else {
          if (localStorage.getItem('userPostsData') === null) {
            const response = await axios.get(`http://localhost:3001/api/posts/${id}`);
            setUserPosts(response.data);
            localStorage.setItem('userPostsData', JSON.stringify(response.data));
          } else {
            setUserPosts(JSON.parse(localStorage.getItem('userPostsData')));
          }
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [allPostsFlag, page]);


  //this function change the flag allPosts everytime the user change the tab
  const onAllPosts = () => {
    setAllPostsFlag(!allPostsFlag);
  };


  const incrementPage = () => {
    setPage(prevPage => prevPage + 1);
    localStorage.setItem('currentPage', JSON.stringify(page + 1));
    setAllowed_fetching(prevAllowed => true);
  };


  //function to create a new post
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


      //update the data in the localSorage
      if (localStorage.getItem('userPostsData') != null) {
        localStorage.setItem('userPostsData', JSON.stringify([response.data, ...userPosts]))
      }
      if (localStorage.getItem('allPostsData') != null) {
        localStorage.setItem('allPostsData', JSON.stringify([response.data, ...allPosts]))
      }
      setNewPostContent('');
      setNewPostTitle('');
      handleShowCreatePost();
    } catch (error) {
      console.error('Error creating post :', error);
    }
  };


  const handleShowCreatePost = () => {
    setShowCreatePost(!showCreatePost);
  };


  // function to delete a post
  const deletePost = async (postIdToDel) => {
    try {
      console.log(postIdToDel);
      await axios.delete(`http://localhost:3001/api/posts/${postIdToDel}`);

      setUserPosts(userPosts.filter(post => post.post_id !== postIdToDel));
      setAllPosts(allPosts.filter(post => post.post_id !== postIdToDel));


      //update the data in the localStorage 
      if (localStorage.getItem('userPostsData') != null) {
        localStorage.setItem('userPostsData', JSON.stringify(userPosts.filter(post => post.post_id !== postIdToDel)));
      }
      if (localStorage.getItem('allPostsData') != null) {
        localStorage.setItem('allPostsData', JSON.stringify(allPosts.filter(post => post.post_id !== postIdToDel)));
      }

    } catch (error) {
      console.error('Error deletting post:', error);
    }
  };


  const userData = JSON.parse(localStorage.getItem('user'));
  const ADMIN_ACCESS = userData.role === "Admin";
  const currentUserUsername = userData.username;

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
          allPosts.map((post, index) => (
            <Post key={index} post={post} alreadyLiked={post.likes.length === 0 ? false : post.likes.includes(parseInt(id, 10))} deletePost={deletePost} DELETE_AUTHORIZATION={post.author === currentUserUsername || ADMIN_ACCESS} />
          ))
          :
          userPosts.map(post => (
            <Post key={post.post_id} post={post} alreadyLiked={post.likes.length === 0 ? false : post.likes.includes(parseInt(id, 10))} deletePost={deletePost} DELETE_AUTHORIZATION={post.author === currentUserUsername || ADMIN_ACCESS} />
          ))}
        {allPostsFlag && <FontAwesomeIcon icon={faRefresh} onClick={incrementPage} />}
      </div>
    </div>
  );

}

export default PostsPage;


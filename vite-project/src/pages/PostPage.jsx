import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Post from '../components/Post';
import Navbar from '../components/Navbar';
import styles from '../css/PostPage.module.css';
function PostsPage() {
  const { id } = useParams();
  const [userPosts, setUserPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [allPostsFlag, setAllPostsFlag] = useState(false);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if(allPostsFlag)
        {
          if(allPosts.length == 0)
          {
            const response = await axios.get('http://localhost:3001/api/posts');
            setAllPosts(response.data);
          }
        }
        else{
          if(userPosts.length == 0){
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
  const onAllPosts = () =>{
    setAllPostsFlag(!allPostsFlag);
    console.log(allPostsFlag);
  };


  return (
    <div>
      <Navbar onChangeTab={onAllPosts}/>
      <div className={styles.container}>
        {allPostsFlag ? 
        allPosts.map(post => (
          <Post key={post.post_id} post={post} /> 
        ))
        : 
        userPosts.map(post => (
          <Post key={post.post_id} post={post} /> 
        ))}
        
      </div>
    </div>
  );
}

export default PostsPage;


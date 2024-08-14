import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from '../components/Post';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <ul>
        {posts.map(post => (
          <Post key={post.post_id} post={post} />
        ))}
      </ul>
    </div>
  );
}

export default App;

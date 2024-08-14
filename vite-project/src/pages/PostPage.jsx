import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../components/Post';

function PostsPage() {
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
      <h1>All Posts</h1>
      <ul>
        {posts.map(post => (
          <Post key={post.post_id} post={post} />
        ))}
      </ul>
    </div>
  );
}

export default PostsPage;


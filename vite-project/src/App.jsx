import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './components/Post';

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    

    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchUsers();
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.username}>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Bio: {user.bio}</p>
            {/* <p>Profile Pic: <img src={user.profile_pic} alt={user.username} /></p> */}
          </li>
        ))}
      </ul>

      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <Post key={post.post_id} post={post} />
        ))}
      </ul>
    </div>
  );
}

export default App;

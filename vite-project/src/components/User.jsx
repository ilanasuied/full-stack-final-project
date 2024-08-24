import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import Userstyles from '../css/Users.module.css';
import { useParams } from 'react-router-dom';

const User = () => {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    const { id } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
          try {
            // Correction de l'URL pour cibler les utilisateurs
            const response = await axios.get(`http://localhost:3001/api/users/${id}`);
            setUser(response.data);
          } catch (error) {
            console.error('Error fetching user:', error);
            setMessage('Failed to fetch user data.');
          }
        };
    
        fetchUser();
      }, [id]);

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.delete(`http://localhost:3001/api/users/${id}`);

            if (response.status === 204) {
                setMessage('User deleted successfully!');
            }
            
        } catch (error) {
            setMessage('Failed to delete user.');
            console.error('Failed to delete user:', error);
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className={Userstyles.user}>
            <p className={Userstyles.author}>{user.username}</p>
            <div className={Userstyles.userContent}>
                <p>id : {user.user_id}</p>
                <p>Email : {user.email}</p>
            </div>
            <div className={Userstyles.deleteUser}>
                <button type="button" onClick={handleDelete} className={Userstyles.deleteUserBtn}>Delete</button>
            </div>
            <p>{message}</p>
        </div>
    );
};

export default User;

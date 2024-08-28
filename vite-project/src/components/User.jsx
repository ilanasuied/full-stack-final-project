import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import Userstyles from '../css/Users.module.css';
import { useParams } from 'react-router-dom';
import defaultProfilePic from '../image/default_image.png'

const User = () => {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    const { id } = useParams();
    const userRole = localStorage.getItem('role');

    useEffect(() => {
        const fetchUser = async () => {
            try {
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
        return <div className={Userstyles.loading}>Loading...</div>;
    }

    return (
        <div className={Userstyles.user}>
            <div className={Userstyles.profile}>
                <img
                    src={user.profile_picture || defaultProfilePic}  // Utilisation de l'image par défaut
                    alt="Profile"
                    className={Userstyles.profilePic}
                />
                <p className={Userstyles.author}>{user.username}</p>
            </div>
            <div className={Userstyles.userContent}>
                <p>ID: {user.user_id}</p>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
                <p>Created at: {user.created_at}</p>
                <p>Bio: {user.bio}</p>
                

            </div>
            {userRole === 'Admin' && ( 
                <div className={Userstyles.deleteUser}>
                    <button type="button" onClick={handleDelete} className={Userstyles.deleteUserBtn}>Delete</button>
                </div>
            )}
            <p className={Userstyles.message}>{message}</p>
        </div>
    );
};

export default User;

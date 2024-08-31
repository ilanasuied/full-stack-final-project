import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Userstyles from '../css/Users.module.css';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import defaultProfilePic from '../image/default_image.png'

const User = () => {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    const { id } = useParams();
    const location = useLocation();
    const { username } = location.state;
    const navigate = useNavigate();

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

                //delete this user and his stuff from the localStorage

                //delete the user from the user page data 
                if (localStorage.getItem('userPageData') != null) {
                    const users = JSON.parse(localStorage.getItem('userPageData'));
                    const updatedUsers = users.filter(user => user.user_id !== parseInt(id));
                    localStorage.setItem('userPageData', JSON.stringify(updatedUsers));
                }


                //delete his post from the localStorage
                if (localStorage.getItem('allPostsData')) {
                    const posts = JSON.parse(localStorage.getItem('allPostsData'));
                    const updatedPosts = posts.filter(post => post.author != username);
                    localStorage.setItem('allPostsData', JSON.stringify(updatedPosts));
                }


                //delete his conversation from the list of conversation
                if (localStorage.getItem('conversationsList')) {
                    const conversations = JSON.parse(localStorage.getItem('conversationsList'));
                    const updatedList = conversations.filter(conversations => conversations.user_id !== parseInt(id));
                    localStorage.setItem('conversationsList', JSON.stringify(updatedList));
                }
                navigate('/');
            }
        } catch (error) {
            setMessage('Failed to delete user.');
            console.error('Failed to delete user:', error);
        }
    };

    if (!user) {
        return <div className={Userstyles.loading}>Loading...</div>;
    }

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div className={Userstyles.user}>
            <div className={Userstyles.backBtn}>
                <FontAwesomeIcon icon={faArrowLeft} onClick={handleGoBack} />
            </div>
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
            {(
                <div className={Userstyles.deleteUser}>
                    <FontAwesomeIcon type="button" onClick={handleDelete}
                        icon={faTrash} className={Userstyles.deleteUserBtn} />
                </div>
            )}
            <p className={Userstyles.message}>{message}</p>
        </div>
    );
};

export default User;

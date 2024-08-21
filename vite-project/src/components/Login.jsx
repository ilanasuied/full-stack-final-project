import React, { useState } from "react";
import logInStyles from '../css/Login.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();



    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('Submitting login form...');

        try {
            
           
            const response = await axios.post('http://localhost:3001/api/users', {
                username,
                password,
                action: 'login'
            });



            if (response.status === 200) {
                setMessage('Successful connection!');
                console.log('Successful connection!');

                setUser(response.data.user);
                const userId = response.data.user.id;
                navigate(`/board/${userId}`);

                setUsername(""); 
                setPassword(""); 

            }
        } catch (error) {
            console.error('Error:', error); 
            if (error.response && error.response.status === 401) {
                setMessage('Incorrect username or password');
                console.log('Incorrect username or password');
            } else {
                setMessage('Connection Error');
                console.log('Connection Error');

            }
        }
    };

    return (
        <div className={logInStyles.container}>
            {user && (
                <div>
                    <h2>Welcome, {user.username}!</h2>
                    <p>Your ID is {user.id}</p>
                </div>
            )}
            <h1>Log In</h1>
            <form onSubmit={handleLogin}>
                <input
                    className={logInStyles.inputLogin}
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    className={logInStyles.inputLogin}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className={logInStyles.loginBnt}>Login</button>
            </form>
            <p className={logInStyles.textLogin}>{message}</p>
        </div>
    );
};

export default Login;

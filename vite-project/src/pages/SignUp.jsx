import React, { useState } from 'react';
import SignUpStyles from '../css/SignUp.module.css';
import axios from 'axios';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 

    const date = new Date();
    const formattedDate = format(date, 'yyyy-MM-dd HH:mm:ss');

    const handleSignUp = async (e) => {
        e.preventDefault();
        console.log('Submitting signUp form...');

        try {
            const response = await axios.post('http://localhost:3001/api/users', {
                username,
                email,
                password,
                role: 'User',
                created_at: formattedDate,
                action: 'signup'
            });

            if (response.status === 201) { 
                setMessage('Welcome !');
                console.log('Welcome !');
                

                const userId = response.data.user.id;
                navigate(`/login`);

                
                setUsername("");
                setPassword("");
                setEmail("");
            }
            if (response.status === 400) {
                setMessage('Username already taken');
            }

        } catch (error) {
            if (error.response && error.response.status === 400) {
                setMessage(error.response.data.message); 
            } else {
                setMessage('An unexpected error occurred');
            }
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className={SignUpStyles.container}>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUp}>
                <input
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                
                <button type='submit' className={SignUpStyles.signUpBtn}>Submit</button>
            </form>
            <p className={SignUpStyles.textSignUp}>{message}</p>
        </div>
    );
};

export default SignUp;

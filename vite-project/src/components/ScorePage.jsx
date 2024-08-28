import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ScorePage = ({ score, totalQuestions }) => {
    const [allScores, setAllScores] = useState([]);

    useEffect(() => {
        const fetchAllScores = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/scores');
                setAllScores(response.data);  
            } catch (error) {
                console.error('Error fetching scores:', error);
            }
        };

        fetchAllScores();
    }, []);

    return (
        <div>
            <h1>Quiz Completed</h1>
            <p>Your score: {score}/{totalQuestions}</p>
            <h2>Leaderboard</h2>
            <ul>
                {allScores.length > 0 ? (
                    allScores.map((userScore, index) => (
                        <li key={index}>
                            {userScore.username}: {userScore.score}
                        </li>
                    ))
                ) : (
                    <p>No scores available.</p>
                )}
            </ul>
            <Link to="/board">
                <button>Go to Dashboard</button>
            </Link>
        </div>
    );
};

export default ScorePage;

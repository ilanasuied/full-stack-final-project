import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useLocation } from 'react-router-dom';
import scoreStyle from '../css/ScorePage.module.css';

const ScorePage = () => {
    const [allScores, setAllScores] = useState([]);
    const [userScores, setUserScores] = useState([]);
    const { id } = useParams();
    const location = useLocation();
    const view = location.state?.view;

    useEffect(() => {
        const fetchScores = async () => {
            try {
                if (view === 'all') {
                    if (localStorage.getItem('allScoresData') === null) {
                        const response = await axios.get('http://localhost:3001/api/scores');
                        setAllScores(response.data);
                        localStorage.setItem('allScoresData', JSON.stringify(response.data));
                    } else {
                        setAllScores(JSON.parse(localStorage.getItem('allScoresData')));
                    }
                } else if (view === 'user') {
                    if (localStorage.getItem('userScoresData') === null) {
                        const response = await axios.get(`http://localhost:3001/api/scores/${id}`);
                        setUserScores(response.data);
                        localStorage.setItem('userScoresData', JSON.stringify(response.data));
                    } else {
                        setUserScores(JSON.parse(localStorage.getItem('userScoresData')));
                    }
                }
            } catch (error) {
                console.error('Error fetching scores:', error);
            }
        };

        fetchScores();
    }, [view, id]);

    const userData = JSON.parse(localStorage.getItem('user'));
    const currentUserUsername = userData.username;

    return (
        <div className={scoreStyle.container}>


            {view === 'user' ? (
                <div>
                    <h1 className={scoreStyle.h1}>Your Scores - {currentUserUsername}</h1>
                    <ul className={scoreStyle.ul}>
                        {userScores.map((score, index) => (
                            <li className={scoreStyle.li} key={index}>score: {score.score} </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>
                    <h1 className={scoreStyle.h1}>All Scores</h1>
                    <ul className={scoreStyle.ul}>
                        {allScores.map((score, index) => (
                            <li className={scoreStyle.li} key={index}>{score.username} - score: {score.score}</li>
                        ))}
                    </ul>
                </div>
            )}

            <Link to={`/board/${id}`}>
                <button className={scoreStyle.button}>Go to Dashboard</button>
            </Link>
        </div>
    );
};

export default ScorePage;


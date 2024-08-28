import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Utiliser useNavigate à la place de useHistory
import axios from 'axios';
import questions from './questions';
import NavbarFirst from './NavbarFirst';

const Quizz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [number, setNumber] = useState(1);
    const [selectedOption, setSelectedOption] = useState('');
    const [feedback, setFeedback] = useState('');
    const [showExplanation, setShowExplanation] = useState(false);
    const [quizFinished, setQuizFinished] = useState(false);
    const [allScores, setAllScores] = useState([]); 

    const navigate = useNavigate(); 

    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        if (option === questions[currentQuestion].answer) {
            setScore(score + 1);
            setFeedback('Correct!');
            setShowExplanation(false);
        } else {
            setFeedback(`Incorrect! ${questions[currentQuestion].explanation}`);
            setShowExplanation(true);
        }
    };

    const handleNextQuestion = () => {
        if (selectedOption) {
            setFeedback('');
            setShowExplanation(false);
            setSelectedOption('');
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setNumber(number + 1);
            } else {
                setQuizFinished(true);
                submitScore();
            }
        } else {
            setFeedback('Please select an option before moving to the next question.');
        }
    };

    const submitScore = async () => {
        try {
            await axios.post('http://localhost:3001/api/scores', {
                userId,
                username,
                score
            });
            fetchAllScores();
        } catch (error) {
            console.error('Error submitting score:', error);
        }
    };

    const fetchAllScores = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/scores');
            setAllScores(response.data);
            navigate('/score'); 
        } catch (error) {
            console.error('Error fetching scores:', error);
        }
    };

    if (quizFinished) {
        
        return (
            <div>
                <h1>Quiz Completed</h1>
                <p>Your score: {score}/{questions.length}</p>
                <h2>Leaderboard</h2>
                <ul>
                    {allScores.map((userScore, index) => (
                        <li key={index}>
                            {userScore.username}: {userScore.score}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    const currentOptions = questions[currentQuestion]?.options || [];

    return (
        <>
            <div>
                <NavbarFirst/>
            </div>
            <div>
                <h1>React & Node.js Quiz</h1>
                <p>Score: {score}</p>
                <p>Question number: {number}</p>
                <h2>{questions[currentQuestion]?.question}</h2>
                <ul>
                    {currentOptions.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            style={{ cursor: 'pointer', padding: '10px', marginBottom: '5px', border: '1px solid #ddd' }}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
                {feedback && <p>{feedback}</p>}
                {showExplanation && <p>{questions[currentQuestion]?.explanation}</p>}
                {feedback && currentQuestion < questions.length - 1 && (
                    <button onClick={handleNextQuestion} style={{ marginTop: '10px' }}>Next Question</button>
                )}
            </div>
        </>
    );
};

export default Quizz;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import questions from './questions';
import NavbarFirst from './NavbarFirst';
import quizStyle from '../css/Quizz.module.css';

const Quizz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [number, setNumber] = useState(1);
  const [selectedOption, setSelectedOption] = useState('');
  const [feedback, setFeedback] = useState('');
  const [quizFinished, setQuizFinished] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();


  useEffect(() => {
 
    const userData = localStorage.getItem('user');
    
    if (userData) {
      try {
        const userObject = JSON.parse(userData);
        const retrievedUsername = userObject.username;
        setUsername(retrievedUsername);
        console.log('Retrieved username:', retrievedUsername);
      } catch (error) {
        console.error('Error retrieving username:', error);
      }
    } else {
      console.log('No users found in localStorage');
    }
  }, []);

  const handleOptionClick = (option) => { 
    if (quizFinished) {
     
      return;
    }

    setSelectedOption(option);
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
      setFeedback('Correct!');
     
    } else {
      setFeedback(`Incorrect! ${questions[currentQuestion].explanation}`);
      
    }
  };

  const handleNextQuestion = () => {
    if (selectedOption) {
      setFeedback('');
      setSelectedOption('');
  
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setNumber(number + 1);
      } else {
        console.log('Quiz terminé, mise à jour de quizFinished à true');
        setQuizFinished(true);
      }
    } else {
      setFeedback('Please select an option before moving on to the next question.');
    }
  };
  
  useEffect(() => {
    const submitScore = async () => {
  if (quizFinished) {
    console.log('Soumission du score en cours...');
    console.log('Données envoyées:', { userId: id, score });

    try {
      const response = await axios.post(`http://localhost:3001/api/scores/${id}`, {
        userId: id,
        score
      });

      console.log('Server response:', response.data);

      const userScoresData = JSON.parse(localStorage.getItem('userScoresData')) || [];
      const newUserScore = { userId: id, username, score };
      localStorage.setItem('userScoresData', JSON.stringify([...userScoresData, newUserScore]));

      console.log('Score soumis avec succès');
      console.log('Navigating to /board/${id}');
      navigate(`/board/${id}`);
    } catch (error) {
      console.error('Erreur lors de la soumission du score:', error.response ? error.response.data : error.message);
    }
  }
};

    
    
    
  
    submitScore();
  }, [quizFinished, id, score, username, navigate]);
  
  

  return (
    <>
      <div>
        <NavbarFirst />
      </div>
      <div className={quizStyle.btnContainer}>
        <Link to={`/scores/${id}`} state={{ view: 'user' }}>
          <button type='button' className={quizStyle.btnScores}>Your Scores</button>
        </Link>
        <Link to={`/scores/${id}`} state={{ view: 'all' }}>
          <button type='button' className={quizStyle.btnScores}>All Scores</button>
        </Link>
      </div>
      <div className={quizStyle.quizContainer}>
        <h1>React & Node.js Quiz</h1>
        <p>User: {username}</p>
        <p>Score: {score}</p>
        <p>Question number: {number}</p>
        <h2 className={quizStyle.question}>{questions[currentQuestion]?.question}</h2>
        <ul className={quizStyle.choices}>
          {questions[currentQuestion]?.options.map((option, index) => (
            <li className={quizStyle.choiceButton}
              key={index}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
        {feedback && <p>{feedback}</p>}
        {!quizFinished && (
          <button onClick={handleNextQuestion} className={quizStyle.nextButton}>Next Question</button>
        )}
      </div>
    </>
  );
};

export default Quizz;

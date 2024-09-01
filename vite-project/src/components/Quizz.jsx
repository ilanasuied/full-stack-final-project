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
    console.log('Le composant Quizz s\'est monté');
  }, []);

  useEffect(() => {
    console.log('useEffect pour récupérer le nom d\'utilisateur est exécuté');
    const userData = localStorage.getItem('user');
    
    if (userData) {
      try {
        const userObject = JSON.parse(userData);
        const retrievedUsername = userObject.username;
        setUsername(retrievedUsername);
        console.log('Nom d\'utilisateur récupéré:', retrievedUsername);
      } catch (error) {
        console.error('Erreur lors de la récupération du nom d\'utilisateur:', error);
      }
    } else {
      console.log('Aucun utilisateur trouvé dans le localStorage');
    }
  }, []);

  const handleOptionClick = (option) => { 
    if (quizFinished) {
      console.log('Le quiz est déjà terminé. Aucune option ne peut être sélectionnée.');
      return;
    }

    setSelectedOption(option);
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
      setFeedback('Correct!');
      console.log('Bonne réponse sélectionnée:', option);
    } else {
      setFeedback(`Incorrect! ${questions[currentQuestion].explanation}`);
      console.log('Mauvaise réponse sélectionnée:', option);
    }
  };

  const handleNextQuestion = () => { 
    if (selectedOption) {
      setFeedback('');
      setSelectedOption('');
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setNumber(number + 1);
        console.log('Passage à la question suivante:', number);
      } else {
        setQuizFinished(true);
        console.log('Le quiz est terminé');
      }
    } else {
      setFeedback('Veuillez sélectionner une option avant de passer à la question suivante.');
    }
  };

  useEffect(() => {
    const submitScore = async () => {  
      console.log('Soumission du score en cours...');
      if (quizFinished) {
        try {
         
          const response = await axios.post(`http://localhost:3001/api/scores/${id}`, {
            userId: id,
            score
          });
          
          console.log('Réponse du serveur:', response.data);

          const userScoresData = JSON.parse(localStorage.getItem('userScoresData')) || [];
          console.log('Données avant ajout:', userScoresData);
          const newUserScore = { userId: id, username, score };
          localStorage.setItem('userScoresData', JSON.stringify([...userScoresData, newUserScore]));
          console.log('Données après ajout:', JSON.parse(localStorage.getItem('userScoresData')));

          console.log('Score soumis avec succès');
          navigate(`/scores/${id}`);
        } catch (error) {
          console.error('Erreur lors de la soumission du score:', error);
          alert('Erreur lors de la soumission du score.');
        }
      }
    };

    submitScore();
  }, [quizFinished, navigate, id, score, username]);

  useEffect(() => {
    const fetchScoresFromAPI = async () => {
      console.log('Chargement des scores depuis l\'API');
      try {
        const response = await axios.get('http://localhost:3001/api/scores');
        console.log('Scores récupérés depuis l\'API:', response.data);
        localStorage.setItem('allScoresData', JSON.stringify(response.data));
        console.log('Scores stockés dans le localStorage');
      } catch (error) {
        console.error('Erreur lors de la récupération des scores:', error);
      }
    };

    if (!localStorage.getItem('allScoresData')) {
      fetchScoresFromAPI();
    }
  }, []);

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

import React, { useState } from 'react';
import questions from './questions';
import NavbarFirst from './NavbarFirst';

const Quizz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);

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
    setFeedback('');
    setShowExplanation(false);
    setSelectedOption('');
    setCurrentQuestion(currentQuestion + 1);
  };

  if (currentQuestion >= questions.length) {
    return (
      <div>
        <h1>Quiz Completed</h1>
        <p>Your score: {score}/{questions.length}</p>
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
      <h1>{questions[currentQuestion]?.question}</h1>
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
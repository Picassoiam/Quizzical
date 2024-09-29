// src/TriviaApp.js
import React, { useState, useEffect } from 'react';
import WelcomeScreen from './WelcomeScreen';
import HighScoreScreen from './HighScoreScreen';
import QuestionScreen from './QuestionScreen';
import EndScreen from './EndScreen';

const TriviaApp = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [topScores, setTopScores] = useState([]);
  const [userName, setUserName] = useState('');
  const [currentScreen, setCurrentScreen] = useState('welcome');

  useEffect(() => {
    const fetchTriviaQuestions = async () => {
      try {
        const response = await fetch('https://the-trivia-api.com/api/questions?limit=5');
        const data = await response.json();
        setQuestions(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trivia questions:', error);
      }
    };

    fetchTriviaQuestions();
  }, []);

  useEffect(() => {
    const fetchTopScores = async () => {
      try {
        const response = await fetch('http://localhost:5000/scores');
        const data = await response.json();
        setTopScores(data);
      } catch (error) {
        console.error('Error fetching top scores:', error);
      }
    };

    if (currentScreen === 'highscores') {
      fetchTopScores();
    }
  }, [currentScreen]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      saveScore(userName, score + (isCorrect ? 1 : 0));
      setCurrentScreen('end');
    }
  };

  const saveScore = async (name, score) => {
    try {
      const response = await fetch('http://localhost:5000/scores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, score }),
      });
      if (!response.ok) {
        throw new Error('Failed to save score');
      }
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };
  

  const handleStartGame = (userName) => {
    setUserName(userName);
    setScore(0);
    setCurrentQuestionIndex(0);
    setCurrentScreen('question');
  };

  const handleViewHighScores = () => {
    setCurrentScreen('highscores');
  };

  const handleBackToWelcome = () => {
    setCurrentScreen('welcome');
  };

  const handleRestartGame = () => {
    setCurrentScreen('welcome');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      {currentScreen === 'welcome' && <WelcomeScreen onStart={handleStartGame} />}
      {currentScreen === 'highscores' && <HighScoreScreen scores={topScores} onBack={handleBackToWelcome} />}
      {currentScreen === 'question' && (
        <QuestionScreen
          question={questions[currentQuestionIndex]}
          score={score}
          total={questions.length}
          onAnswer={handleAnswer}
        />
      )}
      {currentScreen === 'end' && (
        <EndScreen
          score={score}
          total={questions.length}
          onRestart={handleRestartGame}
          onViewHighScores={handleViewHighScores}
        />
      )}
    </div>
  );
};

export default TriviaApp;

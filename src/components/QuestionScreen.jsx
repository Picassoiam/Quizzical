// src/QuestionScreen.js
import React from 'react';
import QuestionCard from './QuestionCard';
import ScoreCard from './ScoreCard';

const QuestionScreen = ({ question, score, total, onAnswer }) => {
  return (
    <div className="question-screen">
      <ScoreCard score={score} total={total} />
      <QuestionCard question={question} onAnswer={onAnswer} />
    </div>
  );
};

export default QuestionScreen;

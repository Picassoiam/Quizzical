import React, { useState } from 'react';

const QuestionCard = ({ question, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false); // New state to track if an answer has been selected

  // Handle when the user selects an answer
  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setIsAnswerSelected(true); // Mark that an answer has been selected

    // Check if the answer is correct
    const isCorrect = answer === question.correctAnswer;
    
    // Delay before calling onAnswer to show feedback
    setTimeout(() => {
      onAnswer(isCorrect);
      setSelectedAnswer(null); // Reset selected answer for next question
      setIsAnswerSelected(false); // Reset answer selection state for next question
    }, 1000);  // 1 second delay before moving to the next question
  };

  return (
    <div className="question-card">
      <h2>{question.question}</h2>
      <div className="answer-section">
        {[...question.incorrectAnswers, question.correctAnswer]
          .sort(() => Math.random() - 0.5) // Shuffle the answers
          .map((answer, index) => (
            <button
              key={index}
              className={`answer-button ${
                selectedAnswer === answer ? (answer === question.correctAnswer ? 'correct' : 'incorrect') : ''
              }`}
              onClick={() => handleAnswerClick(answer)}
              disabled={isAnswerSelected}  // Disable once an answer is selected
            >
              {answer}
            </button>
          ))}
      </div>
      {isAnswerSelected && (
        <p>
          {selectedAnswer === question.correctAnswer ? 'Correct!' : 'Incorrect!'}
        </p>
      )}
    </div>
  );
};

export default QuestionCard;

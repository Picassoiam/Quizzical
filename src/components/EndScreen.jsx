// src/EndScreen.js
import React from 'react';

const EndScreen = ({ score, total, onRestart, onViewHighScores }) => {
  return (
    <div className="end-screen">
      <h2>Game Over!</h2>
      <p>
        You scored <strong>{score}</strong> out of <strong>{total}</strong>.
      </p>
      <button onClick={onViewHighScores}>View High Scores</button>
      <button onClick={onRestart}>Play Again</button>
    </div>
  );
};

export default EndScreen;

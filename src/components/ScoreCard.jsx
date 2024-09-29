// src/ScoreCard.js
import React from 'react';

const ScoreCard = ({ score, total }) => {
  return (
    <div className="score-card">
      <h2>Score</h2>
      <p>
        You have answered <strong>{score}</strong> out of <strong>{total}</strong> questions correctly!
      </p>
    </div>
  );
};

export default ScoreCard;

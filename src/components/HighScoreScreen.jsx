// src/HighScoreScreen.js
import React from 'react';

const HighScoreScreen = ({ scores, onBack }) => {
  return (
    <div className="high-score-screen">
      <h2>Top 3 High Scores</h2>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>
            {score.name}: {score.score}
          </li>
        ))}
      </ul>
      <button onClick={onBack}>Back to Welcome</button>
    </div>
  );
};

export default HighScoreScreen;

// src/WelcomeScreen.js
import React, { useState } from 'react';

const WelcomeScreen = ({ onStart }) => {
  const [userName, setUserName] = useState('');

  const handleStart = () => {
    if (userName.trim()) {
      onStart(userName);
    } else {
      alert('Please enter your name');
    }
  };

  return (
    <div className="welcome-screen">
      <input
        type="text"
        placeholder="Enter your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button onClick={handleStart}>Start Game</button>
    </div>
  );
};

export default WelcomeScreen;

import React, { useState, useEffect } from 'react';
import Trivia from './components/Trivia';

function App() {
  return (
    <div className="app-container">
      <h1>Welcome To Quizzical Trivia</h1>
      <Trivia />
    </div>
  );
}

export default App;
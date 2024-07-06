import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter and rename it as Router
import HomePage from './HomePage';
import Welcomepage from './Welcomepage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcomepage />} />
          <Route path="/homePage" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

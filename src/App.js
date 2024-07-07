import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Welcomepage from './Welcomepage';
import Analyze from './Analyze';
import './App.css';

// Example of creating a context
const MyContext = React.createContext();

function App() {
  return (
    <Router>
      <div className="App">
        {/* Example of providing context */}
        <MyContext.Provider value={{ /* your context values */ }}>
          <Routes>
            <Route path="/" element={<Welcomepage />} />
            <Route path="/homePage" element={<HomePage />} />
            <Route path="/analyze" element={<Analyze />} />
          </Routes>
        </MyContext.Provider>
      </div>
    </Router>
  );
}

export default App;

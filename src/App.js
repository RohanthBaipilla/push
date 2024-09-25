import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'; // Import your CSS file
import Navbar from './components/Navbar';
import Objective1 from './components/Objective1';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/objectives/*" element={<ObjectivePage />} />
        </Routes>
      </div>
    </Router>
  );
}

const ObjectivePage = () => (
  <div className="objective-container">
    <h1>Objectives</h1>
    <div className="button-container">
      <Link to="/objectives/1">
        <button className="objective-button">Objective1</button>
      </Link>
      <Link to="/objectives/2">
        <button className="objective-button">Objective2</button>
      </Link>
      <Link to="/objectives/3">
        <button className="objective-button">Objective3</button>
      </Link>
    </div>

    {/* Set up dynamic routing for different objective pages */}
    <Routes>
      <Route path="1" element={<Objective1 />} />
      <Route path="2" element={<h1>Objective 2 (Coming Soon)</h1>} />
      <Route path="3" element={<h1>Objective 3 (Coming Soon)</h1>} />
    </Routes>
  </div>
);

export default App;

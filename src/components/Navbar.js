import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Malware Insight</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/objectives">Objectives</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">FileFlex</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Welcome</Link></li>
        <li><Link to="/homePage">Document Conversion</Link></li>
        <li><Link to="/analyze">Document Analysis</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

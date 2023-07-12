import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Octank Text To Image App </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <a href="#" className="nav-link">Home</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

export default function Navbar() {
  return (
    <React.Fragment>
      <div className="navigation">
        <div className="navigation-sub">
          <Link to="/" className="item">
            Home
          </Link>
        </div>
        <div className="navigation-sub">
          <Link to="/About" className="item">
            About
          </Link>
        </div>
        <div className="navigation-sub">
          <Link to="/Projects" className="item">
            Projects
          </Link>
        </div>
        <div className="navigation-sub">
          <Link to="/Blog" className="item">
            Blog
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}

